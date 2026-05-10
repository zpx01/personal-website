import React, { useState } from 'react';

const styles = {
  page: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '120px 24px 80px',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    letterSpacing: '-0.02em',
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#666',
    margin: '0 0 40px 0',
  },
  projectCard: {
    display: 'flex',
    gap: 24,
    padding: '28px 0',
    borderBottom: '1px solid #141414',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  projectMedia: {
    width: 200,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectImage: {
    width: '100%',
    borderRadius: 8,
    display: 'block',
    objectFit: 'cover',
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
    color: '#555',
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
    marginTop: 6,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#555',
    margin: '48px 0 16px 0',
    paddingBottom: 8,
    borderBottom: '1px solid #1a1a1a',
  },
};

function HoverLink({ href, style, children, ...props }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...style, color: hovered ? '#fff' : style.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </a>
  );
}

const foundationModels = [
  {
    title: 'Grok Imagine',
    titleUrl: 'https://grok.com/imagine',
    media: { type: 'video', src: '/research/images/imagine.mp4' },
    authors: (
      <><span style={styles.bold}>xAI: Zeeshan Patel</span> (Founding Team / Core Contributor)</>
    ),
    venue: '2025',
    links: [
      { label: 'product page', url: 'https://grok.com/imagine' },
      { label: 'release post', url: 'https://x.com/zeeshanp_/status/1974982581662970195?s=20' },
      { label: 'blog', url: 'https://x.ai/news/grok-imagine-api' },
    ],
    desc: (
      <>
        <p style={styles.projectDesc}>Grok's state-of-the-art video generation model trained from scratch in 3 months, claiming the spot for <HoverLink href="https://x.com/ArtificialAnlys/status/2016749756081721561?s=20" style={styles.projectLink}>#1 video generation model of 2025</HoverLink>.</p>
        <p style={{ ...styles.projectDesc, marginTop: 8 }}>Co-led pretraining efforts including data curation, infrastructure, model design, and scaling recipes. Co-led reference-to-video model data and mid/post-training <HoverLink href="https://x.com/Designarena/status/2036533116605702176?s=20" style={styles.projectLink}>(#1 on Design Arena)</HoverLink>.</p>
      </>
    )
  },
  {
    title: 'Cosmos World Foundation Model Platform for Physical AI',
    titleUrl: 'https://arxiv.org/abs/2501.03575',
    media: { type: 'image', src: '/research/images/cosmos.jpg' },
    authors: (
      <><span style={styles.bold}>NVIDIA: Zeeshan Patel</span> (Contributor)</>
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
];

const publications = [
  {
    title: 'Scaling Properties of Diffusion Models For Perceptual Tasks',
    titleUrl: 'https://scaling-diffusion-perception.github.io/',
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
    desc: 'We unify tasks such as depth estimation, optical flow, and segmentation under image-to-image translation, and show how diffusion models benefit from scaling training and test-time compute. One of the first papers to show that a generative diffusion model can be scaled to perform substantially different perception tasks.',
  },
  {
    title: 'Training Video Foundation Models with NVIDIA NeMo',
    titleUrl: 'https://arxiv.org/abs/2503.12964',
    authors: (
      <><span style={styles.bold}>NVIDIA: Zeeshan Patel</span> (Tech Lead)</>
    ),
    venue: '2025',
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2503.12964' },
      { label: 'NVIDIA blog', url: 'https://developer.nvidia.com/blog/accelerate-custom-video-foundation-model-pipelines-with-new-nvidia-nemo-framework-capabilities/' },
      { label: 'code', url: 'https://github.com/NVIDIA-NeMo/DFM' },
    ],
    desc: 'Open-source video foundation model training framework, providing accelerated video dataset curation, multimodal dataloading, and parallelized video diffusion model training and inference. Most performant open-source video diffusion model training stack.',
  },
  {
    title: 'SWAG: Storytelling With Action Guidance',
    titleUrl: 'https://arxiv.org/abs/2402.03483',
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
    desc: 'We introduce SWAG, a novel approach to storytelling with LLMs. Our approach reduces story writing to a search problem through a two-model feedback loop. We show that scaling inference compute with open-source models improves story generation quality substantially over closed-source models.',
  },
  {
    title: 'Exploring Diffusion and Flow Matching Under Generator Matching',
    titleUrl: 'https://arxiv.org/abs/2412.11024',
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
    desc: 'We explore diffusion and flow matching models under the theoretical framework of generator matching, offering a fresh perspective on the relationships between these generative modeling paradigms.',
  },
  {
    title: 'Test-Time Training for Image Superresolution',
    titleUrl: '/research/data/ttt_sr.pdf',
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

function ProjectCard({ project, onImageClick }) {
  return (
    <div style={styles.projectCard}>
      {project.media && (
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
              style={{ ...styles.projectImage, cursor: 'zoom-in' }}
              onClick={() => onImageClick(project.media.src, project.title)}
            />
          )}
        </div>
      )}
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
        <div style={styles.projectDesc}>{project.desc}</div>
      </div>
    </div>
  );
}

const lightboxStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    cursor: 'zoom-out',
    padding: 40,
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90vh',
    borderRadius: 8,
    objectFit: 'contain',
  },
};

export default function Projects() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (src, alt) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  return (
    <div style={styles.page}>
      {lightbox && (
        <div style={lightboxStyles.overlay} onClick={closeLightbox}>
          <img src={lightbox.src} alt={lightbox.alt} style={lightboxStyles.image} />
        </div>
      )}

      <h1 style={styles.pageTitle}>Projects</h1>
      <p style={styles.pageSubtitle}>Research and products I've worked on in industry and academia.</p>

      <h2 style={styles.sectionHeader}>Foundation Models</h2>
      {foundationModels.map((project, i) => (
        <ProjectCard key={i} project={project} onImageClick={openLightbox} />
      ))}

      <h2 style={styles.sectionHeader}>Publications</h2>
      {publications.map((project, i) => (
        <ProjectCard key={i} project={project} onImageClick={openLightbox} />
      ))}
    </div>
  );
}
