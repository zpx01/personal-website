import React from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#e0e0e0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: 1.7,
  },
  container: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '80px 24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
    marginBottom: 48,
    flexWrap: 'wrap',
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #222',
    flexShrink: 0,
  },
  headerText: {
    flex: 1,
    minWidth: 240,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    letterSpacing: '-0.02em',
  },
  bio: {
    fontSize: 15,
    color: '#999',
    margin: '0 0 16px 0',
  },
  links: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
  link: {
    color: '#888',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.2s',
    borderBottom: '1px solid transparent',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#555',
    margin: '48px 0 24px 0',
    paddingBottom: 8,
    borderBottom: '1px solid #1a1a1a',
  },
  researchBlurb: {
    fontSize: 15,
    color: '#888',
    marginBottom: 32,
  },
  projectCard: {
    display: 'flex',
    gap: 24,
    padding: '24px 0',
    borderBottom: '1px solid #141414',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  projectMedia: {
    width: 160,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectImage: {
    maxWidth: '100%',
    borderRadius: 8,
    display: 'block',
  },
  projectVideo: {
    maxWidth: '100%',
    borderRadius: 8,
    display: 'block',
  },
  projectInfo: {
    flex: 1,
    minWidth: 240,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#e8e8e8',
    textDecoration: 'none',
    transition: 'color 0.2s',
    display: 'inline-block',
    marginBottom: 6,
  },
  projectMeta: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  projectAuthors: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  bold: {
    color: '#ccc',
    fontWeight: 600,
  },
  projectLinks: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  projectLink: {
    fontSize: 13,
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  projectDesc: {
    fontSize: 14,
    color: '#777',
    margin: 0,
    lineHeight: 1.6,
  },
  press: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  footer: {
    textAlign: 'center',
    padding: '48px 0 24px 0',
    fontSize: 12,
    color: '#333',
  },
};

const hoverColor = '#fff';

function HoverLink({ href, style, children, ...props }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...style, color: hovered ? hoverColor : style.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </a>
  );
}

const projects = [
  {
    title: 'Grok Imagine',
    titleUrl: 'https://grok.com/imagine',
    media: { type: 'video', src: '/research/images/imagine.mp4' },
    authors: (
      <>xAI: <span style={styles.bold}>Zeeshan Patel</span> (Founding Team / Core Contributor)</>
    ),
    venue: '2025',
    links: [
      { label: 'product page', url: 'https://grok.com/imagine' },
      { label: 'release post', url: 'https://x.com/zeeshanp_/status/1974982581662970195?s=20' },
    ],
    desc: "Grok's state-of-the-art video generation model trained from scratch in 3 months. First hire for video generation at xAI.",
  },
  {
    title: 'Cosmos World Foundation Model Platform for Physical AI',
    titleUrl: 'https://arxiv.org/abs/2501.03575',
    media: { type: 'image', src: '/research/images/cosmos.jpg' },
    authors: (
      <>NVIDIA: <span style={styles.bold}>Zeeshan Patel</span> (Contributor)</>
    ),
    venue: 'arXiv, 2025',
    links: [
      { label: 'project page', url: 'https://research.nvidia.com/labs/dir/cosmos1/' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2501.03575' },
      { label: 'code', url: 'https://github.com/nvidia/cosmos' },
      { label: 'keynote', url: 'https://www.youtube.com/live/k82RwXqZHY8?t=3303s' },
    ],
    press: [
      { label: 'NYT', url: 'https://www.nytimes.com/2025/01/07/business/dealbook/nvidia-ai-robots.html' },
      { label: 'WSJ', url: 'https://www.wsj.com/tech/ai/nvidia-ceo-pitches-robotics-cars-as-growth-areas-to-consumer-electronics-audience-68905f2d' },
      { label: 'Fortune', url: 'https://fortune.com/2025/01/06/nvidia-new-ai-platform-robotics-chatgpt-moment-robots-self-driving-cars/' },
      { label: 'TechCrunch', url: 'https://techcrunch.com/2025/01/06/nvidia-releases-its-own-brand-of-world-models/' },
      { label: 'Forbes', url: 'https://www.forbes.com/sites/johnwerner/2025/01/19/understanding-the-physics-aware-systems-that-nvidia-is-working-on/' },
      { label: 'Wired', url: 'https://www.wired.com/story/nvidia-cosmos-ai-helps-robots-self-driving-cars/' },
      { label: 'BBC', url: 'https://www.bbc.com/news/articles/c0q0jl8pl9ko' },
    ],
    desc: 'World models for data-driven simulation of physical AI systems.',
  },
  {
    title: 'Training Video Foundation Models with NVIDIA NeMo',
    titleUrl: 'https://arxiv.org/abs/2503.12964',
    media: { type: 'image', src: '/research/images/nemo_vfm.png' },
    authors: (
      <>NVIDIA: <span style={styles.bold}>Zeeshan Patel</span> (Tech Lead)</>
    ),
    venue: '2025',
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2503.12964' },
      { label: 'NVIDIA blog', url: 'https://developer.nvidia.com/blog/accelerate-custom-video-foundation-model-pipelines-with-new-nvidia-nemo-framework-capabilities/' },
      { label: 'code', url: 'https://github.com/NVIDIA/NeMo/tree/main/nemo/collections/diffusion' },
    ],
    desc: 'Open-source video foundation model training framework, providing accelerated video dataset curation, multimodal dataloading, and parallelized video diffusion model training and inference.',
  },
  {
    title: 'Scaling Properties of Diffusion Models For Perceptual Tasks',
    titleUrl: 'https://scaling-diffusion-perception.github.io/',
    media: { type: 'image', src: '/research/images/scaling_diffusion.png' },
    authors: (
      <>
        <span style={styles.bold}>Zeeshan Patel*</span>,{' '}
        <HoverLink href="https://rravishankar1.github.io/" style={styles.projectLink}>Rahul Ravishankar*</HoverLink>,{' '}
        <HoverLink href="https://brjathu.github.io" style={styles.projectLink}>Jathushan Rajasegaran</HoverLink>,{' '}
        <HoverLink href="https://people.eecs.berkeley.edu/~malik/" style={styles.projectLink}>Jitendra Malik</HoverLink>
      </>
    ),
    venue: 'CVPR 2025',
    links: [
      { label: 'project page', url: 'https://scaling-diffusion-perception.github.io/' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2411.08034' },
      { label: 'code', url: 'https://github.com/scaling-diffusion-perception/scaling-diffusion-perception' },
    ],
    desc: 'Iterative computation with diffusion models offers a powerful paradigm for not only generation but also visual perception tasks. We unify tasks such as depth estimation, optical flow, and segmentation under image-to-image translation, and show how diffusion models benefit from scaling training and test-time compute for these perception tasks.',
  },
  {
    title: 'SWAG: Storytelling With Action Guidance',
    titleUrl: 'https://arxiv.org/abs/2402.03483',
    media: { type: 'image', src: '/research/images/swag_inference.png' },
    authors: (
      <>
        <span style={styles.bold}>Zeeshan Patel*</span>,{' '}
        <HoverLink href="https://jonnypei.github.io/" style={styles.projectLink}>Jonathan Pei*</HoverLink>,{' '}
        <HoverLink href="https://www.linkedin.com/in/karim-el-refai/" style={styles.projectLink}>Karim El-Refai*</HoverLink>,{' '}
        <HoverLink href="https://www.linkedin.com/in/tianleli/" style={styles.projectLink}>Tianle Li</HoverLink>
      </>
    ),
    venue: 'EMNLP, 2024',
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2402.03483' },
    ],
    desc: 'We introduce Storytelling With Action Guidance (SWAG), a novel approach to storytelling with LLMs. Our approach reduces story writing to a search problem through a two-model feedback loop.',
  },
  {
    title: 'Exploring Diffusion and Flow Matching Under Generator Matching',
    titleUrl: 'https://arxiv.org/abs/2412.11024',
    media: { type: 'image', src: '/research/images/exploringmatching.png' },
    authors: (
      <>
        <span style={styles.bold}>Zeeshan Patel*</span>,{' '}
        <HoverLink href="https://jamesdeloye.dev" style={styles.projectLink}>James DeLoye</HoverLink>,{' '}
        <HoverLink href="#" style={styles.projectLink}>Lance Mathias</HoverLink>
      </>
    ),
    venue: 'Preprint, 2024',
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2412.11024' },
    ],
    desc: 'We explore diffusion and flow matching models under the theoretical framework of generator matching, offering a fresh perspective on the relationships between these state-of-the-art generative modeling paradigms.',
  },
  {
    title: 'Test-Time Training for Image Superresolution',
    titleUrl: '/research/data/ttt_sr.pdf',
    media: { type: 'image', src: '/research/images/ttt_diagram_copy.png' },
    authors: (
      <>
        <span style={styles.bold}>Zeeshan Patel*</span>,{' '}
        <HoverLink href="https://yossigandelsman.github.io/" style={styles.projectLink}>Yossi Gandelsman</HoverLink>
      </>
    ),
    venue: 'Preprint, 2023',
    links: [
      { label: 'paper', url: '/research/data/ttt_sr.pdf' },
      { label: 'code', url: 'https://github.com/zpx01/image-sr' },
    ],
    desc: 'A self-supervised test-time training approach for fine-tuning image superresolution models to adapt to new test distributions on-the-fly.',
  },
];

