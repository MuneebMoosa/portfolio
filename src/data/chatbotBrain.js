const brain = {
  greeting:
    "Hi! I'm Muneeb's portfolio assistant. Ask about skills, projects, education, internships, or contact.",

  fallback:
    "I only answer about Muneeb's portfolio, skills, projects, education, and contact.",

  faq: [
    {
      patterns: [
        "who are you",
        "who is muneeb",
        "about",
        "introduce yourself",
      ],
      response:
        "Muneeb Moosa V V is a B.Tech Computer Science student interested in AI-integrated web development and full-stack projects.",
    },

    {
      patterns: [
        "skills",
        "technical skills",
        "what skills",
      ],
      response:
        "Muneeb works with HTML, CSS, JavaScript, React, Node.js basics, Python basics, Git, GitHub, and MongoDB.",
    },

    {
      patterns: [
        "projects",
        "what projects",
        "built",
      ],
      response:
        "Muneeb built projects like a Task Manager, Weather App, Memory Game, Portfolio Website, Omegle-like App, and Library Management App.",
    },

    {
      patterns: [
        "react",
        "frontend",
        "javascript",
      ],
      response:
        "Muneeb is comfortable with frontend development using React, JavaScript, HTML, CSS, and responsive UI building.",
    },

    {
      patterns: [
        "backend",
        "node",
        "mongodb",
      ],
      response:
        "Muneeb is learning backend development with Node.js, Express, MongoDB, and API integration.",
    },

    {
      patterns: [
        "ai",
        "machine learning",
        "artificial intelligence",
      ],
      response:
        "Muneeb is interested in AI-integrated web development, AI agents, game AI, and smart automation projects.",
    },

    {
      patterns: [
        "education",
        "college",
        "degree",
      ],
      response:
        "Muneeb is pursuing a B.Tech in Computer Science Engineering and is currently in the final years of study.",
    },

    {
      patterns: [
        "internship",
        "hire",
        "work",
      ],
      response:
        "Muneeb is actively looking for internship opportunities in web development and AI-integrated development.",
    },

    {
      patterns: [
        "contact",
        "email",
        "github",
      ],
      response:
        "You can contact Muneeb at muneebmoosavv07@gmail.com.",
    },
  ],
};

export default brain;