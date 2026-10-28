const profile = {
  shortName: "Subham Sidhanta",
  eyebrow: "BCA STUDENT · WEB DEVELOPER · AI/ML",
  intro: "I’m Subham Sidhanta, a BCA student and web developer exploring AI/ML through practical, privacy-minded projects.",
  about: "I’m studying for a Bachelor of Computer Applications at Midnapore College and learning by making. I’m interested in building clear, useful web experiences and exploring AI/ML through projects like Prism, a local-first retrieval assistant.",
  location: "Rampurhat, India",
  focus: "Web development · AI/ML",
  email: "subhamsidhanta@gmail.com",
  instagram: "https://www.instagram.com/subham__sidhanta_/",
  github: "https://github.com/Subhamsidhanta",
  linkedin: "https://www.linkedin.com/in/subham-sidhanta",
  projects: [
    {
      name: "Prism",
      description: "A local-first RAG assistant for document Q&A, with image and audio workflows in progress.",
      tags: ["FastAPI", "React", "Local AI"],
      url: "https://github.com/Subhamsidhanta/Prism",
      glyph: "✳"
    },
    {
      name: "Shiritori Method Game",
      description: "A Flask-backed browser game pairing number-memory challenges with an AI-assisted Shiritori word game.",
      tags: ["Flask", "JavaScript", "Gemini AI"],
      url: "https://github.com/Subhamsidhanta/Shiritori-Method-Game",
      glyph: "語"
    },
    {
      name: "Handwritten Digit Classifier",
      description: "A PyTorch CNN trained on MNIST, with an OpenCV canvas for drawing and predicting digits.",
      tags: ["PyTorch", "MNIST", "OpenCV"],
      url: "https://github.com/Subhamsidhanta/Handwritten-Digits-Classification",
      glyph: "7"
    },
    {
      name: "Face Emotion Recognition",
      description: "Train a CNN on the FER dataset and classify seven expressions from an OpenCV webcam demo.",
      tags: ["PyTorch", "CNN", "OpenCV"],
      url: "https://github.com/Subhamsidhanta/Face-Emotion-Recognition-CNN",
      glyph: "◉"
    },
    {
      name: "Expense Tracker",
      description: "A JavaScript project for personal expense tracking.",
      tags: ["JavaScript", "Finance"],
      url: "https://github.com/Subhamsidhanta/Expense-Tracker",
      glyph: "₹"
    },
    {
      name: "Online Library System",
      description: "A Java console app to add books, issue them, and record returns.",
      tags: ["Java", "Console app"],
      url: "https://github.com/Subhamsidhanta/Online-Library-System-in-java",
      glyph: "↗"
    }
  ],
  experience: [
    {
      title: "Bachelor of Computer Applications",
      company: "Midnapore College",
      period: "2024 — 2027",
      description: "Undergraduate studies in computer applications alongside hands-on software projects."
    },
    {
      title: "Campus Mantri",
      company: "GeeksforGeeks",
      period: "Community",
      description: "Part of the Campus Mantri program, helping bring learning and developer resources to campus."
    },
    {
      title: "Team AIMERS",
      company: "Smart India Hackathon 2026 · Midnapore College",
      period: "2026",
      description: "Selected from the college’s internal hackathon to move forward to the SIH registration stage."
    },
    {
      title: "Winner · INSIGHT 2.0",
      company: "Computer Vision Hackathon · Team AIMERS",
      period: "Hackathon",
      description: "A team win that marked an early milestone in collaborative problem-solving and computer vision."
    }
  ]
};

document.querySelectorAll("[data-profile]").forEach((element) => {
  const key = element.dataset.profile;
  if (!(key in profile)) return;
  element.textContent = profile[key];
});

for (const [key, label] of [["email", "Email"], ["instagram", "Instagram"], ["github", "GitHub"], ["linkedin", "LinkedIn"]]) {
  document.querySelectorAll(`[data-link="${key}"]`).forEach((link) => {
    link.href = key === "email" ? `mailto:${profile.email}` : profile[key];
    link.setAttribute("aria-label", key === "email" ? `Email ${profile.shortName}` : `${label} profile`);
  });
}

const projectGrid = document.querySelector("#project-grid");
const showMoreProjects = document.querySelector("#show-more-projects");
const initiallyVisibleProjects = 3;
if (profile.projects.length) {
  projectGrid.innerHTML = profile.projects.map((project, index) => `
    <article class="project-card"${index >= initiallyVisibleProjects ? " hidden" : ""}>
      <div class="project-visual" aria-hidden="true"><span class="project-corner">0${index + 1} / ${String(profile.projects.length).padStart(2, "0")}</span><div class="project-art"><div class="project-glyph"><span>${escapeHtml(project.glyph || "✳")}</span></div></div></div>
      <div class="project-info"><div><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description || "")}</p><div class="project-tags">${(project.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div></div><a class="project-link" href="${safeUrl(project.url)}" target="_blank" rel="noreferrer" aria-label="View ${escapeHtml(project.name)}">↗</a></div>
    </article>`).join("");
  if (profile.projects.length > initiallyVisibleProjects) {
    showMoreProjects.hidden = false;
    showMoreProjects.addEventListener("click", () => {
      const expanded = showMoreProjects.getAttribute("aria-expanded") !== "true";
      projectGrid.querySelectorAll(".project-card").forEach((card, index) => {
        if (index >= initiallyVisibleProjects) card.hidden = !expanded;
      });
      showMoreProjects.setAttribute("aria-expanded", String(expanded));
      showMoreProjects.querySelector(".show-more-label").textContent = expanded ? "Show fewer projects" : "Show more projects";
      showMoreProjects.querySelector(".show-more-icon").textContent = expanded ? "−" : "＋";
      if (!expanded) document.querySelector("#work").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
} else {
  projectGrid.innerHTML = `<div class="empty-state">Your featured projects will appear here once your GitHub profile is connected.</div>`;
}

document.querySelector("#github-note").innerHTML = profile.github
  ? `Curious what else I’m building? <a href="${safeUrl(profile.github)}" target="_blank" rel="noreferrer">Explore all my repositories ↗</a>`
  : "";

const experienceList = document.querySelector("#experience-list");
experienceList.innerHTML = profile.experience.length
  ? profile.experience.map((role) => `<article class="experience-row"><div><div class="experience-role">${escapeHtml(role.title)}</div><div class="experience-company">${escapeHtml(role.company)}</div></div><div class="experience-description">${escapeHtml(role.description || "")}</div><div class="experience-date">${escapeHtml(role.period || "")}</div></article>`).join("")
  : `<div class="empty-state">Your professional experience will be added here from your LinkedIn profile.</div>`;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "#contact";
  } catch {
    return "#contact";
  }
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
