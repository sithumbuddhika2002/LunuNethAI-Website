import { useState, type MouseEvent } from 'react';
import { ArrowDown, ArrowRight, BookOpen, CheckCircle2, Clock3, Download, FileText, Layers, Network, Search, Target } from 'lucide-react';
import './ProjectOverview.css';
import ResearchChapterContent from './ResearchChapterContent';
import { documentCategories, documentCategoryLabel } from '../documentCategories';

// Shared Drive files: add new file IDs here when the library grows.
const pdfDocuments = [
  {
    "filename": "Proposal_Report_Chatbot.pdf",
    "category": "Proposal_Report",
    "id": "1tyc0kAX2G4yXZh67ypgDqJy-gSJ9uWIo"
  },
  {
    "filename": "Proposal_Report_NutrientDeficiency.pdf",
    "category": "Proposal_Report",
    "id": "1x7cRCzKOT-WVzMtEnuL102adVuDy0_lQ"
  },
  {
    "filename": "Proposal_Report_PestDetection.pdf",
    "category": "Proposal_Report",
    "id": "1ULuUPPtT-x6RK7g3YCa4tXqmuVitdMYv"
  },
  {
    "filename": "Proposal_Report_PurpleBlotch.pdf",
    "category": "Proposal_Report",
    "id": "1m54nfIYee1cOdRqLmxeE5hPPnMwlDciu"
  },
  {
    "filename": "Progress Presentation 1.pptx",
    "category": "Presentations",
    "id": "1jSXjZCnUwlP-0nh9qNgy5Jd-1jzfBZjq"
  },
  {
    "filename": "Progress Presentation 2.pptx",
    "category": "Presentations",
    "id": "16YrKbcL6E5imNAnoITRy-DljIuulK9ca"
  },
  {
    "filename": "Research Article.pdf",
    "category": "Research_paper",
    "id": "1EJp3N10PP9yu7wIdOto7_a8n3tU7ARRX"
  }
].map(item => ({
  ...item,
  title: item.filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
  format: item.filename.split('.').pop()?.toUpperCase(),
  url: `https://drive.google.com/file/d/${item.id}/view`,
  downloadUrl: `https://drive.google.com/uc?export=download&id=${item.id}`,
}));

const chapters = [
  { title: 'Literature Survey', icon: BookOpen, label: 'The foundation' },
  { title: 'Research Gap', icon: Search, label: 'The opportunity' },
  { title: 'Research Objectives', icon: Target, label: 'Our direction' },
  { title: 'Methodology & Technologies', icon: Network, label: 'The approach & tools' },
];
const assessments = [
  { name: 'Project Charter', completed: true },
  { name: 'Project Proposal', completed: true },
  { name: 'Progress Presentation I', completed: true },
  { name: 'Progress Presentation II', completed: true },
  { name: 'Final Assessment', completed: false },
];
const completedAssessments = assessments.filter(assessment => assessment.completed).length;
function scrollToResearch(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const target = document.getElementById(event.currentTarget.hash.slice(1));
  target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  target?.focus({ preventScroll: true });
}

