import { useState, useMemo } from 'react';
import {
  ExternalLink,
  Cpu,
  Server,
  Smartphone,
  Search,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  Table as TableIcon,
  X,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowRight
} from 'lucide-react';
import { components } from './researchData';

interface ReferenceItem {
  id: number;
  authors: string;
  title: string;
  venue: string;
  source: string;
  url: string;
}

const references: ReferenceItem[] = [
  {
    id: 1,
    authors: 'S. M. Hassan and A. K. Maji',
    title: 'Plant disease identification using a novel convolutional neural network',
    venue: 'IEEE Access, vol. 10, pp. 5390–5401, 2022',
    source: 'IEEE Xplore',
    url: 'https://doi.org/10.1109/ACCESS.2022.3141371',
  },
  {
    id: 2,
    authors: 'M. Amondkar et al.',
    title: 'Machine learning approach for onion leaf disease detection: A case study in Maharashtra, India',
    venue: 'in Proc. Int. Conf. on Advances in Science, Engineering and Technology (ICASET), 2024',
    source: 'Grenze Scientific',
    url: 'https://doi.org/10.1109/ICASET.2024.10724835',
  },
  {
    id: 3,
    authors: 'I. J. Samia, K. Fatema, M. A. H. Rony, and M. Jahan',
    title: 'An efficient and high-accuracy based automated onion leaf disease diagnosis approach using Mask R-CNN framework',
    venue: 'in Proc. 15th Int. Conf. Comput., Commun. Netw. Technol. (ICCCNT), 2024',
    source: 'IEEE Xplore',
    url: 'https://doi.org/10.1109/ICCCNT61001.2024.10724835',
  },
  {
    id: 4,
    authors: 'M. Tan and Q. V. Le',
    title: 'EfficientNet: Rethinking model scaling for convolutional neural networks',
    venue: 'in Proc. 36th Int. Conf. Mach. Learn. (ICML), vol. 97, 2019, pp. 6105–6114',
    source: 'PMLR',
    url: 'http://proceedings.mlr.press/v97/tan19a.html',
  },
  {
    id: 5,
    authors: 'C. R. Qi, H. Su, K. Mo, and L. J. Guibas',
    title: 'PointNet: Deep learning on point sets for 3D classification and segmentation',
    venue: 'in Proc. IEEE CVPR, 2017',
    source: 'IEEE Xplore',
    url: 'https://doi.org/10.1109/CVPR.2017.77',
  },
  {
    id: 6,
    authors: 'F. C. Akyon, S. O. Altinuc, and A. Temizel',
    title: 'Slicing Aided Hyper Inference and fine-tuning for small object detection',
    venue: 'in Proc. IEEE ICIP, 2022, pp. 966–970',
    source: 'IEEE Xplore SAHI',
    url: 'https://doi.org/10.1109/ICIP46576.2022.9897365',
  },
  {
    id: 7,
    authors: 'W. Hamilton, Z. Ying, and J. Leskovec',
    title: 'Inductive representation learning on large graphs (GraphSAGE)',
    venue: 'in Advances in Neural Information Processing Systems (NeurIPS), vol. 30, 2017',
    source: 'NeurIPS',
    url: 'https://proceedings.neurips.cc/paper/2017/hash/5dd9db5e033da9c6fb5ba83c7a7ebea9-Abstract.html',
  },
  {
    id: 8,
    authors: 'R. R. Selvaraju, M. Cogswell, A. Das, R. Vedantam, D. Parikh, and D. Batra',
    title: 'Grad-CAM: Visual explanations from deep networks via gradient-based localization',
    venue: 'Int. J. Comput. Vis., vol. 128, pp. 336–359, 2020',
    source: 'Springer Link',
    url: 'https://doi.org/10.1007/s11263-019-01228-7',
  },
  {
    id: 9,
    authors: 'B. Dey, M. M. U. Haque, R. Khatun, and R. Ahmed',
    title: 'Comparative performance of four CNN-based deep learning variants in detecting hispa pest, two fungal diseases, and NPK deficiency symptoms of rice',
    venue: 'Comput. Electron. Agric., vol. 202, Art. no. 107340, 2022',
    source: 'Elsevier',
    url: 'https://doi.org/10.1016/j.compag.2022.107340',
  },
  {
    id: 10,
    authors: 'S. Sunitha, B. Uma, S. Channakeshava, and S. Babu',
    title: 'PND-Net: Plant nutrition deficiency and disease classification using graph convolutional network',
    venue: 'Sci. Rep., vol. 14, 2024',
    source: 'Nature Scientific Reports',
    url: 'https://doi.org/10.1038/s41598-024-66543-7',
  },
  {
    id: 11,
    authors: 'V. Piyathilake et al.',
    title: 'Towards a conversational AI chatbot to assist farmers in disease detection',
    venue: 'in Proc. 25th Int. Conf. on Artificial Intelligence in Agriculture, Springer LNCS, 2024',
    source: 'Springer',
    url: 'https://doi.org/10.1007/978-3-031-73497-7_17',
  },
  {
    id: 12,
    authors: 'M. Kansal, P. Singh, M. Srivastava, and P. Chaurasia',
    title: 'Empowering agriculture with conversational AI: An application for farmer advisory and communication',
    venue: 'in Convergence of Cloud Computing, AI, and Agricultural Science, IGI Global, 2023, pp. 210–227',
    source: 'IGI Global',
    url: 'https://doi.org/10.4018/979-8-3693-0200-2.ch011',
  },
  {
    id: 13,
    authors: 'D. Hendrycks and K. Gimpel',
    title: 'A baseline for detecting misclassified and out-of-distribution examples in neural networks',
    venue: 'in Proc. ICLR, 2017',
    source: 'arXiv',
    url: 'https://arxiv.org/abs/1610.02136',
  },
  {
    id: 14,
    authors: 'C. Guo, G. Pleiss, Y. Sun, and K. Q. Weinberger',
    title: 'On calibration of modern neural networks',
    venue: 'in Proc. 34th Int. Conf. Mach. Learn. (ICML), vol. 70, 2017, pp. 1321–1330',
    source: 'PMLR',
    url: 'http://proceedings.mlr.press/v70/guo17a.html',
  },
  {
    id: 15,
    authors: 'Field Crops Research and Development Institute (FCRDI)',
    title: 'Integrated Management Guidelines for Onion Pests and Diseases',
    venue: 'Technical Advisory Bulletin No. 4, Department of Agriculture, Mahailluppallama, Sri Lanka, 2026',
    source: 'DOA Sri Lanka',
    url: 'https://doa.gov.lk',
  },
];

