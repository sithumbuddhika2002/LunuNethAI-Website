# Research Proposal: Purple Blotch Disease Detection & Severity Classification
**Student Registration Number:** IT22054890  
**Research Domain:** Computer Vision & TinyML  
**Target Pathogen:** *Alternaria porri* (Purple Blotch Fungal Disease in Onions)

---

## 1. Introduction & Research Problem
Purple Blotch, caused by the fungal pathogen *Alternaria porri*, is one of the most destructive leaf diseases affecting onion cultivation in Sri Lanka, often causing crop losses up to 30-50% in favorable microclimates. Traditional visual inspection by farmers is subjective, error-prone, and usually occurs at late stages when the damage is irreversible. Early, local, offline visual diagnostics are critical to mitigating crop loss.

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
- **Accuracy baseline:** Compared against annotations signed off by the Field Crops Research and Development Institute (FCRDI).
