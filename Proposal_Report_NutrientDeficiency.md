# Research Proposal: Feature-Fusion Classification & SHAP explainability for Nutrient Deficiencies
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
- **Explainability Validation:** Coherence overlap test comparing SHAP highlights to agronomic ground-truth damage boundaries.
