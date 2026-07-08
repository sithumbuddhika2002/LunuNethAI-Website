# 🌱 LunuNeth AI - Precision Agriculture Platform for Onion Crop Health

LunuNeth AI is an integrated, mobile-first AI diagnostic framework specifically built for Sri Lankan onion farmers. The system provides real-time, microclimate-aware diagnostic capabilities to detect and manage diseases, pests, and nutrient deficiencies. It empowers local farmers by directly connecting complex Spatio-Temporal Graph Neural Networks and TinyML Computer Vision models through a conversational, trilingual chatbot (Sinhala, English, Singlish).

This research project consists of four deeply integrated AI sub-systems covering NLP, Object Detection, Semantic Image Classification, and Spatio-Temporal Graph-based inference.

---

## 🏗️ System Architecture & Core Components

This platform acts as a unified Flutter mobile application powered by four distinct, state-of-the-art intelligent systems running through a centralized backend routing layer:

### 1️⃣ Component 1: Purple Blotch Disease Detection
**Developed by: IT22054890**
- **Objective:** Mobile-optimized, AI-based detection and severity classification of the *Alternaria porri* fungal pathogen (Purple Blotch).
- **Core Technology:** Lightweight CNNs (EfficientNet-B0, MobileNetV3) and Vision Transformers (ViT-Small) deployed via TinyML (TensorFlow Lite, INT8 Quantization).
- **Features:** 4-level severity grading (Healthy, Early, Mid, Severe), quantitative stress scoring (0–100%), Grad-CAM explainability for lesion highlighting, and AutoML-driven architecture optimization.

### 2️⃣ Component 2: Thrips Pest Detection
**Developed by: IT22226464**
- **Objective:** Small-object detection to localize and quantify *Thysanoptera* (Thrips) infestations in field images.
- **Core Technology:** YOLOv8 and Faster R-CNN optimized for small objects via anchor box tuning, focal loss, and Sliced Aided Hyper Inference (SAHI).
- **Features:** Pest bounding box localization, infestation severity heatmaps (Low/Medium/High), TinyML edge deployment (<10MB models), and Integrated Pest Management (IPM) threshold-based action recommendations.

### 3️⃣ Component 3: Trilingual Chatbot & Context-Aware Diagnostics
**Developed by: IT22087256**
- **Objective:** A Spatio-Temporal Graph Neural Network (ST-GNN) that fuses text symptoms, geolocation, and temporal weather arrays to output dynamic agricultural advice in Sinhala, Singlish, or English.
- **Core Technology:** Fine-tuned mBERT for symptom embedding, OpenWeatherMap API for temporal features, Graph Neural Networks (GraphSAGE/GAT), and Generative Seq2Seq models.
- **Features:** Replaces simple keyword matching with robust graph-based Bayesian reasoning. The system integrates confidence scores from the visual models as "nodes" in the graph to conduct multi-turn conversational differential diagnosis. 

### 4️⃣ Component 4: Nutrient Deficiency Detection
**Developed by: IT22142528**
- **Objective:** Image-based classification and regression model to identify Nitrogen, Phosphorus, Potassium, Magnesium, and Calcium deficiencies.
- **Core Technology:** Feature fusion combining CNN deep features (MobileNetV3) with engineered color (RGB/HSV) and texture (GLCM) indices.
- **Features:** Lab-free N/P/K stress scores mapping to smallholder-calibrated fertilizer prescriptions. Incorporates SHAP and Grad-CAM for predicting and explaining localized leaf discoloration independently from disease damage.

---

## 🧠 Technologies Used

**Computer Vision & TinyML**
- TensorFlow / Keras (Object Detection, CNN Classification)
- YOLOv8 (Ultralytics), Faster R-CNN (Detectron2)
- TensorFlow Lite (INT8 Post-training Quantization, Magnitude-based Pruning) 
- OpenCV (Leaf segmentation, HSV/GLCM Feature extraction)
- AutoML (FLAML) and Hyperparameter optimization (Optuna)
- Grad-CAM & SHAP for Model Explainability

**NLP & Graph Neural Networks**
- PyTorch & PyTorch Geometric (ST-GNN architecture)
- HuggingFace Transformers (mBERT, mT5/mBART fine-tuning)
- pgmpy (Bayesian Belief Networks)

**Platform Infrastructure**
- **Frontend:** Flutter (Mobile application deployable on Android)
- **Backend API:** FastAPI / Flask (Python)
- **Database:** Firebase/MongoDB Atlas for dataset storage, users, and conversational states.

---

## 🌍 Impact and Commercialization

Sri Lanka imports approximately 200,000 metric tons of onions annually due to significant production shortfalls. Pests, diseases, and improper nutrient distribution can strip up to 40% of crop yields.

LunuNeth addresses exactly this gap by:
- Offering lab-free detection directly on mid-range smartphones offline.
- Supplying quantitative, locally validated advice backed by the Field Crops Research and Development Institute (FCRDI).
- Supporting native code-switching dialogue (Sinhala + English), meaning farmers interact with the AI exactly how they speak every day.
- Unifying separate ML predictions under a contextual micro-climate framework (linking weather, crop location, and observed symptoms into a cohesive diagnostic).

---

## 🚀 Getting Started

The repository is modularized into the main mobile application and the intelligent Python backend.

### Prerequisites
- Python 3.9+
- Flutter SDK
- Android Studio / Visual Studio Code

### Backend 
The Python backend links the NLP diagnostic layers and acts as the inference server integration environment.

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

### Frontend
The cross-platform Flutter app houses the UI, camera APIs, offline TFLite model executor, and chat interface.

```bash
cd lununeth_ai
flutter pub get
flutter run
```

---

## 📄 Documentation

For an in-depth understanding of the algorithms, data annotation protocols, theoretical implementations, validation techniques, and research gaps addressed, refer to the individual Proposal Reports located locally at the root of the repository.

1. `Proposal_Report_PurpleBlotch.md`
2. `Proposal_Report_PestDetection.md`
3. `Proposal_Report_Chatbot.md`
4. `Proposal_Report_NutrientDeficiency.md`
