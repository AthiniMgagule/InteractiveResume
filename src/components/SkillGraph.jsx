import { useEffect, useState, useRef } from 'react';

const SkillGraph = () => {
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skills = [
    { name: 'React', x: 150, y: 150, color: '#00ffc8', connects: ['Node.js', 'JavaScript', 'HTML/CSS'] },
    { name: 'Node.js', x: 350, y: 150, color: '#ff1493', connects: ['React', 'MySQL', 'REST API', 'Python'] },
    { name: 'Java', x: 250, y: 50, color: '#ffa500', connects: ['Spring Boot', 'MySQL'] },
    { name: 'Spring Boot', x: 450, y: 50, color: '#00ffc8', connects: ['Java', 'REST API'] },
    { name: 'MySQL', x: 350, y: 250, color: '#ff1493', connects: ['Node.js', 'Java', 'SQL', 'Python'] },
    { name: 'JavaScript', x: 50, y: 250, color: '#ffa500', connects: ['React', 'HTML/CSS'] },
    { name: 'HTML/CSS', x: 50, y: 350, color: '#00ffc8', connects: ['JavaScript', 'React'] },
    { name: 'REST API', x: 450, y: 250, color: '#ff1493', connects: ['Node.js', 'Spring Boot', 'Python'] },
    { name: 'SQL', x: 250, y: 350, color: '#ffa500', connects: ['MySQL'] },
    { name: 'Python', x: 150, y: 50, color: '#ff1493', connects: ['Node.js', 'REST API', 'MySQL'] }
  ];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 400;
    
    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      skills.forEach(skill => {
        skill.connects.forEach(connectionName => {
          const target = skills.find(s => s.name === connectionName);
          if (target) {
            ctx.beginPath();
            ctx.moveTo(skill.x, skill.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = hoveredSkill === skill.name || hoveredSkill === connectionName
              ? 'rgba(0, 255, 200, 0.6)'
              : 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = hoveredSkill === skill.name || hoveredSkill === connectionName ? 2 : 1;
            ctx.stroke();
          }
        });
      });
      
      skills.forEach(skill => {
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, hoveredSkill === skill.name ? 30 : 20, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.globalAlpha = hoveredSkill === skill.name ? 1 : 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        ctx.fillStyle = '#0f0f1e';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, skill.x, skill.y);
      });
    };
    
    drawGraph();
  }, [hoveredSkill]);
  
  const handleCanvasHover = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let foundSkill = null;
    skills.forEach(skill => {
      const distance = Math.sqrt((x - skill.x) ** 2 + (y - skill.y) ** 2);
      if (distance < 20) {
        foundSkill = skill.name;
      }
    });
    
    setHoveredSkill(foundSkill);
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleCanvasHover}
        onMouseLeave={() => setHoveredSkill(null)}
        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
        className="skill-canvas"
      />
    </div>
  );
};

export default SkillGraph;