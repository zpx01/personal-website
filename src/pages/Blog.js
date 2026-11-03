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
  post: {
    display: 'flex',
    gap: 24,
    padding: '28px 0',
    borderBottom: '1px solid #141414',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    textDecoration: 'none',
  },
  postMedia: {
    width: 200,
    flexShrink: 0,
  },
  postImage: {
    width: '100%',
    borderRadius: 8,
    border: '1px solid #1a1a1a',
    display: 'block',
  },
  postInfo: {
    flex: 1,
    minWidth: 240,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#e8e8e8',
    transition: 'color 0.2s',
    marginBottom: 6,
  },
  postMeta: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  postDesc: {
    fontSize: 14,
    color: '#777',
    margin: 0,
    lineHeight: 1.6,
  },
};

// Each post is a standalone page under public/blog/<slug>/ with its own assets.
const posts = [
  {
    title: 'QLink - Distributed Communication for QwenGPUs',
    url: '/blog/qlink/',
    image: '/blog/qlink/media/hero.webp',
    date: 'November 2026',
    authors: 'Zeeshan Patel & Claude Opus 5.5',
    readTime: '20 min read',
    desc: 'QwenGPU compiles a small GPU into the weights of Qwen3.5-2B, so that the model runs CUDA kernels by decoding tokens. I asked Claude to connect several of these models with the protocols real GPUs use and to train neural networks on them.',
  },
];

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={post.url}
      style={styles.post}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.postMedia}>
        <img src={post.image} alt="" loading="lazy" style={styles.postImage} />
      </div>
      <div style={styles.postInfo}>
        <div style={{ ...styles.postTitle, color: hovered ? '#fff' : styles.postTitle.color }}>{post.title}</div>
        <div style={styles.postMeta}>{post.date} · {post.authors} · {post.readTime}</div>
        <p style={styles.postDesc}>{post.desc}</p>
      </div>
    </a>
  );
}

export default function Blog() {
  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Blog</h1>
      <p style={styles.pageSubtitle}>Thoughts on AI, research, and engineering.</p>
      {posts.map((post) => (
        <PostCard key={post.url} post={post} />
      ))}
    </div>
  );
}
