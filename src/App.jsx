import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Award, Code, Database, Brain, ChevronRight, Download, Star } from 'lucide-react';

const InteractiveResume = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sections = [
    { id: 'about', label: 'About', icon: Star },
    { id: 'experience', label: 'Experience', icon: Code },
    { id: 'projects', label: 'Projects', icon: Database },
    { id: 'education', label: 'Education', icon: Award },
    { id: 'skills', label: 'Skills', icon: Brain },
    {id: 'certifications', label: 'Certifications', icon: Brain}
  ];

  const skills = {
    programming: ['Java', 'Python', 'JavaScript', 'Node.js', 'React'],
    data: ['MySQL', 'PostgreSQL', 'SQLite', 'Data Analytics', 'Azure Cloud'],
    frameworks: ['React', 'Spring boot'],
    soft: ['Agile/Scrum', 'Team Leadership', 'Problem Solving', 'Project Management']
  };

  const handleDownloadCV = () => {
    const urlDrive = 'https://drive.google.com/file/d/1PAGZxXQBVNgMZz64oh61jquIhKlBroXN/view?usp=drive_link';
    const link = document.createElement('a');
    link.href = urlDrive;
    link.download = 'Athini_Mgagule_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(34, 211, 238, 0.2)',
    borderRadius: '16px'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    border: 'none',
    borderRadius: '16px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b, #1e3a8a, #0e7490)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Animated background particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: '#22d3ee',
              borderRadius: '50%',
              opacity: '0.3',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite ${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div
        style={{
          position: 'fixed',
          width: '16px',
          height: '16px',
          background: '#22d3ee',
          borderRadius: '50%',
          opacity: '0.4',
          pointerEvents: 'none',
          zIndex: 50,
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transition: 'all 0.1s ease-out',
          transform: 'scale(1.5)'
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '1fr 2fr' : '1fr', gap: '2rem' }}>
          
          {/* Sidebar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: 'fit-content',
            maxHeight: '100%',
            overflowY: 'auto',
            transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-100px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease-out'
          }}>
            
            {/* Profile Card */}
            <div style={{
              ...glassStyle,
              padding: '1.25rem',
              textAlign: 'center',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
            }}>
              
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}>
                AM
              </div>
              
              <h1 style={{ fontSize: '1.375rem', fontWeight: 'bold', color: 'white', margin: '0 0 0.5rem' }}>
                Athini Mgagule
              </h1>
              <p style={{ color: '#67e8f9', fontWeight: '500', margin: '0 0 1rem', fontSize: '0.9rem' }}>
                Java Developer | AI & Data Analyst
              </p>
              
              {/* Contact Info */}
              <div style={{ borderTop: '1px solid rgba(34, 211, 238, 0.2)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', marginBottom: '0.75rem', transition: 'color 0.3s ease' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#22d3ee'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}>
                  <Phone size={16} />
                  <span style={{ fontSize: '0.875rem' }}>+27671891052</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', marginBottom: '0.75rem', transition: 'color 0.3s ease' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#22d3ee'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}>
                  <Mail size={16} />
                  <span style={{ fontSize: '0.875rem' }}>athi200308@gmail.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', marginBottom: '1rem', transition: 'color 0.3s ease' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#22d3ee'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}>
                  <MapPin size={16} />
                  <span style={{ fontSize: '0.875rem' }}>Randburg, Johannesburg</span>
                </div>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <a 
                  href="https://linkedin.com/in/athini-mgagule-8b8b362b2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#2563eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3b82f6';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#2563eb';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Linkedin size={18} color="white" />
                </a>
                <a 
                  href="https://github.com/AthiniMgagule" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#374151',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4b5563';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#374151';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Github size={18} color="white" />
                </a>
                <a 
                  href="https://athinimgagule.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#0891b2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#06b6d4';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0891b2';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Globe size={18} color="white" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ ...glassStyle, padding: '0.75rem' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.625rem 1rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: isActive ? '#06b6d4' : 'transparent',
                        color: isActive ? 'white' : '#d1d5db',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.color = '#22d3ee';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#d1d5db';
                        }
                      }}
                    >
                      <IconComponent size={18} />
                      <span>{section.label}</span>
                      <ChevronRight 
                        size={16} 
                        style={{ 
                          marginLeft: 'auto',
                          transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Download CV */}
            <button 
              onClick={handleDownloadCV}
              style={{
                ...buttonStyle,
                width: '100%',
                padding: '0.625rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #0891b2, #2563eb)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Download size={18} />
              <span>Download CV</span>
            </button>
          </div>

          {/* Main Content */}
          <div style={{
            height: '100%',
            transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease-out 0.3s'
          }}>
            <div style={{
              ...glassStyle,
              height: '100%',
              padding: '2rem',
              overflowY: 'auto'
            }}>
              
              {/* About Section */}
              {activeSection === 'about' && (
                <div >
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>
                    About Me
                  </h2>
                  <p style={{ color: '#d1d5db', fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>
                    I am a highly motivated Computer Science graduate with a passion for creating impactful solutions that solve real-world problems. I thrive on transforming complex technical challenges into user-friendly applications, having successfully led development teams and delivered projects that improved operational efficiency.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {[
                      { icon: Code, title: 'Java Developer', desc: 'Full-stack development with modern frameworks like Spring boot' },
                      { icon: Code, title: 'Web Developer', desc: 'Web development with Core HTML/CSS/JS and with modern frameworks like react'},
                      { icon: Brain, title: 'AI Enthusiast', desc: 'Machine learning and data analysis' },
                      { icon: Database, title: 'Data Analyst', desc: 'Database optimization and insights' }
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.2))',
                          padding: '1rem',
                          borderRadius: '12px',
                          border: '1px solid rgba(34, 211, 238, 0.2)',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <item.icon size={24} color="#22d3ee" style={{ marginBottom: '0.5rem' }} />
                        <h3 style={{ color: 'white', fontWeight: 'bold', margin: '0 0 0.25rem' }}>{item.title}</h3>
                        <p style={{ color: '#d1d5db', fontSize: '0.875rem', margin: 0 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>
                    Experience
                  </h2>

                  {/* Example Experience Card */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      marginBottom: '1.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                        Exam Invigilator
                      </h3>
                      <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>02/2024 - 11/2024</span>
                    </div>
                    <p style={{ color: '#67e8f9', marginBottom: '0.75rem' }}>University of Witwatersrand</p>

                    {/* Bullet points */}
                    <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, color: '#d1d5db' }}>
                      <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: '#22d3ee' }}>✔</span>
                        Monitored exam environments, ensuring 100% adherence to academic integrity policies
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: '#22d3ee' }}>✔</span>
                        Ensured compliance with university regulations and addressed student concerns
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>
                    Projects
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* URL Shortener */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                          URL Shortener
                        </h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>08/2025</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem' }}>
                        A tool that shortens long URLs into shareable links with efficient redirection.
                      </p>
                      <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
                        Simplifies sharing of lengthy URLs and integrates with web apps.
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['React', 'JavaScript', 'Spring Boot', 'MySQL'].map((tech, i) => (
                          <span key={i} style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#93c5fd',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* MovieDatabase */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                          MovieDatabase
                        </h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>08/2025 – Present</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem' }}>
                        A platform where users can explore movies and TV shows, create personal watchlists, and interact with other users.
                      </p>
                      <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
                        Designed to make movie discovery and social interaction around media seamless.
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['React', 'JavaScript'].map((tech, i) => (
                          <span key={i} style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#93c5fd',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* WriteWisp */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                          WriteWisp
                        </h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>03/2024 – Present</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem' }}>
                        A free platform for writers to draft and publish novels. It also offers prompts to spark inspiration.
                      </p>
                      <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
                        Helps aspiring authors overcome writer’s block and share stories with ease.
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['React', 'JavaScript', 'Node.js', 'SQLite'].map((tech, i) => (
                          <span key={i} style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#93c5fd',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    

                  </div>
                </div>
              )}


              {/* Education Section */}
              {activeSection === 'education' && (
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>
                    Education
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Faith Mangope Technology and Leadership Institute */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                          Software Development & Data Analytics
                        </h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>03/2025 - Present</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem' }}>Faith Mangope Technology and Leadership Institute</p>
                      <p style={{ color: '#d1d5db', margin: 0 }}>Azure Cloud Computing, Java OCA, Microsoft Power BI, Microsoft AI</p>
                    </div>

                    {/* University of Witwatersrand */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                          BSc Computer Science and Mathematics
                        </h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>02/2022 - 11/2024</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem' }}>University of Witwatersrand</p>
                      <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
                        Operating Systems, Cryptography, Software Design, Mobile Computing, Computer Networks, Database Fundamentals, Analysis of Algorithms, Information Systems
                      </p>
                      <div style={{
                        background: 'rgba(234, 179, 8, 0.2)',
                        color: '#fde047',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        border: '1px solid rgba(234, 179, 8, 0.3)',
                        display: 'inline-block'
                      }}>
                        Certificate of Merit: Positive Linear Systems III
                      </div>
                    </div>

                    {/* Leap Science and Maths School */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                          National Senior Certificate
                        </h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>01/2017 - 12/2021</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem' }}>Leap Science and Maths School</p>
                      <p style={{ color: '#d1d5db', margin: 0 }}>
                        Mathematics, Accounting, Physical Science, Life Science
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>
                    Skills
                  </h2>

                  {/* Category Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {Object.entries(skills).map(([category, skillList], index) => (
                      <div
                        key={category}
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                          padding: '1.5rem',
                          borderRadius: '12px',
                          border: '1px solid rgba(34, 211, 238, 0.2)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                        }}
                      >
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {skillList.map((skill, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{skill}</span>
                              <span style={{ color: '#22d3ee', fontSize: '0.75rem' }}>⭐⭐⭐</span> {/* Level badges */}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skill Tags Wall */}
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 211, 238, 0.2)'
                  }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '1rem' }}>Highlights</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['Java SE 8', 'Python', 'React', 'Azure Cloud', 'Data Analytics', 'Agile Methodology', 'Problem Solving'].map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.375rem 1rem',
                            background: 'rgba(6, 182, 212, 0.2)',
                            color: '#67e8f9',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            border: '1px solid rgba(34, 211, 238, 0.3)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {activeSection === 'certifications' && (
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>
                    Certifications
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>Oracle Certified Associate, Java SE 8 Programmer I</h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>09/2025</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem', margin: '0 0 0.75rem' }}>Oracle</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Credential ID:</span>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem', fontFamily: 'monospace' }}>322052550OCAJSE8</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#93c5fd',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          display: 'inline-block'
                        }}>
                          Java Programming Certification
                        </div>
                        <a 
                          href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=8E6A46D55B62EE21AA9563A9B75C5EC6FA9EFB7BB67BD9C3DFE7C877697009C4"
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            color: '#22d3ee',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#22d3ee'}
                        >
                          See Credentials →
                        </a>
                      </div>
                    </div>

                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>Microsoft Certified: Azure Fundamentals</h3>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem' }}>05/2025</span>
                      </div>
                      <p style={{ color: '#67e8f9', marginBottom: '0.75rem', margin: '0 0 0.75rem' }}>Microsoft</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Credential ID:</span>
                        <span style={{ color: '#22d3ee', fontSize: '0.875rem', fontFamily: 'monospace' }}>D17775F8F856A4D0</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#93c5fd',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          display: 'inline-block'
                        }}>
                          Cloud Computing Fundamentals
                        </div>
                        <a 
                          href="https://learn.microsoft.com/en-us/users/athinimgagule-9151/credentials/d17775f8f856a4d0"
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            color: '#22d3ee',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#22d3ee'}
                        >
                          See Credentials →
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 211, 238, 0.2)'
                  }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '1rem' }}>Certification Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['Java SE 8', 'Object-Oriented Programming', 'Azure Cloud Services', 'Cloud Computing', 'Microsoft Azure', 'Java Fundamentals'].map((skill, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.375rem 1rem',
                            background: 'rgba(6, 182, 212, 0.2)',
                            color: '#67e8f9',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            border: '1px solid rgba(34, 211, 238, 0.3)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            font-family: system-ui, -apple-system, sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default InteractiveResume;