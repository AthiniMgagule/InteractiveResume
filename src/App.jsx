import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Award, Code, Download, Lightbulb, Star, Target, Rocket, BookOpen } from 'lucide-react';

import EnhancedProjectCard from './EnhancedProjectCard';

const StoryPortfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const sectionsRef = useRef([]);

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
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const urlDrive = 'https://drive.google.com/file/d/1PAGZxXQBVNgMZz64oh61jquIhKlBroXN/view?usp=drive_link';
    const link = document.createElement('a');
    link.href = urlDrive;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chapters = [
    { id: 'intro', label: 'The Beginning', icon: Lightbulb },
    { id: 'journey', label: 'The Journey', icon: Star },
    { id: 'proof', label: 'The Work', icon: Code },
    { id: 'future', label: 'Next Chapter', icon: Rocket }
  ];

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0e27 0%, #1a1142 50%, #0a0e27 100%)',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      {/* Navigation dots */}
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
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              color: activeChapter === index ? '#a78bfa' : '#64748b',
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
              background: activeChapter === index ? '#a78bfa' : '#334155',
              border: `2px solid ${activeChapter === index ? '#c4b5fd' : '#475569'}`,
              transition: 'all 0.3s ease',
              boxShadow: activeChapter === index ? '0 0 20px rgba(167, 139, 250, 0.5)' : 'none'
            }} />
          </div>
        ))}
      </div>

      {/* Fixed header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: `rgba(10, 14, 39, ${Math.min(scrollY / 200, 0.95)})`,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '1rem 2rem',
        zIndex: 999,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Athini Mgagule
            </h1>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>Software Developer</p>
          </div>
          <button 
            onClick={handleDownloadCV}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Download size={16} />
            Download CV
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 3rem' }}>
        
        {/* Chapter 1: The Beginning */}
        <section ref={el => sectionsRef.current[0] = el} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              width: '30%',
              height: '30%',
              margin: '0 auto 2rem',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(139, 92, 246, 0.5)',
              animation: 'float 3s ease-in-out infinite',
              border: '4px solid transparent',
              backgroundImage: 'linear-gradient(#0a0e27, #0a0e27), linear-gradient(135deg, #8b5cf6, #3b82f6)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}>
              <img 
                src="/prof.jpg" 
                alt="Athini Mgagule"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
            
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2'
            }}>
              Hi, I'm Athini
            </h2>
            
            <div style={{ 
              color: '#cbd5e1', 
              fontSize: '1.125rem', 
              lineHeight: '2',
              textAlign: 'left',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              marginBottom: '2rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                My name is <strong style={{ color: '#a78bfa' }}>Athini Mgagule</strong>, and I am a <strong style={{ color: '#a78bfa' }}>Software Developer</strong>.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                This decision didn't come easy. For a while, I was torn between many paths. Data Analytics fascinated me—I'd read articles about data science and felt intrigued by how numbers could uncover hidden insights. At one point, I wanted to dive into <strong style={{ color: '#60a5fa' }}>Cybersecurity</strong>, because the idea of making and breaking the security of systems excited me. I even imagined myself becoming a <strong style={{ color: '#60a5fa' }}>Mathematician</strong>, because I've always had a passion for numbers.
              </p>
              <p style={{ margin: 0 }}>
                But recently, I realized it doesn't have to be either-or. Software development allows me to bring all those passions together. It blends mathematics, data analysis, cybersecurity, and even touches on cloud computing. It's not a narrow path—it's a canvas where I can combine my curiosity and skills to solve real problems.
              </p>
            </div>  
          </div>
        </section>

        {/* Chapter 2: The Journey */}
        <section ref={el => sectionsRef.current[1] = el} style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            The Journey Through Learning
          </h2>

          <div style={{ maxWidth: '900px', margin: '0 auto 3rem' }}>
            <div style={{ 
              color: '#cbd5e1', 
              fontSize: '1.125rem', 
              lineHeight: '2',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              marginBottom: '3rem'
            }}>
              <p>
                My academic path took me through the halls of the <strong style={{ color: '#a78bfa' }}>University of Witwatersrand</strong>, where I earned my BSc in Computer Science and Mathematics. This wasn't just about collecting credits—it was about discovering how systems think, how algorithms breathe, and how mathematics forms the language of computation.
              </p>
            </div>

            {/* Education timeline */}
            <div style={{ position: 'relative', paddingLeft: '3rem' }}>
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(180deg, #8b5cf6, #3b82f6)',
                opacity: 0.5
              }} />

              {/* Faith Mangope - Expandable */}
              <div style={{ marginBottom: '2rem', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-2.25rem',
                  top: '0.5rem',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#8b5cf6',
                  border: '3px solid #0a0e27',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)'
                }} />
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                    const details = e.currentTarget.querySelector('.details');
                    if (details) {
                      details.style.maxHeight = '500px';
                      details.style.opacity = '1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                    const details = e.currentTarget.querySelector('.details');
                    if (details) {
                      details.style.maxHeight = '0';
                      details.style.opacity = '0';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#a78bfa' }}>Software Development & Data Analytics</h3>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>03/2025 - Present</span>
                  </div>
                  <p style={{ color: '#cbd5e1', margin: '0.5rem 0' }}>Faith Mangope Technology and Leadership Institute</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>Azure Cloud Computing • Java OCA • Microsoft Power BI</p>
                  
                  <div className="details" style={{ 
                    maxHeight: '0', 
                    opacity: '0',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease',
                    marginTop: '1rem'
                  }}>
                    <div style={{ 
                      borderTop: '1px solid rgba(139, 92, 246, 0.3)', 
                      paddingTop: '1rem',
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      lineHeight: '1.8'
                    }}>
                      <p style={{ marginBottom: '1rem' }}>
                        Currently enrolled in an intensive programme focused on enterprise-level software development and data analytics. This program combines hands-on projects with industry certifications to prepare for modern tech environments.
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#a78bfa' }}>Key Areas:</strong> Working extensively with Azure cloud infrastructure, developing applications, and mastering data visualization with Power BI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wits University - Expandable */}
              <div style={{ marginBottom: '2rem', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-2.25rem',
                  top: '0.5rem',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  border: '3px solid #0a0e27',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                }} />
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                    const details = e.currentTarget.querySelector('.details');
                    if (details) {
                      details.style.maxHeight = '500px';
                      details.style.opacity = '1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                    const details = e.currentTarget.querySelector('.details');
                    if (details) {
                      details.style.maxHeight = '0';
                      details.style.opacity = '0';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#60a5fa' }}>BSc Computer Science and Mathematics</h3>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>02/2022 - 11/2024</span>
                  </div>
                  <p style={{ color: '#cbd5e1', margin: '0.5rem 0' }}>University of Witwatersrand</p>
                  <div style={{
                    background: 'rgba(234, 179, 8, 0.2)',
                    color: '#fde047',
                    padding: '0.375rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    display: 'inline-block',
                    marginTop: '0.5rem'
                  }}>
                    Certificate of Merit: Positive Linear Systems III
                  </div>
                  
                  <div className="details" style={{ 
                    maxHeight: '0', 
                    opacity: '0',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease',
                    marginTop: '1rem'
                  }}>
                    <div style={{ 
                      borderTop: '1px solid rgba(59, 130, 246, 0.3)', 
                      paddingTop: '1rem',
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      lineHeight: '1.8'
                    }}>
                      <p style={{ marginBottom: '1rem' }}>
                        A rigorous program combining theoretical computer science with advanced mathematics. This dual focus gave me a unique perspective on algorithm design, computational complexity, and the mathematical foundations of modern software systems.
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#60a5fa' }}>Core Coursework:</strong> Software Design, Operating Systems, Coding and Cryptography, Advanced Analysis of Algorithms, Computer Networks, Mechanics, Abstract Mathematics, Database Fundamentals, Algebra Calculus, Data Structures and Algorithms
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong style={{ color: '#60a5fa' }}>Notable Achievement:</strong> Received a Certificate of Merit for exceptional performance in Positive Linear Systems III, demonstrating strong analytical and problem-solving abilities in advanced mathematical modeling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* High School - Expandable */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-2.25rem',
                  top: '0.5rem',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#6366f1',
                  border: '3px solid #0a0e27'
                }} />
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                    const details = e.currentTarget.querySelector('.details');
                    if (details) {
                      details.style.maxHeight = '500px';
                      details.style.opacity = '1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                    const details = e.currentTarget.querySelector('.details');
                    if (details) {
                      details.style.maxHeight = '0';
                      details.style.opacity = '0';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>National Senior Certificate</h3>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>01/2017 - 12/2021</span>
                  </div>
                  <p style={{ color: '#cbd5e1', margin: 0 }}>Leap Science and Maths School</p>
                  
                  <div className="details" style={{ 
                    maxHeight: '0', 
                    opacity: '0',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease',
                    marginTop: '1rem'
                  }}>
                    <div style={{ 
                      borderTop: '1px solid rgba(99, 102, 241, 0.3)', 
                      paddingTop: '1rem',
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      lineHeight: '1.8'
                    }}>
                      <p style={{ marginBottom: '1rem' }}>
                        Attended a specialized STEM-focused high school that laid the foundation for my technical career. The rigorous curriculum emphasized mathematics and sciences, preparing students for careers in technology and engineering.
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong style={{ color: '#a78bfa' }}>Key Subjects:</strong> Mathematics, Physical Sciences, Life Sciences, and Accounting. This diverse foundation developed both analytical thinking and attention to detail that continues to serve me in software development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Chapter 4: The Work */}
        <section ref={el => sectionsRef.current[3] = el} style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Building Solutions
          </h2>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ 
              color: '#cbd5e1', 
              fontSize: '1.125rem', 
              lineHeight: '2',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              marginBottom: '3rem'
            }}>
              <p>
                Every project tells a story of a problem that needed solving. Here's how I've been turning ideas into reality:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <EnhancedProjectCard/>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem', color: '#60a5fa' }}>
                My Toolkit
              </h3>
              <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['Java', 'Python', 'JavaScript', 'React', 'Node.js', 'Spring Boot', 'MySQL', 'PostgreSQL', 'SQLite', 'Azure Cloud', 'Data Analytics', 'REST APIs', 'Agile/Scrum', 'Git', 'Problem Solving', 'Team Leadership'].map((skill, i) => (
                    <span key={i} style={{
                      background: 'rgba(139, 92, 246, 0.2)',
                      color: '#c4b5fd',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '25px',
                      fontSize: '0.875rem',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 5: What's Next */}
        <section ref={el => sectionsRef.current[4] = el} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              What's Next?
            </h2>
            
            <div style={{ 
              color: '#cbd5e1', 
              fontSize: '1.25rem', 
              lineHeight: '2',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              marginBottom: '3rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                I'm actively seeking opportunities to join teams that value <strong style={{ color: '#a78bfa' }}>innovation</strong>, <strong style={{ color: '#60a5fa' }}>collaboration</strong>, and <strong style={{ color: '#a78bfa' }}>continuous learning</strong>.
              </p>
              <p style={{ margin: 0 }}>
                Whether it's building scalable web applications, diving into data-driven solutions, or exploring the intersection of AI and software development—I'm ready to contribute, learn, and grow.
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:athi200308@gmail.com"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
                }}
              >
                <Mail size={20} />
                Get in Touch
              </a>

              <button
                onClick={handleDownloadCV}
                style={{
                  background: 'transparent',
                  border: '2px solid #8b5cf6',
                  borderRadius: '12px',
                  color: '#a78bfa',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download size={20} />
                Download Resume
              </button>
            </div>
            <p></p>

            {/* Social links */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <a href="https://linkedin.com/in/athini-mgagule-8b8b362b2" target="_blank" rel="noopener noreferrer"
                style={{ width: '48px', height: '48px', background: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <Linkedin size={20} color="white" />
              </a>
              <a href="https://github.com/AthiniMgagule" target="_blank" rel="noopener noreferrer"
                style={{ width: '48px', height: '48px', background: '#374151', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(55, 65, 81, 0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <Github size={20} color="white" />
              </a>
              <a href="https://athinimgagule.netlify.app" target="_blank" rel="noopener noreferrer"
                style={{ width: '48px', height: '48px', background: '#0891b2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(8, 145, 178, 0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <Globe size={20} color="white" />
              </a>
            </div>

            <p style={{ 
              marginTop: '3rem', 
              color: '#64748b', 
              fontSize: '0.875rem',
              fontStyle: 'italic'
            }}>
              "The best way to predict the future is to create it."
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
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            background: #0a0e27;
          }
          
          html {
            scroll-behavior: smooth;
          }

          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: #1a1142;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #8b5cf6, #3b82f6);
            border-radius: 5px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #a78bfa, #60a5fa);
          }
        `}
      </style>
    </div>
  );
};

export default StoryPortfolio;