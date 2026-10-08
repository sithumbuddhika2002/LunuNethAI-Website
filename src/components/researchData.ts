import purpleBlotchProposal from '../../Proposal_Report_PurpleBlotch.md?raw';
import pestProposal from '../../Proposal_Report_PestDetection.md?raw';
import chatbotProposal from '../../Proposal_Report_Chatbot.md?raw';
import nutrientProposal from '../../Proposal_Report_NutrientDeficiency.md?raw';
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

export const components: ComponentDetail[] = [
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
      proposalContent: purpleBlotchProposal
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
      proposalContent: pestProposal
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
      proposalContent: chatbotProposal
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
      proposalContent: nutrientProposal
    }
  ];

