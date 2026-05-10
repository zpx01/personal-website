import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #1a1a1a',
  },
  inner: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: 600,
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  },
  links: {
    display: 'flex',
    gap: 28,
  },
  link: {
    fontSize: 14,
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  activeLink: {
    color: '#e0e0e0',
  },
};

export default function Nav() {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <NavLink to="/" style={styles.name}>Zeeshan Patel</NavLink>
        <div style={styles.links}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}
          >
            Projects
          </NavLink>
          <NavLink
            to="/blog"
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}
          >
            Blog
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
