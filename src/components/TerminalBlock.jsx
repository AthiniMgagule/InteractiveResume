import { useState, useEffect } from 'react';

const TerminalBlock = ({ code }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const lines = code.split('\n');
  
  useEffect(() => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
      }, index * 100);
    });
  }, []);
  
  return (
    <div style={{
      background: '#1a1a2e',
      borderRadius: '8px',
      padding: '1rem',
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '0.85rem',
      overflow: 'auto',
      border: '1px solid rgba(0, 255, 200, 0.2)'
    }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
      </div>
      {displayedLines.map((line, i) => (
        <div key={i} style={{ color: '#00ffc8', marginBottom: '0.25rem' }}>
          <span style={{ color: '#888' }}>$ </span>{line}
        </div>
      ))}
    </div>
  );
};

export default TerminalBlock;