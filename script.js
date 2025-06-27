import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  push,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRnCdZVee0I4aR6he3hG1uQ2iX9kfqASg",
  authDomain: "portfolio-3ab75.firebaseapp.com",
  projectId: "portfolio-3ab75",
  storageBucket: "portfolio-3ab75.firebasestorage.app",
  messagingSenderId: "913337938039",
  appId: "1:913337938039:web:a5bf1b64f0f8bcec385672",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
let content = document.getElementById("main");
let loadingGif = document.getElementById("loading");
let themeToggle = document.getElementById("theme-toggle");
let profileImage = document.getElementById("profileImage");

// Info elements
let infoName = document.getElementById("adminName");
let infoProfession = document.getElementById("profession");
let infoAddress = document.getElementById("address");
let infoDepartment = document.getElementById("department");
let infoUniversity = document.getElementById("universityName");

// Contact elements
let facebookLink = document.getElementById("facebook-link");
let firebaseLink = document.getElementById("firebase-link");
let linkedinLink = document.getElementById("linkedin-link");
let githubLink = document.getElementById("github-link");

// Containers
let skillsContainer = document.getElementById("skills-container");
let projectCards = document.getElementById("project-cards");

// Theme Management
let currentTheme = localStorage.getItem("theme") || "dark";
let themeSettings = {};

// Apply theme function
function applyTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("theme", themeName);
  updateThemeIcon();
}

// Theme Toggle Functionality
themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
});

function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  if (currentTheme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

// Load theme settings from Firebase
async function loadThemeSettings() {
  try {
    const themeSnap = await get(ref(database, "Theme/"));
    const themeData = themeSnap.val();

    if (themeData) {
      themeSettings = themeData;

      // Apply color scheme if set
      if (themeData.color) {
        if (themeData.color === "custom") {
          applyColorScheme("custom", themeData.customColor);
        } else {
          applyColorScheme(themeData.color);
        }
      }

      // Apply animation settings
      if (themeData.animations === false) {
        document.body.style.setProperty("--animation-duration", "0s");
      }

      if (themeData.parallax === false) {
        // Disable parallax effects
        const main = document.querySelector("main");
        if (main) {
          main.style.backgroundAttachment = "scroll";
        }
      }
    }
  } catch (error) {
    console.error("Error loading theme settings:", error);
  }
}

// Apply color scheme
function applyColorScheme(color, customValue) {
  const root = document.documentElement;
  switch (color) {
    case "green":
      root.style.setProperty("--secondary-color", "#4CAF50");
      break;
    case "purple":
      root.style.setProperty("--secondary-color", "#9C27B0");
      break;
    case "orange":
      root.style.setProperty("--secondary-color", "#FF9800");
      break;
    case "red":
      root.style.setProperty("--secondary-color", "#f44336");
      break;
    case "pink":
      root.style.setProperty("--secondary-color", "#e91e63");
      break;
    case "yellow":
      root.style.setProperty("--secondary-color", "#ffeb3b");
      break;
    case "teal":
      root.style.setProperty("--secondary-color", "#009688");
      break;
    case "cyan":
      root.style.setProperty("--secondary-color", "#00bcd4");
      break;
    case "lime":
      root.style.setProperty("--secondary-color", "#cddc39");
      break;
    case "indigo":
      root.style.setProperty("--secondary-color", "#3f51b5");
      break;
    case "brown":
      root.style.setProperty("--secondary-color", "#795548");
      break;
    case "deep-orange":
      root.style.setProperty("--secondary-color", "#ff5722");
      break;
    case "deep-purple":
      root.style.setProperty("--secondary-color", "#673ab7");
      break;
    case "amber":
      root.style.setProperty("--secondary-color", "#ffc107");
      break;
    case "light-blue":
      root.style.setProperty("--secondary-color", "#03a9f4");
      break;
    case "light-green":
      root.style.setProperty("--secondary-color", "#8bc34a");
      break;
    case "blue-grey":
      root.style.setProperty("--secondary-color", "#607d8b");
      break;
    case "grey":
      root.style.setProperty("--secondary-color", "#9e9e9e");
      break;
    case "black":
      root.style.setProperty("--secondary-color", "#222");
      break;
    case "custom":
      if (customValue) root.style.setProperty("--secondary-color", customValue);
      break;
    default:
      root.style.setProperty("--secondary-color", "#00abf0");
  }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active Navigation Highlight
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.parentElement.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.parentElement.classList.add("active");
    }
  });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Loading Animation
