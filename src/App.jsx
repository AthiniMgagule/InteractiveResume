import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Award, Code, Download, Lightbulb, Star, Target, Rocket, BookOpen, Menu, X, ExternalLink, AlertCircle, Terminal, Zap, Database, Cpu } from 'lucide-react';

const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: { bg: 'rgba(0, 255, 200, 0.15)', color: '#00ffc8', border: 'rgba(0, 255, 200, 0.3)' },
    secondary: { bg: 'rgba(255, 20, 147, 0.15)', color: '#ff1493', border: 'rgba(255, 20, 147, 0.3)' },
    accent: { bg: 'rgba(255, 165, 0, 0.15)', color: '#ffa500', border: 'rgba(255, 165, 0, 0.3)' }
  };
  
  const v = variants[variant];
  return (
    <span style={{
      background: v.bg,
      color: v.color,
      padding: '0.35rem 0.8rem',
      borderRadius: 18,
      fontSize: '0.875rem',
      border: `1px solid ${v.border}`,
      display: 'inline-block'
    }}>{children}</span>
  );
};

// Particle System for Hero (Optimized)
const ParticleField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 40;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00ffc8' : '#ff1493';
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 200, ${1 - distance / 120})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3 }} />;
};

// Typewriter Effect
const TypewriterText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span>
      {displayText}
      <span style={{ opacity: showCursor ? 1 : 0, color: '#00ffc8' }}>|</span>
    </span>
  );
};

