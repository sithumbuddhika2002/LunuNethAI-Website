# Research Proposal: Spatio-Temporal Graph Neural Networks & Trilingual Chatbot Advisory
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
- **Reasoning Accuracy:** Outperform standard rule-based diagnostic frameworks by >20% in complex multi-disease edge scenarios.
