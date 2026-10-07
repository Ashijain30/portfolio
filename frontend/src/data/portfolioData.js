// 100% verified data from Ashi Jain's official resume (Ashijain_resume(AIML).pdf)
// and official GitHub repositories (https://github.com/Ashijain30?tab=repositories).

export const IDENTITY = {
  name: 'ASHI JAIN',
  domains: ['DATA SCIENCE', 'AI / ML', 'DATA ANALYTICS'],
  headline: 'I build data-driven products\nthat turn information into decisions.',
  shortDescription:
    'Final-year Computer Science Engineering (AI/ML) student at VIT Bhopal with hands-on experience in Data Science, Machine Learning, Generative AI (LLMs, RAG), and Business Intelligence.',
  technicalLine:
    'Python · SQL · LangChain · Google Gemini · FastAPI · Scikit-learn · Power BI',
  aboutText:
    'Final-year Computer Science Engineering (AI/ML) student at Vellore Institute of Technology, Bhopal (CGPA: 8.46/10.0). Experienced in building end-to-end AI applications using LLMs, RAG, LangChain, Google Gemini, FastAPI, and React, alongside rigorous data cleaning, exploratory data analysis, Machine Learning modeling, and interactive Power BI dashboards.',
  education: {
    institution: 'Vellore Institute of Technology, Bhopal',
    degree: 'B.Tech, Computer Science Engineering (AI/ML)',
    period: '2023 – 2027',
    cgpa: '8.46 / 10.0',
  },
  achievements: [
    'Solved 100+ problems on LeetCode, strengthening data structures, algorithms and problem-solving skills.',
    'Advanced to Round 3 of the KEN Case Study Hackathon.',
  ],
  status: 'Available for opportunities',
  location: 'Bhopal, India',
  email: 'jainashi2005@gmail.com',
  phone: '+91 8269665428',
  // Exact unmodified PDF downloaded directly from https://github.com/Ashijain30/RESUME
  resumePdfUrl: './Ashijain_resume(AIML).pdf',
  links: {
    email: 'mailto:jainashi2005@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ashijain30/',
    github: 'https://github.com/Ashijain30/',
    leetcode: 'https://leetcode.com/u/lWqJbF22dS/',
  },
};

export const RECRUITER_ROLES = [
  { id: 'ALL', label: 'ALL WORK' },
  { id: 'AI_ML', label: 'AI / ML' },
  { id: 'DATA_SCIENCE', label: 'DATA SCIENCE' },
  { id: 'DATA_ANALYST', label: 'DATA ANALYST' },
];

