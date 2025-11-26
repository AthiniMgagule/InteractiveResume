import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Award, Code, Download, Lightbulb, Star, Target, Rocket, BookOpen, Menu, X, ExternalLink, AlertCircle, Terminal, Zap, Database, Cpu } from 'lucide-react';

import Badge from './components/Badge';
import MagneticButton from './components/MagneticButton';
import ParticleField from './components/ParticleField';
import TypewriterText from './components/TypewriterText';
import TerminalBlock from './components/TerminalBlock';
import TiltCard from './components/TiltCard';
import SkillGraph from './components/SkillGraph';

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
      image: '/images/GenTestAIDesktop.png'
    },
    {
      title: 'URL Shortener',
      period: '08/2025 - 09/2025',
      badges: ['Spring Boot', 'MySQL', 'React'],
      description: 'Built a URL shortening service using Spring Boot and MySQL with Base62 encoding. Focused on learning proper REST API design and database optimization techniques.',
      metrics: ['Full-Stack Project', 'REST API'],
      codeUrl: 'https://github.com/AthiniMgagule/URLShortener',
      tech: ['React', 'Spring Boot', 'MySQL', 'REST API'],
      image: '/images/UrlShortenerDesktop.png'
    },
    {
      title: 'WriteWisp',
      period: '07/2025 - Ongoing',
      badges: ['React', 'Node.js', 'Llama'],
      description: 'Developing a writing assistant with AI-powered prompt suggestions using NVIDIA\'s Meta AI (Llama). Features include autosave and version control. Learning about AI model integration and state management.',
      metrics: ['AI Integration', 'In Progress'],
      codeUrl: 'https://github.com/AthiniMgagule/WriteWisp',
      tech: ['React', 'Node.js', 'MySQL', 'NVIDIA AI', 'Llama'],
      image: '/images/WriteWispDesktop.png'
    },
    {
      title: 'ApplyConnect',
      period: 'Ongoing',
      badges: ['PWA', 'React', 'Node.js'],
      description: 'Creating an offline-first bursary aggregator for students with limited internet access. Implementing PWA features and exploring web scraping. Building with South African students in mind.',
      metrics: ['PWA Features', 'Social Impact'],
      tech: ['React', 'Node.js', 'IndexedDB', 'Puppeteer'],
      image: '/images/ApplyConnectDesktop.png'
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
            }}
            className="hero-image">
              <div style={{ color: '#00ffc8', fontSize: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <img src="/images/AthiniMgagulePP.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Athini Mgagule" />
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
            }}
            className="hero-title">
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
            }}
            className="hero-text">
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
                }}
                className="stat-card">
                  <stat.icon size={32} color="#00ffc8" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ffc8', marginBottom: '0.25rem' }}
                  className="stat-value">
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
          }}
          className="section-title">
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
                
                @media (max-width: 480px) {
                  .timeline-card {
                    width: 95% !important;
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
          }}
          className="section-title">
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
          }}
          className="section-title">
            Featured Work
          </h2>

          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {projects.map((project, idx) => (
                <TiltCard 
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.08), rgba(255, 20, 147, 0.08))',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 255, 200, 0.2)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  className="project-card"
                >
                  {/* Project Image Container */}
                  <div style={{
                    width: '100%',
                    height: '220px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1a1a2e, #0f0f1e)',
                    border: '1px solid rgba(0, 255, 200, 0.1)'
                  }}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease'
                      }}
                      className="project-image"
                    />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(15, 15, 30, 0.8) 100%)',
                      pointerEvents: 'none'
                    }} />
                    
                    {/* Floating Period Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(15, 15, 30, 0.9)',
                      backdropFilter: 'blur(10px)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 20, 147, 0.3)',
                      color: '#ff1493',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {project.period}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    flex: 1,
                    background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.03), rgba(255, 20, 147, 0.03))'
                  }}>
                    {/* Title and Code Button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: '#00ffc8',
                        margin: 0,
                        lineHeight: '1.3'
                      }}
                      className="project-title">
                        {project.title}
                      </h3>
                      
                      {project.codeUrl && (
                        <MagneticButton
                          href={project.codeUrl}
                          style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 255, 200, 0.3)',
                            background: 'rgba(0, 255, 200, 0.05)',
                            color: '#00ffc8',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Code size={14} />
                          View
                        </MagneticButton>
                      )}
                    </div>

                    {/* Tech Badges */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.badges.map((badge, i) => (
                        <Badge key={i} variant="primary">{badge}</Badge>
                      ))}
                    </div>

                    {/* Description */}
                    <p style={{ 
                      color: '#aaa', 
                      fontSize: '0.9rem', 
                      lineHeight: '1.7',
                      margin: 0,
                      flex: 1
                    }}>
                      {project.description}
                    </p>

                    {/* Metrics Row */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      flexWrap: 'wrap',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid rgba(0, 255, 200, 0.1)'
                    }}>
                      {project.metrics.map((metric, i) => (
                        <span 
                          key={i}
                          style={{
                            background: 'rgba(255, 165, 0, 0.15)',
                            color: '#ffa500',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            border: '1px solid rgba(255, 165, 0, 0.3)',
                            fontWeight: '600'
                          }}
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.4rem', 
                      flexWrap: 'wrap',
                      paddingTop: '0.5rem'
                    }}>
                      {project.tech.map((t, i) => (
                        <span 
                          key={i}
                          style={{
                            background: 'rgba(0, 255, 200, 0.1)',
                            color: '#00ffc8',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            border: '1px solid rgba(0, 255, 200, 0.2)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
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
            }}
            className="contact-title">
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
            }}
            className="contact-text">
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

          /* Responsive Typography */
          @media (max-width: 1024px) {
            .hero-title {
              font-size: 2.5rem !important;
            }
            .section-title {
              font-size: 2rem !important;
            }
            .hero-text {
              font-size: 1.1rem !important;
            }
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 2rem !important;
            }
            .section-title {
              font-size: 1.75rem !important;
            }
            .hero-text {
              font-size: 1rem !important;
            }
            .project-title {
              font-size: 1.25rem !important;
            }
            .project-image {
              height: 160px !important;
            }
            .hero-image {
              width: 150px !important;
              height: 150px !important;
            }
            .skill-canvas {
              max-width: 100% !important;
              height: auto !important;
            }
          }

          @media (max-width: 480px) {
            .hero-title {
              font-size: 1.75rem !important;
            }
            .section-title {
              font-size: 1.5rem !important;
            }
            .hero-text {
              font-size: 0.95rem !important;
              padding: 1.5rem !important;
            }
            .project-title {
              font-size: 1.1rem !important;
            }
            .project-image {
              height: 140px !important;
            }
            .hero-image {
              width: 120px !important;
              height: 120px !important;
            }
            .stat-card {
              padding: 1rem !important;
            }
            .stat-value {
              font-size: 1.25rem !important;
            }
            .contact-title {
              font-size: 2rem !important;
            }
            .contact-text {
              font-size: 1rem !important;
              padding: 1.5rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Portfolio;