window.onload = async () => {
  try {
    // Load theme settings first
    await loadThemeSettings();

    // Apply initial theme
    applyTheme(currentTheme);

    // Simulate loading time for better UX
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const snap = await get(ref(database));
    const data = snap.val();
    if (data) {
      const aboutData = data.About || {};
      const skillData = Object.values(data.Skills || {});
      const projectData = Object.values(data.Projects || {});

      // Update personal info
      infoName.innerText = aboutData.name || "Sohail Ahmed";
      infoProfession.innerText = aboutData.profession || "Frontend Developer";
      infoAddress.innerText = aboutData.address || "Sindh, Pakistan";
      infoDepartment.innerText = aboutData.department || "Mechanical";
      infoUniversity.innerText = aboutData.universityName || "MUET Jamshoro";

      // Update contact info
      facebookLink.href = `${aboutData.facebook}`;
      firebaseLink.href = `${aboutData.firebase}`;
      linkedinLink.href = `${aboutData.linkedin}`;
      githubLink.href = `${aboutData.github}`;

      // Update profile image if available
      if (aboutData.profileImage) {
        profileImage.src = aboutData.profileImage;
      }

      // Render skills with animation delay
      skillData.forEach((item, index) => {
        setTimeout(() => {
          const skillCard = `
                        <div class="skill-card" data-aos="zoom-in" data-aos-delay="${
                          index * 100
                        }" style="display: ${index < 4 ? "block" : "none"}">
                            <img src="${item.photoUrl}" alt="${
            item.skillTitle
          }">
                            <h3>${item.skillTitle}</h3>
                            <p>${item.skillDiscription}</p>
                        </div>
                    `;
          skillsContainer.innerHTML += skillCard;
        }, index * 100);
      });

      // Render projects with animation delay
      projectData.forEach((item, index) => {
        setTimeout(() => {
          const projectCard = `
                        <div class="card" data-aos="fade-up" data-aos-delay="${
                          index * 150
                        }" style="display: ${index < 3 ? "block" : "none"}">
                            <img src="${item.photoUrl}" alt="${
            item.projectTitle
          }">
                            <h3>${item.projectTitle}</h3>
                            <p>${item.projectDiscription}</p>
                            <a href="${
                              item.projectLink
                            }" target="_blank">View Project</a>
                        </div>
                    `;
          projectCards.innerHTML += projectCard;
        }, index * 150);
      });
    }

    // Hide loading screen with fade out
    loadingGif.style.opacity = "0";
    setTimeout(() => {
      loadingGif.style.display = "none";
      content.style.display = "block";

      // Trigger AOS refresh after content is loaded
      AOS.refresh();
    }, 500);
  } catch (error) {
    console.error("Error loading data:", error);

    // Hide loading screen even if there's an error
    loadingGif.style.opacity = "0";
    setTimeout(() => {
      loadingGif.style.display = "none";
      content.style.display = "block";
    }, 500);
  }
};

// Form Submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields");
    } else {
      let Object = {
        name: name,
        email: email,
        message: message,
      };
      await push(ref(database, "Messages"), Object);
    }

    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });

// Button click handlers
document.querySelector(".btn-primary").addEventListener("click", function () {
  // Scroll to contact section
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".btn-secondary").addEventListener("click", function () {
  // Open email client
  window.open("mailto:sohail@example.com?subject=Let's Talk", "_blank");
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Add typing effect to profession
  const profession = document.getElementById("profession");
  if (profession) {
    const text = profession.textContent;
    profession.textContent = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        profession.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    setTimeout(typeWriter, 1000);
  }
});

// Prevent horizontal scroll
window.addEventListener("resize", () => {
  document.body.style.overflowX = "hidden";
});

// Ensure no horizontal scroll on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowX = "hidden";
});

// View All Functions
window.showAllSkills = function () {
  // Scroll to skills section and show all skills
  document.getElementById("skills").scrollIntoView({ behavior: "smooth" });

  // If skills are limited, show all
  const skillsContainer = document.getElementById("skills-container");
  const skillCards = skillsContainer.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.style.display = "block";
  });
};

window.showAllProjects = function () {
  // Scroll to projects section and show all projects
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });

  // If projects are limited, show all
  const projectsContainer = document.getElementById("project-cards");
  const projectCards = projectsContainer.querySelectorAll(".card");

  projectCards.forEach((card) => {
    card.style.display = "block";
  });
};
