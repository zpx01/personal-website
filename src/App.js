import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Starfield from './components/Starfield';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';

const layoutStyle = {
  minHeight: '100vh',
  backgroundColor: '#0a0a0a',
  color: '#e0e0e0',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  lineHeight: 1.7,
  position: 'relative',
};

function App() {
  return (
    <Router>
      <div style={layoutStyle}>
        <Starfield />
        <Nav />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
