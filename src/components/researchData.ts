import purpleBlotchProposal from '../../Proposal_Report_PurpleBlotch.md?raw';
import pestProposal from '../../Proposal_Report_PestDetection.md?raw';
import chatbotProposal from '../../Proposal_Report_Chatbot.md?raw';
import nutrientProposal from '../../Proposal_Report_NutrientDeficiency.md?raw';

export interface ComponentDetail {
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

export const components: ComponentDetail[] = [
  {
    id: 1,
    title: 'Foliar Disease Analysis & Progression Modeling (Component 1)',
    regNo: 'IT22054890',
    developer: 'Vidura Yasassri',
    objective: 'To develop a multi-stage deep convolutional neural network (EfficientNet-B0/B3) for foliar fungal disease diagnosis (Purple Blotch & Anthracnose across early and severe stages), integrated with a real-time weather-driven epidemiological infection-risk forecaster, a botanical image validator, an on-device TinyML offline fallback, and longitudinal field progression tracking.',
    tech: [
      'EfficientNet-B0 / B3',
      'TinyML (Quantized TFLite)',
      'Botanical Image Validator',
      'Weather Infection Forecaster',
      'Longitudinal Field Tracker',
      'Grad-CAM Saliency Mapping'
    ],
    features: [
      'Multi-stage deep CNN classification for Purple Blotch & Anthracnose across early and severe stages',
      'Real-time weather-driven epidemiological infection-risk forecaster',
      'Botanical image validator to detect out-of-distribution inputs',
      'On-device TinyML offline fallback for zero-connectivity environments',
      'Longitudinal field progression tracking'
    ],
    proposalFile: 'Proposal_Report_PurpleBlotch.md',
    proposalContent: purpleBlotchProposal
  },
  {
    id: 2,
    title: 'Intelligent Pest Detection & Continual Learning (Component 2)',
    regNo: 'IT22226464',
    developer: 'Senura Jayasinghe',
    objective: 'To engineer an automated insect pest detection and damage quantification system utilizing YOLOv8 and Faster R-CNN augmented with Slicing Aided Hyper Inference (SAHI) for small pest identification (Thrips, Caterpillars, Stem Borers), backed by Continual Incremental Learning (CIL) to adapt to emerging agricultural pests without catastrophic forgetting.',
    tech: [
      'YOLOv8 & Faster R-CNN',
      'SAHI (Slicing Aided Hyper Inference)',
      'Continual Incremental Learning (CIL)',
      'Exemplar Memory Replay',
      'TensorFlow Lite / TinyML'
    ],
    features: [
      'Automated insect pest detection and damage quantification',
      'SAHI augmentation for small microscopic pests (Thrips, Caterpillars, Stem Borers)',
      'Continual Incremental Learning (CIL) to recognize novel pests in the wild without catastrophic forgetting',
      'Dynamic bounding box localization and infestation scoring',
      'Sub-second inference optimized for mobile and field conditions'
    ],
    proposalFile: 'Proposal_Report_PestDetection.md',
    proposalContent: pestProposal
  },
  {
    id: 3,
    title: 'Conversational AgriBot & Spatio-Temporal Disease Forecasting (Component 3)',
    regNo: 'IT22087256',
    developer: 'Sithum Buddika',
    objective: 'To establish an interactive multilingual conversational advisory agent supporting Sinhala, Singlish, and English via natural language processing, integrated with a Heterogeneous Spatio-Temporal Graph Neural Network (ST-GNN using SAGEConv) to model regional cross-farm disease spread patterns and assess seed quality.',
    tech: [
      'Heterogeneous ST-GNN',
      'SAGEConv Graph Neural Core',
      'Multilingual NLP (Sinhala, Singlish, English)',
      'Open-Meteo & Nominatim Geocoding',
      'Interactive Voice & Audio Interface',
      'Seed Quality Assessment'
    ],
    features: [
      'Interactive multilingual advisory agent supporting Sinhala, Singlish, and English via NLP',
      'Heterogeneous Spatio-Temporal Graph Neural Network (ST-GNN using SAGEConv)',
      'Regional cross-farm disease spread patterns modeling',
      'Micro-climatic environmental trigger integration',
      'Onion seed quality assessment and agronomic advisory'
    ],
    proposalFile: 'Proposal_Report_Chatbot.md',
    proposalContent: chatbotProposal
  },
  {
    id: 4,
    title: 'Foliar Nutrient Deficiency & Bulb Quality Assessment (Component 4)',
    regNo: 'IT22142528',
    developer: 'Kaveesha Silva',
    objective: 'To implement an explainable deep learning pipeline with Grad-CAM visual attention mapping for identifying Nitrogen (N), Phosphorus (P), and Potassium (K) foliar deficiencies, combined with computer vision-based post-harvest onion bulb quality classification and grading (Export, Domestic, Reject) to maximize market value.',
    tech: [
      'Grad-CAM Visual Saliency Heatmaps',
      'N-P-K Foliar Deficiency Classification',
      'Bulb Quality Computer Vision Classifier',
      'Export, Domestic, Reject Grading',
      'FCRDI Agronomic Standards Alignment',
      'TFLite Quantized Edge Model'
    ],
    features: [
      'Explainable deep learning pipeline with Grad-CAM visual attention mapping',
      'Identification of Nitrogen (N), Phosphorus (P), and Potassium (K) foliar deficiencies',
      'Computer vision-based post-harvest onion bulb quality classification and grading (Export, Domestic, Reject)',
      'Direct alignment with official FCRDI agricultural agronomic standards',
      'Optimization of harvest market value for smallholder farmers'
    ],
    proposalFile: 'Proposal_Report_NutrientDeficiency.md',
    proposalContent: nutrientProposal
  }
];
