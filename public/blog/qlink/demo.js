// The latent diffusion model the QwenGPUs trained, running in your browser. Sampling is the same
// int32 arithmetic as kernels/diffusion/latent.cu (lt_hidden + lt_out + lt_ddim), on the GPU with
// WebGPU when there is one, otherwise in JavaScript; replaying the QwenGPUs' noise reproduces
// their latents bit for bit. The decoder (8 numbers -> 28 x 28 pixels) is float and only draws.
(function () {
  const D = JSON.parse(document.getElementById("latent-data").textContent);
  const T = D.T, L = D.D, H = D.dec.H, NP = 296;
  const CKS = Object.keys(D.checkpoints).map(Number).sort((a, b) => a - b);
  const $ = (id) => document.getElementById(id);
  const canvas = $("dm-canvas"), status = $("dm-status"), checkEl = $("dm-check");
  const ckInput = $("dm-ck"), ckLabel = $("dm-ck-label"), nSel = $("dm-n");
  const params = (step) => Int32Array.from(D.checkpoints[String(step)]);
  const qwenNoise = Int32Array.from(D.noise), qwenOut = D.generated, NQ = qwenNoise.length / L;

  // the decoder, dequantized: W1 (8 x H), W2 (H x 784), one scale per output unit
  function deq(b64, scales, cols) {
    const raw = atob(b64), w = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i++) w[i] = ((raw.charCodeAt(i) << 24) >> 24) * scales[i % cols];
    return w;
  }
  const dW1 = deq(D.dec.W1, D.dec.s1, H), dW2 = deq(D.dec.W2, D.dec.s2, 784);
  const db1 = Float32Array.from(D.dec.b1), db2 = Float32Array.from(D.dec.b2);

  // --- sampling, exactly as the kernels (Math.imul: 32-bit products) -----------------------------
  // prm: W1 (9 x 16, i * 16 + k) | b1 (16) | W2 (16 x 8, k * 8 + o) | b2 (8)
  function sampleCPU(prm, noise, n) {
    const st = new Int32Array((T + 1) * n * L), z = new Int32Array(16);
    st.set(noise.subarray(0, n * L));
    let tf = D.t0;
    for (let j = 0; j < T; j++) {
      const [A, B, tnext] = D.ddim[j], s0 = j * n * L, s1 = s0 + n * L;
      for (let i = 0; i < n; i++) {
        const x = s0 + i * L;
        for (let k = 0; k < 16; k++) {
          let s = Math.imul(tf, prm[128 + k]);
          for (let d = 0; d < L; d++) s = (s + Math.imul(st[x + d], prm[d * 16 + k])) | 0;
          z[k] = ((s >> 8) + prm[144 + k]) | 0;
        }
        for (let o = 0; o < L; o++) {
          let e = prm[288 + o];
          for (let k = 0; k < 16; k++) if (z[k] > 0) e = (e + (Math.imul(z[k], prm[160 + k * 8 + o]) >> 8)) | 0;
          st[s1 + i * L + o] = (Math.imul(A, st[x + o]) + Math.imul(B, e) + 2048) >> 12;
        }
      }
      tf = tnext;
    }
    return st;
  }
  // a Gaussian noise batch, Q8 (mulberry32 + Box-Muller)
  let seed = 7;
  function noiseBatch(n) {
    const out = new Int32Array(n * L);
    let s = (seed = (seed * 1103515245 + 12345) >>> 0);
    const rnd = () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    for (let i = 0; i < n * L; i += 2) {
      const r = Math.sqrt(-2 * Math.log(rnd() + 1e-12)), a = 2 * Math.PI * rnd();
      out[i] = Math.round(r * Math.cos(a) * 256); out[i + 1] = Math.round(r * Math.sin(a) * 256);
    }
    return out;
  }
  function sameAsQwen(fin) {  // digits whose 8 final integers all match
    let same = 0;
    for (let i = 0; i < NQ; i++) {
      let ok = true;
      for (let d = 0; d < L; d++) ok = ok && fin[i * L + d] === qwenOut[i * L + d];
      same += ok;
    }
    return same;
  }

  // --- WebGPU -----------------------------------------------------------------------------------
  const WGSL_SAMPLE = `
struct U { n: u32, j: u32, a: i32, b: i32, tf: i32, p0: u32, p1: u32, p2: u32 }
@group(0) @binding(0) var<storage, read> prm: array<i32, ${NP}>;
@group(0) @binding(1) var<storage, read_write> st: array<i32>;
@group(0) @binding(2) var<uniform> u: U;
@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) g: vec3u) {
  let i = g.x; if (i >= u.n) { return; }
  let x = (u.j * u.n + i) * ${L}u; let y = x + u.n * ${L}u;
  var z: array<i32, 16>;
  for (var k = 0u; k < 16u; k++) {
    var s = u.tf * prm[128u + k];
    for (var d = 0u; d < ${L}u; d++) { s += st[x + d] * prm[d * 16u + k]; }
    z[k] = (s >> 8u) + prm[144u + k];
  }
  for (var o = 0u; o < ${L}u; o++) {
    var e = prm[288u + o];
    for (var k = 0u; k < 16u; k++) { if (z[k] > 0) { e += (z[k] * prm[160u + k * 8u + o]) >> 8u; } }
    st[y + o] = (u.a * st[x + o] + u.b * e + 2048) >> 12u;
  }
}`;
  // the decoder at a point between two sampling steps: latents -> hidden layer -> pixels
  const WGSL_HIDDEN = `
struct V { n: u32, k: u32, f: f32, p: u32 }
@group(0) @binding(0) var<storage, read> st: array<i32>;
@group(0) @binding(1) var<storage, read> w1: array<f32>;
@group(0) @binding(2) var<storage, read> b1: array<f32>;
@group(0) @binding(3) var<storage, read_write> hid: array<f32>;
@group(0) @binding(4) var<uniform> v: V;
@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) g: vec3u) {
  let t = g.x; if (t >= v.n * ${H}u) { return; }
  let i = t / ${H}u; let h = t % ${H}u;
  let a = (v.k * v.n + i) * ${L}u; let b = (min(v.k + 1u, ${T}u) * v.n + i) * ${L}u;
  var s = b1[h];
  for (var d = 0u; d < ${L}u; d++) { s += mix(f32(st[a + d]), f32(st[b + d]), v.f) / 256.0 * w1[d * ${H}u + h]; }
  hid[t] = max(s, 0.0);
}`;
  const WGSL_PIXELS = `
struct V { n: u32, k: u32, f: f32, p: u32 }
@group(0) @binding(0) var<storage, read> hid: array<f32>;
@group(0) @binding(1) var<storage, read> w2: array<f32>;
@group(0) @binding(2) var<storage, read> b2: array<f32>;
@group(0) @binding(3) var<storage, read_write> img: array<f32>;
@group(0) @binding(4) var<uniform> v: V;
@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) g: vec3u) {
  let t = g.x; if (t >= v.n * 784u) { return; }
  let i = t / 784u; let p = t % 784u;
  var s = b2[p];
  for (var h = 0u; h < ${H}u; h++) { s += hid[i * ${H}u + h] * w2[h * 784u + p]; }
  img[t] = 1.0 / (1.0 + exp(-s));
}`;
  const WGSL_DRAW = `
struct R { cols: u32, n: u32, size: f32, gap: f32 }
@group(0) @binding(0) var<storage, read> img: array<f32>;
@group(0) @binding(1) var<uniform> r: R;
@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  var p = array<vec2f, 3>(vec2f(-1, -1), vec2f(3, -1), vec2f(-1, 3));
  return vec4f(p[i], 0, 1);
}
fn px(i: u32, x: i32, y: i32) -> f32 { return img[i * 784u + u32(clamp(y, 0, 27) * 28 + clamp(x, 0, 27))]; }
fn ramp(v: f32) -> vec3f {
  let a = vec3f(0.067, 0.067, 0.082); let b = vec3f(0.42, 0.30, 0.95); let c = vec3f(0.95, 0.93, 1.0);
  return select(mix(b, c, (v - 0.5) * 2.0), mix(a, b, v * 2.0), v < 0.5);
}
@fragment fn fs(@builtin(position) q: vec4f) -> @location(0) vec4f {
  let cell = r.size / f32(r.cols);
  let gx = floor(q.x / cell); let gy = floor(q.y / cell);
  let lx = q.x - gx * cell - r.gap * 0.5; let ly = q.y - gy * cell - r.gap * 0.5;
  let inner = cell - r.gap;
  let i = min(u32(gy) * r.cols + u32(gx), r.n - 1u);
  let tx = lx / inner * 28.0 - 0.5; let ty = ly / inner * 28.0 - 0.5;
  let x0 = i32(floor(tx)); let y0 = i32(floor(ty)); let fx = tx - floor(tx); let fy = ty - floor(ty);
  let v = mix(mix(px(i, x0, y0), px(i, x0 + 1, y0), fx), mix(px(i, x0, y0 + 1), px(i, x0 + 1, y0 + 1), fx), fy);
  let outside = lx < 0.0 || ly < 0.0 || lx >= inner || ly >= inner;
  return select(vec4f(ramp(clamp(v, 0.0, 1.0)), 1), vec4f(0.051, 0.051, 0.063, 1), outside);
}`;

  let gpu = null;
  async function initGPU() {
    if (!navigator.gpu) return null;
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) return null;
      const device = await adapter.requestDevice();
      const format = navigator.gpu.getPreferredCanvasFormat();
      const S = GPUBufferUsage.STORAGE, C = GPUBufferUsage.COPY_DST, U = GPUBufferUsage.UNIFORM;
      const buf = (arr) => { const b = device.createBuffer({ size: arr.byteLength, usage: S | C }); device.queue.writeBuffer(b, 0, arr); return b; };
      const comp = (code) => device.createComputePipeline({ layout: "auto", compute: { module: device.createShaderModule({ code }), entryPoint: "main" } });
      const rmod = device.createShaderModule({ code: WGSL_DRAW });
      gpu = { device, ctx: null, n: 0, ubufs: [], verified: null,
        sample: comp(WGSL_SAMPLE), hidden: comp(WGSL_HIDDEN), pixels: comp(WGSL_PIXELS),
        draw: device.createRenderPipeline({ layout: "auto", vertex: { module: rmod, entryPoint: "vs" },
          fragment: { module: rmod, entryPoint: "fs", targets: [{ format }] }, primitive: { topology: "triangle-list" } }),
        prm: device.createBuffer({ size: NP * 4, usage: S | C }),
        w1: buf(dW1), b1: buf(db1), w2: buf(dW2), b2: buf(db2),
        vbuf: device.createBuffer({ size: 16, usage: U | C }), rbuf: device.createBuffer({ size: 16, usage: U | C }) };
      // the exactness check runs first, on the GPU: the QwenGPUs' noise through the final weights
      try {
        gpuSample(params(CKS[CKS.length - 1]), qwenNoise, NQ);
        gpu.verified = sameAsQwen(await gpuReadFinal());
      } catch (e) { gpu.verified = null; }
      gpu.ctx = canvas.getContext("webgpu");
      gpu.ctx.configure({ device, format, alphaMode: "opaque" });
      return gpu;
    } catch (e) { gpu = null; return null; }
  }
  function gpuSample(prm, noise, n) {
    const g = gpu, dev = g.device, S = GPUBufferUsage.STORAGE;
    dev.queue.writeBuffer(g.prm, 0, prm);
    if (g.n !== n) {
      [g.st, g.hid, g.img].forEach((b) => b && b.destroy());
      g.st = dev.createBuffer({ size: (T + 1) * n * L * 4, usage: S | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });
      g.hid = dev.createBuffer({ size: n * H * 4, usage: S });
      g.img = dev.createBuffer({ size: n * 784 * 4, usage: S });
      g.ubufs.forEach((b) => b.destroy());
      g.ubufs = [];
      let tf = D.t0;
      for (let j = 0; j < T; j++) {
        const [A, B, tnext] = D.ddim[j];
        const b = dev.createBuffer({ size: 32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
        dev.queue.writeBuffer(b, 0, new Int32Array([n, j, A, B, tf, 0, 0, 0]));
        g.ubufs.push(b); tf = tnext;
      }
      const bind = (p, bufs) => dev.createBindGroup({ layout: p.getBindGroupLayout(0),
        entries: bufs.map((b, i) => ({ binding: i, resource: { buffer: b } })) });
      g.bgSample = g.ubufs.map((u) => bind(g.sample, [g.prm, g.st, u]));
      g.bgHidden = bind(g.hidden, [g.st, g.w1, g.b1, g.hid, g.vbuf]);
      g.bgPixels = bind(g.pixels, [g.hid, g.w2, g.b2, g.img, g.vbuf]);
      g.bgDraw = bind(g.draw, [g.img, g.rbuf]);
      g.n = n;
    }
    dev.queue.writeBuffer(g.st, 0, noise, 0, n * L);
    const enc = dev.createCommandEncoder();
    for (let j = 0; j < T; j++) {
      const pass = enc.beginComputePass();
      pass.setPipeline(g.sample); pass.setBindGroup(0, g.bgSample[j]);
      pass.dispatchWorkgroups(Math.ceil(n / 64)); pass.end();
    }
    dev.queue.submit([enc.finish()]);
  }
  async function gpuReadFinal() {
    const dev = gpu.device, n = gpu.n;
    const rb = dev.createBuffer({ size: n * L * 4, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });
    const enc = dev.createCommandEncoder();
    enc.copyBufferToBuffer(gpu.st, T * n * L * 4, rb, 0, n * L * 4);
    dev.queue.submit([enc.finish()]);
    await dev.queue.onSubmittedWorkDone();
    await rb.mapAsync(GPUMapMode.READ);
    const out = Int32Array.from(new Int32Array(rb.getMappedRange()));
    rb.unmap(); rb.destroy();
    return out;
  }
  function gpuDraw(k, f) {
    const g = gpu, dev = g.device, n = g.n, cols = Math.round(Math.sqrt(n));
    const v = new ArrayBuffer(16), vu = new Uint32Array(v), vf = new Float32Array(v);
    vu[0] = n; vu[1] = k; vf[2] = f;
    dev.queue.writeBuffer(g.vbuf, 0, v);
    const r = new ArrayBuffer(16), ru = new Uint32Array(r), rf = new Float32Array(r);
    ru[0] = cols; ru[1] = n; rf[2] = canvas.width; rf[3] = gap(cols);
    dev.queue.writeBuffer(g.rbuf, 0, r);
    const enc = dev.createCommandEncoder();
    const pass = enc.beginComputePass();
    pass.setPipeline(g.hidden); pass.setBindGroup(0, g.bgHidden); pass.dispatchWorkgroups(Math.ceil(n * H / 64));
    pass.setPipeline(g.pixels); pass.setBindGroup(0, g.bgPixels); pass.dispatchWorkgroups(Math.ceil(n * 784 / 64));
    pass.end();
    const rp = enc.beginRenderPass({ colorAttachments: [{ view: g.ctx.getCurrentTexture().createView(),
      clearValue: { r: 0.051, g: 0.051, b: 0.063, a: 1 }, loadOp: "clear", storeOp: "store" }] });
    rp.setPipeline(g.draw); rp.setBindGroup(0, g.bgDraw); rp.draw(3); rp.end();
    dev.queue.submit([enc.finish()]);
  }

  // --- the CPU path: decode in JavaScript, draw on a 2D canvas ------------------------------------
  let cpu = null;
  const LUT = (() => {
    const a = [17, 17, 21], b = [107, 77, 242], c = [242, 237, 255], lut = new Uint8ClampedArray(256 * 3);
    for (let i = 0; i < 256; i++) {
      const v = i / 255, [p, q, t] = v < 0.5 ? [a, b, v * 2] : [b, c, (v - 0.5) * 2];
      for (let ch = 0; ch < 3; ch++) lut[i * 3 + ch] = p[ch] + (q[ch] - p[ch]) * t;
    }
    return lut;
  })();
  const tile = document.createElement("canvas");
  tile.width = tile.height = 28;
  const tctx = tile.getContext("2d"), tdata = tctx.createImageData(28, 28), hid = new Float32Array(H);
  function cpuDraw(k, f) {
    if (cpu.drawn === k + f) return;  // holding still: the frame is already there
    cpu.drawn = k + f;
    const ctx = canvas.getContext("2d"), w = canvas.width, n = cpu.n, st = cpu.st, cols = Math.round(Math.sqrt(n));
    const cell = w / cols, g = gap(cols), k1 = Math.min(k + 1, T);
    ctx.fillStyle = "#0d0d10"; ctx.fillRect(0, 0, w, w);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    for (let i = 0; i < n; i++) {
      const a = (k * n + i) * L, b = (k1 * n + i) * L;
      for (let h = 0; h < H; h++) {
        let s = db1[h];
        for (let d = 0; d < L; d++) s += (st[a + d] + (st[b + d] - st[a + d]) * f) / 256 * dW1[d * H + h];
        hid[h] = s > 0 ? s : 0;
      }
      for (let p = 0; p < 784; p++) {
        let s = db2[p];
        for (let h = 0; h < H; h++) if (hid[h]) s += hid[h] * dW2[h * 784 + p];
        const li = Math.round(255 / (1 + Math.exp(-s))) * 3;
        tdata.data[p * 4] = LUT[li]; tdata.data[p * 4 + 1] = LUT[li + 1]; tdata.data[p * 4 + 2] = LUT[li + 2]; tdata.data[p * 4 + 3] = 255;
      }
      tctx.putImageData(tdata, 0, 0);
      ctx.drawImage(tile, (i % cols) * cell + g / 2, Math.floor(i / cols) * cell + g / 2, cell - g, cell - g);
    }
  }

  // --- driving it ---------------------------------------------------------------------------------
  let ck = CKS.length - 1, n = 64, t0 = performance.now(), auto = true, frames = 0, fpsT = performance.now(), fps = 0;
  const PLAY = 2.8, HOLD = 1.8;
  const gap = (cols) => Math.max(2, Math.round(canvas.width / cols * 0.08));
  function sizeCanvas() {
    const d = devicePixelRatio || 1;
    canvas.width = canvas.height = Math.round(canvas.clientWidth * d);
    if (cpu) cpu.drawn = null;
  }
  function generate(noise) {
    const prm = params(CKS[ck]), nz = noise || noiseBatch(n), m = nz.length / L;
    if (gpu) gpuSample(prm, nz, m);
    else cpu = { st: sampleCPU(prm, nz, m), n: m };
    t0 = performance.now();
  }
  function frame(now) {
    const e = (now - t0) / 1000, p = Math.min(1, e / PLAY);
    const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const pos = ease * T, k = Math.min(T - 1, Math.floor(pos)), f = pos >= T ? 1 : pos - k;
    if (gpu) gpuDraw(k, f); else if (cpu) cpuDraw(k, f);
    if (auto && e > PLAY + HOLD) generate();
    frames++;
    if (now - fpsT > 500) {
      fps = Math.round(frames * 1000 / (now - fpsT)); frames = 0; fpsT = now;
      const m = gpu ? gpu.n : cpu ? cpu.n : n;
      status.textContent = `${gpu ? "WebGPU" : "JavaScript"} · ${m.toLocaleString("en-US")} digits · noise level ${T - Math.round(pos)} · ${fps} fps`;
    }
    requestAnimationFrame(frame);
  }
  ckInput.max = String(CKS.length - 1); ckInput.value = String(ck);
  const ckText = () => { ckLabel.textContent = CKS[ck] ? `weights after ${CKS[ck].toLocaleString("en-US")} steps` : "untrained weights"; };
  ckText();
  ckInput.addEventListener("input", () => { ck = +ckInput.value; ckText(); auto = true; generate(); });
  $("dm-gen").addEventListener("click", () => { auto = true; generate(); });
  nSel.addEventListener("change", () => { n = +nSel.value; auto = true; generate(); });
  canvas.addEventListener("click", () => { auto = true; generate(); });
  $("dm-replay").addEventListener("click", () => {
    auto = false; ck = CKS.length - 1; ckInput.value = String(ck); ckText();
    const prm = params(CKS[ck]);
    let same, where;
    if (gpu && gpu.verified !== null) { same = gpu.verified; where = "on your GPU with WebGPU"; gpuSample(prm, qwenNoise, NQ); }
    else {
      const st = sampleCPU(prm, qwenNoise, NQ);
      same = sameAsQwen(st.subarray(T * NQ * L)); where = "in your browser";
      if (gpu) gpuSample(prm, qwenNoise, NQ); else cpu = { st, n: NQ };
    }
    t0 = performance.now();
    const whose = D.source.startsWith("QwenGPU") ? "the QwenGPUs wrote" : "the run's exact replay";
    checkEl.textContent = `${same} of ${NQ} digits identical, all ${L} integers of each, to what ${whose}, computed ${where} from the same noise.`;
    checkEl.dataset.ok = same === NQ ? "1" : "0";
  });
  addEventListener("resize", sizeCanvas);
  (async () => {
    sizeCanvas();
    await initGPU();
    if (!gpu) [...nSel.options].forEach((o) => { if (+o.value > 64) o.disabled = true; });
    generate();
    requestAnimationFrame(frame);
  })();
})();
