import React from 'react';

const styles = {
  page: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '120px 24px 80px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
    marginBottom: 48,
    flexWrap: 'wrap',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #1a1a1a',
    flexShrink: 0,
  },
  headerText: {
    flex: 1,
    minWidth: 240,
  },
  name: {
    fontSize: 36,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 12px 0',
    letterSpacing: '-0.03em',
  },
  tagline: {
    fontSize: 16,
    color: '#888',
    margin: '0 0 20px 0',
    lineHeight: 1.6,
  },
  socialLinks: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
  socialLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.2s',
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#555',
    margin: '0 0 16px 0',
    paddingBottom: 8,
    borderBottom: '1px solid #1a1a1a',
  },
  paragraph: {
    fontSize: 15,
    color: '#999',
    lineHeight: 1.75,
    margin: '0 0 16px 0',
  },
  inlineLink: {
    color: '#ccc',
    textDecoration: 'none',
    borderBottom: '1px solid #333',
    transition: 'color 0.2s, border-color 0.2s',
  },
};

function HoverLink({ href, style, children }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...style, color: hovered ? '#fff' : style.color, borderColor: hovered ? '#666' : (style.borderColor || '#333') }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

export default function About() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <img
          src="/research/images/zeeshan.JPG"
          alt="Zeeshan Patel"
          style={styles.photo}
        />
        <div style={styles.headerText}>
          <h1 style={styles.name}>Zeeshan Patel</h1>
          <div style={styles.socialLinks}>
            <HoverLink href="https://x.com/zeeshanp_" style={styles.socialLink}>X</HoverLink>
            <HoverLink href="https://www.linkedin.com/in/zeeshan-patel" style={styles.socialLink}>LinkedIn</HoverLink>
            <HoverLink href="https://github.com/zpx01/" style={styles.socialLink}>GitHub</HoverLink>
            <HoverLink href="https://scholar.google.com/citations?user=FTbkVd8AAAAJ&hl=en" style={styles.socialLink}>Scholar</HoverLink>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>About</h2>
        <p style={styles.paragraph}>
          I am broadly interested in deep learning, generative models, and physical AI. Currently, I'm focusing on building AI systems that reason about the physical world and expand the physical economy.
        </p>
        <p style={styles.paragraph}>
          Previously, I was a Member of Technical Staff at <HoverLink href="https://x.ai" style={styles.inlineLink}>xAI</HoverLink> focusing
          on multimodal, video generation, and world models. I was the first hire for video generation at xAI and co-led pretraining (data, infra, scaling) efforts to build <HoverLink href="https://grok.com/imagine" style={styles.inlineLink}>Grok Imagine</HoverLink>, the <HoverLink href="https://x.ai/news/grok-imagine-api" style={styles.inlineLink}>best video generation model of 2025</HoverLink>.
        </p>
        <p style={styles.paragraph}>
          Prior to xAI, I worked on <HoverLink href="https://www.nvidia.com/en-us/ai/cosmos/" style={styles.inlineLink}>generative world models</HoverLink> at <HoverLink href="https://www.nvidia.com/en-us/research/" style={styles.inlineLink}>NVIDIA Research</HoverLink> and
          foundation models at <HoverLink href="https://machinelearning.apple.com/" style={styles.inlineLink}>Apple AI/ML</HoverLink>.
        </p>
        <p style={styles.paragraph}>
          I graduated with an M.S. in EECS from UC Berkeley advised
          by <HoverLink href="https://people.eecs.berkeley.edu/~efros/" style={styles.inlineLink}>Professor Alexei Efros</HoverLink> and <HoverLink href="https://people.eecs.berkeley.edu/~malik/" style={styles.inlineLink}>Professor Jitendra Malik</HoverLink> at <HoverLink href="https://bair.berkeley.edu/" style={styles.inlineLink}>Berkeley Artificial Intelligence Research (BAIR)</HoverLink>.
          I also graduated with honors from UC Berkeley with a Bachelor's in CS & Statistics.
        </p>
      </div>
    </div>
  );
}