export const PROJECTS = [
  {
    id: 'leadflow',
    number: '01',
    title: 'LeadFlow — AI Real Estate Sales Copilot',
    description:
      'Full-stack AI sales copilot built with FastAPI, React, SQLite, and Google Gemini to prioritize inbound leads, summarize buyer context, and recommend next-best actions.',
    technologies: ['Python', 'FastAPI', 'React', 'Google Gemini', 'SQLite'],
    metrics: ['Hot / Warm / Cold AI scoring', 'Open → Scan → Decide → Act', 'REST API + LLM Copilot'],
    github: 'https://github.com/Ashijain30/LeadFlow',
    roles: ['AI_ML', 'DATA_SCIENCE'],
    featured: true,
    previewPoints: [42, 58, 71, 83, 91, 96],
    previewLabel: 'AI Lead Prioritization & Conversion Velocity',
    caseStudy: {
      problem:
        'Real estate sales teams receive high volumes of unstructured buyer inquiries across portals and messaging channels, causing high-intent prospects to slip through the cracks due to manual triage.',
      approach:
        'Developed a FastAPI + SQLite backend with strict Pydantic validation and Google Gemini integration to classify prospects into 3 priority tiers (Hot, Warm, Cold), paired with a React dashboard built around an Open → Scan → Decide → Act workflow.',
      technology: ['Python', 'FastAPI', 'React', 'Google Gemini', 'SQLite', 'SQLAlchemy', 'Pydantic', 'REST APIs'],
      result:
        'Automated lead triage, executive context summarization, lead-grounded conversational Q&A, and multi-tone follow-up generation across WhatsApp, Email, and Call Scripts.',
    },
  },
  {
    id: 'knowledgegpt',
    number: '02',
    title: 'KnowledgeGPT — RAG Knowledge Assistant',
    description:
      'End-to-end Retrieval-Augmented Generation (RAG) assistant enabling context-aware, multi-turn question answering across PDFs, text files, and live webpage URLs.',
    technologies: ['Python', 'LangChain', 'Google Gemini', 'ChromaDB', 'Streamlit'],
    metrics: ['3 document sources', 'ChromaDB vector search', 'Multi-turn memory'],
    github: 'https://github.com/Ashijain30/KnowledgeGPT',
    roles: ['AI_ML', 'DATA_SCIENCE'],
    featured: true,
    previewPoints: [50, 66, 75, 84, 90, 95],
    previewLabel: 'Semantic Retrieval Relevance (ChromaDB + Gemini)',
    caseStudy: {
      problem:
        'Querying dense PDFs, text documents, and web pages with standalone LLMs leads to hallucinations and context loss across multi-turn conversations.',
      approach:
        'Engineered an end-to-end RAG pipeline supporting 3 document sources (PDFs, TXT files, and webpage URLs) with automated chunking, vector embeddings in ChromaDB, semantic similarity search, and LangChain conversational memory.',
      technology: ['Python', 'LangChain', 'Google Gemini', 'ChromaDB', 'Embeddings', 'Streamlit'],
      result:
        'Delivered an interactive Streamlit interface covering document ingestion → semantic retrieval → grounded LLM generation for accurate multi-turn document Q&A.',
    },
  },
  {
    id: 'superstore',
    number: '03',
    title: 'Superstore Sales Analysis & Forecasting',
    description:
      'Data-driven retail sales forecasting and exploratory analysis across 9,800+ historical transactions, isolating statistical outliers to dramatically reduce prediction error.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Power BI'],
    metrics: ['9,800+ transactions', '18 features', 'MAE 266 → 67'],
    github: 'https://github.com/Ashijain30/Superstore_Sales_Analysis',
    roles: ['DATA_ANALYST', 'DATA_SCIENCE', 'AI_ML'],
    featured: true,
    previewPoints: [266, 210, 165, 118, 84, 67],
    previewLabel: 'Forecasting MAE Reduction (266 → 67)',
    caseStudy: {
      problem:
        'Sales planning teams relying on manual estimation face inaccurate revenue targets and inventory imbalances due to skewed transaction distributions and promotional outliers.',
      approach:
        'Analyzed 9,800+ retail transactions spanning 18 features. Performed deep Exploratory Data Analysis (EDA), isolated statistical outliers, engineered features, and trained a Random Forest forecasting model.',
      technology: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest', 'Matplotlib', 'Seaborn', 'Power BI'],
      result:
        'Slashed Mean Absolute Error (MAE) from 266 down to 67 (-74.8% error reduction) and surfaced actionable regional and category profitability insights.',
    },
  },
  {
    id: 'disease-prediction',
    number: '04',
    title: 'Multiple Disease Prediction System',
    description:
      'Clinical machine learning web application predicting Parkinson’s Disease, Heart Disease, and Diabetes using a Stacking Classifier ensemble across 4 algorithms.',
    technologies: ['Python', 'Scikit-learn', 'Flask', 'Machine Learning'],
    metrics: ['3 disease models', '4 ML algorithms compared', 'Stacking ensemble'],
    github: 'https://github.com/Ashijain30/Multiple-Disease-Prediction',
    roles: ['DATA_SCIENCE', 'AI_ML'],
    featured: false,
    previewPoints: [72, 78, 83, 87, 91, 94],
    previewLabel: 'Stacking Classifier Ensemble Performance',
    caseStudy: {
      problem:
        'Early clinical risk screening across Parkinson’s disease, heart disease, and diabetes requires reliable classification models capable of handling diverse physiological parameters.',
      approach:
        'Developed 3 disease-specific prediction pipelines, benchmarked 4 classification algorithms (Logistic Regression, Decision Tree, KNN, and SVM), and combined base learners into a Stacking Classifier ensemble deployed via Flask.',
      technology: ['Python', 'Scikit-learn', 'Logistic Regression', 'SVM', 'KNN', 'Stacking Classifier', 'Flask'],
      result:
        'Improved predictive robustness over individual base estimators and delivered a real-time Flask web interface for clinical parameter evaluation.',
    },
  },
  {
    id: 'attendai',
    number: '05',
    title: 'AttendAI — Facial Recognition Attendance System',
    description:
      'Contactless, real-time webcam facial recognition system with bulk image enrollment, voice feedback, SQLite logging, and automated CSV and Word report generation.',
    technologies: ['Python', 'OpenCV', 'SQLite', 'Computer Vision'],
    metrics: ['Real-time recognition', 'Bulk enrollment', 'Auto CSV & Word reports'],
    github: 'https://github.com/Ashijain30/AttendAI',
    roles: ['AI_ML', 'DATA_SCIENCE'],
    featured: false,
    previewPoints: [60, 72, 80, 86, 92, 95],
    previewLabel: 'Automated Encoding & Recognition Pipeline',
    caseStudy: {
      problem:
        'Manual attendance tracking is slow and error-prone, requiring an automated computer-vision workflow with structured database logging and instant reporting.',
      approach:
        'Built a real-time facial encoding and recognition pipeline using Python and OpenCV with manual and bulk folder registration, pyttsx3 voice confirmation, and SQLite timestamp persistence.',
      technology: ['Python', 'OpenCV', 'face-recognition', 'SQLite', 'pyttsx3', 'python-docx'],
      result:
        'Enabled fast, contactless attendance logging with one-click automated daily CSV exports and formatted Word summary reports.',
    },
  },
  {
    id: 'zomato',
    number: '06',
    title: 'Zomato Analytics Dashboard',
    description:
      'Interactive Power BI, Excel, and Python analytics dashboard examining restaurant performance, customer ratings, cuisine trends, pricing tiers, and delivery adoption.',
    technologies: ['Power BI', 'Excel', 'Python', 'DAX'],
    metrics: ['Restaurant analytics', 'Dynamic KPIs', 'Interactive dashboard'],
    github: 'https://github.com/Ashijain30/Zomato-Dashboard',
    roles: ['DATA_ANALYST', 'DATA_SCIENCE'],
    featured: false,
    previewPoints: [62, 74, 81, 89, 94, 96],
    previewLabel: 'Multi-Dimensional BI Slicing',
    caseStudy: {
      problem:
        'Understanding restaurant market dynamics across cities, cuisines, cost brackets, and delivery modes requires unified KPI modeling and interactive visual slicing.',
      approach:
        'Processed restaurant datasets using Excel and Python and designed an interactive dashboard with custom KPI measures and dynamic slicers across City, Cuisine, Rating, Cost, and Delivery.',
      technology: ['Power BI', 'DAX', 'Power Query', 'Excel', 'Python'],
      result:
        'Provided clear visual decision support for comparing regional restaurant density, price elasticity, and customer rating distributions.',
    },
  },
];