interface MethodologyRow {
  aiModel: string;
  aiRole: string;
  backend: string;
  backendRole: string;
  mobile: string;
  mobileRole: string;
}

const methodologyTable: MethodologyRow[] = [
  {
    aiModel: 'EfficientNet-B0 / B3',
    aiRole: 'Disease Multi-Stage Classification',
    backend: 'FastAPI',
    backendRole: 'Python 3.10 Asynchronous ASGI',
    mobile: 'Flutter Framework',
    mobileRole: 'Dart Cross-Platform Engine',
  },
  {
    aiModel: 'YOLOv8 & Faster R-CNN',
    aiRole: 'Pest Detection & Localization',
    backend: 'Uvicorn',
    backendRole: 'High-Performance ASGI Server',
    mobile: 'Riverpod',
    mobileRole: 'Reactive State Management',
  },
  {
    aiModel: 'SAHI',
    aiRole: 'Slicing Aided Hyper Inference for Tiny Pests',
    backend: 'PyTorch & PyTorch Geometric',
    backendRole: 'Deep Learning Core',
    mobile: 'fl_chart',
    mobileRole: 'Longitudinal Dual-Line Analytics',
  },
  {
    aiModel: 'Heterogeneous ST-GNN',
    aiRole: 'SAGEConv Regional Spread Model',
    backend: 'TensorFlow & Keras',
    backendRole: 'CNN Models & TFLite Conversion',
    mobile: 'Trilingual Engine',
    mobileRole: 'Sinhala, Tamil, English',
  },
  {
    aiModel: 'Grad-CAM',
    aiRole: 'Visual Saliency & Agronomic Explainability',
    backend: 'MongoDB Atlas',
    backendRole: 'Motor Driver for Longitudinal History',
    mobile: 'Camera & Gallery UI',
    mobileRole: 'Real-Time Image Ingestion',
  },
  {
    aiModel: 'TinyML / TFLite',
    aiRole: 'Quantized On-Device Edge Inference',
    backend: 'Open-Meteo & Nominatim',
    backendRole: 'Micro-Climate Geocoding',
    mobile: 'PDF Document Generator',
    mobileRole: 'Field Advisory Reports',
  },
  {
    aiModel: 'Continual Incremental Learning (CIL)',
    aiRole: 'Exemplar Memory',
    backend: 'Firebase Firestore',
    backendRole: 'Audit Logs & Diagnostic History',
    mobile: 'Interactive Audio & Speech',
    mobileRole: 'Voice AgriBot Interface',
  },
];

