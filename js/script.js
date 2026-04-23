document.addEventListener("DOMContentLoaded", () => {
  /* ============================
     ELEMENTS
  ============================ */
  const body = document.body;
  const themeToggleBtn = document.getElementById("themeToggle");
  const greetingEl = document.getElementById("greeting");
  const yearEl = document.getElementById("year");
  const timeOnSiteEl = document.getElementById("timeOnSite");

  const visitorForm = document.getElementById("visitorForm");
  const visitorNameInput = document.getElementById("visitorName");
  const visitorWelcome = document.getElementById("visitorWelcome");
  const visitorStatus = document.getElementById("visitorStatus");
  const clearVisitorBtn = document.getElementById("clearVisitorBtn");

  const aboutToggle = document.getElementById("aboutToggle");
  const aboutContent = document.getElementById("aboutContent");

  const projectSearch = document.getElementById("projectSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const levelFilter = document.getElementById("levelFilter");
  const sortProjects = document.getElementById("sortProjects");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const projectsGrid = document.getElementById("projectsGrid");
  const projectsEmpty = document.getElementById("projectsEmpty");
  const projectsCount = document.getElementById("projectsCount");
  const advancedToggle = document.getElementById("advancedToggle");
  const advancedControls = document.getElementById("advancedControls");
  const toggleProjectsBtn = document.getElementById("toggleProjectsBtn");

  const githubRepoGrid = document.getElementById("githubRepoGrid");
  const githubStatus = document.getElementById("githubStatus");
  const reloadGithubBtn = document.getElementById("reloadGithubBtn");
  const githubToggle = document.getElementById("githubToggle");
  const githubContent = document.getElementById("githubContent");
  const backToTopBtn = document.getElementById("backToTop");

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const termsCheck = document.getElementById("termsCheck");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const termsError = document.getElementById("termsError");

  /* ============================
     CONFIG
  ============================ */
  const GITHUB_USERNAME = "Ali-A-R9";
  const STORAGE_KEYS = {
    theme: "portfolio-theme",
    aboutVisible: "portfolio-about-visible",
    advancedVisible: "portfolio-advanced-visible",
    githubVisible: "portfolio-github-visible",
    visitorName: "portfolio-visitor-name"
  };

  const DEFAULT_VISIBLE_PROJECTS = 2;
  const fallbackProjects = [
    {
      title: "Portfolio Website",
      description: "A responsive personal portfolio website built with HTML, CSS, and JavaScript.",
      url: "https://github.com/Ali-A-R9",
      tags: ["HTML", "CSS", "JavaScript", "Portfolio"],
      category: "Portfolio",
      level: "Beginner",
      date: "2025-03-15"
    },
    {
      title: "WPF Desktop App",
      description: "A C# desktop application with a graphical interface and structured functionality.",
      url: "https://github.com/Ali-A-R9",
      tags: ["C#", "WPF", "Desktop"],
      category: "Desktop",
      level: "Advanced",
      date: "2025-02-10"
    },
    {
      title: "Web Assignment Project",
      description: "A front-end web project focused on layout, responsiveness, and user interaction.",
      url: "https://github.com/Ali-A-R9",
      tags: ["HTML", "CSS", "JavaScript", "Web"],
      category: "Web",
      level: "Beginner",
      date: "2025-04-01"
    }
  ];

  let showAllProjects = false;
  let githubLoadedOnce = false;
  let isLoadingGitHub = false;
  let projects = [...fallbackProjects];
  let githubReposCache = [];

  /* ============================
     HELPERS
  ============================ */
  function debounce(callback, delay = 250) {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    };
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  function getCategoryFromRepo(repo) {
    const language = (repo.language || "").toLowerCase();
    const text = `${repo.name} ${repo.description || ""}`.toLowerCase();

    if (language.includes("c#") || text.includes("wpf") || text.includes("desktop")) {
      return "Desktop";
    }

    if (text.includes("portfolio") || text.includes("assignment")) {
      return "Portfolio";
    }

    return "Web";
  }

  function getLevelFromRepo(repo) {
    const text = `${repo.name} ${repo.description || ""}`.toLowerCase();

    if (
      text.includes("security") ||
      text.includes("sql injection") ||
      text.includes("wpf") ||
      text.includes("advanced")
    ) {
      return "Advanced";
    }

    return "Beginner";
  }

  function getTagsFromRepo(repo) {
    const tags = [];

    if (repo.language) tags.push(repo.language);

    const text = `${repo.name} ${repo.description || ""}`.toLowerCase();

    if (text.includes("web")) tags.push("Web");
    if (text.includes("portfolio")) tags.push("Portfolio");
    if (text.includes("schedule")) tags.push("Productivity");
    if (text.includes("sql")) tags.push("Security");
    if (text.includes("wpf")) tags.push("Desktop");
    if (text.includes("javascript")) tags.push("JavaScript");
    if (text.includes("python")) tags.push("Python");

    if (tags.length === 0) {
      tags.push("Project");
    }

    return [...new Set(tags)];
  }

  function mapRepoToProject(repo) {
    return {
      title: repo.name,
      description: repo.description || "No description provided for this repository.",
      url: repo.html_url,
      tags: getTagsFromRepo(repo),
      category: getCategoryFromRepo(repo),
      level: getLevelFromRepo(repo),
      date: repo.updated_at
    };
  }

  /* ============================
     YEAR
  ============================ */
  yearEl.textContent = new Date().getFullYear();

  /* ============================
     VISITOR NAME STATE
  ============================ */
  function getSavedVisitorName() {
    return localStorage.getItem(STORAGE_KEYS.visitorName) || "";
  }

  function showVisitorStatus(message, type = "success") {
    visitorStatus.textContent = message;
    visitorStatus.style.color = type === "error" ? "var(--danger)" : "var(--success)";
  }

  function updateVisitorUI() {
    const savedName = getSavedVisitorName();

    if (savedName) {
      visitorWelcome.textContent = `Welcome back, ${savedName}. Your name is saved on this device.`;
      visitorNameInput.value = savedName;
    } else {
      visitorWelcome.textContent = "You are visiting as a guest.";
      visitorNameInput.value = "";
    }
  }

  updateVisitorUI();

  visitorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cleanName = visitorNameInput.value.trim().replace(/\s+/g, " ");

    if (cleanName.length < 2) {
      showVisitorStatus("Please enter at least 2 characters for your name.", "error");
      return;
    }

    localStorage.setItem(STORAGE_KEYS.visitorName, cleanName);
    updateVisitorUI();
    setGreeting();
    showVisitorStatus("Your name has been saved successfully.");
  });

  clearVisitorBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.visitorName);
    updateVisitorUI();
    setGreeting();
    showVisitorStatus("Saved visitor name was removed.");
  });

  /* ============================
     GREETING
  ============================ */
  function setGreeting() {
    const hour = new Date().getHours();
    const savedName = getSavedVisitorName();
    let greeting = "Hello";

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    greetingEl.textContent = savedName
      ? `${greeting}, ${savedName}! Welcome back to my portfolio.`
      : `${greeting}! Welcome to my portfolio.`;
  }

  setGreeting();

  /* ============================
     THEME TOGGLE
  ============================ */
  function updateThemeButtonText() {
    themeToggleBtn.textContent = body.classList.contains("dark")
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  }

  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === "dark") {
    body.classList.add("dark");
  }
  updateThemeButtonText();

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem(
      STORAGE_KEYS.theme,
      body.classList.contains("dark") ? "dark" : "light"
    );
    updateThemeButtonText();
  });

  /* ============================
     TIME ON SITE
  ============================ */
  let secondsOnSite = 0;

  function updateTimeOnSite() {
    secondsOnSite += 1;
    const hours = Math.floor(secondsOnSite / 3600);
    const minutes = Math.floor((secondsOnSite % 3600) / 60);
    const seconds = secondsOnSite % 60;

    if (hours > 0) {
      timeOnSiteEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      timeOnSiteEl.textContent = `${minutes}m ${seconds}s`;
    } else {
      timeOnSiteEl.textContent = `${seconds}s`;
    }
  }

  updateTimeOnSite();
  setInterval(updateTimeOnSite, 1000);

  /* ============================
     ABOUT TOGGLE
  ============================ */
  function setAboutVisibility(isVisible) {
    aboutContent.hidden = !isVisible;
    aboutToggle.textContent = isVisible ? "Hide Details" : "Show Details";
    aboutToggle.setAttribute("aria-expanded", String(isVisible));
    localStorage.setItem(STORAGE_KEYS.aboutVisible, String(isVisible));
  }

  const savedAboutState = localStorage.getItem(STORAGE_KEYS.aboutVisible);
  setAboutVisibility(savedAboutState !== "false");

  aboutToggle.addEventListener("click", () => {
    setAboutVisibility(aboutContent.hidden);
  });

  /* ============================
     ADVANCED FILTERS TOGGLE
  ============================ */
  function setAdvancedVisibility(isVisible) {
    advancedControls.hidden = !isVisible;
    advancedToggle.textContent = isVisible ? "Hide Advanced Filters" : "Advanced Filters";
    advancedToggle.setAttribute("aria-expanded", String(isVisible));
    localStorage.setItem(STORAGE_KEYS.advancedVisible, String(isVisible));
  }

  const savedAdvancedState = localStorage.getItem(STORAGE_KEYS.advancedVisible);
  setAdvancedVisibility(savedAdvancedState === "true");

  advancedToggle.addEventListener("click", () => {
    setAdvancedVisibility(advancedControls.hidden);
  });

  /* ============================
     GITHUB TOGGLE
  ============================ */
  function setGitHubVisibility(isVisible) {
    githubContent.hidden = !isVisible;
    githubToggle.textContent = isVisible ? "Hide GitHub Section" : "Show GitHub Section";
    githubToggle.setAttribute("aria-expanded", String(isVisible));
    localStorage.setItem(STORAGE_KEYS.githubVisible, String(isVisible));
  }

  const savedGitHubState = localStorage.getItem(STORAGE_KEYS.githubVisible);
  setGitHubVisibility(savedGitHubState === "true");

  githubToggle.addEventListener("click", () => {
    const willShow = githubContent.hidden;
    setGitHubVisibility(willShow);

    if (willShow && !githubLoadedOnce) {
      loadGitHubRepos();
    }
  });

  /* ============================
     PROJECTS
  ============================ */
  function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
      <h3 class="project-title">${escapeHtml(project.title)}</h3>
      <div class="project-meta">
        <span><strong>Category:</strong> ${escapeHtml(project.category)}</span>
        <span><strong>Level:</strong> ${escapeHtml(project.level)}</span>
        <span><strong>Date:</strong> ${formatDate(project.date)}</span>
      </div>
      <p class="project-description">${escapeHtml(project.description)}</p>
      <ul class="project-tags">
        ${project.tags.map((tag) => `<li class="project-tag">${escapeHtml(tag)}</li>`).join("")}
      </ul>
      <a class="project-button" href="${project.url}" target="_blank" rel="noopener noreferrer">
        View Project
      </a>
    `;

    return card;
  }

  function filterProjects(list) {
    const query = projectSearch.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const level = levelFilter.value;

    return list.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        project.category,
        project.level,
        ...project.tags
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query === "" || searchableText.includes(query);
      const matchesCategory = category === "all" || project.category === category;
      const matchesLevel = level === "all" || project.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  function sortProjectList(list) {
    const sorted = [...list];
    const sortValue = sortProjects.value;

    switch (sortValue) {
      case "oldest":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
      default:
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return sorted;
  }

  function renderProjects() {
    const filtered = filterProjects(projects);
    const sorted = sortProjectList(filtered);
    const visibleProjects = showAllProjects ? sorted : sorted.slice(0, DEFAULT_VISIBLE_PROJECTS);

    projectsGrid.innerHTML = "";

    if (sorted.length === 0) {
      projectsEmpty.hidden = false;
      projectsEmpty.textContent = "No projects found. Try changing the search or filters.";
      toggleProjectsBtn.hidden = true;
      projectsCount.textContent = "0 projects shown";
      return;
    }

    projectsEmpty.hidden = true;

    visibleProjects.forEach((project) => {
      projectsGrid.appendChild(createProjectCard(project));
    });

    projectsCount.textContent = `${visibleProjects.length} of ${sorted.length} project(s) shown`;

    if (sorted.length <= DEFAULT_VISIBLE_PROJECTS) {
      toggleProjectsBtn.hidden = true;
    } else {
      toggleProjectsBtn.hidden = false;
      toggleProjectsBtn.textContent = showAllProjects ? "Show Less" : "Show More";
    }
  }

  const debouncedRenderProjects = debounce(() => {
    showAllProjects = false;
    renderProjects();
  }, 200);

  projectSearch.addEventListener("input", debouncedRenderProjects);

  [categoryFilter, levelFilter, sortProjects].forEach((control) => {
    control.addEventListener("change", () => {
      showAllProjects = false;
      renderProjects();
    });
  });

  resetFiltersBtn.addEventListener("click", () => {
    projectSearch.value = "";
    categoryFilter.value = "all";
    levelFilter.value = "all";
    sortProjects.value = "newest";
    showAllProjects = false;
    renderProjects();
  });

  toggleProjectsBtn.addEventListener("click", () => {
    showAllProjects = !showAllProjects;
    renderProjects();
  });

  renderProjects();

  /* ============================
     GITHUB API
  ============================ */
  function createRepoCard(repo) {
    const card = document.createElement("article");
    card.className = "repo-card";

    const description = repo.description || "No description provided for this repository.";
    const language = repo.language || "Not specified";

    card.innerHTML = `
      <h3>${escapeHtml(repo.name)}</h3>
      <p>${escapeHtml(description)}</p>
      <div class="repo-meta">
        <span><strong>Language:</strong> ${escapeHtml(language)}</span>
        <span><strong>Stars:</strong> ${repo.stargazers_count}</span>
        <span><strong>Updated:</strong> ${formatDate(repo.updated_at)}</span>
      </div>
      <a class="project-button" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
        Open Repository
      </a>
    `;

    return card;
  }

  async function fetchGitHubRepos() {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch GitHub data.");
    }

    const repos = await response.json();

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  function renderGitHubSection(repos) {
    githubRepoGrid.innerHTML = "";

    const reposForGithubSection = repos.slice(0, 4);

    reposForGithubSection.forEach((repo) => {
      githubRepoGrid.appendChild(createRepoCard(repo));
    });
  }

  async function loadGitHubRepos(forceRefresh = false) {
    if (isLoadingGitHub) return;
    isLoadingGitHub = true;

    githubStatus.textContent = "Loading repositories...";
    githubStatus.className = "api-status";
    reloadGithubBtn.disabled = true;

    try {
      if (githubReposCache.length === 0 || forceRefresh) {
        githubReposCache = await fetchGitHubRepos();
      }

      if (githubReposCache.length === 0) {
        githubRepoGrid.innerHTML = "";
        githubStatus.textContent = "No public repositories found. Showing local project data instead.";
        githubStatus.className = "api-status error";
        projects = [...fallbackProjects];
        renderProjects();
        githubLoadedOnce = true;
        return;
      }

      projects = githubReposCache.map(mapRepoToProject);
      renderProjects();
      renderGitHubSection(githubReposCache);

      githubStatus.textContent = "Live data loaded from GitHub.";
      githubStatus.className = "api-status success";
      githubLoadedOnce = true;
    } catch (error) {
      githubRepoGrid.innerHTML = "";
      githubStatus.textContent =
        "GitHub data could not be loaded right now. Showing fallback project data.";
      githubStatus.className = "api-status error";
      projects = [...fallbackProjects];
      renderProjects();
      console.error("GitHub API error:", error);
      githubLoadedOnce = true;
    } finally {
      reloadGithubBtn.disabled = false;
      isLoadingGitHub = false;
    }
  }

  reloadGithubBtn.addEventListener("click", () => {
    if (githubContent.hidden) {
      setGitHubVisibility(true);
    }
    loadGitHubRepos(true);
  });

  loadGitHubRepos();

  /* ============================
     FORM VALIDATION
  ============================ */
  function setFieldError(input, errorElement, message) {
    if (message) {
      input.setAttribute("aria-invalid", "true");
      errorElement.textContent = message;
    } else {
      input.setAttribute("aria-invalid", "false");
      errorElement.textContent = "";
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    let isValid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "") {
      setFieldError(nameInput, nameError, "Name is required.");
      isValid = false;
    } else if (name.length < 2) {
      setFieldError(nameInput, nameError, "Name must be at least 2 characters.");
      isValid = false;
    } else {
      setFieldError(nameInput, nameError, "");
    }

    if (email === "") {
      setFieldError(emailInput, emailError, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setFieldError(emailInput, emailError, "Enter a valid email address.");
      isValid = false;
    } else {
      setFieldError(emailInput, emailError, "");
    }

    if (message === "") {
      setFieldError(messageInput, messageError, "Message is required.");
      isValid = false;
    } else if (message.length < 15) {
      setFieldError(messageInput, messageError, "Message must be at least 15 characters.");
      isValid = false;
    } else if (message.length > 500) {
      setFieldError(messageInput, messageError, "Message must be under 500 characters.");
      isValid = false;
    } else {
      setFieldError(messageInput, messageError, "");
    }

    if (!termsCheck.checked) {
      termsError.textContent = "Please confirm the information before submitting.";
      isValid = false;
    } else {
      termsError.textContent = "";
    }

    return isValid;
  }

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `form-status show ${type}`;
  }

  function clearStatus() {
    statusEl.textContent = "";
    statusEl.className = "form-status";
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", validateForm);
  });

  termsCheck.addEventListener("change", validateForm);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearStatus();

    if (!validateForm()) {
      showStatus("Please fix the errors above before submitting.", "error");
      return;
    }

    sendBtn.disabled = true;
    showStatus("Sending...", "success");

    setTimeout(() => {
      showStatus("Message sent successfully! This is a demo form.", "success");
      form.reset();
      sendBtn.disabled = false;

      setFieldError(nameInput, nameError, "");
      setFieldError(emailInput, emailError, "");
      setFieldError(messageInput, messageError, "");
      termsError.textContent = "";
    }, 1000);
  });

  /* ============================
     FADE-IN ON SCROLL
  ============================ */
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeElements.forEach((element) => observer.observe(element));

  /* ============================
     BACK TO TOP
  ============================ */
  function toggleBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle("show", window.scrollY > 300);
  }

  if (backToTopBtn) {
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop);
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
