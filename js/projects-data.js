/**
 * Structured Data for Featured Projects
 */

const PROJECTS_DATA = [
  {
    id: "trackx",
    number: "01",
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
    number: "02",
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
  }
];