export const EXPERIENCE = [
  {
    id: 'tech-rudraum',
    year: 'Jun 2026 – Jul 2026',
    company: 'TECH RUDRAUM PVT. LTD.',
    role: 'Data Analyst Intern',
    location: 'Indore, India',
    highlights: ['2,000 sales & return records', '3 DAX KPIs', '6–7 Power BI dashboards'],
    bullets: [
      'Cleaned and structured 2,000 sales and product-return records across multiple states, distributors and outlets.',
      'Validated data accuracy and consistency before analysis and reporting.',
      'Used Power Query and DAX to calculate 3 key metrics: return percentage, total returns and state-wise contribution.',
      'Identified high-return regions through state-wise analysis and comparative reporting.',
      'Designed 6–7 interactive Power BI dashboards with dynamic filters and slicers for stakeholder-ready insights.',
    ],
  },
  {
    id: 'intmavens',
    year: 'Apr 2025 – Jun 2025',
    company: 'INTMAVENS INFOTECH PVT. LTD.',
    role: 'Cloud Application Developer Intern (Training Program)',
    location: 'India',
    highlights: ['2-month cloud program', 'AWS · Azure · GCP', 'Power BI · DAX · Power Query'],
    bullets: [
      'Completed a 2-month cloud training program covering IaaS, PaaS, SaaS, deployment models and cloud security.',
      'Gained exposure to 3 major cloud platforms: AWS, Azure and GCP, along with Power BI, DAX and Power Query.',
    ],
  },
];

