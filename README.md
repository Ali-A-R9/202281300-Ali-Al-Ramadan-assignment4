# Assignment 4 – Personal Web Application  
## Personal Portfolio Website

🌐 **Live Demo:**  
https://ali-a-r9.github.io/202281300-Ali-Al-Ramadan-assignment4/

🔗 **Repository:**  
https://github.com/Ali-A-R9/202281300-Ali-Al-Ramadan-assignment4

---

## Project Overview

This project is my final personal portfolio web application for Assignment 4.  
It combines the work from earlier assignments into one polished, responsive, and professional website that presents my profile, skills, projects, and contact section in a single place.

The goal of this assignment is not only to build a working portfolio, but also to demonstrate:

- clean front-end development practices
- responsive and accessible design
- interactive JavaScript functionality
- state management with `localStorage`
- API integration using real GitHub data
- professional documentation
- responsible and transparent AI usage

This portfolio is designed to be a practical website that I can continue improving after the course.

---

## Main Features

### Personal Portfolio Sections
- Hero / introduction section
- About section
- Skills section
- Projects portfolio section
- Contact section
- Footer with quick navigation and links

### Interactive Functionality
- Light / dark theme toggle
- Personalized visitor name saving
- Dynamic greeting based on time of day
- Time-on-site counter
- Search, filtering, and sorting for projects
- Show / hide controls for selected sections
- Back-to-top button for easier navigation

### GitHub Integration
- Fetches repository data from the **GitHub REST API**
- Displays public repositories dynamically
- Shows repository name, description, language, stars, and update date
- Includes fallback data and graceful error handling if the API request fails

### User Experience
- Responsive design for desktop, tablet, and mobile
- Smooth scrolling and transitions
- Clear feedback messages for validation and actions
- Accessible structure using semantic HTML and ARIA attributes

---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **GitHub REST API**
- **localStorage**
- **Git & GitHub**

---

## Folder Structure

```text
202281300-Ali-Al-Ramadan-assignment4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides.pdf
│   └── demo-video.mp4
└── .gitignore
```

---

## How to Run the Project Locally

### Option 1: Open the Live Website
Use the deployed version directly:

```text
https://ali-a-r9.github.io/202281300-Ali-Al-Ramadan-assignment4/
```

### Option 2: Run Locally with VS Code

```bash
# Clone the repository
git clone https://github.com/Ali-A-R9/202281300-Ali-Al-Ramadan-assignment4.git

# Open the project folder
cd 202281300-Ali-Al-Ramadan-assignment4

# Open it in VS Code
code .

# Then run with Live Server
# Right click index.html -> Open with Live Server
```

### Option 3: Run Locally Without Extensions
You can also open `index.html` directly in a browser, but using **Live Server** is recommended for the best testing experience.

---

## Usage Guide

### 1. Personalization
- Enter your name in the visitor input field
- Save it to personalize the greeting
- The website remembers the name using `localStorage`

### 2. Theme Switching
- Toggle between light mode and dark mode
- Theme preference is saved automatically

### 3. Projects Section
- Search projects by keyword
- Filter by category and level
- Sort results by title or date
- View either live GitHub content or fallback project data

### 4. GitHub Section
- Open the GitHub projects area
- Load repositories from the API
- Refresh data if needed

### 5. Contact Form
- Fill in all required fields
- Use a valid email address
- Enter a meaningful message
- Submit to see success/error feedback

---

## Professional Quality Considerations

This project was finalized with attention to:

- consistent naming and formatting
- responsive layout behavior
- readable and maintainable code
- graceful error handling
- accessibility support
- performance-conscious front-end implementation
- simple but professional portfolio presentation

---

## AI Usage Summary

AI tools were used to support development, debugging, documentation, and design refinement during this assignment.

- **ChatGPT** was used for code review, debugging help, UI improvement ideas, documentation refinement, and polishing the final portfolio structure.

All AI-generated suggestions were reviewed, tested, and modified before being included in the final project.

For the full report, see:

```text
docs/ai-usage-report.md
```

---

## Documentation

Additional documentation is included in the `docs/` folder:

- `docs/ai-usage-report.md`
- `docs/technical-documentation.md`

---

## Notes

- The contact form is front-end only and does not send data to a real backend service.
- GitHub API results depend on network availability and API rate limits.
- The portfolio is intentionally lightweight and built without frameworks to focus on the course learning outcomes.

---

## Author

**Ali Al Ramadan**  
Student ID: **202281300**