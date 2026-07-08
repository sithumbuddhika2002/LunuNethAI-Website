export const CATEGORIES = [
  'Purple Blotch Disease Detection',
  'Trilingual Chatbot & Context-Aware Diagnostics',
  'Thrips Pest Detection',
  'Nutrient Deficiency Detection',
  'Mobile App Interfaces'
] as const;

export type CategoryType = typeof CATEGORIES[number];

export interface SpecItem {
  label: string;
  value: string;
}

export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  category: CategoryType;
  title: string;
  desc: string;
  badge: string;
  imagePath?: string;
  svgPreset?: 'vision-rcnn' | 'vision-cam' | 'data-bert' | string;
  svgMarkup?: string;
  specs: SpecItem[];
  telemetryJson: string;
  date: string;
}

const LOCAL_STORAGE_KEY = 'lununeth_research_logs';

// Default items pre-mapped to new categories and with specs/telemetry populated
const DEFAULT_LOGS: GalleryItem[] = [
  {
    id: 2,
    type: 'video',
    category: 'Thrips Pest Detection',
    title: 'Faster R-CNN Inference Session',
    desc: 'Video capture demonstrating PyTorch pest detection model processing thrips target coordinates on leaves.',
    badge: 'Model Inference Log',
    svgPreset: 'vision-rcnn',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'Faster R-CNN ResNet50' },
      { label: 'Target Coordinates', value: 'Coco-annotations [.json]' },
      { label: 'Avg Inference Speed', value: '24.8 FPS (server)' },
      { label: 'Precision Metric (mAP50)', value: '94.2%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1002",
        timestamp: "2026-06-25T10:15:30Z",
        category: "THRIPS PEST DETECTION",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        pipeline_integrity: 1.00,
        data_packet_loss: "0.00%"
      },
      model_metrics: {
        confidence_threshold: 0.65,
        detections_in_frame: 2,
        bounding_box_format: "xyxy"
      }
    }, null, 2)
  },
  {
    id: 4,
    type: 'video',
    category: 'Nutrient Deficiency Detection',
    title: 'EfficientNet Grad-CAM Validation',
    desc: 'Thermal heatmap mapping showing where the convolutional neural network focuses when identifying Potassium deficiency.',
    badge: 'Grad-CAM Video Log',
    svgPreset: 'vision-cam',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'EfficientNet-B4 CNN' },
      { label: 'Target Coordinates', value: 'Activation mapping' },
      { label: 'Avg Inference Speed', value: '31.2 ms (server)' },
      { label: 'Precision Metric (mAP50)', value: '96.8%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1004",
        timestamp: "2026-06-25T10:18:22Z",
        category: "NUTRIENT DEFICIENCY DETECTION",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        pipeline_integrity: 1.00,
        data_packet_loss: "0.00%"
      },
      model_metrics: {
        confidence_threshold: 0.70,
        detections_in_frame: 1,
        activation_type: "Grad-CAM"
      }
    }, null, 2)
  },
  {
    id: 6,
    type: 'video',
    category: 'Trilingual Chatbot & Context-Aware Diagnostics',
    title: 'AgriBot BERT Intent Classification Logs',
    desc: 'Real-time classification training dashboard showing BERT model intent categorizations.',
    badge: 'BERT Analytics Video',
    svgPreset: 'data-bert',
    date: 'June 25, 2026',
    specs: [
      { label: 'Data Model Focus', value: 'Transformer intent classification' },
      { label: 'Inference Engine', value: 'HuggingFace pipelines' },
      { label: 'Data Set Volume', value: '14,200 active logs' },
      { label: 'Classification Accuracy', value: '98.4% F1-Score' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1006",
        timestamp: "2026-06-25T10:20:45Z",
        category: "TRILINGUAL CHATBOT",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        pipeline_integrity: 1.00,
        data_packet_loss: "0.00%"
      }
    }, null, 2)
  },
  {
    id: 7,
    type: 'image',
    category: 'Mobile App Interfaces',
    title: 'LunuNeth AI Home Dashboard',
    desc: 'Overview of crop health, localized weather alerts, and rapid diagnostic options for farmers.',
    badge: 'App UI Dashboard',
    imagePath: './images/1.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Interface Layer', value: 'Flutter Core UI' },
      { label: 'Integration API', value: 'FastAPI router connection' },
      { label: 'Localization Standard', value: 'Sinhala, Tamil, English' },
      { label: 'Telemetry Caching', value: 'Local SQLite DB' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1007",
        timestamp: "2026-06-25T10:30:15Z",
        category: "TRILINGUAL CHATBOT",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        client_version: "v1.0.4-beta"
      }
    }, null, 2)
  },
  {
    id: 8,
    type: 'image',
    category: 'Thrips Pest Detection',
    title: 'Pest Detection Camera Interface',
    desc: 'Real-time edge computer vision scanning onion leaves for active thrips presence.',
    badge: 'Edge AI Scanner',
    imagePath: './images/2.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'YOLOv8 Edge' },
      { label: 'Target Coordinates', value: 'Bounding boxes [.json]' },
      { label: 'Avg Inference Speed', value: '15.4 ms (mobile)' },
      { label: 'Precision Metric (mAP50)', value: '92.1%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1008",
        timestamp: "2026-06-25T10:32:00Z",
        category: "THRIPS PEST DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        device_temperature: "42.5 C",
        fps_edge: 30.0
      }
    }, null, 2)
  },
  {
    id: 9,
    type: 'image',
    category: 'Trilingual Chatbot & Context-Aware Diagnostics',
    title: 'AgriBot Interactive Advisory',
    desc: 'AI conversational agent providing personalized fertilization schedules and disease mitigation advice.',
    badge: 'LLM Advisory',
    imagePath: './images/3.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'Llama-3-FineTuned' },
      { label: 'Inference Engine', value: 'FastAPI Server / HuggingFace' },
      { label: 'Language Compatibility', value: 'Trilingual (EN, SI, TA)' },
      { label: 'Response Latency', value: '1.2 seconds' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1009",
        timestamp: "2026-06-25T10:35:10Z",
        category: "TRILINGUAL CHATBOT",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        tokens_per_second: 45.2,
        context_window: "8k tokens"
      }
    }, null, 2)
  },
  {
    id: 10,
    type: 'image',
    category: 'Purple Blotch Disease Detection',
    title: 'Spatio-Temporal Disease Map',
    desc: 'Geographic heatmaps indicating high-risk zones for Purple Blotch spread based on local microclimate sensors.',
    badge: 'Disease Spread Map',
    imagePath: './images/4.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Focus', value: 'Spatio-Temporal GNN' },
      { label: 'Data Inputs', value: 'IoT telemetry & humidity indexes' },
      { label: 'Map Resolution', value: '10m x 10m grid nodes' },
      { label: 'Prediction Accuracy', value: '89.4% precision' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1010",
        timestamp: "2026-06-25T10:38:00Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        active_sensor_nodes: 14,
        heat_index: 0.72
      }
    }, null, 2)
  },
  {
    id: 11,
    type: 'image',
    category: 'Purple Blotch Disease Detection',
    title: 'Leaf Disease Diagnostic Report',
    desc: 'Onion leaf disease diagnostic results showcasing confidence scores and recommended treatments for downy mildew.',
    badge: 'Inference Report',
    imagePath: './images/5.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'EfficientNet CNN Classifier' },
      { label: 'Target Disease', value: 'Alternaria porri / Peronospora' },
      { label: 'Avg Inference Speed', value: '18.2 ms' },
      { label: 'Precision Metric (mAP50)', value: '95.6%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1011",
        timestamp: "2026-06-25T10:40:00Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        result_confidence: 0.958,
        disease_detected: "Purple Blotch"
      }
    }, null, 2)
  },
  {
    id: 12,
    type: 'image',
    category: 'Purple Blotch Disease Detection',
    title: 'Downy Mildew Severity Analysis',
    desc: 'Quantitative segmentation showing leaf surface area affected by active fungal growth.',
    badge: 'Vision Segmentation',
    imagePath: './images/6.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'U-Net Segmentation' },
      { label: 'Output Map', value: 'Binary pixel mask' },
      { label: 'Avg Inference Speed', value: '45.1 ms' },
      { label: 'Precision Metric (IoU)', value: '88.5%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1012",
        timestamp: "2026-06-25T10:42:15Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        lesion_pixel_ratio: 0.142,
        leaf_severity_class: "MODERATE"
      }
    }, null, 2)
  },
  {
    id: 13,
    type: 'image',
    category: 'Purple Blotch Disease Detection',
    title: 'Real-Time Sensor Node Network',
    desc: 'Grid coordinates of field-deployed IoT humidity and temperature nodes for early warning networks.',
    badge: 'IoT Telemetry',
    imagePath: './images/7.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Protocol / Sensor', value: 'IoT Soil & Air telemetry' },
      { label: 'Connection Standard', value: 'LoRaWAN node protocol' },
      { label: 'Sampling Interval', value: 'Every 15 minutes' },
      { label: 'Signal Quality (RSSI)', value: '-68 dBm (stable)' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1013",
        timestamp: "2026-06-25T10:45:00Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        active_nodes: 8,
        battery_voltage: "3.62 V"
      }
    }, null, 2)
  },
  {
    id: 14,
    type: 'image',
    category: 'Purple Blotch Disease Detection',
    title: 'Weather and Microclimate Analytics',
    desc: 'Deep dive into historical relative humidity curves predicting spore germination thresholds.',
    badge: 'Sensor Analytics',
    imagePath: './images/8.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Protocol / Sensor', value: 'Relative Humidity Sensor' },
      { label: 'Connection Standard', value: 'SPI local bus interface' },
      { label: 'Sampling Interval', value: 'Every 10 seconds' },
      { label: 'Signal Quality (RSSI)', value: 'Local logging (internal)' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1014",
        timestamp: "2026-06-25T10:48:30Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        humidity_avg: "84.2%",
        temperature_avg: "24.8 C"
      }
    }, null, 2)
  },
  {
    id: 15,
    type: 'image',
    category: 'Nutrient Deficiency Detection',
    title: 'Onion Crop Development Stage Tracker',
    desc: 'Automatic identification of phenological growth stages using multi-spectral images.',
    badge: 'Phenology Classifier',
    imagePath: './images/9.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'ResNet50 Classifier' },
      { label: 'Target Coordinates', value: 'Global image scale' },
      { label: 'Avg Inference Speed', value: '20.4 ms' },
      { label: 'Precision Metric (mAP50)', value: '94.7%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1015",
        timestamp: "2026-06-25T10:50:00Z",
        category: "NUTRIENT DEFICIENCY DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        phenology_stage: "Bulbing",
        confidence: 0.97
      }
    }, null, 2)
  },
  {
    id: 16,
    type: 'image',
    category: 'Purple Blotch Disease Detection',
    title: 'Purple Blotch Diagnostic Logs',
    desc: 'Field-level model output capturing early necrotic lesions on onion leaves.',
    badge: 'Disease Diagnosis',
    imagePath: './images/10.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'Faster R-CNN ResNet50' },
      { label: 'Target Coordinates', value: 'Alternaria lesions' },
      { label: 'Avg Inference Speed', value: '28.4 ms' },
      { label: 'Precision Metric (mAP50)', value: '93.5%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1016",
        timestamp: "2026-06-25T10:52:12Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        lesions_detected: 4,
        max_confidence: 0.88
      }
    }, null, 2)
  },
  {
    id: 17,
    type: 'image',
    category: 'Thrips Pest Detection',
    title: 'Thrips Population Trend Analysis',
    desc: 'Historical graph predicting pest spikes based on temperature trends and humidity indices.',
    badge: 'Pest Forecast',
    imagePath: './images/11.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Data Model Focus', value: 'LGBM Regressor' },
      { label: 'Inference Engine', value: 'Local python script' },
      { label: 'Data Set Volume', value: '4,500 data rows' },
      { label: 'Classification Accuracy', value: '91.2% R2-Score' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1017",
        timestamp: "2026-06-25T10:55:00Z",
        category: "THRIPS PEST DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        predicted_thrips_density: "Low",
        risk_percentage: 12.5
      }
    }, null, 2)
  },
  {
    id: 18,
    type: 'image',
    category: 'Trilingual Chatbot & Context-Aware Diagnostics',
    title: 'AgriBot Advisory Chat Logs',
    desc: 'Detailed transcripts of botanical inquiries handled by the conversational chatbot agent.',
    badge: 'Advisory Chatbot',
    imagePath: './images/12.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Data Model Focus', value: 'BERT Intent Classification' },
      { label: 'Inference Engine', value: 'HuggingFace pipelines' },
      { label: 'Data Set Volume', value: '25,000 active chats' },
      { label: 'Classification Accuracy', value: '97.2% Accuracy' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1018",
        timestamp: "2026-06-25T10:58:00Z",
        category: "TRILINGUAL CHATBOT",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        active_users: 124,
        chatbot_satisfaction: "94.8%"
      }
    }, null, 2)
  },
  {
    id: 19,
    type: 'image',
    category: 'Purple Blotch Disease Detection',
    title: 'Leaf Surface Microscopy Scan',
    desc: 'Magnified view of Alternaria porri conidiophores on infected tissue collected from control fields.',
    badge: 'Microscopy Data',
    imagePath: './images/13.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'InceptionV3 Feature Extractor' },
      { label: 'Target Coordinates', value: 'Fungal spore features' },
      { label: 'Avg Inference Speed', value: '55.2 ms' },
      { label: 'Precision Metric (mAP50)', value: '96.2%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1019",
        timestamp: "2026-06-25T11:00:15Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        spore_count: 84,
        magnification: "400x"
      }
    }, null, 2)
  },
  {
    id: 20,
    type: 'image',
    category: 'Nutrient Deficiency Detection',
    title: 'Field Drone Multi-Spectral Map',
    desc: 'Normalized Difference Vegetation Index (NDVI) overlay indicating crop vigor anomalies across local acreage.',
    badge: 'NDVI Field Scan',
    imagePath: './images/14.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Protocol / Sensor', value: 'MicaSense RedEdge-MX camera' },
      { label: 'Connection Standard', value: 'GeoTIFF direct import' },
      { label: 'Sampling Interval', value: 'Weekly flight plan' },
      { label: 'Signal Quality (RSSI)', value: 'GPS locked (stable)' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1020",
        timestamp: "2026-06-25T11:05:00Z",
        category: "NUTRIENT DEFICIENCY DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        mean_ndvi: 0.68,
        deficient_patches: 3
      }
    }, null, 2)
  },
  {
    id: 21,
    type: 'video',
    category: 'Thrips Pest Detection',
    title: 'Edge Inference Video Walkthrough',
    desc: 'Live execution of pest detector running locally on a mobile device under low-light conditions.',
    badge: 'App Live Demo',
    imagePath: './images/15.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'YOLOv8-Nano TFLite' },
      { label: 'Target Coordinates', value: 'Bounding boxes' },
      { label: 'Avg Inference Speed', value: '22.4 ms (edge)' },
      { label: 'Precision Metric (mAP50)', value: '88.4%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1021",
        timestamp: "2026-06-25T11:10:00Z",
        category: "THRIPS PEST DETECTION",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        battery_drain: "1.2%/min",
        fps: 24.5
      }
    }, null, 2)
  },
  {
    id: 22,
    type: 'video',
    category: 'Trilingual Chatbot & Context-Aware Diagnostics',
    title: 'AgriBot Audio-to-Text Advisory Demo',
    desc: 'Voice command feature allowing farmers to verbally ask diagnostic questions in local languages.',
    badge: 'Voice Interface Video',
    imagePath: './images/16.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Data Model Focus', value: 'Whisper Speech-to-Text' },
      { label: 'Inference Engine', value: 'FastAPI / API wrapper' },
      { label: 'Language Compatibility', value: 'Sinhala, Tamil, English' },
      { label: 'Response Latency', value: '0.8 seconds' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1022",
        timestamp: "2026-06-25T11:12:45Z",
        category: "TRILINGUAL CHATBOT",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        word_error_rate: "4.8%",
        audio_channels: 1
      }
    }, null, 2)
  },
  {
    id: 23,
    type: 'video',
    category: 'Purple Blotch Disease Detection',
    title: 'IoT Sensor Calibration Stream',
    desc: 'Video recording showing real-time sensor node telemetry stream validation and hardware performance.',
    badge: 'IoT Telemetry Log',
    imagePath: './images/17.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Protocol / Sensor', value: 'IoT Node calibration standard' },
      { label: 'Connection Standard', value: 'LoRaWAN dynamic connection' },
      { label: 'Sampling Interval', value: '1 minute calibration window' },
      { label: 'Signal Quality (RSSI)', value: '-72 dBm' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1023",
        timestamp: "2026-06-25T11:15:30Z",
        category: "PURPLE BLOTCH DETECTION",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "CALIBRATING",
        sensor_drift: "0.02%",
        packet_retry_count: 0
      }
    }, null, 2)
  },
  {
    id: 24,
    type: 'video',
    category: 'Thrips Pest Detection',
    title: 'Thrips Edge Tracker Deployment',
    desc: 'On-device processing speed and CPU temperature log visualization during continuous field testing.',
    badge: 'Edge CPU Profiling',
    imagePath: './images/18.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'YOLOv8 Edge' },
      { label: 'Target Coordinates', value: 'Bounding boxes' },
      { label: 'Avg Inference Speed', value: '18.4 ms' },
      { label: 'Precision Metric (mAP50)', value: '91.8%' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1024",
        timestamp: "2026-06-25T11:18:00Z",
        category: "THRIPS PEST DETECTION",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        cpu_usage: "68%",
        temp: "44 C"
      }
    }, null, 2)
  },
  {
    id: 25,
    type: 'video',
    category: 'Thrips Pest Detection',
    title: 'Autonomous Sprayer Coordination Map',
    desc: 'Live drone video feed tracking mock coordinates for precision spot spraying of bio-pesticides.',
    badge: 'Precision Spraying Demo',
    imagePath: './images/19.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Protocol / Sensor', value: 'GPS RTK coordinate node' },
      { label: 'Connection Standard', value: 'Mavlink communication' },
      { label: 'Sampling Interval', value: 'Continuous coordinates' },
      { label: 'Signal Quality (RSSI)', value: '-54 dBm (strong)' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1025",
        timestamp: "2026-06-25T11:20:10Z",
        category: "THRIPS PEST DETECTION",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        sprayer_fluid_level: "84%",
        spray_targets_hit: 12
      }
    }, null, 2)
  },
  {
    id: 26,
    type: 'video',
    category: 'Thrips Pest Detection',
    title: 'Model Optimization & Quantization Run',
    desc: 'PyTorch to ONNX/TFLite export pipeline demonstration with size reduction and latency analytics.',
    badge: 'Quantization Log',
    imagePath: './images/20.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Model Architecture', value: 'Faster R-CNN Quantization' },
      { label: 'Target Coordinates', value: 'Int8 weights compression' },
      { label: 'Avg Inference Speed', value: 'From 54ms to 18ms' },
      { label: 'Precision Metric (mAP50)', value: '93.1% (-1.1% drift)' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1026",
        timestamp: "2026-06-25T11:22:00Z",
        category: "THRIPS PEST DETECTION",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "OPTIMIZED",
        file_size_reduction: "74.2%",
        engine: "ONNX Runtime Edge"
      }
    }, null, 2)
  },
  {
    id: 27,
    type: 'video',
    category: 'Trilingual Chatbot & Context-Aware Diagnostics',
    title: 'Integrated Farm Management Portal',
    desc: 'Video dashboard walkthrough connecting local field data to national agronomic research centers.',
    badge: 'Admin Dashboard Demo',
    imagePath: './images/21.jpeg',
    date: 'June 25, 2026',
    specs: [
      { label: 'Data Model Focus', value: 'Integrated data synchronization' },
      { label: 'Inference Engine', value: 'FastAPI multi-agent controller' },
      { label: 'Data Set Volume', value: '180,000 telemetry packets' },
      { label: 'Classification Accuracy', value: '99.2% Sync Uptime' }
    ],
    telemetryJson: JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-1027",
        timestamp: "2026-06-25T11:25:30Z",
        category: "TRILINGUAL CHATBOT",
        log_type: "VIDEO"
      },
      telemetry: {
        node_status: "ACTIVE",
        connected_dashboards: 4,
        sync_latency: "250ms"
      }
    }, null, 2)
  },
  {
    id: 28,
    type: 'image',
    category: 'Mobile App Interfaces',
    title: 'LunuNeth AI Splash Screen',
    desc: 'Launch screen for LunuNeth AI mobile application, presenting animated branding and initializing background services.',
    badge: 'App UI Loader',
    svgPreset: 'vision-rcnn',
    date: 'July 8, 2026',
    specs: [],
    telemetryJson: '{}'
  },
  {
    id: 29,
    type: 'image',
    category: 'Mobile App Interfaces',
    title: 'App Settings & Sync Page',
    desc: 'User preferences control panel, featuring model toggles, threshold adjustments, and local SQLite cache database sync telemetry.',
    badge: 'App UI Settings',
    svgPreset: 'data-bert',
    date: 'July 8, 2026',
    specs: [],
    telemetryJson: '{}'
  }
];

