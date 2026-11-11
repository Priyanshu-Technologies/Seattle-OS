/*
 * Seattle OS — verified public portfolio content.
 * Update this file when your experience, projects, or skills change.
 */
window.SEATTLE_PROFILE = {
  name: 'Priyanshu Sharma',
  shortName: 'Priyanshu',
  headline: 'Machine Learning · Computer Vision · RAG & Applied AI',
  role: 'Machine Learning & Applied AI Developer',
  description: 'I am a B.Tech Computer Science (Artificial Intelligence & Machine Learning) student who builds machine-learning and applied-AI systems end to end — from data preparation and model training to evaluation, APIs and deployment. My work spans retrieval systems, computer vision, predictive modelling and scientific computing. I enjoy understanding how systems work, testing ideas against evidence, and turning experiments into usable software.',
  location: 'New Delhi, India',
  educationStatus: 'B.Tech · Expected 2029',
  github: 'https://github.com/Priyanshu-Technologies',
  publicRepoCount: 10,
  linkedin: 'https://www.linkedin.com/in/priyanshu-sharma-646233394/',
  email: 'princesharma99876@gmail.com',
  avatar: 'https://avatars.githubusercontent.com/u/247400340?v=4',
  resume: 'assets/Priyanshu_Sharma_CV.pdf',
  interests: [
    'Applied Artificial Intelligence', 'Machine Learning', 'Computer Vision',
    'Retrieval-Augmented Generation', 'Computational Physics',
    'Scientific Computing', 'Numerical Simulation', 'Systems & Performance Engineering'
  ],
  experience: [
    {
      role: 'Machine Learning Intern',
      organization: 'FlyRank AI',
      period: 'June 2026 – September 2026',
      kind: 'Internship',
      summary: 'Worked within a collaborative machine-learning team on the dataset-to-evaluation workflow.',
      contributions: [
        'Preprocessed and prepared datasets for model development.',
        'Trained and evaluated machine-learning models using structured evaluation practices.',
        'Worked through the model-development workflow from prepared data to measured results.'
      ],
      link: 'https://github.com/Priyanshu-Technologies/flyrank-ML-track',
      linkLabel: 'Public internship workspace'
    }
  ],
  education: [
    {
      institution: 'KCC Institute of Technology and Management',
      qualification: 'B.Tech · Computer Science Engineering',
      specialization: 'Artificial Intelligence & Machine Learning',
      period: 'Expected 2029'
    }
  ],
  skillGroups: [
    { title: 'Programming languages', items: ['Python', 'SQL', 'TypeScript', 'C++ (learning)'] },
    { title: 'Generative AI & RAG', items: ['Retrieval-Augmented Generation', 'Hybrid search (dense + BM25)', 'Reciprocal Rank Fusion', 'Cross-encoder reranking', 'FastEmbed embeddings', 'Local LLMs with Ollama', 'Adaptive query routing', 'Answer & citation verification', 'Retrieval evaluation: Recall@K, MRR, nDCG'] },
    { title: 'Machine learning', items: ['PyTorch', 'torchvision', 'scikit-learn', 'XGBoost', 'ResNet18 transfer learning', 'CNNs', 'Feature engineering', 'Model evaluation', 'Confidence calibration', 'Ultralytics YOLO11'] },
    { title: 'Computer vision', items: ['OpenCV', 'Image preprocessing', 'Domain validation', 'Instance segmentation', 'Pillow'] },
    { title: 'Backend & deployment', items: ['FastAPI', 'Pydantic', 'Uvicorn', 'REST APIs', 'SQLite', 'Streamlit', 'Docker', 'Render', 'API-key authentication', 'Rate limiting'] },
    { title: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'React Router'] },
    { title: 'Scientific computing', items: ['NumPy', 'pandas', 'Matplotlib', 'Finite-difference methods (FTCS)', 'Numerical stability analysis'] },
    { title: 'Tools & workflow', items: ['Git', 'GitHub', 'Linux', 'Jupyter', 'Google Colab', 'VS Code', 'pytest', 'uv', 'Ruff', 'ESLint', 'Prettier'] }
  ]
};