// 3D Tilting Project Card (Optimized with throttling)
const TiltCard = ({ children, style }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const throttleTimer = useRef(null);
  
  const handleMouseMove = (e) => {
    if (throttleTimer.current) return;
    
    throttleTimer.current = setTimeout(() => {
      throttleTimer.current = null;
    }, 16);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: -x * 10 });
  };
  
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };
  
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.02 : 1})`,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

// Interactive Skill Graph
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
        style={{ cursor: 'pointer', maxWidth: '100%' }}
      />
    </div>
  );
};

// Live URL Shortener Demo
const LiveURLShortener = () => {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [loading, setLoading] = useState(false);
  
  const generateShortCode = (url) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const handleShorten = () => {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      setShortened(`short.ly/${generateShortCode(url)}`);
      setLoading(false);
    }, 800);
  };
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.08), rgba(255, 20, 147, 0.08))',
      padding: '2rem',
      borderRadius: '16px',
      border: '1px solid rgba(0, 255, 200, 0.2)',
      marginTop: '1rem'
    }}>
      <h4 style={{ color: '#00ffc8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Zap size={20} />
        Try It Live
      </h4>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a long URL..."
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(0, 255, 200, 0.3)',
            borderRadius: '8px',
            color: '#e0e0e0',
            fontSize: '0.9rem'
          }}
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
            border: 'none',
            borderRadius: '8px',
            color: '#0f0f1e',
            fontWeight: 'bold',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>
      {shortened && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(0, 255, 200, 0.1)',
          border: '1px solid rgba(0, 255, 200, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <code style={{ color: '#00ffc8', flex: 1 }}>{shortened}</code>
          <button
            onClick={() => navigator.clipboard.writeText(shortened)}
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: '1px solid rgba(0, 255, 200, 0.3)',
              borderRadius: '6px',
              color: '#00ffc8',
              cursor: 'pointer'
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

// Terminal-style Code Block
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

// Magnetic Button (Optimized with throttling)
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

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionsRef = useRef([]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1iJ4zLlb196IW63VwQ9_FlB2zFcoOnIfH';
    link.download = 'Athini_Mgagule_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      sectionsRef.current.forEach((section, index) => {
        if (section && section.offsetTop <= scrollPosition) {
          setActiveChapter(index);
        }
      });
    };
    
    let scrollTimeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 16);
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  const chapters = [
    { id: 'intro', label: 'The Beginning', icon: Lightbulb },
    { id: 'journey', label: 'The Journey', icon: Star },
    { id: 'skills', label: 'Skills & Tools', icon: Target },
    { id: 'work', label: 'The Work', icon: Code },
    { id: 'future', label: 'Next Chapter', icon: Rocket }
  ];

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    {
      title: 'GentestAI',
      period: '10/2025 - Ongoing',
      badges: ['AI', 'Testing', 'StarCoder2', 'Mistral'],
      description: 'Building an AI-powered testing companion that generates test cases from code changes. Integrating StarCoder2 and Mistral models through Node.js and Python APIs with a React dashboard. Learning about AI integration and real-time code analysis.',
      metrics: ['Multi-Model AI', 'Active Development'],
      codeUrl: 'https://github.com/Picca1e-12/GentestAI',
      tech: ['React', 'Node.js', 'Python', 'StarCoder2', 'Mistral', 'REST API'],
      image: 'https://via.placeholder.com/800x400/1a1a2e/00ffc8?text=GentestAI+Dashboard'
    },
    {
      title: 'URL Shortener',
      period: '08/2025 - 09/2025',
      badges: ['Spring Boot', 'MySQL', 'React'],
      description: 'Built a URL shortening service using Spring Boot and MySQL with Base62 encoding. Focused on learning proper REST API design and database optimization techniques.',
      metrics: ['Full-Stack Project', 'REST API'],
      codeUrl: 'https://github.com/AthiniMgagule/URLShortener',
      tech: ['React', 'Spring Boot', 'MySQL', 'REST API'],
      image: 'https://via.placeholder.com/800x400/1a1a2e/ff1493?text=URL+Shortener'
    },
    {
      title: 'WriteWisp',
      period: '07/2025 - Ongoing',
      badges: ['React', 'Node.js', 'Llama'],
      description: 'Developing a writing assistant with AI-powered prompt suggestions using NVIDIA\'s Meta AI (Llama). Features include autosave and version control. Learning about AI model integration and state management.',
      metrics: ['AI Integration', 'In Progress'],
      codeUrl: 'https://github.com/AthiniMgagule/WriteWisp',
      tech: ['React', 'Node.js', 'MySQL', 'NVIDIA AI', 'Llama'],
      image: 'https://via.placeholder.com/800x400/1a1a2e/00ffc8?text=WriteWisp+Editor'
    },
    {
      title: 'ApplyConnect',
      period: 'Ongoing',
      badges: ['PWA', 'React', 'Node.js'],
      description: 'Creating an offline-first bursary aggregator for students with limited internet access. Implementing PWA features and exploring web scraping. Building with South African students in mind.',
      metrics: ['PWA Features', 'Social Impact'],
      tech: ['React', 'Node.js', 'IndexedDB', 'Puppeteer'],
      image: 'https://via.placeholder.com/800x400/1a1a2e/ffa500?text=ApplyConnect'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%)',
      color: '#e0e0e0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Desktop Navigation */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: window.innerWidth > 768 ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            onClick={() => scrollToSection(index)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease'
            }}>
            <span style={{
              fontSize: '0.75rem',
              color: activeChapter === index ? '#00ffc8' : '#555',
              opacity: activeChapter === index ? 1 : 0,
              transform: activeChapter === index ? 'translateX(0)' : 'translateX(10px)',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}>
              {chapter.label}
            </span>
            <div style={{
              width: activeChapter === index ? '12px' : '8px',
              height: activeChapter === index ? '12px' : '8px',
              borderRadius: '50%',
              background: activeChapter === index ? '#00ffc8' : '#333',
              border: `2px solid ${activeChapter === index ? '#00ffc8' : '#444'}`,
              transition: 'all 0.3s ease',
              boxShadow: activeChapter === index ? '0 0 20px rgba(0, 255, 200, 0.6)' : 'none'
            }} />
          </div>
        ))}
      </div>

      {/* Mobile Menu */}
      {window.innerWidth <= 768 && (
        <>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 2000,
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
              border: 'none',
              color: '#0f0f1e',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0, 255, 200, 0.4)'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {mobileMenuOpen && (
            <div style={{
              position: 'fixed',
              bottom: '5rem',
              right: '2rem',
              zIndex: 1999,
              background: 'rgba(15, 15, 30, 0.98)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(0, 255, 200, 0.3)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
            }}>
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => scrollToSection(index)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    marginBottom: '0.5rem',
                    background: activeChapter === index ? 'rgba(0, 255, 200, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: activeChapter === index ? '#00ffc8' : '#e0e0e0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: activeChapter === index ? '600' : '400',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {chapter.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: `rgba(15, 15, 30, ${Math.min(scrollY / 200, 0.95)})`,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 255, 200, 0.15)',
        padding: '1rem 2rem',
        zIndex: 999,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #00ffc8, #ff1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Athini Mgagule
            </h1>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#888' }}>Software Developer</p>
          </div>
          <MagneticButton
            href="https://drive.google.com/file/d/1iJ4zLlb196IW63VwQ9_FlB2zFcoOnIfH/view?usp=drive_link"
            onClick={(e) => {
              e.preventDefault();
              handleDownloadCV();
            }}
            style={{
              background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
              border: 'none',
              borderRadius: '8px',
              color: '#0f0f1e',
              cursor: 'pointer',
              padding: '0.5rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            <Download size={16} />
            Download CV
          </MagneticButton>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 3rem', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section with Particles */}
        <section ref={el => sectionsRef.current[0] = el} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', marginBottom: '6rem' }}>
          <ParticleField />
          
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '200px',
              height: '200px',
              margin: '0 auto 2rem',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(0, 255, 200, 0.4)',
              animation: 'float 3s ease-in-out infinite',
              border: '4px solid #00ffc8',
              background: '#1a1a2e'
            }}>
              <div style={{ color: '#00ffc8', fontSize: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                AM
              </div>
            </div>
            
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2'
            }}>
              <TypewriterText text="Hi, I'm Athini" speed={80} />
            </h2>
            
            <div style={{ 
              color: '#e0e0e0', 
              fontSize: '1.25rem', 
              lineHeight: '1.8',
              textAlign: 'left',
              background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.08), rgba(255, 20, 147, 0.08))',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 200, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                I'm a developer who <strong style={{ color: '#00ffc8' }}>loves building things</strong>. From AI-powered testing tools to URL shorteners, I enjoy tackling real-world problems through code.
              </p>
              <p style={{ margin: 0 }}>
                With a <strong style={{ color: '#ff1493' }}>BSc in Computer Science and Mathematics</strong> from Wits, I combine theoretical foundations with practical coding. I'm eager to <strong style={{ color: '#00ffc8' }}>learn, grow, and contribute to meaningful projects.</strong>
              </p>
            </div>

            {/* Quick Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {[
                { icon: Code, label: 'Projects Built', value: '4+' },
                { icon: Database, label: 'Technologies', value: '10+' },
                { icon: Zap, label: 'GitHub Repos', value: '15+' },
                { icon: Cpu, label: 'Learning & Growing', value: 'Daily' }
              ].map((stat, i) => (
                <TiltCard key={i} style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.1), rgba(255, 20, 147, 0.1))',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 255, 200, 0.2)',
                  textAlign: 'center'
                }}>
                  <stat.icon size={32} color="#00ffc8" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ffc8', marginBottom: '0.25rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#888' }}>{stat.label}</div>
                </TiltCard>
              ))}
            </div>

            {/* Terminal Code Block */}
            <TerminalBlock code={`git clone https://github.com/AthiniMgagule\ncd portfolio\nnpm install && npm start\n// Building the future, one commit at a time...`} />
          </div>
        </section>

        {/* Journey Section with Vertical Timeline */}
        <section ref={el => sectionsRef.current[1] = el} style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            The Journey
          </h2>

          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            {/* Center vertical line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, #00ffc8, #ff1493, #ffa500)',
              opacity: 0.4,
              zIndex: 0
            }} />

            {[
              {
                title: 'Software Development & Data Analytics',
                period: '03/2025 - Present',
                org: 'Faith Mangope Technology and Leadership Institute',
                details: 'Program focused on industry level certification. Delved into the heart of Microsoft Azure, Power BI, Java, and currently focused on AI fundamentals.',
                color: '#00ffc8',
                tags: ['Azure', 'Java', 'Power BI', 'AI'],
                side: 'right'
              },
              {
                title: 'Invigilator',
                period: '02/2024 - 11/2024',
                org: 'University of Witwatersrand',
                details: 'Handed out test papers to students. Helped ensure academic integrity during test and exam sessions. Helped students with exam related queries.',
                color: '#ffa500',
                tags: ['Academic Integrity', 'Student Support'],
                side: 'left'
              },
              {
                title: 'BSc Computer Science and Mathematics',
                period: '02/2022 - 11/2024',
                org: 'University of Witwatersrand',
                details: 'Rigorous dual-track program combining theoretical CS with advanced mathematics. Certificate of Merit in Positive Linear Systems III.',
                color: '#ff1493',
                tags: ['Algorithms', 'Databases', 'Real Analysis'],
                side: 'right'
              },
              {
                title: 'National Senior Certificate',
                period: '01/2017 - 12/2021',
                org: 'Leap Science and Maths School',
                details: 'STEM-focused curriculum building problem-solving foundations in mathematics and sciences.',
                color: '#ffa500',
                tags: ['Mathematics', 'Sciences'],
                side: 'left'
              }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                position: 'relative', 
                marginBottom: '4rem',
                display: 'flex',
                justifyContent: item.side === 'left' ? 'flex-start' : 'flex-end',
                alignItems: 'center'
              }} className="timeline-item">
                {/* Timeline dot in center */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: item.color,
                  border: '4px solid #0f0f1e',
                  boxShadow: `0 0 25px ${item.color}`,
                  zIndex: 2,
                  animation: 'pulse 2s infinite'
                }} />

                {/* Connecting line from dot to card */}
                <div style={{
                  position: 'absolute',
                  left: item.side === 'left' ? 'calc(50% - 10px)' : '50%',
                  width: '50px',
                  height: '2px',
                  background: `linear-gradient(${item.side === 'left' ? '270deg' : '90deg'}, ${item.color}, transparent)`,
                  transform: `translateX(${item.side === 'left' ? '-100%' : '10px'})`,
                  zIndex: 1
                }} className="timeline-connector" />

                {/* Content card */}
                <TiltCard style={{
                  background: `linear-gradient(135deg, ${item.color}15, rgba(15, 15, 30, 0.5))`,
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${item.color}40`,
                  width: 'calc(50% - 80px)',
                  position: 'relative',
                  zIndex: 1,
                  marginLeft: item.side === 'left' ? '0' : 'auto',
                  marginRight: item.side === 'right' ? '0' : 'auto'
                }} className="timeline-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: item.color }}>{item.title}</h3>
                    <span style={{ color: '#888', fontSize: '0.875rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                      {item.period}
                    </span>
                  </div>
                  <p style={{ color: '#e0e0e0', margin: '0.5rem 0', fontWeight: '600' }}>{item.org}</p>
                  <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6', margin: '1rem 0' }}>{item.details}</p>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {item.tags.map((tag, i) => (
                      <Badge key={i} variant="primary">{tag}</Badge>
                    ))}
                  </div>
                </TiltCard>
              </div>
            ))}

            {/* Mobile-friendly stacked version */}
            <style>
              {`
                @media (max-width: 768px) {
                  .timeline-item {
                    justify-content: center !important;
                  }
                  .timeline-card {
                    width: 90% !important;
                    margin: 0 auto !important;
                  }
                  .timeline-connector {
                    display: none !important;
                  }
                }
              `}
            </style>
          </div>
        </section>

        {/* Skills Section with Interactive Graph */}
        <section ref={el => sectionsRef.current[2] = el} style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Skills & Tech Stack
          </h2>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ 
              color: '#e0e0e0', 
              fontSize: '1.125rem', 
              lineHeight: '2',
              background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.08), rgba(255, 20, 147, 0.08))',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 200, 0.2)',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0 }}>
                I'm constantly exploring new technologies and building projects to <strong style={{ color: '#00ffc8' }}>strengthen my skills</strong>. Hover over the skills below to see how they connect.
              </p>
            </div>

            <SkillGraph />

            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'Frontend', skills: ['React', 'JavaScript ES6+', 'HTML/CSS', 'Responsive Design'], icon: Code },
                { title: 'Backend', skills: ['Node.js', 'Spring Boot', 'Python', 'REST APIs', 'Java'], icon: Database },
                { title: 'Database', skills: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL Optimization', 'IndexedDB'], icon: Database },
                { title: 'Tools & AI', skills: ['Git', 'Azure', 'Power BI', 'NVIDIA AI', 'Netlify/Render'], icon: Cpu }
              ].map((category, idx) => (
                <TiltCard key={idx} style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.06), rgba(255, 20, 147, 0.06))',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 255, 200, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <category.icon size={20} color="#00ffc8" />
                    <h3 style={{ margin: 0, color: '#00ffc8', fontSize: '1.1rem' }}>{category.title}</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {category.skills.map((skill, i) => (
                      <li key={i} style={{ 
                        color: '#aaa', 
                        marginBottom: '0.5rem',
                        paddingLeft: '1rem',
                        position: 'relative',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{ 
                          position: 'absolute', 
                          left: 0, 
                          color: '#00ffc8' 
                        }}>▸</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={el => sectionsRef.current[3] = el} style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Featured Work
          </h2>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {projects.map((project, idx) => (
                <TiltCard key={idx} style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.04), rgba(255, 20, 147, 0.04))',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid rgba(0, 255, 200, 0.15)',
                  overflow: 'hidden'
                }}>
                  {/* Project Image */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(0, 255, 200, 0.2)',
                    position: 'relative'
                  }}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#00ffc8' }}>{project.title}</h3>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        <Badge variant="secondary">{project.period}</Badge>
                        {project.badges.map((badge, i) => (
                          <Badge key={i} variant="primary">{badge}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    {project.codeUrl && (
                      <MagneticButton
                        href={project.codeUrl}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 255, 200, 0.3)',
                          background: 'transparent',
                          color: '#00ffc8',
                          fontWeight: '600',
                          fontSize: '0.875rem'
                        }}
                      >
                        <Code size={16} />
                        View Code
                      </MagneticButton>
                    )}
                  </div>
                  
                  <p style={{ color: '#e0e0e0', lineHeight: '1.7', marginBottom: '1rem' }}>
                    {project.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {project.metrics.map((metric, i) => (
                      <span key={i} style={{
                        background: 'rgba(255, 165, 0, 0.12)',
                        color: '#ffa500',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        border: '1px solid rgba(255, 165, 0, 0.2)',
                        fontWeight: '600'
                      }}>
                        {metric}
                      </span>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.tech.map((t, i) => (
                      <span key={i} style={{
                        background: 'rgba(0, 255, 200, 0.12)',
                        color: '#00ffc8',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        border: '1px solid rgba(0, 255, 200, 0.2)'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  {project.title === 'URL Shortener' && <LiveURLShortener />}
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={el => sectionsRef.current[4] = el} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Let's Build Something
            </h2>
            
            <div style={{ 
              color: '#e0e0e0', 
              fontSize: '1.25rem', 
              lineHeight: '2',
              background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.08), rgba(255, 20, 147, 0.08))',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 200, 0.2)',
              marginBottom: '3rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                I'm actively seeking opportunities where I can apply what I've learned, collaborate with experienced teams, and continue growing as a developer.
              </p>
              <p style={{ margin: 0 }}>
                Whether it's contributing to backend systems, building user interfaces, or working with data—<strong style={{ color: '#00ffc8' }}>I'm ready to learn and add value.</strong>
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <MagneticButton
                href="mailto:athi200308@gmail.com"
                style={{
                  background: 'linear-gradient(135deg, #00ffc8, #ff1493)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#0f0f1e',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 10px 30px rgba(0, 255, 200, 0.3)'
                }}
              >
                <Mail size={20} />
                Get in Touch
              </MagneticButton>

              <MagneticButton
                onClick={handleDownloadCV}
                style={{
                  background: 'transparent',
                  border: '2px solid #00ffc8',
                  borderRadius: '12px',
                  color: '#00ffc8',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <Download size={20} />
                Download Resume
              </MagneticButton>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icon: Linkedin, url: 'https://linkedin.com/in/athini-mgagule-8b8b362b2', color: '#00ffc8' },
                { icon: Github, url: 'https://github.com/AthiniMgagule', color: '#ff1493' },
                { icon: Globe, url: 'https://athinimgagule.netlify.app', color: '#ffa500' }
              ].map((social, i) => (
                <MagneticButton
                  key={i}
                  href={social.url}
                  style={{
                    width: '48px',
                    height: '48px',
                    background: social.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <social.icon size={20} color="#0f0f1e" />
                </MagneticButton>
              ))}
            </div>

            <p style={{ 
              marginTop: '3rem', 
              color: '#666', 
              fontSize: '0.875rem',
              fontStyle: 'italic'
            }}>
              "Simplicity is the ultimate sophistication." — Leonardo da Vinci
            </p>
          </div>
        </section>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 25px currentColor; }
            50% { box-shadow: 0 0 40px currentColor; }
          }

          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            background: #0f0f1e;
          }
          
          html {
            scroll-behavior: smooth;
          }

          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: #1a1a2e;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #00ffc8, #ff1493);
            border-radius: 5px;
          }
          
          .timeline-item, .timeline-card {
            will-change: transform;
          }
          
          canvas {
            will-change: contents;
          }
        `}
      </style>
    </div>
  );
};

export default Portfolio;