export const SKILL_CATEGORIES = [
  {
    id: 'generative-ai',
    title: 'GENERATIVE AI & LLMs',
    roles: ['AI_ML', 'DATA_SCIENCE'],
    skills: [
      'LLMs',
      'RAG',
      'Prompt Engineering',
      'LangChain',
      'LangGraph',
      'Google Gemini',
      'Embeddings',
      'ChromaDB',
      'FAISS',
    ],
  },
  {
    id: 'data-science-ml',
    title: 'DATA SCIENCE & MACHINE LEARNING',
    roles: ['DATA_SCIENCE', 'AI_ML', 'DATA_ANALYST'],
    skills: [
      'Python',
      'SQL',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'XGBoost',
      'PyTorch',
      'NLP',
      'EDA',
      'Feature Engineering',
    ],
  },
  {
    id: 'analytics-bi',
    title: 'BUSINESS INTELLIGENCE & ANALYTICS',
    roles: ['DATA_ANALYST', 'DATA_SCIENCE'],
    skills: [
      'Power BI',
      'DAX',
      'Power Query',
      'Excel',
      'Matplotlib',
      'Seaborn',
      'KPI Development',
    ],
  },
  {
    id: 'backend-tools',
    title: 'BACKEND, CLOUD & CS FUNDAMENTALS',
    roles: ['AI_ML', 'DATA_SCIENCE', 'DATA_ANALYST'],
    skills: [
      'FastAPI',
      'Streamlit',
      'REST APIs',
      'C++',
      'DSA (100+ LeetCode)',
      'Git & GitHub',
      'AWS · Azure · GCP',
    ],
  },
];

export const AI_SUGGESTED_QUESTIONS = [
  'What AI & LLM projects has Ashi built?',
  'What Data Analyst experience does Ashi have?',
  'Show me her Machine Learning & Data Science work.',
  "What's her strongest project?",
];