window.SEATTLE_PROJECTS = [
  {
    id: 'norag', name: 'NORAG', folder: 'NORAG', category: 'Retrieval systems', featured: true,
    description: 'A modular, self-hostable RAG engine built from scratch, designed to return grounded, cited and verified answers from personal documents.',
    details: 'NORAG is a complete Retrieval-Augmented Generation system with a web UI. It accepts PDF, Markdown, HTML and plain-text documents, then orchestrates multiple retrieval strategies based on the type of question. The system combines dense vector search with BM25 sparse retrieval using weighted Reciprocal Rank Fusion, routes semantic, exact, comparative and multi-hop queries adaptively, reranks candidates with a local cross-encoder, and verifies citations and answer claims against retrieved evidence. Everything runs locally: FastEmbed handles embeddings, Ollama runs the language model, and SQLite stores documents and metadata. No hosted model API key is required.',
    stack: ['Python', 'FastAPI', 'FastEmbed', 'BM25', 'Reciprocal Rank Fusion', 'Cross-encoder', 'Ollama', 'SQLite', 'React', 'TypeScript', 'Vite', 'pytest'],
    status: 'Core system complete · local-first',
    highlights: ['Hybrid dense + sparse retrieval with weighted RRF', 'Adaptive query routing for semantic, exact, comparative and multi-hop questions', 'Local cross-encoder reranking and grounded generation with Ollama', 'Citation validation and claim verification against retrieved evidence', 'Retrieval evaluation: Recall@K, Precision@K, MRR@K and nDCG@K', 'FastAPI API with optional API-key auth, rate limiting, CORS controls and health/readiness probes', '360+ test functions across parsing, chunking, retrieval, reranking, verification and API behavior'],
    metrics: [{ value: '360+', label: 'test functions' }, { value: '4', label: 'query routes' }, { value: '100%', label: 'local execution design' }],
    cover: 'assets/projects/norag.svg',
    github: 'https://github.com/Priyanshu-Technologies/NORAG', demo: '',
    files: ['src/norag/', 'frontend/', 'tests/', 'scripts/', 'pyproject.toml', 'README.md']
  },
  {
    id: 'crackvision', name: 'CrackVision', folder: 'CrackVision', category: 'Computer vision', featured: true,
    description: 'YOLO11n-seg surface-crack segmentation with visual inspection, confidence controls and a deployed Streamlit application.',
    details: 'CrackVision follows the computer-vision lifecycle from dataset exploration and annotation validation through training, evaluation, inference, testing and deployment. A YOLO11n-seg model predicts crack regions as segmentation masks, while the Streamlit application provides image upload, confidence-threshold controls, overlays, detection counts and local camera inspection. Experiments compared 640px and 960px input resolutions to document the precision/recall trade-off. The CV reports the 640px experiment at 77.6% mask precision, 59.9% recall and 63.8% mask mAP@50.',
    stack: ['Python', 'PyTorch', 'YOLO11n-seg', 'Ultralytics', 'OpenCV', 'Streamlit', 'Docker', 'Render', 'pytest'],
    status: 'Model training, evaluation & deployed application',
    highlights: ['YOLO11n-seg instance segmentation for surface cracks', 'Image upload, segmentation overlays, detection counts and adjustable confidence threshold', 'Local OpenCV camera inspection', 'Compared 640px and 960px input resolutions and documented metric trade-offs', 'Dockerized Streamlit application deployed on Render', '20 pytest tests'],
    metrics: [{ value: '63.8%', label: 'mask mAP@50 · 640px' }, { value: '77.6%', label: 'mask precision · 640px' }, { value: '59.9%', label: 'mask recall · 640px' }],
    experiments: [
      { label: '640px input', summary: 'Mask precision 77.63% · recall 59.91% · mAP@50 63.83% · mAP@50–95 21.56%' },
      { label: '960px input', summary: 'Mask precision 73.71% · recall 64.26% · mAP@50 61.52% · mAP@50–95 20.31%' }
    ],
    cover: 'assets/projects/crackvision.svg',
    github: 'https://github.com/Priyanshu-Technologies/CrackVision', demo: 'https://crackvision-qvv1.onrender.com/',
    files: ['notebooks/', 'src/crackvision/', 'tests/', 'models/', 'app.py', 'Dockerfile']
  },
  {
    id: 'steelguard', name: 'SteelGuard AI', folder: 'SteelGuard-AI', category: 'Industrial computer vision', featured: true,
    description: 'A domain-aware steel-surface inspection system combining six-class defect classification with a dedicated Steel Domain Gate.',
    details: 'SteelGuard AI uses transfer learning with ResNet18 to classify six hot-rolled steel defect categories from the NEU-DET dataset of 1,800 grayscale images. A second ResNet18 binary classifier — the Steel Domain Gate — checks whether an upload belongs to the intended steel-inspection domain before allowing defect classification. Its decision threshold was calibrated to 0.9551. Predictions below 70% confidence are routed to manual inspection rather than being treated as confident automated decisions. The full Streamlit pipeline is containerized and deployed on Render.',
    stack: ['Python', 'PyTorch', 'torchvision', 'ResNet18', 'OpenCV', 'NEU-DET', 'Streamlit', 'Docker', 'Render'],
    status: 'Deployed · domain-aware classification',
    highlights: ['Six hot-rolled steel defect classes using NEU-DET (1,800 grayscale images)', '98.33% validation accuracy reported in the CV', 'Separate Steel Domain Gate to reject off-domain uploads', 'Domain Gate threshold calibrated to 0.9551', 'Predictions below 70% confidence sent for manual inspection', 'Evaluation with confusion matrix, per-class precision, recall, F1 and misclassification review'],
    metrics: [{ value: '98.33%', label: 'validation accuracy' }, { value: '6', label: 'defect classes' }, { value: '1,800', label: 'NEU-DET images' }],
    cover: 'assets/projects/steelguard.svg',
    github: 'https://github.com/Priyanshu-Technologies/industrial-surface-defect-detection', demo: 'https://steelguard-ai.onrender.com',
    files: ['models/', 'notebooks/', 'src/', 'tests/', 'app.py', 'Dockerfile']
  },
  {
    id: 'predictive-maintenance', name: 'Predictive Maintenance', folder: 'Predictive-Maintenance', category: 'Predictive modelling', featured: true,
    description: 'An end-to-end machine-failure risk predictor using XGBoost, a FastAPI service and a browser interface.',
    details: 'This project turns a trained XGBoost model into a deployable predictive-maintenance application. The workflow covers exploratory data analysis, preprocessing, feature engineering, model training and evaluation, model serialization, a FastAPI REST API and a browser interface. Users enter operating-condition and sensor values to receive an estimated failure probability and risk level. Predictions were checked for consistency across local, Docker and cloud environments.',
    stack: ['Python', 'XGBoost', 'pandas', 'scikit-learn', 'FastAPI', 'Docker', 'Render'],
    status: 'Deployed · API + browser interface',
    highlights: ['End-to-end EDA, preprocessing, feature engineering, training and evaluation', 'Serialized model and preprocessing pipeline for reuse', 'FastAPI REST API with automatically generated Swagger documentation', 'Browser interface reports failure probability and risk level', 'Dockerized and deployed on Render', 'Verified consistency across local, container and cloud execution'],
    metrics: [{ value: 'XGBoost', label: 'prediction model' }, { value: 'FastAPI', label: 'REST API' }, { value: 'Docker', label: 'containerized' }],
    cover: 'assets/projects/predictive-maintenance.svg',
    github: 'https://github.com/Priyanshu-Technologies/predictive-maintenance', demo: 'https://predictive-maintenance-ldma.onrender.com',
    files: ['notebooks/', 'models/', 'app/', 'api/', 'Dockerfile', 'README.md']
  },
  {
    id: 'heat-exchanger', name: 'Heat Exchanger Temperature Prediction', folder: 'Heat-Exchanger-Temperature', category: 'Industrial ML · Regression', featured: false,
    description: 'A regression pipeline that estimates true heat-exchanger temperature from noisy industrial sensor readings.',
    details: 'This project investigates how machine learning can recover a system’s underlying temperature from noisy sensor measurements affected by noise, calibration drift, environmental disturbances and measurement uncertainty. The pipeline includes exploratory analysis, preprocessing, feature engineering, model training, comparison, persistence, batch prediction and diagnostics. Linear Regression, Random Forest and XGBoost were benchmarked using MAE, MSE, RMSE and R²; XGBoost performed best among the evaluated models.',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'Matplotlib'],
    status: 'Regression pipeline & model comparison',
    highlights: ['Predicts true operating temperature from noisy industrial sensor values', 'Benchmarked Linear Regression, Random Forest and XGBoost', 'Compared models using MAE, MSE, RMSE and R²', 'Residual analysis, feature importance and batch-prediction diagnostics'],
    metrics: [{ value: '3', label: 'models benchmarked' }, { value: '4', label: 'evaluation metrics' }, { value: 'XGBoost', label: 'best evaluated model' }],
    cover: 'assets/projects/heat-exchanger.svg',
    github: 'https://github.com/Priyanshu-Technologies/heat-exchanger-temperature-prediction', demo: '',
    files: ['data/', 'models/', 'notebooks/', 'results/', 'src/', 'README.md']
  },
  {
    id: 'calibration-collapse', name: 'Calibration Collapse', folder: 'Calibration-Collapse', category: 'ML research & evaluation', featured: true,
    description: 'An MNIST experiment and technical paper examining neural-network overconfidence and the gap between confidence and accuracy.',
    details: 'Calibration Collapse investigates miscalibration in deep neural networks: models can assign very high confidence to predictions that are incorrect. The project includes an MNIST experiment, reliability diagrams, confidence-distribution analysis, confidently-wrong examples and an accompanying technical paper. It examines Expected Calibration Error (ECE), Maximum Calibration Error (MCE) and mitigation ideas such as temperature scaling, ensembles and Bayesian methods. Repository-reported experiment results include 97.8% test accuracy, 4.2% ECE and 6.1% MCE.',
    stack: ['Python', 'PyTorch', 'MNIST', 'Model calibration', 'ECE', 'MCE', 'Matplotlib'],
    status: 'Research experiment · paper and results published',
    highlights: ['Technical paper: “On the Disconnect Between Predictive Probability and Ground Truth in Deep Neural Networks”', 'MNIST experiment with a feedforward neural network', 'Reliability diagrams and confidence-distribution analysis', 'Analysis of confidently-wrong predictions above 90% confidence', 'Discusses temperature scaling, ensembles and Bayesian mitigation strategies'],
    metrics: [{ value: '97.8%', label: 'test accuracy' }, { value: '4.2%', label: 'ECE' }, { value: '6.1%', label: 'MCE' }, { value: '64', label: 'confidently-wrong examples' }, { value: '30.5%', label: 'wrong predictions >90% confidence' }],
    cover: 'assets/projects/calibration-collapse.svg',
    github: 'https://github.com/Priyanshu-Technologies/calibration-collapse-mnist', paper: 'https://github.com/Priyanshu-Technologies/calibration-collapse-mnist/blob/main/Paper/Calibration_Collapse.pdf', demo: '',
    files: ['Paper/', 'notebook/', 'src/', 'figures/', 'results/', 'models/']
  },
  {
    id: 'heat-equation', name: '1D Heat Equation Simulation', folder: '1D-Heat-Equation-Simulation', category: 'Computational physics', featured: false,
    description: 'A numerical simulation of heat diffusion along a one-dimensional rod using the FTCS finite-difference method.',
    details: 'This computational-physics project converts the one-dimensional heat equation into a numerical simulation. The rod is discretized in space and time, and the Forward Time Centered Space (FTCS) method updates the temperature field. The project explains the diffusion number r = αΔt/Δx², derives the explicit-method stability condition r ≤ 0.5 using Von Neumann stability analysis, and includes temperature-distribution, rod-visualization and energy-conservation result sections.',
    stack: ['Python', 'NumPy', 'Matplotlib', 'Finite differences', 'FTCS', 'Numerical analysis'],
    status: 'Numerical simulation',
    highlights: ['Solves the 1D heat equation using an explicit finite-difference method', 'FTCS discretization in space and time', 'Explains the diffusion number r = αΔt/Δx²', 'Applies the stability condition r ≤ 0.5', 'Explores temperature distribution, rod visualization and energy conservation'],
    metrics: [{ value: '1D', label: 'heat equation' }, { value: 'FTCS', label: 'numerical method' }, { value: 'r ≤ 0.5', label: 'stability condition' }],
    cover: 'assets/projects/heat-equation.svg',
    github: 'https://github.com/Priyanshu-Technologies/1D_Heat_Equation_Simulation', demo: '',
    files: ['The_Approach_Papers/', 'assets/', '1D_Heat.py', 'README.md']
  }
];