function ProjectCard({ project }) {
  return (
    <div style={styles.projectCard}>
      <div style={styles.projectMedia}>
        {project.media.type === 'video' ? (
          <video
            src={project.media.src}
            style={styles.projectVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={project.media.src}
            alt={project.title}
            style={styles.projectImage}
          />
        )}
      </div>
      <div style={styles.projectInfo}>
        <HoverLink href={project.titleUrl} style={styles.projectTitle}>
          {project.title}
        </HoverLink>
        <div style={styles.projectAuthors}>{project.authors}</div>
        <div style={styles.projectMeta}>{project.venue}</div>
        <div style={styles.projectLinks}>
          {project.links.map((l, i) => (
            <HoverLink key={i} href={l.url} style={styles.projectLink}>
              {l.label}
            </HoverLink>
          ))}
        </div>
        {project.press && (
          <div style={styles.press}>
            press:{' '}
            {project.press.map((p, i) => (
              <React.Fragment key={i}>
                {i > 0 && ', '}
                <HoverLink href={p.url} style={{ ...styles.projectLink, fontSize: 12, color: '#555' }}>
                  {p.label}
                </HoverLink>
              </React.Fragment>
            ))}
          </div>
        )}
        <p style={styles.projectDesc}>{project.desc}</p>
      </div>
    </div>
  );
}

export default function ResearchDark() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <img
            src="/research/images/zeeshan.JPG"
            alt="Zeeshan Patel"
            style={styles.photo}
          />
          <div style={styles.headerText}>
            <h1 style={styles.name}>Zeeshan Patel</h1>
            <p style={styles.bio}>
              Member of Technical Staff at{' '}
              <HoverLink href="https://x.ai" style={{ ...styles.link, color: '#999' }}>xAI</HoverLink>
              {' '}focusing on multimodal, video generation, and world models for{' '}
              <HoverLink href="https://grok.com/imagine" style={{ ...styles.link, color: '#999' }}>Grok Imagine</HoverLink>.
              Previously at{' '}
              <HoverLink href="https://www.nvidia.com/en-us/research/" style={{ ...styles.link, color: '#999' }}>NVIDIA Research</HoverLink>
              {' '}and{' '}
              <HoverLink href="https://machinelearning.apple.com/" style={{ ...styles.link, color: '#999' }}>Apple AI/ML</HoverLink>.
              M.S. EECS from UC Berkeley ({' '}
              <HoverLink href="https://bair.berkeley.edu/" style={{ ...styles.link, color: '#999' }}>BAIR</HoverLink>
              ).
            </p>
            <div style={styles.links}>
              <HoverLink href="https://x.com/zeeshanp_" style={styles.link}>X</HoverLink>
              <HoverLink href="https://www.linkedin.com/in/zeeshan-patel" style={styles.link}>LinkedIn</HoverLink>
              <HoverLink href="https://github.com/zpx01/" style={styles.link}>GitHub</HoverLink>
              <HoverLink href="https://scholar.google.com/citations?user=FTbkVd8AAAAJ&hl=en" style={styles.link}>Scholar</HoverLink>
            </div>
          </div>
        </div>

        {/* Research */}
        <div style={styles.sectionTitle}>Research</div>
        <p style={styles.researchBlurb}>
          Broadly interested in deep learning, generative models, and physical AI — exploring how to scale foundation model pretraining with principled techniques that efficiently utilize data and compute.
        </p>

        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}

        <div style={styles.footer}>
          Template inspired by <HoverLink href="https://jonbarron.info/" style={{ color: '#444', textDecoration: 'none' }}>Jon Barron</HoverLink>.
        </div>
      </div>
    </div>
  );
}