export function queryAshiAI(rawInput) {
  const q = rawInput.trim().toLowerCase();

  if (
    q.includes('experience') ||
    q.includes('intern') ||
    q.includes('rudraum') ||
    q.includes('intmavens') ||
    (q.includes('data analyst') && q.includes('experience'))
  ) {
    return {
      answer: `Ashi has completed two industry internships/training programs:

• **Data Analyst Intern — Tech Rudraum Pvt. Ltd. (Jun 2026 – Jul 2026, Indore)**
  - Cleaned and structured **2,000 sales and product-return records** across states, distributors, and outlets.
  - Calculated **3 key metrics** using Power Query and DAX: return percentage, total returns, and state-wise contribution.
  - Designed **6–7 interactive Power BI dashboards** with dynamic filters and slicers.

• **Cloud Application Developer Intern (Training Program) — IntMavens Infotech Pvt. Ltd. (Apr 2025 – Jun 2025)**
  - Completed a **2-month cloud training program** covering **AWS, Azure, and GCP**, alongside Power BI, DAX, and Power Query.`,
    };
  }

  if (
    q.includes('ai') ||
    q.includes('llm') ||
    q.includes('rag') ||
    q.includes('gemini') ||
    q.includes('langchain') ||
    q.includes('leadflow') ||
    q.includes('knowledgegpt')
  ) {
    return {
      answer: `Ashi has built production-style **Generative AI & LLM applications**:

1. **LeadFlow — AI Real Estate Sales Copilot (\`Python · FastAPI · React · Google Gemini\`):**
   - Prioritizes inbound leads into **3 priority levels (Hot, Warm, Cold)**, summarizes buyer context, and provides an **Open → Scan → Decide → Act** React dashboard backed by FastAPI and SQLite.
2. **KnowledgeGPT — RAG Knowledge Assistant (\`Python · LangChain · Google Gemini · ChromaDB · Streamlit\`):**
   - End-to-end RAG pipeline supporting **3 document sources (PDFs, text files, and webpage URLs)** with ChromaDB vector search and multi-turn conversational memory.
3. **AttendAI (\`Python · OpenCV · SQLite\`):**
   - Real-time facial recognition attendance system with voice feedback and automated CSV/Word reporting.`,
    };
  }

  if (
    q.includes('ml') ||
    q.includes('machine learning') ||
    q.includes('data science') ||
    q.includes('disease') ||
    q.includes('superstore')
  ) {
    return {
      answer: `Ashi's **Machine Learning & Data Science** projects include:

1. **Superstore Sales Analysis & Forecasting (\`Python · Pandas · Scikit-learn · Power BI\`):**
   - Analyzed **9,800+ transactions** across **18 features**, isolated statistical outliers, and trained a Random Forest model that reduced **MAE from 266 to 67** (-74.8% error).
2. **Multiple Disease Prediction (\`Python · Scikit-learn · Flask\`):**
   - Built **3 clinical prediction models** (Parkinson's, Heart Disease, Diabetes), compared **4 classification algorithms** (Logistic Regression, Decision Tree, KNN, SVM), and combined them via a **Stacking Classifier ensemble**.`,
    };
  }

  if (q.includes('power bi') || q.includes('dashboard') || q.includes('zomato')) {
    return {
      answer: `Ashi's **Power BI & Analytics** portfolio includes:

• **Tech Rudraum Pvt. Ltd. Internship (2026):** Designed **6–7 interactive Power BI dashboards** and **3 DAX KPIs** over **2,000 sales and return records**.
• **Zomato Analytics Dashboard (\`Power BI · Excel · Python\`):** Interactive restaurant analytics across city, cuisine, rating, cost, and delivery.
• **Superstore Sales Analysis & Forecasting:** Executive sales and margin reporting paired with ML forecasting.`,
    };
  }

  if (q.includes('strongest') || q.includes('best') || q.includes('hire')) {
    return {
      answer: `Ashi stands out because she builds across **Generative AI**, **Machine Learning**, and **Business Intelligence**:

• **For AI / ML Roles:** **LeadFlow** (FastAPI + React + Gemini AI Sales Copilot) and **KnowledgeGPT** (LangChain + ChromaDB RAG Assistant).
• **For Data Science Roles:** **Superstore Sales Forecasting** (9,800+ rows, MAE reduced 266 → 67) and **Multiple Disease Prediction** (Stacking Classifier ensemble across 4 ML algorithms).
• **For Data Analyst Roles:** **Tech Rudraum Internship** (2,000 records, 3 DAX KPIs, 6–7 Power BI dashboards) and **Zomato Analytics Dashboard**.
• **Academic & Coding Pedigree:** **8.46/10.0 CGPA** in B.Tech CSE (AI/ML) at VIT Bhopal, **100+ LeetCode problems solved**, and **Round 3 of the KEN Case Study Hackathon**.`,
    };
  }

  return {
    answer: `Here is a verified snapshot from **Ashi Jain's official resume**:

• **Education:** B.Tech CSE (AI/ML) at **VIT Bhopal (2023–2027)** — **CGPA: 8.46/10.0**.
• **Experience:** **Data Analyst Intern at Tech Rudraum Pvt. Ltd. (Jun–Jul 2026)** & **Cloud Application Developer Intern (Training) at IntMavens Infotech (Apr–Jun 2025)**.
• **Top GitHub Projects:** **LeadFlow** (AI Sales Copilot), **KnowledgeGPT** (RAG Assistant), **Superstore Sales Forecasting** (MAE 266 → 67), **Multiple Disease Prediction** (Stacking Ensemble), **AttendAI**, and **Zomato Dashboard**.`,
  };
}