export function getLogs(): GalleryItem[] {
  if (typeof window === 'undefined') return DEFAULT_LOGS;
  
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_LOGS));
    return DEFAULT_LOGS;
  }
  
  try {
    const parsed = JSON.parse(saved) as GalleryItem[];
    
    // Self-healing database migration for 'Mobile App Interfaces' category
    const hasAppInterfaces = parsed.some(log => log.category === 'Mobile App Interfaces');
    if (!hasAppInterfaces) {
      // Migrate existing log ID 7 category
      let migrated = parsed.map(log => {
        if (log.id === 7) {
          return {
            ...log,
            category: 'Mobile App Interfaces' as CategoryType
          };
        }
        return log;
      });

      // Inject Splash Screen default log
      const hasSplash = migrated.some(log => log.id === 28);
      if (!hasSplash) {
        migrated.push({
          id: 28,
          type: 'image',
          category: 'Mobile App Interfaces',
          title: 'LunuNeth AI Splash Screen',
          desc: 'Launch screen for LunuNeth AI mobile application, presenting animated branding and initializing background services.',
          badge: 'App UI Loader',
          svgPreset: 'vision-rcnn',
          date: 'July 8, 2026',
          specs: [],
          telemetryJson: '{}'
        });
      }

      // Inject Settings Page default log
      const hasSettings = migrated.some(log => log.id === 29);
      if (!hasSettings) {
        migrated.push({
          id: 29,
          type: 'image',
          category: 'Mobile App Interfaces',
          title: 'App Settings & Sync Page',
          desc: 'User preferences control panel, featuring model toggles, threshold adjustments, and local SQLite cache database sync telemetry.',
          badge: 'App UI Settings',
          svgPreset: 'data-bert',
          date: 'July 8, 2026',
          specs: [],
          telemetryJson: '{}'
        });
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    
    return parsed;
  } catch (e) {
    console.error('Error parsing saved logs:', e);
    return DEFAULT_LOGS;
  }
}

export function saveLogs(logs: GalleryItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(logs));
  
  // Dispatch a custom event to notify other components in real-time
  window.dispatchEvent(new Event('lununeth_logs_updated'));
}

export function addLog(log: Omit<GalleryItem, 'id' | 'date'>): GalleryItem {
  const logs = getLogs();
  const nextId = logs.length > 0 ? Math.max(...logs.map(l => l.id)) + 1 : 1;
  const newLog: GalleryItem = {
    ...log,
    id: nextId,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };
  
  logs.push(newLog);
  saveLogs(logs);
  return newLog;
}

export function updateLog(updated: GalleryItem): void {
  const logs = getLogs();
  const index = logs.findIndex(l => l.id === updated.id);
  if (index !== -1) {
    logs[index] = updated;
    saveLogs(logs);
  }
}

export function deleteLog(id: number): void {
  const logs = getLogs();
  const filtered = logs.filter(l => l.id !== id);
  saveLogs(filtered);
}
