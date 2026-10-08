import { components } from './researchData';

const references = [
  { authors: 'S. P. Mohanty, D. P. Hughes and M. Salathé', title: 'Using Deep Learning for Image-Based Plant Disease Detection', publication: 'Frontiers in Plant Science, 2016', url: 'https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2016.01419/full' },
  { authors: 'A. Howard et al.', title: 'Searching for MobileNetV3', publication: 'ICCV, 2019', url: 'https://openaccess.thecvf.com/content_ICCV_2019/papers/Howard_Searching_for_MobileNetV3_ICCV_2019_paper.pdf' },
  { authors: 'R. R. Selvaraju et al.', title: 'Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization', publication: 'ICCV, 2017', url: 'https://openaccess.thecvf.com/content_iccv_2017/html/Selvaraju_Grad-CAM_Visual_Explanations_ICCV_2017_paper.html' },
];
const objectives = [
  'Develop a lightweight image-based model to identify Purple Blotch disease in onion leaves, classify its severity and explain the affected regions.',
  'Detect and localize onion thrips in field images, estimate infestation severity and investigate mobile deployment for field use.',
  'Build a Sinhala, English and Singlish advisory system that combines reported symptoms, visual predictions, weather and location for contextual diagnosis.',
  'Identify nutrient deficiencies by combining leaf colour, texture and deep visual features, with explanations that help distinguish nutrient stress from disease.',
];
const technologyGroups = [
  { title: 'Computer vision', items: ['MobileNetV3 / EfficientNet-B0', 'YOLOv8 / Faster R-CNN', 'OpenCV · Grad-CAM · SHAP'] },
  { title: 'Context & reasoning', items: ['mBERT · mT5 / mBART', 'PyTorch Geometric', 'GraphSAGE / GAT · pgmpy'] },
  { title: 'Mobile & backend', items: ['Flutter mobile application', 'TensorFlow Lite', 'FastAPI · Weather context API'] },
];

export default function ResearchChapterContent({ chapter }: { chapter: number }) {
  if (chapter === 0) return (
    <div className="research-reading-card">
      <p>Image-based deep learning offers a foundation for plant disease recognition from leaf photographs [1]. For mobile deployment, MobileNetV3 explores architectures tuned to phone CPUs [2], while Grad-CAM provides visual explanations of the image regions influencing a prediction [3]. These approaches inform LunuNeth AI’s investigation of accessible and interpretable onion crop diagnostics.</p>
      <p>Our proposed framework brings disease detection, thrips identification, nutrient analysis and multilingual advisory into one workflow. The project will evaluate these methods using onion field data and investigate how weather, location and farmer-reported symptoms can support contextual diagnosis.</p>
      <div className="research-references">
        <h3>References</h3>
        <ol>{references.map((reference, index) => (
          <li key={reference.url}>
            <span className="research-reference-number">[{index + 1}]</span>
            <p>{reference.authors}, “{reference.title},” <em>{reference.publication}</em>. <a href={reference.url} target="_blank" rel="noreferrer">Read publication <span aria-hidden="true">↗</span><span className="research-sr-only"> (opens in a new tab)</span></a></p>
          </li>
        ))}</ol>
      </div>
    </div>
  );

  if (chapter === 1) return (
    <div className="research-reading-card research-gap-statement">
      <p>The LunuNeth AI proposals identify a need for a connected diagnostic workflow tailored to Sri Lankan onion cultivation. Disease, pest and nutrient symptoms may be assessed separately, while image-only predictions leave out environmental conditions and the farmer’s description of the problem. Connectivity constraints and language barriers introduce additional challenges for field use.</p>
      <p>This project investigates that gap by combining four complementary research components in a mobile application. Lightweight vision models are proposed for on-device diagnosis, with weather and location informing contextual reasoning. Sinhala, English and Singlish dialogue would make the advisory workflow more accessible, while severity estimates and visual explanations would help farmers interpret the results.</p>
      <p className="research-reading-caption">Research direction drawn from the project proposals. The integrated approach remains to be evaluated against component-level baselines.</p>
    </div>
  );

  if (chapter === 2) return (
    <div className="research-objective-cards">
      {components.map((component, index) => (
        <section className="research-objective-card" key={component.id}>
          <span>Objective {component.id}</span>
          <h3>{component.title}</h3>
          <p>{objectives[index]}</p>
          <details>
            <summary>Explore planned features</summary>
            <ul>{component.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <p className="research-reading-caption">Research lead: {component.developer}</p>
          </details>
        </section>
      ))}
    </div>
  );

  return (
    <div className="research-methodology-card">
      <p>The proposed methodology moves from field-data collection and expert annotation to model training, integration and evaluation. Each component addresses a distinct crop-health task, while a shared mobile workflow brings the diagnostic outputs together.</p>
      <div className="research-technology-columns">
        {technologyGroups.map(group => <section key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}
      </div>
      <details className="research-methodology-details">
        <summary>View the research workflow</summary>
        <ol>
          <li><strong>Collect & annotate.</strong> Gather leaf and pest images, symptom descriptions and weather context with expert labels.</li>
          <li><strong>Train & integrate.</strong> Develop component models, combine visual and contextual evidence, and explore model explanations.</li>
          <li><strong>Optimize & evaluate.</strong> Investigate quantization for mobile inference and assess F1, mAP, language quality and latency on held-out data.</li>
        </ol>
      </details>
      <p className="research-methodology-caption">Proposed technologies and methods, subject to implementation and evaluation.</p>
    </div>
  );
}
