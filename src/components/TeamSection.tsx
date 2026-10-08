import { useState } from 'react';
import { Mail, ChevronDown, Sparkles } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role?: string;
  regNo?: string;
  componentName?: string;
  bio: string;
  skills: string[];
  avatar: React.ReactNode;
  imageUrl?: string;
  localImageUrl?: string;
  socials: { github?: string; linkedin?: string; email?: string };
}

// Custom brand icons for consistency and zero dependencies
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

// Robust Avatar Image component with remote URL, local asset fallback, and custom SVG fallback
const AvatarImage = ({ member }: { member: TeamMember }) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    member.imageUrl || member.localImageUrl
  );
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    // If the remote URL fails, fall back to the bundled local image asset
    if (currentSrc === member.imageUrl && member.localImageUrl) {
      setCurrentSrc(member.localImageUrl);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="team-avatar-wrapper">
      {!failed && currentSrc ? (
        <img
          src={currentSrc}
          alt={member.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={handleError}
          className="team-avatar-img"
        />
      ) : (
        <div className="team-avatar-fallback">
          {member.avatar}
        </div>
      )}
    </div>
  );
};

export default function TeamSection() {
  // Expand/collapse state for each member card (default is collapsed)
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const supervisor: TeamMember = {
    id: 1,
    name: 'Dr. Kawshalya Diasanayake',
    role: 'Project Supervisor',
    bio: 'Senior Lecturer in the Department of Information Technology at SLIIT. Holds a Ph.D. in Computer Science from Management & Science University, Malaysia. Expert in Cyber Security, Machine Learning, Deep Learning, Image Processing, and Natural Language Processing.',
    skills: ['Cyber Security', 'Machine Learning', 'Deep Learning', 'Image Processing', 'Data Science'],
    socials: { linkedin: '#', email: 'mailto:kaushalya.d@sliit.lk' },
    imageUrl: 'https://webasset.sliit.lk/web/profile_1778220334.jpg',
    localImageUrl: '/images/team/dr_kawshalya.jpg',
    avatar: (
      <svg viewBox="0 0 100 100" className="team-avatar-svg">
        <rect width="100" height="100" fill="#082218" />
        <circle cx="50" cy="42" r="18" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
        <path d="M 25 80 C 25 62 38 58 50 58 C 62 58 75 62 75 80 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
        <path d="M 50 15 L 72 23 L 50 31 L 28 23 Z" fill="#10b981" />
        <path d="M 72 23 L 72 35" stroke="#10b981" strokeWidth="1.5" />
        <path d="M 50 31 L 50 38" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="50" cy="42" r="2" fill="#00ff87" />
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
    imageUrl: 'https://csaat.sliit.lk/assets/img/DrDharshana.jpg',
    localImageUrl: '/images/team/dr_dharshana.jpg',
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
      name: 'Vidura Yasassri',
      regNo: 'IT21024826',
      componentName: 'Purple Blotch Disease Detection',
      bio: 'Directs development sprints, microservice container assemblies, and designs the FastAPI consolidated agent controller routing. Lead researcher on Purple Blotch detection and severity classification.',
      skills: ['Systems Architecture', 'Docker Dev', 'FastAPI Routing', 'MongoDB Integration', 'TinyML Quantization', 'CNNs & ViTs'],
      socials: { github: '#', linkedin: '#', email: 'mailto:vidura@lununeth.ai' },
      imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEV-CPKjYdYSg/profile-displayphoto-scale_200_200/B56aC_KkCXGoAc-/0/1789913613900?e=2147483647&v=beta&t=2KSnOe_FknZlKSyEUztJOx8Lg9RV95kfVVJ5yR-Nqpk',
      localImageUrl: '/images/team/vidura.jpg',
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
      name: 'Sithum Buddhika',
      regNo: 'IT21027716',
      componentName: 'Trilingual Chatbot & Context-Aware Diagnostics',
      bio: 'Architect of the Spatio-Temporal Graph Neural Network. Programs multi-agent forecast probabilities, MongoDB connections, and the trilingual chatbot conversational routing.',
      skills: ['GNN Modeling', 'Spatio-Temporal GNN', 'Database Clustering', 'Bayesian Networks', 'mBERT & Seq2Seq', 'NLP Diagnostics'],
      socials: { github: 'https://github.com/sithumbuddhika2002', linkedin: '#', email: 'mailto:sithum@lununeth.ai' },
      imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQFi_pjAq1wsTg/profile-displayphoto-scale_200_200/B56Z__u016GQAc-/0/1786701896719?e=2147483647&v=beta&t=77B1if5SeuZLRwmoMRIOK-9bbJlxza9t2BGol8Gvbuc',
      localImageUrl: '/images/team/sithum.jpg',
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
      name: 'Senura Sanketh',
      regNo: 'IT21033494',
      componentName: 'Thrips Pest Detection',
      bio: 'Responsible for PyTorch object detection networks. Trained and validated Faster R-CNN on crop-thrips coordinates, using Sliced Aided Hyper Inference (SAHI) for small pest localization.',
      skills: ['PyTorch DL', 'Object Localization', 'EfficientNet CAM', 'Model Optimization', 'YOLOv8 & SAHI', 'IPM Scaling'],
      socials: { github: '#', linkedin: '#', email: 'mailto:senura@lununeth.ai' },
      imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQF7qbKa_plifA/profile-displayphoto-scale_200_200/B56ZwFtWFQHIAc-/0/1769622301545?e=2147483647&v=beta&t=hIwUnHL47c8wk5lJBrp_hHwwSY-H-CJ7cJhpAeCP6bE',
      localImageUrl: '/images/team/senura.jpg',
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
      name: 'Kaveesha Nayanaka',
      regNo: 'IT21021268',
      componentName: 'Nutrient Deficiency Detection',
      bio: 'Builds cross-platform UI features using Flutter. Connects SQLite on-device caches, optimizes local TFLite operations, and designed the leaf nutrient deficiency semantic classifier.',
      skills: ['Flutter/Dart', 'Mobile DB Caching', 'TFLite Integration', 'Offline Inference', 'Feature Fusion', 'SHAP Explainability'],
      socials: { github: '#', linkedin: '#', email: 'mailto:kaveesha@lununeth.ai' },
      imageUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQF5JOIuxeYhsA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1693420427565?e=2147483647&v=beta&t=Q0d39kxoFG-IS59jMtqxMI-Mx8h5nePRLLxhtQKV4IE',
      localImageUrl: '/images/team/kaveesha.jpg',
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

  const isSupervisorExpanded = !!expandedIds[supervisor.id];
  const isCoSupervisorExpanded = !!expandedIds[coSupervisor.id];

  return (
    <div className="team-layout-wrapper">
      {/* 1. Academic Guidance / Project Supervisors */}
      <div className="team-group-section">
        <div className="team-group-header">
          <h3 className="team-group-title">Project Supervisors</h3>
        </div>

        <div className="supervisor-container">
          {/* Supervisor Card */}
          <div className="glass-card team-card supervisor-card">
            <AvatarImage member={supervisor} />

            <h3 className="team-member-name">{supervisor.name}</h3>
            {supervisor.role && (
              <div className="team-member-role-title">{supervisor.role}</div>
            )}

            {/* Interactive Liquid Glass Expand Button */}
            <button
              type="button"
              onClick={() => toggleExpand(supervisor.id)}
              className={`team-expand-btn ${isSupervisorExpanded ? 'is-active' : ''}`}
              aria-expanded={isSupervisorExpanded}
            >
              <span>{isSupervisorExpanded ? 'Hide Details' : 'View Details'}</span>
              <ChevronDown className={`team-expand-chevron ${isSupervisorExpanded ? 'is-rotated' : ''}`} />
            </button>

            {/* Expandable Liquid Glass Container */}
            <div className={`team-expandable-drawer ${isSupervisorExpanded ? 'is-expanded' : ''}`}>
              <div className="team-drawer-inner">
                <div className="team-liquid-glass-panel">
                  <p className="team-panel-bio">
                    {supervisor.bio}
                  </p>
                  <span className="team-panel-skills-heading">Key Domains</span>
                  <div className="team-panel-skills-tags">
                    {supervisor.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="team-social-links">
              {supervisor.socials.linkedin && (
                <a href={supervisor.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <LinkedinIcon />
                </a>
              )}
              {supervisor.socials.email && (
                <a href={supervisor.socials.email} aria-label="Send Email">
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Co-Supervisor Card */}
          <div className="glass-card team-card supervisor-card cosupervisor-card">
            <AvatarImage member={coSupervisor} />

            <h3 className="team-member-name">{coSupervisor.name}</h3>
            {coSupervisor.role && (
              <div className="team-member-role-title">{coSupervisor.role}</div>
            )}

            {/* Interactive Liquid Glass Expand Button */}
            <button
              type="button"
              onClick={() => toggleExpand(coSupervisor.id)}
              className={`team-expand-btn ${isCoSupervisorExpanded ? 'is-active' : ''}`}
              aria-expanded={isCoSupervisorExpanded}
            >
              <span>{isCoSupervisorExpanded ? 'Hide Details' : 'View Details'}</span>
              <ChevronDown className={`team-expand-chevron ${isCoSupervisorExpanded ? 'is-rotated' : ''}`} />
            </button>

            {/* Expandable Liquid Glass Container */}
            <div className={`team-expandable-drawer ${isCoSupervisorExpanded ? 'is-expanded' : ''}`}>
              <div className="team-drawer-inner">
                <div className="team-liquid-glass-panel">
                  <p className="team-panel-bio">
                    {coSupervisor.bio}
                  </p>
                  <span className="team-panel-skills-heading">Key Domains</span>
                  <div className="team-panel-skills-tags">
                    {coSupervisor.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="team-social-links">
              {coSupervisor.socials.linkedin && (
                <a href={coSupervisor.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <LinkedinIcon />
                </a>
              )}
              {coSupervisor.socials.email && (
                <a href={coSupervisor.socials.email} aria-label="Send Email">
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Ambient Divider */}
      <div className="team-section-divider">
        <div className="team-divider-line"></div>
        <span className="team-divider-icon">
          <Sparkles className="w-4 h-4" />
        </span>
        <div className="team-divider-line"></div>
      </div>

      {/* 2. Research Team */}
      <div className="team-group-section">
        <div className="team-group-header">
          <h3 className="team-group-title">Research Team</h3>
        </div>

        <div className="members-grid student-grid-4">
          {members.map((member) => {
            const isExpanded = !!expandedIds[member.id];
            return (
              <div key={member.id} className="glass-card team-card student-card">
                <AvatarImage member={member} />

                <h3 className="team-member-name">{member.name}</h3>

                {member.regNo && (
                  <div className="team-reg-no">
                    {member.regNo}
                  </div>
                )}

                {member.componentName && (
                  <div className="team-component-name">
                    {member.componentName}
                  </div>
                )}

                {/* Modern interactive liquid glass expand toggle button */}
                <button
                  type="button"
                  onClick={() => toggleExpand(member.id)}
                  className={`team-expand-btn ${isExpanded ? 'is-active' : ''}`}
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                  <ChevronDown className={`team-expand-chevron ${isExpanded ? 'is-rotated' : ''}`} />
                </button>

                {/* Expandable Liquid Glass Container */}
                <div className={`team-expandable-drawer ${isExpanded ? 'is-expanded' : ''}`}>
                  <div className="team-drawer-inner">
                    <div className="team-liquid-glass-panel">
                      <p className="team-panel-bio">
                        {member.bio}
                      </p>
                      <span className="team-panel-skills-heading">Key Expertise</span>
                      <div className="team-panel-skills-tags">
                        {member.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="team-social-links">
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                      <GithubIcon />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                      <LinkedinIcon />
                    </a>
                  )}
                  {member.socials.email && (
                    <a href={member.socials.email} aria-label="Send Email">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