export default function ProjectOverview() {
  const [chapter, setChapter] = useState(0);
  const [query, setQuery] = useState('');
  const search = query.trim().toLowerCase();
  const visiblePdfs = pdfDocuments.filter(item =>
    `${item.title} ${item.filename} ${documentCategoryLabel(item.category)}`.toLowerCase().includes(search));
  const categories = documentCategories.filter(category =>
    category.id !== 'Other' || pdfDocuments.some(item => item.category === 'Other'));
  return (
    <div className="research-overview">
      <header className="research-hero research-status-hero">
        <div>
          <p className="research-eyebrow"><span /> LunuNeth AI / Research overview</p>
          <h1>Our research.<br /><span>Progress & milestones.</span></h1>
          <p className="research-intro">Follow the progress of LunuNeth AI, from the project charter to the final assessment.</p>
          <div className="research-assessment-progress">
            <label htmlFor="assessment-progress"><strong>{completedAssessments} of {assessments.length}</strong> assessments completed</label>
            <progress id="assessment-progress" value={completedAssessments} max={assessments.length} />
            <p><Clock3 size={16} aria-hidden="true" /> Up next: Final Assessment</p>
          </div>
          <a className="research-primary" href="#research-chapters" onClick={scrollToResearch}>Explore the research <ArrowDown size={16} /></a>
        </div>
        <div className="research-assessment-card">
          <table className="research-assessment-table">
            <caption>Research assessment status</caption>
            <thead><tr><th scope="col">Assessment name</th><th scope="col">Status</th></tr></thead>
            <tbody>{assessments.map(assessment => (
              <tr key={assessment.name}>
                <th scope="row">{assessment.name}</th>
                <td><span className={`research-assessment-status ${assessment.completed ? 'is-completed' : 'is-upcoming'}`}>
                  {assessment.completed ? <CheckCircle2 size={16} aria-hidden="true" /> : <Clock3 size={16} aria-hidden="true" />}
                  {assessment.completed ? 'Completed' : 'Upcoming'}
                </span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </header>
      <div className="research-facts"><div><strong>04</strong><span>Research components</span></div><div><strong>03</strong><span>Language modes</span></div><div><Layers size={24} /><span>Mobile-first approach</span></div><a href="#research-documents" onClick={scrollToResearch}>Project documents <ArrowDown size={16} /></a></div>
      <section id="research-chapters" tabIndex={-1} className="research-workspace" aria-label="Research chapters">
        <nav className="research-chapters" aria-label="Choose a research section">
          <p className="research-eyebrow">Inside the research</p>
          {chapters.map((item, index) => <button key={item.title} id={`chapter-${index}`} aria-controls="research-panel" aria-current={chapter === index ? 'true' : undefined} className={chapter === index ? 'is-selected' : ''} onClick={() => setChapter(index)}><span className="research-chapter-number">0{index + 1}</span><span>{item.title}<small>{item.label}</small></span><ArrowRight size={16} /></button>)}
          <a href="#research-documents" onClick={scrollToResearch}><FileText size={16} /> Browse proposal documents</a>
        </nav>
        <article id="research-panel" className="research-panel" aria-labelledby={`chapter-${chapter}`}>

          <div key={chapter} className="research-panel-content">
            <h2>{chapters[chapter].title}</h2>
            <ResearchChapterContent chapter={chapter} />
          </div>
          <footer className="research-panel-footer"><span>0{chapter + 1} <span>/ 04 chapters</span></span><button onClick={() => setChapter((chapter + 1) % chapters.length)}>{chapter === chapters.length - 1 ? 'Back to Literature Survey' : `Next: ${chapters[chapter + 1].title}`}<ArrowRight size={16} /></button></footer>
        </article>
      </section>
      <section id="research-documents" tabIndex={-1} className="research-documents" aria-labelledby="documents-title">
        <div className="research-documents-header"><div><p className="research-eyebrow">The project library</p><h2 id="documents-title">Research documents</h2><p>Browse research documents by category. View or download individual files from Google Drive.</p></div><label className="research-search"><Search size={18} /><input aria-label="Search research documents" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a document or category…" type="search" /></label></div>
        <p className="research-result-count" role="status">{visiblePdfs.length} of {pdfDocuments.length} documents</p>
        <div className="research-category-sections">
          {categories.map(category => {
            const documents = visiblePdfs.filter(item => item.category === category.id);
            const total = pdfDocuments.filter(item => item.category === category.id).length;
            return (
              <section className="research-document-category" key={category.id} aria-labelledby={`documents-${category.id}`}>
                <header className="research-category-heading">
                  <h3 id={`documents-${category.id}`}>{category.label}</h3>
                  <span>{search ? `${documents.length} of ${total}` : total} {total === 1 ? 'document' : 'documents'}</span>
                </header>
                {documents.length > 0 ? <div className="research-pdf-list">
                  {documents.map(item => <article className="research-pdf-row" key={item.url}>
                    <span className="research-document-icon research-file-type-icon" aria-hidden="true">
                      {item.format === 'PPTX' ? (
                        <svg width="40" height="44" viewBox="0 0 48 48" focusable="false">
                          <circle cx="29" cy="24" r="18" fill="#D35230" />
                          <path d="M29 6a18 18 0 0 1 18 18H29Z" fill="#FF8F6B" />
                          <path d="M29 24h18a18 18 0 0 1-18 18Z" fill="#ED6C47" />
                          <rect x="1" y="11" width="26" height="26" rx="3" fill="#B7472A" />
                          <path d="M10 16h6a5 5 0 0 1 0 10h-3v6h-3Zm3 3v4h3a2 2 0 0 0 0-4Z" fill="#FFF" />
                        </svg>
                      ) : (
                        <svg width="36" height="44" viewBox="0 0 36 44" focusable="false">
                          <path d="M4 1h19l9 9v30a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" fill="#FFF" stroke="#D6D6D6" />
                          <path d="M23 1v9h9" fill="#F2F2F2" stroke="#D6D6D6" />
                          <path d="M9 28c4-5 9-16 8-19-2-4-5 7 4 14 8 5 10-1 4-1-7-1-19 4-18 7 1 2 4-1 5-3" fill="none" stroke="#E5252A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="0" y="32" width="33" height="12" rx="2" fill="#E5252A" />
                          <text x="16.5" y="41" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#FFF">PDF</text>
                        </svg>
                      )}
                    </span>
                    <div className="research-pdf-title"><h4>{item.title}</h4><p>{item.format} · {item.filename}</p></div>
                    <div className="research-pdf-actions">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} on Google Drive in a new tab`}>View <ArrowRight size={16} /></a>
                      <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" aria-label={`Download ${item.title}`}><Download size={16} /> Download</a>
                    </div>
                  </article>)}
                </div> : <p className="research-category-empty">{total > 0 ? 'No documents match your search in this category.' : 'No documents available yet.'}</p>}
              </section>
            );
          })}
        </div>
        {search && <div className="research-empty"><button onClick={() => setQuery('')}>Clear search</button></div>}
      </section>
    </div>
  );
}

