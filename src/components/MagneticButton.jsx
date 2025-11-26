import { useState, useRef } from 'react';

const MagneticButton = ({ children, href, onClick, style }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const throttleTimer = useRef(null);
  
  const handleMouseMove = (e) => {
    if (throttleTimer.current) return;
    
    throttleTimer.current = setTimeout(() => {
      throttleTimer.current = null;
    }, 16);
    
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setPosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  const Element = href ? 'a' : 'button';
  
  return (
    <Element
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
        textDecoration: 'none'
      }}
    >
      {children}
    </Element>
  );
};

export default MagneticButton;