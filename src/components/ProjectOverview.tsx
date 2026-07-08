import { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Network, 
  Database, 
  CheckCircle2, 
  TrendingUp, 
  X, 
  Copy, 
  Download, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';

interface ComponentDetail {
  id: number;
  title: string;
  regNo: string;
  developer: string;
  objective: string;
  tech: string[];
  features: string[];
  proposalFile: string;
  proposalContent: string;
}

export default function ProjectOverview() {
  const [selectedProposal, setSelectedProposal] = useState<ComponentDetail | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'components' | 'tech' | 'impact'>('components');

  const components: ComponentDetail[] = [
    {
      id: 1,
      title: 'Purple Blotch Disease Detection',
      regNo: 'IT22054890',
      developer: 'Vidura Yasassri',
      objective: 'Mobile-optimized, AI-based detection and severity classification of the Alternaria porri fungal pathogen (Purple Blotch).',
      tech: ['EfficientNet-B0', 'MobileNetV3', 'Vision Transformers (ViT)', 'TinyML (INT8 Quantization)', 'AutoML (FLAML)', 'Grad-CAM'],
      features: [
        '4-level severity grading (Healthy, Early, Mid, Severe)',
        'Quantitative stress scoring (0–100%) based on surface area',
        'Grad-CAM explainability for active lesion highlighting',
        'AutoML-driven hyperparameter architecture optimization'
      ],
      proposalFile: 'Proposal_Report_PurpleBlotch.md',
      proposalContent: `# Research Proposal: Purple Blotch Disease Detection & Severity Classification
**Student Registration Number:** IT22054890  
**Research Domain:** Computer Vision & TinyML  
**Target Pathogen:** *Alternaria porri* (Purple Blotch Fungal Disease)

---

## 1. Introduction & Research Problem
Purple Blotch, caused by the fungal pathogen *Alternaria porri*, is one of the most destructive leaf diseases affecting onion cultivation in Sri Lanka, causing crop losses up to 30-50%. Traditional visual inspection is subjective, error-prone, and usually occurs at late stages. Early, local, offline visual diagnostics are critical to mitigating crop loss.

## 2. Research Objectives
- Design a lightweight deep learning classifier capable of execution on mid-range agricultural edge devices.
- Categorize leaf infection into 4 distinct severity stages (Healthy, Early, Mid, Severe).
- Compute a continuous quantitative stress score (0–100%) reflecting lesion surface coverage.
- Provide explainable highlight regions (Grad-CAM maps) to prevent black-box model mistrust.

## 3. Methodology & Deep Learning Architecture
- **Base Classifier:** MobileNetV3-Small / EfficientNet-B0 fine-tuned on custom high-resolution Sri Lankan field datasets.
- **Model Compression (TinyML):** Post-training 8-bit Integer Quantization (INT8) and weight pruning, reducing the footprint to <5MB.
- **Explainability Layer:** Grad-CAM activation mapping hooked into the final convolutional layer to output bounding overlays representing lesion coordinates.
- **AutoML (FLAML/Optuna):** Optimized for hyperparameter grid tuning (learning rates, batch sizes, and weight decay).

## 4. Verification & Validation Metrics
- **Performance targets:** mAP50 > 93%, inference latency <120ms on ARM-based smartphones.
- **Accuracy baseline:** Compared against annotations signed off by the Field Crops Research and Development Institute (FCRDI).`
    },
    {
      id: 2,
      title: 'Thrips Pest Detection',
      regNo: 'IT22226464',
      developer: 'Senura Jayasinghe',
      objective: 'Small-object detection to localize and quantify Thysanoptera (Thrips) infestations in field images.',
      tech: ['YOLOv8', 'Faster R-CNN', 'Sliced Aided Hyper Inference (SAHI)', 'Focal Loss', 'TensorFlow Lite', 'Anchor Box Tuning'],
      features: [
        'Pest bounding box localization with high-precision metrics',
        'Infestation severity heatmaps (Low/Medium/High)',
        'TinyML edge deployment with models optimized below 10MB',
        'Integrated Pest Management (IPM) threshold recommendations'
      ],
      proposalFile: 'Proposal_Report_PestDetection.md',
      proposalContent: `# Research Proposal: Small-Object Detection & Bounding Localization for Onion Thrips
**Student Registration Number:** IT22226464  
**Research Domain:** Object Detection & Edge Diagnostics  
**Target Pest:** *Thysanoptera* (Onion Thrips)

---

## 1. Introduction & Research Problem
Onion Thrips (*Thysanoptera*) are highly mobile, small insects that feed on leaf surfaces, causing silvering, curling, and eventually leaf death. Due to their minute size (<2mm) and tendency to hide within inner leaf sheaths, standard object detection models suffer from extreme false-negative rates. This research develops a highly precise small-object detection pipeline that localizes and quantifies thrips under varying field lighting conditions.

## 2. Research Objectives
- Localize and draw boundary boxes around individual thrips insects.
- Implement Sliced Aided Hyper Inference (SAHI) to handle sub-visual objects in large drone-scale images.
- Define a 3-level infestation severity heatmap (Low, Medium, High) based on spatial pest density.
- Trigger Integrated Pest Management (IPM) thresholds to advise precise insecticide spraying schedules.

## 3. Technology Stack & Edge Optimization
- **Detection Architectures:** YOLOv8 (Ultralytics) and Faster R-CNN (ResNet50).
- **Optimization Layers:** Bounding box anchor tuning optimized with K-Means clustering, focal loss to handle extreme background-class imbalance.
- **TinyML Compression:** Magnitude-based weight pruning and TensorFlow Lite float16/int8 post-training quantization.
- **Model Size Target:** <10MB storage footprint, enabling offline execution.

## 4. Verification & Validation Metrics
- **Accuracy baseline:** Mean Average Precision (mAP50) target > 90%.
- **Validation dataset:** Field-collected high-macro images annotated using Roboflow/LabelStudio and validated by senior entomologists.`
    },
    {
      id: 3,
      title: 'Trilingual Chatbot & Context-Aware Diagnostics',
      regNo: 'IT22087256',
      developer: 'Sithum Buddika',
      objective: 'A Spatio-Temporal Graph Neural Network (ST-GNN) that fuses text symptoms, geolocation, and temporal weather arrays to output dynamic agricultural advice in Sinhala, Singlish, or English.',
      tech: ['mBERT Embeddings', 'GraphSAGE', 'Graph Attention Networks (GAT)', 'pgmpy Bayesian Belief Networks', 'OpenWeatherMap API', 'mT5 / mBART'],
      features: [
        'Replaces simple keyword matching with robust graph-based Bayesian reasoning',
        'Integrates confidence scores from visual models as "nodes" in the graph',
        'Provides multi-turn conversational differential diagnosis',
        'Supports native code-switching dialogue (Sinhala, English, Singlish)'
      ],
      proposalFile: 'Proposal_Report_Chatbot.md',
      proposalContent: `# Research Proposal: Spatio-Temporal Graph Neural Networks & Trilingual Chatbot Advisory
**Student Registration Number:** IT22087256  
**Research Domain:** Natural Language Processing (NLP) & Graph Machine Learning  
**Target Core:** Spatio-Temporal Graph Inference and Multilingual Symptom Dialogue

---

## 1. Introduction & Research Problem
Agricultural diagnostic models often evaluate images in isolation, ignoring critical contextual dimensions like weather (e.g., high humidity triggers fungus) and spatial adjacency (e.g., infected neighbor farms). Additionally, language barriers prevent local smallholder farmers from adopting high-tech models. This component introduces an ST-GNN framework connected to a trilingual chatbot interface supporting English, Sinhala, and Singlish code-switching dialogue.

## 2. Research Objectives
- Build a multilingual sequence-to-sequence model capable of processing mixed-code inputs (Singlish).
- Design a Spatio-Temporal Graph Neural Network (ST-GNN) that links temperature/humidity curves, GPS locations, and observed symptoms into a graph.
- Construct a Bayesian Belief Network (pgmpy) for reasoning through uncertainty.
- Integrate inference outputs from vision sub-systems as evidence nodes to guide interactive multi-turn diagnostic interviews.

## 3. Technology Stack & Inference Routing
- **NLP Models:** mBERT for multilingual sentence embedding, fine-tuned mT5/mBART for advice generation.
- **Graph Framework:** PyTorch & PyTorch Geometric (GAT/GraphSAGE architectures) utilizing spatio-temporal nodes.
- **Context API:** Central backend querying OpenWeatherMap API for 5-day temperature/humidity trends.
- **Backend Core:** Central FastAPI asynchronous controller.

## 4. Verification & Validation Metrics
- **Language metrics:** BLEU / ROUGE score > 0.82 on Sinhala/Singlish agronomic corpus.
- **Reasoning Accuracy:** Outperform standard rule-based diagnostic frameworks by >20% in complex multi-disease edge scenarios.`
    },
    {
      id: 4,
      title: 'Nutrient Deficiency Detection',
      regNo: 'IT22142528',
      developer: 'Kaveesha Silva',
      objective: 'Image-based classification and regression model to identify Nitrogen, Phosphorus, Potassium, Magnesium, and Calcium deficiencies.',
      tech: ['MobileNetV3', 'Engineered Color Index (RGB/HSV)', 'Engineered Texture Index (GLCM)', 'SHAP Explainability', 'Grad-CAM', 'TFLite Quantization'],
      features: [
        'Lab-free N/P/K stress scores mapping to smallholder-calibrated fertilizer volumes',
        'Incorporates SHAP and Grad-CAM for predicting and explaining localized leaf discoloration',
        'Distinguishes nutrient damage from disease damage independently',
        'Feature fusion combining deep features with engineered indices'
      ],
      proposalFile: 'Proposal_Report_NutrientDeficiency.md',
      proposalContent: `# Research Proposal: Feature-Fusion Classification & SHAP explainability for Nutrient Deficiencies
**Student Registration Number:** IT22142528  
**Research Domain:** Hybrid Computer Vision & Model Interpretability  
**Target Nutrients:** Nitrogen (N), Phosphorus (P), Potassium (K), Magnesium (Mg), Calcium (Ca)

---

## 1. Introduction & Research Problem
Nutrient deficiencies represent a silent yield killer, often manifesting as subtle leaf discoloration (chlorosis, necrosis) that is difficult to visually isolate from pest or disease lesions. Lab-based tissue tests are expensive and logistically impractical for local farmers. This research aims to develop a feature-fusion model that maps leaf color and texture variations to precise soil fertilizer requirements.

## 2. Research Objectives
- Identify and classify N, P, K, Mg, Ca deficiencies from raw mobile leaf images.
- Combine deep learning convolutional features with engineered physical color/texture indices.
- Map deficiencies to localized, smallholder-calibrated fertilizer volumes (FCRDI guidelines).
- Use SHAP (SHapley Additive exPlanations) and Grad-CAM to highlight exactly what pixel clusters (discoloration vs structural leaf shape) drove the model's prediction.

## 3. Technology Stack & Fusion Architecture
- **Deep Feature Extractor:** MobileNetV3 / ResNet.
- **Engineered Feature Extractors:** OpenCV leaf segmentation, RGB/HSV color moments, and Gray-Level Co-occurrence Matrix (GLCM) texture metrics.
- **Explainability:** SHAP values for global feature attribution, Grad-CAM overlays for local explainability.
- **Quantization:** TFLite float16 conversion to fit edge devices.

## 4. Verification & Validation Metrics
- **Performance Targets:** F1-score > 92% on test validation datasets.
- **Explainability Validation:** Coherence overlap test comparing SHAP highlights to agronomic ground-truth damage boundaries.`
    }
  ];

  const handleCopyPath = (file: string) => {
    navigator.clipboard.writeText(`D:/git/LunuNethAI-Website/${file}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="overview-page-wrapper">
      
      {/* Header Banner */}
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <div className="hero-tag" style={{ margin: '0 auto 1rem auto' }}>
          <span></span> Precision Agriculture Framework
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)', fontWeight: 800, textAlign: 'center', margin: '1rem 0', lineHeight: 1.2 }}>
          🌱 LunuNeth AI <span className="gradient-text">Project Overview</span>
        </h1>
        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)', color: 'var(--text-secondary)' }}>
          An integrated, mobile-first AI diagnostic framework specifically built for Sri Lankan onion farmers. 
          Unifying four distinct intelligent sub-systems covering NLP, Computer Vision, and Spatio-Temporal Graph Inference.
        </p>
      </div>

      {/* Tab controls */}
      <div className="flex-center" style={{ marginBottom: '3.5rem', width: '100%' }}>
        <div className="overview-tabs-container">
          <button 
            onClick={() => setActiveTab('components')}
            className={`filter-pill ${activeTab === 'components' ? 'active' : ''}`}
          >
            <Layers className="w-4 h-4 inline-block mr-2" /> Core Components
          </button>
          <button 
            onClick={() => setActiveTab('tech')}
            className={`filter-pill ${activeTab === 'tech' ? 'active' : ''}`}
          >
            <Cpu className="w-4 h-4 inline-block mr-2" /> Tech Stack Fusions
          </button>
          <button 
            onClick={() => setActiveTab('impact')}
            className={`filter-pill ${activeTab === 'impact' ? 'active' : ''}`}
          >
            <TrendingUp className="w-4 h-4 inline-block mr-2" /> Impact & Commercialization
          </button>
        </div>
      </div>

      {/* TAB CONTENT: COMPONENTS */}
      {activeTab === 'components' && (
        <div>
          <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }} className="gradient-text">🏗️ System Architecture & Four AI Sub-systems</h3>
            <p style={{ maxWidth: '100%', margin: '0.5rem 0 0 0' }}>Click "Read Research Proposal" to examine the comprehensive theoretical formulations and annotations guidelines for each module.</p>
          </div>

          <div className="project-components-grid">
            {components.map((comp) => (
              <div key={comp.id} className="glass-card project-comp-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderColor: 'rgba(16, 185, 129, 0.15)', transition: 'transform 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--accent-secondary)', background: 'rgba(0, 255, 135, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 'bold' }}>
                    {comp.regNo}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Component {comp.id}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{comp.title}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontWeight: 500 }}>
                  Developed by: {comp.developer}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.5' }}>
                  {comp.objective}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Core Technologies</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {comp.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                        {t}
                      </span>
                    ))}
                    {comp.tech.length > 4 && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+{comp.tech.length - 4} more</span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProposal(comp)}
                  className="outline-btn" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.6rem 0', fontSize: '0.8rem', gap: '0.5rem' }}
                >
                  <BookOpen size={14} /> Read Research Proposal <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: TECH STACK */}
      {activeTab === 'tech' && (
        <div className="glass-card project-tech-wrapper-card" style={{ borderColor: 'rgba(16, 185, 129, 0.1)' }}>
          <div className="project-tech-grid">
            
            {/* Tech Column 1 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px' }}><Cpu /></div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Computer Vision & TinyML</h4>
              </div>
              <ul className="showcase-bullets" style={{ paddingLeft: 0 }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>TensorFlow / Keras:</strong> Object detection and custom CNN architectures.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>YOLOv8 & Faster R-CNN:</strong> High-precision small target thrips localization.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>TensorFlow Lite (TFLite):</strong> INT8 Post-training Quantization for offline smartphone inference.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Grad-CAM & SHAP:</strong> Attributing pixel saliency to localized symptoms.</span>
                </li>
              </ul>
            </div>

            {/* Tech Column 2 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px' }}><Network /></div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>NLP & Graph Neural Networks</h4>
              </div>
              <ul className="showcase-bullets" style={{ paddingLeft: 0 }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>PyTorch Geometric:</strong> Spatio-Temporal Graph Neural Networks (ST-GNN) modeling adjacency risk.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>HuggingFace Transformers:</strong> fine-tuned mBERT, mT5/mBART for code-switched dialogues.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>pgmpy Framework:</strong> Bayesian networks linking climatic weather variables with crop symptoms.</span>
                </li>
              </ul>
            </div>

            {/* Tech Column 3 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px' }}><Database /></div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Infrastructure & Routing</h4>
              </div>
              <ul className="showcase-bullets" style={{ paddingLeft: 0 }}>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Flutter Mobile:</strong> Lightweight client application supporting offline SQLite caching and on-device camera scans.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>FastAPI Routing:</strong> central async Python server routing backend models via Docker HuggingFace spaces.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Firebase / MongoDB Atlas:</strong> Persistent storage for conversational states, crop anomaly telemetry, and user logs.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: IMPACT */}
      {activeTab === 'impact' && (
        <div className="project-impact-grid">
          
          <div className="glass-card project-impact-card" style={{ borderColor: 'rgba(16, 185, 129, 0.1)' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-secondary)' }}>📉 Agronomic Yield Crisis</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Sri Lanka imports approximately <strong>200,000 metric tons of onions annually</strong> due to severe local production gaps. 
              Pathogens, pests (thrips), and erratic nutrient distribution strip up to <strong>40% of crop yields</strong>, driving local onion prices high and causing financial strain for smallholder farmers.
            </p>
          </div>

          <div className="glass-card project-impact-card" style={{ borderColor: 'rgba(16, 185, 129, 0.1)' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-secondary)' }}>📶 Offline Edge Independence</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Most rural agricultural zones suffer from unstable internet connectivity. 
              LunuNeth AI addresses this bottleneck by compressing its main computer vision models (MobileNetV3 and YOLOv8) into 
              <strong>under 10MB TFLite assets</strong>, enabling 100% offline local scanning without requiring cellular signal.
            </p>
          </div>

          <div className="glass-card project-impact-card" style={{ borderColor: 'rgba(16, 185, 129, 0.1)' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-secondary)' }}>💬 Code-Switched Chatbot Advisory</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Instead of forcing farmers to interact in formal English or Sinhala text, the chatbot fine-tunes mBERT to support 
              <strong>native code-switching (Singlish) dialogue</strong>. Farmers can type symptoms exactly how they speak colloquially (e.g. 
              <em>"leaf wala purple spots hedenne ai?"</em>) to receive validated treatments.
            </p>
          </div>

        </div>
      )}

      {/* Getting Started Terminal Block */}
      <div className="glass-card project-setup-card" style={{ marginTop: '3.5rem', border: '1px dashed var(--accent-glow-strong)' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>🚀 Quick Setup & Local Execution</h4>
        <div className="project-setup-grid">
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Python Backend APIs</div>
            <pre style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', fontSize: '0.75rem', fontFamily: 'monospace', color: '#10b981', overflowX: 'auto' }}>
{`cd backend
python -m venv venv
venv\\Scripts\\activate  # Windows
pip install -r requirements.txt
python main.py`}
            </pre>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Flutter Mobile App Client</div>
            <pre style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-glass)', fontSize: '0.75rem', fontFamily: 'monospace', color: '#0ea5e9', overflowX: 'auto' }}>
{`cd lununeth_ai
flutter pub get
flutter run`}
            </pre>
          </div>
        </div>
      </div>

      {/* PROPOSAL VIEW MODAL PORTAL */}
      {selectedProposal && (
        <div className="modal-backdrop-overlay" style={{ zIndex: 1100 }} onClick={() => setSelectedProposal(null)}>
          <div className="modal-panel-container" style={{ maxWidth: '800px', width: '90%' }} onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="modal-header-row" style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.25rem' }}>
              <div className="modal-title-group">
                <span className="modal-category-badge" style={{ color: 'var(--accent-secondary)' }}>RESEARCH PROPOSAL REPORT</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedProposal.title}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                  Student ID: {selectedProposal.regNo} | Led by: {selectedProposal.developer}
                </div>
              </div>
              <button onClick={() => setSelectedProposal(null)} className="modal-close-btn flex-center">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-body-scrollable" style={{ padding: '2rem 0' }}>
              
              {/* Proposal Document Body */}
              <div className="proposal-md-body" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border-glass)', minHeight: '300px' }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  {selectedProposal.proposalContent}
                </pre>
              </div>

              {/* Actions panel */}
              <div className="modal-actions-row">
                <button 
                  onClick={() => handleCopyPath(selectedProposal.proposalFile)}
                  className="outline-btn"
                  style={{ gap: '0.5rem', fontSize: '0.8rem' }}
                >
                  <Copy size={13} /> {copySuccess ? 'Copied Path!' : 'Copy Local Path'}
                </button>
                <button 
                  onClick={() => {
                    const blob = new Blob([selectedProposal.proposalContent], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = selectedProposal.proposalFile;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="solid-btn"
                  style={{ gap: '0.5rem', fontSize: '0.8rem' }}
                >
                  <Download size={13} /> Download Markdown (.md)
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