export default function ResearchChapterContent({ chapter }: { chapter: number }) {
  const [refSearch, setRefSearch] = useState('');
  const [techView, setTechView] = useState<'table' | 'cards'>('table');

  const filteredReferences = useMemo(() => {
    const term = refSearch.trim().toLowerCase();
    if (!term) return references;
    return references.filter(
      r =>
        r.authors.toLowerCase().includes(term) ||
        r.title.toLowerCase().includes(term) ||
        r.venue.toLowerCase().includes(term) ||
        r.source.toLowerCase().includes(term) ||
        `[${r.id}]`.includes(term)
    );
  }, [refSearch]);

  // Chapter 0: Literature Survey
  if (chapter === 0) {
    return (
      <div className="research-chapter-container">
        <div className="research-reading-card">
          <p className="research-body-text">
            Extensive research has explored the application of artificial intelligence and computer vision in precision agriculture, demonstrating impressive benchmark results in laboratory environments. However, current literature reveals significant limitations when applied to the complete agronomic lifecycle of onion (<em>Allium cepa</em>) cultivation. Existing systems primarily operate as isolated, single-task prototypes—treating foliar fungal diseases (Purple Blotch and Anthracnose), microscopic insect pest infestations (Thrips and Stem Borers), foliar macronutrient deficiencies (Nitrogen, Phosphorus, Potassium), and post-harvest bulb grading as entirely disconnected challenges. Furthermore, state-of-the-art agricultural models are typically trained on sterile, clean-background benchmarks such as PlantVillage, resulting in catastrophic accuracy degradation when subjected to dynamic field conditions with natural occlusion, varying sunlight, and out-of-distribution inputs. Conventional diagnostic tools also neglect spatial-temporal disease transmission patterns across adjacent farms, overlook micro-climatic environmental triggers (leaf wetness and humidity thresholds), lack visual explainability (such as Grad-CAM saliency heatmaps), and fail to provide multilingual conversational interfaces in vernacular languages (Sinhala and Tamil) required by rural smallholder farmers in developing nations.
          </p>

          <div className="research-takeaway-grid">
            <div className="research-takeaway-item">
              <span className="research-takeaway-icon"><AlertCircle size={18} /></span>
              <div>
                <strong>Isolated Single-Task Models</strong>
                <p>Prior work evaluates fungal diseases, microscopic pests, macronutrients, and bulb grading in separate silos rather than a cohesive lifecycle.</p>
              </div>
            </div>
            <div className="research-takeaway-item">
              <span className="research-takeaway-icon"><AlertCircle size={18} /></span>
              <div>
                <strong>Sterile Benchmark Vulnerability</strong>
                <p>Models trained on clean backgrounds degrade heavily under dynamic sunlight, canopy occlusion, and out-of-distribution farm images.</p>
              </div>
            </div>
            <div className="research-takeaway-item">
              <span className="research-takeaway-icon"><AlertCircle size={18} /></span>
              <div>
                <strong>Neglected Regional Dynamics</strong>
                <p>Conventional systems lack spatio-temporal transmission modeling across neighboring fields and miss micro-climatic weather triggers.</p>
              </div>
            </div>
            <div className="research-takeaway-item">
              <span className="research-takeaway-icon"><AlertCircle size={18} /></span>
              <div>
                <strong>Linguistic & Explainability Gaps</strong>
                <p>Existing mobile tools lack Grad-CAM agronomic validation and fail to offer vernacular Sinhala and Tamil natural language interaction.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="research-references-section" aria-label="Literature references">
          <div className="research-references-header">
            <div className="research-references-title-wrap">
              <h3>References</h3>
              <span className="research-count-badge">
                {filteredReferences.length} of {references.length} citations
              </span>
            </div>

            <div className="research-ref-search-wrap">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                value={refSearch}
                onChange={e => setRefSearch(e.target.value)}
                placeholder="Filter references by author, keyword, or venue…"
                aria-label="Filter references"
                className="research-ref-search-input"
              />
              {refSearch && (
                <button
                  type="button"
                  onClick={() => setRefSearch('')}
                  aria-label="Clear reference search"
                  className="research-ref-clear-btn"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <ol className="research-references-list">
            {filteredReferences.map(ref => (
              <li key={ref.id} className="research-reference-item">
                <span className="research-ref-badge">[{ref.id}]</span>
                <div className="research-ref-body">
                  <p className="research-ref-citation">
                    <strong>{ref.authors}</strong>, &ldquo;{ref.title},&rdquo; <em>{ref.venue}</em>.
                  </p>
                  <div className="research-ref-actions">
                    <span className="research-ref-label">Available at:</span>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="research-ref-link"
                      aria-label={`Open reference [${ref.id}] on ${ref.source} in new tab`}
                    >
                      <span>{ref.source}</span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {filteredReferences.length === 0 && (
            <div className="research-ref-empty">
              <p>No references match &ldquo;{refSearch}&rdquo;.</p>
              <button type="button" onClick={() => setRefSearch('')} className="research-pill-btn">
                Clear reference filter
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }

  // Chapter 1: Research Gap
  if (chapter === 1) {
    return (
      <div className="research-chapter-container">
        <div className="research-reading-card research-gap-card">
          <p className="research-body-text">
            Existing agricultural decision-support systems are critically fragmented, operating in isolated functional silos that fail to reflect real-world farm complexity. While contemporary solutions offer piecemeal tools for either basic disease classification or generic weather forecasts, they lack an interconnected, multi-agent framework capable of unifying foliar fungal pathology, microscopic pest infestation, soil macronutrient health, and post-harvest bulb quality into a single actionable pipeline. Current diagnostic models operate reactively rather than proactively, identifying damage only after economic threshold limits are exceeded without leveraging micro-climatic environmental risk forecasting or regional spatial-temporal disease transmission modeling. Furthermore, most systems suffer from severe out-of-distribution vulnerability (confidently misclassifying non-leaf images), lack continual learning mechanisms to recognize novel pests in the wild, offer no visual explainability to validate AI predictions to agronomists, and ignore vernacular linguistic accessibility (Sinhala and Tamil) and offline edge-computing constraints of rural smallholder farming communities. <strong>LunuNeth AI</strong> resolves this research gap by introducing a unified, multi-agent AI ecosystem that synergizes multi-stage disease diagnosis with longitudinal tracking, micro-pest detection with continual incremental learning, spatio-temporal graph neural forecasting with a trilingual conversational agent, and explainable nutrient-bulb grading aligned with official FCRDI agricultural agronomic standards.
          </p>
        </div>

        <div className="research-gap-breakdown">
          <h3 className="research-breakdown-title">Critical Limitations vs. The LunuNeth AI Solution</h3>
          <div className="research-gap-grid">
            <div className="research-gap-item">
              <div className="research-gap-col status-quo">
                <span className="gap-tag current">Conventional Fragmentation</span>
                <h4>Isolated Single-Task Prototypes</h4>
                <p>Treat foliar fungal diseases, microscopic pests, macronutrients, and post-harvest grading as disjointed problems with separate tools.</p>
              </div>
              <div className="research-gap-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </div>
              <div className="research-gap-col solution">
                <span className="gap-tag resolved">LunuNeth AI Resolution</span>
                <h4>Unified Multi-Agent Ecosystem</h4>
                <p>An integrated, multi-agent pipeline spanning the entire onion crop lifecycle with shared diagnostic state and longitudinal tracking.</p>
              </div>
            </div>

            <div className="research-gap-item">
              <div className="research-gap-col status-quo">
                <span className="gap-tag current">Conventional Fragmentation</span>
                <h4>Reactive Post-Threshold Diagnosis</h4>
                <p>Identifies crop damage only after visible symptoms breach economic thresholds, missing micro-climatic triggers.</p>
              </div>
              <div className="research-gap-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </div>
              <div className="research-gap-col solution">
                <span className="gap-tag resolved">LunuNeth AI Resolution</span>
                <h4>Proactive Spatio-Temporal Forecasting</h4>
                <p>Heterogeneous ST-GNN with SAGEConv models cross-farm transmission while weather APIs predict epidemiological risk before outbreak.</p>
              </div>
            </div>

            <div className="research-gap-item">
              <div className="research-gap-col status-quo">
                <span className="gap-tag current">Conventional Fragmentation</span>
                <h4>Out-of-Distribution Vulnerability</h4>
                <p>High confidence misclassifications on non-crop images and inability to learn emerging agricultural pests in dynamic fields.</p>
              </div>
              <div className="research-gap-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </div>
              <div className="research-gap-col solution">
                <span className="gap-tag resolved">LunuNeth AI Resolution</span>
                <h4>Continual Incremental Learning & OOD Filter</h4>
                <p>Botanical image validator flags non-foliar inputs, while CIL with exemplar memory continuously incorporates novel pests without catastrophic forgetting.</p>
              </div>
            </div>

            <div className="research-gap-item">
              <div className="research-gap-col status-quo">
                <span className="gap-tag current">Conventional Fragmentation</span>
                <h4>Linguistic & Offline Constraints</h4>
                <p>English-exclusive cloud-dependent interfaces inaccessible to smallholder farmers lacking high-bandwidth connectivity.</p>
              </div>
              <div className="research-gap-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </div>
              <div className="research-gap-col solution">
                <span className="gap-tag resolved">LunuNeth AI Resolution</span>
                <h4>Trilingual Voice Agent & Edge TinyML</h4>
                <p>Native conversational advisory in Sinhala, Singlish, and English paired with on-device quantized TFLite inference for zero-connectivity field use.</p>
              </div>
            </div>
          </div>

          <div className="research-gap-fcrdi-badge">
            <ShieldCheck size={20} className="fcrdi-icon" />
            <div>
              <strong>Agronomic Standards Alignment:</strong> Fully compliant with official Field Crops Research and Development Institute (FCRDI) pest, pathology, and nutrient management guidelines (Department of Agriculture, Mahailluppallama, Sri Lanka, 2026).
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chapter 2: Research Objectives
  if (chapter === 2) {
    return (
      <div className="research-chapter-container">
        <div className="research-objectives-grid">
          {components.map(obj => (
            <article key={obj.id} className="research-objective-card">
              <header className="objective-card-header">
                <div className="objective-badge-row">
                  <span className="objective-component-pill">Component {obj.id}</span>
                  <span className="objective-lead-pill">{obj.developer} · {obj.regNo}</span>
                </div>
                <h3>{obj.title}</h3>
              </header>

              <p className="objective-desc">{obj.objective}</p>

              <div className="objective-tags-wrap">
                {obj.tech.map(tag => (
                  <span key={tag} className="objective-tag">{tag}</span>
                ))}
              </div>

              <details className="objective-details-accordion">
                <summary>
                  <span>Explore component capabilities</span>
                </summary>
                <ul className="objective-capabilities-list">
                  {obj.features.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>
      </div>
    );
  }

  // Chapter 3: Methodology & Technologies
  return (
    <div className="research-chapter-container">
      <div className="research-methodology-card">
        <p className="research-body-text">
          The LunuNeth AI platform follows an Iterative Developmental Life Cycle (Agile Methodology), architected as a modular, consolidated microservices framework for high scalability and sub-second inference. Each specialized agricultural AI module operates independently while communicating seamlessly through an asynchronous RESTful API layer and centralized cloud data persistence.
        </p>

        <div className="methodology-pillars-grid">
          <div className="methodology-pillar-item">
            <span className="pillar-icon"><Sparkles size={18} /></span>
            <div>
              <strong>Iterative Agile Cycle</strong>
              <p>Continuous bi-weekly sprints, field data annotation loops, and direct feedback from Mahailluppallama agricultural extension officers.</p>
            </div>
          </div>
          <div className="methodology-pillar-item">
            <span className="pillar-icon"><Server size={18} /></span>
            <div>
              <strong>Consolidated Microservices</strong>
              <p>Independent containerized FastAPI endpoints coordinating PyTorch, TensorFlow, and GraphSAGE backends asynchronously.</p>
            </div>
          </div>
          <div className="methodology-pillar-item">
            <span className="pillar-icon"><Smartphone size={18} /></span>
            <div>
              <strong>Edge & Cloud Hybrid Resilience</strong>
              <p>On-device quantized TinyML for instant field feedback alongside cloud ST-GNN forecasting and MongoDB Atlas history synchronization.</p>
            </div>
          </div>
        </div>

        {/* View Switcher for Desktop / Mobile */}
        <div className="methodology-toolbar">
          <div className="methodology-toolbar-left">
            <h3>Architectural Technology Stack</h3>
            <span className="methodology-badge">7 Specialized AI & Software Modules</span>
          </div>
          <div className="methodology-view-toggle" role="group" aria-label="Change technology stack view">
            <button
              type="button"
              className={techView === 'table' ? 'is-active' : ''}
              onClick={() => setTechView('table')}
              aria-label="Table View"
            >
              <TableIcon size={16} /> <span>Table</span>
            </button>
            <button
              type="button"
              className={techView === 'cards' ? 'is-active' : ''}
              onClick={() => setTechView('cards')}
              aria-label="Card View"
            >
              <LayoutGrid size={16} /> <span>Cards</span>
            </button>
          </div>
        </div>

        {/* Table View (Responsive with horizontal scrolling and accessible cues) */}
        {techView === 'table' && (
          <div className="research-methodology-table-wrapper" tabIndex={0} aria-label="Methodology and technologies table">
            <table className="research-methodology-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="table-header-content">
                      <Cpu size={16} aria-hidden="true" />
                      <span>Data Science & AI Models</span>
                    </span>
                  </th>
                  <th scope="col">
                    <span className="table-header-content">
                      <Server size={16} aria-hidden="true" />
                      <span>Backend Stack</span>
                    </span>
                  </th>
                  <th scope="col">
                    <span className="table-header-content">
                      <Smartphone size={16} aria-hidden="true" />
                      <span>Mobile Interface & Frontend</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {methodologyTable.map((row, idx) => (
                  <tr key={idx}>
                    <td data-label="Data Science & AI Models">
                      <div className="tech-cell-content">
                        <strong className="tech-primary-name">{row.aiModel}</strong>
                        <span className="tech-role-desc">({row.aiRole})</span>
                      </div>
                    </td>
                    <td data-label="Backend Stack">
                      <div className="tech-cell-content">
                        <strong className="tech-primary-name">{row.backend}</strong>
                        <span className="tech-role-desc">({row.backendRole})</span>
                      </div>
                    </td>
                    <td data-label="Mobile Interface & Frontend">
                      <div className="tech-cell-content">
                        <strong className="tech-primary-name">{row.mobile}</strong>
                        <span className="tech-role-desc">({row.mobileRole})</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Card View (Mobile-first, stacked card view for smaller devices or card preference) */}
        {techView === 'cards' && (
          <div className="methodology-cards-grid">
            {methodologyTable.map((row, idx) => (
              <div key={idx} className="methodology-card-row">
                <div className="methodology-card-tier ai-tier">
                  <div className="tier-badge">
                    <Cpu size={14} /> <span>Data Science & AI Models</span>
                  </div>
                  <strong>{row.aiModel}</strong>
                  <span className="tier-role">({row.aiRole})</span>
                </div>

                <div className="methodology-card-tier backend-tier">
                  <div className="tier-badge">
                    <Server size={14} /> <span>Backend Stack</span>
                  </div>
                  <strong>{row.backend}</strong>
                  <span className="tier-role">({row.backendRole})</span>
                </div>

                <div className="methodology-card-tier mobile-tier">
                  <div className="tier-badge">
                    <Smartphone size={14} /> <span>Mobile Interface & Frontend</span>
                  </div>
                  <strong>{row.mobile}</strong>
                  <span className="tier-role">({row.mobileRole})</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="methodology-footer-note">
          <Layers size={16} aria-hidden="true" />
          <span>Iterative Developmental Life Cycle (Agile Methodology) with asynchronous RESTful API layer and centralized cloud data persistence.</span>
        </footer>
      </div>
    </div>
  );
}
