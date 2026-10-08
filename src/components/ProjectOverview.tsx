import { useState, type MouseEvent } from 'react';
import { ArrowDown, ArrowRight, BookOpen, CheckCircle2, Clock3, Download, FileText, Layers, Network, Search, Target } from 'lucide-react';
import './ProjectOverview.css';
import ResearchChapterContent from './ResearchChapterContent';
import pdfDocuments from 'virtual:research-pdfs';
import { documentCategories, documentCategoryLabel } from '../documentCategories';

const chapters = [
  { title: 'Literature Review', icon: BookOpen, label: 'The foundation' },
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
          <footer className="research-panel-footer"><span>0{chapter + 1} <span>/ 04 chapters</span></span><button onClick={() => setChapter((chapter + 1) % chapters.length)}>{chapter === chapters.length - 1 ? 'Back to literature' : `Next: ${chapters[chapter + 1].title}`}<ArrowRight size={16} /></button></footer>
        </article>
      </section>
      <section id="research-documents" tabIndex={-1} className="research-documents" aria-labelledby="documents-title">
        <div className="research-documents-header"><div><p className="research-eyebrow">The project library</p><h2 id="documents-title">Research documents</h2><p>Browse research PDFs by category. Open a document or save a copy.</p></div><label className="research-search"><Search size={18} /><input aria-label="Search research documents" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a document or category…" type="search" /></label></div>
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
                    <span className="research-document-icon"><FileText size={23} /></span>
                    <div className="research-pdf-title"><h4>{item.title}</h4><p>PDF · {item.filename}</p></div>
                    <div className="research-pdf-actions">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} PDF in a new tab`}>Open PDF <ArrowRight size={16} /></a>
                      <a href={item.url} download={item.filename} aria-label={`Download ${item.title} PDF`}><Download size={16} /> Download</a>
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

