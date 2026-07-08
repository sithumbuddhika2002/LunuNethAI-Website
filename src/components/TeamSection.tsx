import { Mail, GraduationCap, Server } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  regNo?: string;
  componentName?: string;
  bio: string;
  skills: string[];
  avatar: React.ReactNode;
  linkedinAvatarUrl?: string; // paste your LinkedIn avatar CDN links here
  socials: { github?: string; linkedin?: string; email?: string };
}

// Custom brand icons since new lucide-react versions deprecate/exclude them
const GithubIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function TeamSection() {
  const supervisor: TeamMember = {
    id: 1,
    name: 'Dr. Kaushalya Dissanayake',
    role: 'Project Supervisor',
    bio: 'Senior Lecturer in the Department of Information Technology at SLIIT. Holds a Ph.D. in Computer Science from Management & Science University, Malaysia. Expert in Cyber Security, Machine Learning, Deep Learning, Image Processing, and Natural Language Processing.',
    skills: ['Cyber Security', 'Machine Learning', 'Deep Learning', 'Image Processing', 'Data Science'],
    socials: { linkedin: '#', email: 'mailto:kaushalya.d@sliit.lk' },
    linkedinAvatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHC9gi1G7K6Tw/profile-displayphoto-scale_400_400/B56Z4Sfi0iJkAg-/0/1778426723235?e=1783555200&v=beta&t=PpzibfPLCC0_WJWY9ia26gauRxsKHhxlYf_hLzlMv5Q', // To import LinkedIn picture, paste the direct copied address here
    avatar: (
      <svg viewBox="0 0 100 100" className="team-avatar-svg">
        <rect width="100" height="100" fill="#082218" />
        <circle cx="50" cy="42" r="18" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
        <path d="M 25 80 C 25 62 38 58 50 58 C 62 58 75 62 75 80 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
        <path d="M 50 15 L 72 23 L 50 31 L 28 23 Z" fill="#10b981" />
        <path d="M 72 23 L 72 35" stroke="#10b981" strokeWidth="1.5" />
        <path d="M 50 31 L 50 38" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="50" cy="42" r="2" fill="#00ff87" />
        <GraduationCap className="w-6 h-6 text-emerald-400" style={{ position: 'absolute', left: '10px', top: '10px', opacity: 0.15 }} />
      </svg>
    )
  };

  const coSupervisor: TeamMember = {
    id: 6,
    name: 'Dr. Dharshana Kasthurirathna',
    role: 'Project Co-Supervisor',
    bio: 'Assistant Professor in Software Engineering at SLIIT. Holds a Ph.D. in Complex Systems from the University of Sydney. Expert in network science, complex computational systems modeling, evolutionary game theory, and machine learning.',
    skills: ['Complex Systems', 'Network Science', 'Machine Learning', 'Software Architecture', 'Distributed Systems'],
    socials: { linkedin: 'https://www.linkedin.com/in/dharshana-kasthurirathna-a4a3275/', email: 'mailto:dharshana.k@sliit.lk' },
    linkedinAvatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQH--2a6YBP_jg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729917817644?e=1785369600&v=beta&t=CNn-KtdutKJoixxsQ-f84wZjFPyvEN6iMi5eAfRpoQw',
    avatar: (
      <svg viewBox="0 0 100 100" className="team-avatar-svg">
        <rect width="100" height="100" fill="#081e22" />
        <circle cx="50" cy="42" r="18" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M 25 80 C 25 62 38 58 50 58 C 62 58 75 62 75 80 Z" fill="rgba(14, 165, 233, 0.15)" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M 50 15 L 72 23 L 50 31 L 28 23 Z" fill="#0ea5e9" />
        <path d="M 72 23 L 72 35" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M 50 31 L 50 38" stroke="#0ea5e9" strokeWidth="1.5" />
        <circle cx="50" cy="42" r="2" fill="#38bdf8" />
        <circle cx="80" cy="20" r="3" fill="#38bdf8" />
        <circle cx="20" cy="30" r="3" fill="#38bdf8" />
        <line x1="50" y1="42" x2="80" y2="20" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
        <line x1="50" y1="42" x2="20" y2="30" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
      </svg>
    )
  };

  const members: TeamMember[] = [
    {
      id: 2,
      name: 'Vidura',
      role: 'Team Leader',
      regNo: 'IT22054890',
      componentName: 'Purple Blotch Disease Detection',
      bio: 'Directs development sprints, microservice container assemblies, and designs the FastAPI consolidated agent controller routing. Lead researcher on Purple Blotch detection and severity classification.',
      skills: ['Systems Architecture', 'Docker Dev', 'FastAPI Routing', 'MongoDB Integration', 'TinyML Quantization', 'CNNs & ViTs'],
      socials: { github: '#', linkedin: '#', email: 'mailto:vidura@lununeth.ai' },
      linkedinAvatarUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQEfwqote6kIDQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725266703804?e=1783555200&v=beta&t=A4ZUgerVkCWzyCN_fOn_UOwM2jncQWH7ldiZ8_WlMRs', // To import LinkedIn picture, paste the direct copied address here
      avatar: (
        <svg viewBox="0 0 100 100" className="team-avatar-svg">
          <rect width="100" height="100" fill="#06181b" />
          <circle cx="50" cy="45" r="16" fill="rgba(0, 255, 135, 0.15)" stroke="#00ff87" strokeWidth="1.5" />
          <path d="M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z" fill="rgba(0, 255, 135, 0.1)" stroke="#00ff87" strokeWidth="1.5" />
          <circle cx="50" cy="45" r="22" stroke="rgba(0, 255, 135, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="20" x2="50" y2="70" stroke="rgba(0, 255, 135, 0.2)" strokeWidth="1" />
          <line x1="25" y1="45" x2="75" y2="45" stroke="rgba(0, 255, 135, 0.2)" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Sithum',
      role: 'Predictive Systems Developer',
      regNo: 'IT22087256',
      componentName: 'Trilingual Chatbot & Context-Aware Diagnostics',
      bio: 'Architect of the Spatio-Temporal Graph Neural Network. Programs multi-agent forecast probabilities, MongoDB connections, and the trilingual chatbot conversational routing.',
      skills: ['GNN Modeling', 'Spatio-Temporal GNN', 'Database Clustering', 'Bayesian Networks', 'mBERT & Seq2Seq', 'NLP Diagnostics'],
      socials: { github: '#', linkedin: '#', email: 'mailto:sithum@lununeth.ai' },
      linkedinAvatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQFNIsGUxXMm-w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731185198793?e=1783555200&v=beta&t=ldWbex9t--UaSQIWH6KTY2FtDflV3FnXqFRGPzLt1CI', // To import LinkedIn picture, paste the direct copied address here
      avatar: (
        <svg viewBox="0 0 100 100" className="team-avatar-svg">
          <rect width="100" height="100" fill="#1b1206" />
          <circle cx="50" cy="45" r="16" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="25" cy="25" r="4" fill="#f59e0b" />
          <circle cx="75" cy="30" r="4" fill="#f59e0b" />
          <circle cx="70" cy="65" r="4" fill="#f59e0b" />
          <line x1="50" y1="45" x2="25" y2="25" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" />
          <line x1="50" y1="45" x2="75" y2="30" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" />
          <line x1="50" y1="45" x2="70" y2="65" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Senura',
      role: 'Deep Learning Developer (Vision)',
      regNo: 'IT22226464',
      componentName: 'Thrips Pest Detection',
      bio: 'Responsible for PyTorch object detection networks. Trained and validated Faster R-CNN on crop-thrips coordinates, using Sliced Aided Hyper Inference (SAHI) for small pest localization.',
      skills: ['PyTorch DL', 'Object Localization', 'EfficientNet CAM', 'Model Optimization', 'YOLOv8 & SAHI', 'IPM Scaling'],
      socials: { github: '#', linkedin: '#', email: 'mailto:senura@lununeth.ai' },
      linkedinAvatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQF7qbKa_plifA/profile-displayphoto-scale_400_400/B56ZwFtWFQHIAk-/0/1769622301545?e=1783555200&v=beta&t=wYjtBlZ1NXKUh_Mukaih0XXpizWOCDBzzjiW5VRgvVk', // To import LinkedIn picture, paste the direct copied address here
      avatar: (
        <svg viewBox="0 0 100 100" className="team-avatar-svg">
          <rect width="100" height="100" fill="#140a1b" />
          <circle cx="50" cy="45" r="16" fill="rgba(167, 139, 250, 0.15)" stroke="#a78bfa" strokeWidth="1.5" />
          <path d="M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z" fill="rgba(167, 139, 250, 0.1)" stroke="#a78bfa" strokeWidth="1.5" />
          <rect x="25" y="20" width="50" height="50" stroke="rgba(167, 139, 250, 0.25)" strokeWidth="1" fill="none" />
          <path d="M 25 30 L 25 20 L 35 20 M 65 20 L 75 20 L 75 30 M 75 60 L 75 70 L 65 70 M 35 70 L 25 70 L 25 60" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'Kaveesha',
      role: 'Client App Developer (Mobile)',
      regNo: 'IT22142528',
      componentName: 'Nutrient Deficiency Detection',
      bio: 'Builds cross-platform UI features using Flutter. Connects SQLite on-device caches, optimizes local TFLite operations, and designed the leaf nutrient deficiency semantic classifier.',
      skills: ['Flutter/Dart', 'Mobile DB Caching', 'TFLite Integration', 'Offline Inference', 'Feature Fusion', 'SHAP Explainability'],
      socials: { github: '#', linkedin: '#', email: 'mailto:kaveesha@lununeth.ai' },
      linkedinAvatarUrl: 'https://media.licdn.com/dms/image/v2/D5635AQEawBaMLJhMow/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1734508366578?e=1784098800&v=beta&t=z4D2nXFM9_08CSpQMSLp8vXsWud-7kYe1QveOtyWJwI', // To import LinkedIn picture, paste the direct copied address here
      avatar: (
        <svg viewBox="0 0 100 100" className="team-avatar-svg">
          <rect width="100" height="100" fill="#04121b" />
          <circle cx="50" cy="45" r="16" fill="rgba(14, 165, 233, 0.15)" stroke="#0ea5e9" strokeWidth="1.5" />
          <path d="M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z" fill="rgba(14, 165, 233, 0.1)" stroke="#0ea5e9" strokeWidth="1.5" />
          <rect x="36" y="15" width="28" height="60" rx="3" stroke="rgba(14, 165, 233, 0.25)" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="68" r="2" fill="#0ea5e9" opacity="0.5" />
        </svg>
      )
    }
  ];

  // Helper component to render photo avatar with SVG fallback boundaries
  const AvatarImage = ({ member, fallbackId }: { member: TeamMember; fallbackId: string }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.style.display = 'none';
      const fallbackEl = document.getElementById(fallbackId);
      if (fallbackEl) {
        fallbackEl.style.display = 'block';
      }
    };

    return (
      <div className="team-avatar-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
        {member.linkedinAvatarUrl ? (
          <img 
            src={member.linkedinAvatarUrl} 
            alt={member.name}
            onError={handleImageError}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : null}
        <div 
          id={fallbackId} 
          className="team-avatar-fallback" 
          style={{ 
            display: member.linkedinAvatarUrl ? 'none' : 'block', 
            width: '100%', 
            height: '100%' 
          }}
        >
          {member.avatar}
        </div>
      </div>
    );
  };

  return (
    <div className="team-layout-wrapper">
      {/* 1. Supervisor & Co-Supervisor Placement (Centered Hero Cards) */}
      <div className="supervisor-container">
        <div className="glass-card team-card supervisor-card">
          <AvatarImage member={supervisor} fallbackId="fallback-supervisor" />
          
          <h3>{supervisor.name}</h3>
          <div className="team-role" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Server className="w-4 h-4" /> {supervisor.role}
          </div>
          <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            {supervisor.bio}
          </p>
          <div className="team-skills-tags">
            {supervisor.skills.map((skill, index) => (
              <span key={index} className="skill-tag" style={{ borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.03)' }}>
                {skill}
              </span>
            ))}
          </div>
          <div className="team-social-links">
            {supervisor.socials.linkedin && (
              <a href={supervisor.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
            )}
            {supervisor.socials.email && (
              <a href={supervisor.socials.email}>
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="glass-card team-card supervisor-card" style={{ borderColor: 'rgba(14, 165, 233, 0.25)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.05)' }}>
          <AvatarImage member={coSupervisor} fallbackId="fallback-cosupervisor" />
          
          <h3>{coSupervisor.name}</h3>
          <div className="team-role" style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Server className="w-4 h-4" /> {coSupervisor.role}
          </div>
          <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            {coSupervisor.bio}
          </p>
          <div className="team-skills-tags">
            {coSupervisor.skills.map((skill, index) => (
              <span key={index} className="skill-tag" style={{ borderColor: 'rgba(14, 165, 233, 0.2)', background: 'rgba(14, 165, 233, 0.03)' }}>
                {skill}
              </span>
            ))}
          </div>
          <div className="team-social-links">
            {coSupervisor.socials.linkedin && (
              <a href={coSupervisor.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
            )}
            {coSupervisor.socials.email && (
              <a href={coSupervisor.socials.email}>
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. Grid for Core Team Members */}
      <div className="members-grid">
        {/* Team Leader First */}
        <div className="glass-card team-card" style={{ borderColor: 'rgba(0, 255, 135, 0.25)' }}>
          <AvatarImage member={members[0]} fallbackId="fallback-leader" />
          
          <h3>{members[0].name}</h3>
          
          {members[0].regNo && (
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              {members[0].regNo}
            </div>
          )}

          {members[0].componentName && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', opacity: 0.9, fontWeight: 500, marginBottom: '0.75rem', lineHeight: '1.2', borderLeft: '2px solid var(--accent-secondary)', paddingLeft: '0.4rem' }}>
              {members[0].componentName}
            </div>
          )}

          <p style={{ fontSize: '0.8rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            {members[0].bio}
          </p>
          <div className="team-skills-tags">
            {members[0].skills.map((skill, index) => (
              <span key={index} className="skill-tag" style={{ borderColor: 'rgba(0, 255, 135, 0.2)', background: 'rgba(0, 255, 135, 0.02)' }}>
                {skill}
              </span>
            ))}
          </div>
          <div className="team-social-links">
            {members[0].socials.github && (
              <a href={members[0].socials.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon />
              </a>
            )}
            {members[0].socials.linkedin && (
              <a href={members[0].socials.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
            )}
            {members[0].socials.email && (
              <a href={members[0].socials.email}>
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Regular Members */}
        {members.slice(1).map((member) => (
          <div key={member.id} className="glass-card team-card">
            <AvatarImage member={member} fallbackId={`fallback-${member.name.toLowerCase()}`} />
            
            <h3>{member.name}</h3>

            {member.regNo && (
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                {member.regNo}
              </div>
            )}

            {member.componentName && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', opacity: 0.9, fontWeight: 500, marginBottom: '0.75rem', lineHeight: '1.2', borderLeft: '2px solid var(--accent-primary)', paddingLeft: '0.4rem' }}>
                {member.componentName}
              </div>
            )}

            <p style={{ fontSize: '0.8rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              {member.bio}
            </p>
            <div className="team-skills-tags">
              {member.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            <div className="team-social-links">
              {member.socials.github && (
                <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                </a>
              )}
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon />
                </a>
              )}
              {member.socials.email && (
                <a href={member.socials.email}>
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
