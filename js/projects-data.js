/**
 * Structured Data for All 8 Featured Projects
 */

const PROJECTS_DATA = [
  {
    id: "jarvis",
    number: "01",
    name: "J.A.R.V.I.S.",
    tagline: "Personal AI Assistant & Autonomous Workflows",
    category: "ai",
    status: "Active Development",
    shortDesc: "A personal AI assistant designed to provide a natural voice-driven interface for interacting with LLMs, orchestrating system tasks, and automating workflows.",
    problem: "Interacting with computers through manual keyboard clicks and separate browser windows disrupts continuous developer flow. Existing consumer voice assistants lack deep AI model integration and local workflow control.",
    solution: "Built an extensible agent architecture fusing Whisper for speech recognition, Gemini API for contextual intelligence, and native automation hooks to execute computer tasks with natural voice commands.",
    features: [
      "Natural voice interaction & low-latency Whisper speech recognition",
      "Gemini-powered contextual reasoning and dynamic tool execution",
      "System automation and OS workflow controls",
      "Extensible modular agent architecture for custom skills",
      "Continuous feedback and iterative self-improving prompt system"
    ],
    tech: ["Python", "Gemini API", "Whisper", "Voice AI", "Automation", "Agent Arch"],
    github: "https://github.com/pratap-varma",
    live: "#"
  },
  {
    id: "trackx",
    number: "02",
    name: "TrackX",
    tagline: "Academic Intelligence & Attendance Forecasting",
    category: "fullstack",
    status: "Active Development",
    shortDesc: "Transforms unstructured attendance sheets and timetable images into predictive academic decision support via Gemini Vision and OCR.",
    problem: "Students frequently struggle to calculate complex university attendance percentages, plan leaves without penalty, and keep track of fragmented schedules and holiday calendars.",
    solution: "Developed an AI student utility platform that ingests timetable and attendance photos, runs OCR and Gemini Vision extraction, and computes future attendance scenarios and skippable class limits.",
    features: [
      "Attendance & Timetable OCR powered by Gemini Vision",
      "Subject-wise attendance, present/absent tracking & percentage math",
      "Classes that can be skipped without dipping below target margin",
      "Classes required to attend to recover safe percentage",
      "Integrated academic calendar with holiday awareness",
      "Firebase authentication & Firestore real-time cloud database",
      "Cross-platform responsive web & mobile interface"
    ],
    tech: ["React", "Flutter", "Firebase", "Gemini Vision", "OCR", "Firestore"],
    github: "https://github.com/pratap-varma",
    live: "#"
  },
  {
    id: "cropdisease",
    number: "03",
    name: "CropDiseaseAI",
    tagline: "AI Crop Disease Detection & Agricultural Guidance",
    category: "ai",
    status: "Live Project",
    shortDesc: "Computer vision platform analyzing leaf imagery to classify crop pathogens and generate actionable agricultural advisories and organic treatments.",
    problem: "Crop diseases cause devastating harvest losses when farmers lack immediate access to plant pathologists, risking improper pesticide use.",
    solution: "Trained a convolutional neural network on PlantVillage data, deployed via Flask, and augmented with Gemini AI to generate weather-aware irrigation guidance, spray suitability, and organic remedies.",
    features: [
      "Leaf image analysis & deep learning disease classification",
      "Healthy vs. diseased detection with confidence scores",
      "Symptoms, prevention protocols, and organic treatment info",
      "Weather-aware agricultural advisories & spray timing",
      "Deployed and accessible live on Vercel"
    ],
    tech: ["Python", "Flask", "TensorFlow", "CNN", "Gemini AI", "PlantVillage"],
    github: "https://github.com/pratap-varma/crop-disease-ai",
    live: "https://cropdisease-liard.vercel.app"
  },
  {
    id: "paperplot",
    number: "04",
    name: "Paper Plot AI",
    tagline: "Research Paper Integrity & Hallucination Analysis",
    category: "hackathon",
    status: "Hackathon Prototype",
    shortDesc: "Explores AI-assisted analysis to identify authentic research patterns, fabricated claims, document inconsistencies, and AI-generated text in academic papers.",
    problem: "The proliferation of synthetic papers and predatory citations makes manual review tedious and error-prone for academic conferences.",
    solution: "Created an intelligent analysis layer for uploaded research papers utilizing NLP and document intelligence to highlight anomalies and suspicious content signals.",
    features: [
      "Document ingestion and multi-layer structural extraction",
      "Detection of AI-generated prose signatures and consistency checks",
      "Cross-checking research characteristics vs. known paper structures",
      "Flagging anomalous citations and fabricated claims",
      "Designed for the 'Hack with Vizag' NSRIT Hackathon"
    ],
    tech: ["AI", "NLP", "Document Intelligence", "Python", "Research Analysis"],
    github: "https://github.com/pratap-varma",
    live: "#"
  },
  {
    id: "samadhansetu",
    number: "05",
    name: "Samadhan Setu",
    tagline: "Civic & Industrial Innovation Challenge Platform",
    category: "fullstack",
    status: "Concept / Prototype",
    shortDesc: "A digital governance platform uniting Citizens, Academic Institutions, Industries, and Government bodies to collaboratively solve real-world community challenges.",
    problem: "Public sector challenges and civic issues remain siloed, preventing young researchers, student innovators, and industry R&D teams from co-developing solutions.",
    solution: "Architected a collaborative problem-discovery hub where verified citizen grievances across healthcare, water, and sanitation become open innovation bounties.",
    features: [
      "Challenge submission across 10 critical public domains",
      "Multi-stakeholder portal (Citizens ↔ Institutions ↔ Industry ↔ Govt)",
      "Collaborative project discovery and solution proposals",
      "Domain filtering: Healthcare, Agriculture, Water, Sanitation, Tech",
      "Civic transparency and status tracking pipeline"
    ],
    tech: ["Full Stack", "AI", "Digital Governance", "React", "REST APIs"],
    github: "https://github.com/pratap-varma",
    live: "#"
  },
  {
    id: "financeai",
    number: "06",
    name: "Personal Finance AI",
    tagline: "Intelligent Financial Analytics & Automated Insights",
    category: "ai",
    status: "Exploring Prototype",
    shortDesc: "An AI-oriented personal finance project exploring how intelligent systems parse transactions, predict cash flows, and surface automated financial insights.",
    problem: "Traditional budgeting apps show static charts without contextual advice or automated understanding of spending behavior.",
    solution: "Built a transaction intelligence pipeline using NLP and financial analytics to categorize expenses and generate proactive budget advisories.",
    features: [
      "Automated statement categorization and pattern detection",
      "Predictive recurring expense forecasting",
      "Contextual spending advisories generated via LLM prompts",
      "Clean visual dashboards with dynamic breakdown metrics"
    ],
    tech: ["Python", "AI", "Data Analytics", "FastAPI", "Automation"],
    github: "https://github.com/pratap-varma",
    live: "#"
  },
  {
    id: "attendance",
    number: "07",
    name: "Automated Attendance Portal",
    tagline: "Dynamic QR Code Campus Attendance Management",
    category: "fullstack",
    status: "Prototype",
    shortDesc: "A secure digital attendance platform with dynamic rotating QR codes, geolocation validation, and institutional analytics dashboards.",
    problem: "Manual attendance roll-calls waste valuable lecture hours and are prone to proxy attendance.",
    solution: "Built an anti-proxy attendance portal utilizing dynamic cryptographic QR codes that rotate every 10 seconds, verified against real-time session timestamps.",
    features: [
      "Dynamic rotating QR code generation for live classrooms",
      "Instant student scan verification and check-in logging",
      "Faculty and administrator management dashboards",
      "Analytical attendance reports and exportable logs"
    ],
    tech: ["JavaScript", "HTML/CSS", "Python", "QR Cryptography", "Analytics"],
    github: "https://github.com/pratap-varma",
    live: "#"
  },
  {
    id: "extensions",
    number: "08",
    name: "Productivity Chrome Extensions",
    tagline: "Custom Browser Workflow Automation Suite",
    category: "fullstack",
    status: "Tools Suite",
    shortDesc: "Suite of lightweight, custom browser extensions designed to automate repetitive developer workflows, scrape technical data, and optimize browsing productivity.",
    problem: "Repeated manual copying, web form filling, and context switching across browser tabs slows down everyday technical research.",
    solution: "Engineered focused Manifest V3 Chrome extensions with clean popup interfaces, hotkey shortcuts, and background service workers to automate frequent browser actions.",
    features: [
      "One-click multi-tab extraction and summary clipping",
      "Keyboard-first rapid task automation shortcuts",
      "Zero telemetry, privacy-preserving local storage",
      "Engineered on native web standards (Manifest V3)"
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "Chrome Extension API"],
    github: "https://github.com/pratap-varma",
    live: "#"
  }
];
