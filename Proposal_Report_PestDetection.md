# Research Proposal: Small-Object Detection & Bounding Localization for Onion Thrips
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
- **Validation dataset:** Field-collected high-macro images annotated using Roboflow/LabelStudio and validated by senior entomologists.
