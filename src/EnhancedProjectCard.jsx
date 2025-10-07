import React, { useState } from 'react';

const Badge = ({ children }) => (
  <span style={{
    background: 'rgba(139, 92, 246, 0.18)',
    color: '#c4b5fd',
    padding: '0.35rem 0.8rem',
    borderRadius: 18,
    fontSize: '0.875rem',
    border: '1px solid rgba(139,92,246,0.25)',
    display: 'inline-block'
  }}>{children}</span>
);

const TechItem = ({ tech, description }) => (
  <li style={{ marginBottom: 6, fontSize: 14, color: '#cbd5e1' }}>
    {tech}{description && ` — ${description}`}
  </li>
);

const EnhancedProjectCard = ({
  title,
  period,
  hero,
  badges = ['Full-stack'],
  codeUrl,
  demoUrl,
  websiteUrl,
  videoDemo, // New: path to MP4 demo video
  caseStudy = {}
}) => {
  const [open, setOpen] = useState(false);

  const {
    problem = 'No problem description provided.',
    solution = 'No solution description provided.',
    role = 'Role description not provided.',
    outcome = 'Outcome not provided.',
    lessons = 'Lessons learned not provided.',
    challenge = 'No challenge story provided.',
    metrics = [],
    tech = [],
    impact = []
  } = caseStudy;

  // Use websiteUrl, demoUrl, or videoDemo as fallback
  const liveDemoLink = websiteUrl || demoUrl || videoDemo;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(59,130,246,0.04))',
      borderRadius: 16,
      padding: 20,
      border: '1px solid rgba(139,92,246,0.18)',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 16
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 20, color: '#a78bfa' }}>{title}</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }}>
            <Badge>{period}</Badge>
            {badges.map((badge, idx) => <Badge key={idx}>{badge}</Badge>)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {codeUrl && (
            <a href={codeUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 8, textDecoration: 'none',
                border: '1px solid rgba(139,92,246,0.18)', background: 'transparent', color: '#c4b5fd',
                fontWeight: 600, fontSize: 14
              }}>
              <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18v-6h6v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View Code
            </a>
          )}

          {liveDemoLink && (
            <a href={liveDemoLink} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 8, textDecoration: 'none',
                border: '1px solid rgba(59,130,246,0.16)', background: 'transparent', color: '#93c5fd',
                fontWeight: 600, fontSize: 14
              }}>
              <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 3v18l15-9L5 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {videoDemo && !websiteUrl && !demoUrl ? 'Watch Demo' : 'Live Demo'}
            </a>
          )}

          <button onClick={() => setOpen(true)} aria-haspopup="dialog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px',
            borderRadius: 8, border: '1px solid rgba(139,92,246,0.16)', background: 'transparent',
            color: '#a78bfa', fontWeight: 700, cursor: 'pointer', fontSize: 14
          }}>
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Case Study
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '0 0 360px',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(2,6,23,0.35)',
          border: '1px solid rgba(139,92,246,0.06)',
          cursor: 'pointer'
        }}
        onClick={() => setOpen(true)}
        role="button"
        aria-label={`${title} preview`}>
          <img src={hero} alt={`${title} preview`} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
        </div>

        <div style={{ flex: '1 1 320px', minWidth: 260 }}>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
            <strong>Problem:</strong> {problem}<br/>
            <strong>Solution:</strong> {solution}
          </p>

          {impact.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: '8px 0', color: '#a78bfa' }}>Impact</h4>
              <ul style={{ display: 'flex', gap: 8, flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
                {impact.map((item, i) => (
                  <li key={i} style={{ color: '#cbd5e1', fontSize: 13 }}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tech.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: '8px 0', color: '#a78bfa' }}>Tech Stack</h4>
              <ul style={{ paddingLeft: 10, marginTop: 6 }}>
                {tech.map((item, i) => (
                  <TechItem 
                    key={i} 
                    tech={typeof item === 'string' ? item : item.name}
                    description={typeof item === 'object' ? item.description : ''}
                  />
                ))}
              </ul>
            </div>
          )}

          {metrics.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {metrics.map((m, idx) => <Badge key={idx}>{m}</Badge>)}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" style={{
          position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(2,6,23,0.7)', padding: 24
        }}
        onClick={() => setOpen(false)}>
          <div style={{ 
            width: 'min(900px, 96%)', 
            background: '#071133', 
            borderRadius: 12, 
            padding: 20, 
            border: '1px solid rgba(139,92,246,0.2)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, marginBottom: 16 }}>
              <h3 style={{ margin: 0, color: '#a78bfa' }}>{title} — Case Study</h3>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {websiteUrl && (
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" 
                    style={{ color: '#93c5fd', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
                    Visit Site
                  </a>
                )}
                {demoUrl && demoUrl !== websiteUrl && (
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer" 
                    style={{ color: '#93c5fd', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
                    Open Demo
                  </a>
                )}
                {videoDemo && (
                  <a href={videoDemo} target="_blank" rel="noopener noreferrer" 
                    style={{ color: '#93c5fd', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
                    Watch Demo
                  </a>
                )}
                <button onClick={() => setOpen(false)} 
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16 }}>
                  ✕
                </button>
              </div>
            </div>

            {videoDemo && (
              <div style={{ marginBottom: 16 }}>
                <video 
                  controls 
                  style={{ 
                    width: '100%', 
                    maxHeight: '400px',
                    borderRadius: 8,
                    border: '1px solid rgba(139,92,246,0.2)'
                  }}>
                  <source src={videoDemo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
              <div>
                <h4 style={{ color: '#cbd5e1' }}>Problem</h4>
                <p style={{ color: '#cbd5e1' }}>{problem}</p>

                <h4 style={{ color: '#cbd5e1' }}>Solution</h4>
                <p style={{ color: '#cbd5e1' }}>{solution}</p>

                <h4 style={{ color: '#cbd5e1' }}>My Role</h4>
                <p style={{ color: '#cbd5e1' }}>{role}</p>

                <h4 style={{ color: '#cbd5e1' }}>Outcome</h4>
                <p style={{ color: '#cbd5e1' }}>{outcome}</p>

                <h4 style={{ color: '#cbd5e1' }}>What I Learned</h4>
                <p style={{ color: '#cbd5e1' }}>{lessons}</p>

                {challenge && (
                  <>
                    <h4 style={{ color: '#cbd5e1' }}>Challenge</h4>
                    <p style={{ color: '#cbd5e1' }}>{challenge}</p>
                  </>
                )}
              </div>

              <div style={{ borderLeft: '1px solid rgba(139,92,246,0.06)', paddingLeft: 12 }}>
                {metrics.length > 0 && (
                  <>
                    <h4 style={{ color: '#cbd5e1' }}>Quick Metrics</h4>
                    <ul style={{ paddingLeft: 12, color: '#cbd5e1' }}>
                      {metrics.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </>
                )}

                {tech.length > 0 && (
                  <>
                    <h4 style={{ marginTop: 12, color: '#cbd5e1' }}>Tech Stack</h4>
                    <ul style={{ paddingLeft: 12, color: '#cbd5e1' }}>
                      {tech.map((item, i) => (
                        <li key={i}>
                          {typeof item === 'string' ? item : `${item.name} — ${item.description}`}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {(websiteUrl || codeUrl || videoDemo) && (
                  <div style={{ marginTop: 18 }}>
                    <h4 style={{ color: '#cbd5e1' }}>Links</h4>
                    {websiteUrl && (
                      <a href={websiteUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#93c5fd', display: 'block', marginBottom: 8, fontSize: 14 }}>
                        🔗 Live Website
                      </a>
                    )}
                    {codeUrl && (
                      <a href={codeUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#c4b5fd', display: 'block', marginBottom: 8, fontSize: 14 }}>
                        💻 Source Code
                      </a>
                    )}
                    {videoDemo && (
                      <a href={videoDemo} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#60a5fa', display: 'block', fontSize: 14 }}>
                        🎥 Video Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectShowcase = () => {
  const projects = [
    {
      title: 'URL Shortener',
      period: '08/2025 - 09/2025',
      hero: '/images/url_shortener.png',
      badges: ['Full-stack', 'Spring Boot'],
      codeUrl: 'https://github.com/AthiniMgagule/URLShortener',
      videoDemo: '/videos/Url_Shortener.mp4',
      caseStudy: {
        problem: 'Long URLs are difficult to share and remember, especially in marketing and social media contexts where character limits and aesthetics matter.',
        solution: 'A full-stack URL shortening service with efficient redirection algorithms and scalable architecture suitable for integration into larger web applications.',
        role: 'Full-stack developer — architected the backend shortening algorithm, built the REST API, designed the database schema, and created a clean React frontend for URL management.',
        outcome: 'Delivered a production-ready URL shortening service with sub-50ms redirects and MySQL optimization for fast lookups.',
        lessons: 'Deepened understanding of database indexing for fast lookups, implemented collision-resistant hashing algorithms, and learned best practices for building RESTful APIs with Spring Boot.',
        challenge: 'Ensuring unique short codes without collisions required implementing a robust hashing algorithm with retry logic and database constraints.',
        metrics: ['Sub-50ms redirects', 'MySQL indexed lookups', 'REST API', 'Collision-resistant'],
        tech: [
          { name: 'React', description: 'clean management UI' },
          { name: 'Spring Boot', description: 'RESTful backend' },
          { name: 'MySQL', description: 'optimized storage' },
          'REST API'
        ],
        impact: []
      }
    },
    {
      title: 'WriteWisp',
      period: 'Ongoing',
      hero: '/images/write_wisp.png',
      badges: ['Full-stack', 'Product / UX'],
      codeUrl: 'https://github.com/AthiniMgagule/WriteWisp',
      videoDemo: '/videos/write_wisp.mp4',
      caseStudy: {
        problem: 'Writers suffer from inconsistent creative flow and scattered drafts.',
        solution: 'A focused writing app with prompts, autosave, versioning and community features to keep creators moving.',
        role: 'Full-stack developer — built prompt system, autosave, versioning, and community features.',
        outcome: '150+ drafts created in beta; 60% increase in daily writing sessions among testers.',
        lessons: 'Debounced API calls + client-side caching fixed UI stalls and improved UX.',
        challenge: 'Rate-limited prompt API caused UI freezes. Fixed by adding client-side caching + debounced calls — users stopped yelling at their laptops.',
        metrics: ['4.2k LOC', 'Autosave every 5s', 'Speed: 35% faster prompt load'],
        tech: [
          { name: 'React', description: 'fast, componentized UI' },
          { name: 'Node.js', description: 'scalable API layer' },
          { name: 'SQLite', description: 'portable dev DB' },
          'Git',
          'Netlify / Render'
        ],
      }
    } 
  ];

  return (
    <div style={{ background: '#020617', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ color: '#a78bfa', fontSize: 36, marginBottom: 12 }}>Featured Projects</h1>
        <p style={{ color: '#cbd5e1', marginBottom: 40 }}>A showcase of my recent work and case studies</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {projects.map((project, idx) => (
            <EnhancedProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;