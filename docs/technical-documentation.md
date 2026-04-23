# Technical Documentation – Assignment 4

## 1. Project Overview

This project is a final personal portfolio web application built for Assignment 4.  
It combines portfolio presentation, interactive front-end behavior, API integration, and user-focused design into one complete website.

The application is intended to demonstrate:
- semantic HTML structure
- responsive CSS layout
- interactive JavaScript behavior
- API integration
- state persistence
- documentation quality
- professional presentation readiness

The final site is designed as a practical portfolio that can continue to be improved after the course.

---

## 2. Objectives

The main objectives of this project were to:

- create a complete and polished personal portfolio website
- demonstrate mastery of front-end concepts covered in the course
- organize the project professionally for presentation and submission
- improve usability, responsiveness, and code quality
- integrate AI support responsibly and document that process clearly

---

## 3. System Architecture

The project uses a simple front-end architecture with separated concerns:

- **HTML** for structure and semantic content
- **CSS** for layout, theme, responsiveness, and visual presentation
- **JavaScript** for interactivity, rendering logic, filtering, validation, state handling, and API communication

### File Organization

```text
202281300-Ali-Al-Ramadan-assignment4/
├── index.html
├── css/styles.css
├── js/script.js
├── assets/images/
├── docs/
└── presentation/
```

This structure keeps the project easy to maintain, read, and present.

---

## 4. HTML Structure

The HTML is built using semantic elements such as:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `form`
- `footer`

### Main sections include:
- hero / introduction
- about
- skills
- projects
- contact
- footer

### Accessibility-related structure
The page also includes accessibility-focused elements such as:
- descriptive headings
- labels for form inputs
- `aria-live` for dynamic messages
- `aria-expanded` for toggled controls
- keyboard-accessible buttons and links
- visible content hierarchy

This supports both usability and compatibility with assistive technologies.

---

## 5. CSS Design Approach

The CSS is organized to support:
- theme variables
- reusable components
- responsive layout behavior
- section spacing and visual consistency
- hover states and transitions
- portfolio-specific visual identity

### Key styling features
- CSS custom properties for theme colors
- light and dark mode support
- Flexbox and Grid for layout
- reusable card and tag styling
- responsive breakpoints for smaller screens
- smooth transitions for interaction polish

The design goal was to keep the interface professional, clean, and lightweight rather than over-designed.

---

## 6. JavaScript Architecture

The JavaScript file manages the interactive behavior of the portfolio.

Main responsibilities:
- initializing the page state
- handling theme switching
- handling visitor personalization
- rendering and updating projects
- filtering and sorting logic
- fetching GitHub repositories
- validating the contact form
- saving preferences with `localStorage`
- updating dynamic content such as greetings and counters

The logic is kept modular through reusable functions rather than repeated code blocks.

---

## 7. Core Features

### 7.1 Theme Management
The application supports light and dark themes.

Implementation details:
- a toggle changes the active theme
- the selected theme is stored in `localStorage`
- the saved theme is restored on future visits

### 7.2 Visitor Personalization
Visitors can enter and save their name.

Implementation details:
- the saved name is stored in `localStorage`
- the greeting updates to include the saved name
- a clear/reset option allows users to remove saved personalization

### 7.3 Dynamic Greeting
A greeting message changes depending on the time of day.

Examples:
- Good morning
- Good afternoon
- Good evening

This makes the portfolio feel more interactive and personalized.

### 7.4 Time-on-Site Counter
A timer tracks how long the visitor has stayed on the page.

Implementation details:
- starts when the page loads
- updates every second
- displays readable time information

### 7.5 Skills Section
The skills section presents technical abilities in grouped categories.

Purpose:
- make core capabilities easy to scan
- show course-relevant technical areas
- improve the professionalism of the portfolio presentation

### 7.6 Projects Section
The projects area is one of the main interactive parts of the site.

Features include:
- keyword search
- category filtering
- level filtering
- sorting by date or title
- dynamic rendering of project cards
- graceful handling when no results match

### 7.7 GitHub API Integration
The portfolio integrates with the GitHub REST API to fetch repository data.

#### API endpoint
```text
https://api.github.com/users/Ali-A-R9/repos?sort=updated&per_page=100
```

#### Displayed repository information
- repository name
- description
- language
- star count
- last updated date

#### Error handling
If the GitHub API request fails:
- fallback local data is used
- the site continues functioning
- the user receives a helpful message instead of a broken section

This improves reliability and user experience.

### 7.8 Contact Form Validation
The contact form uses client-side validation rules.

Validation checks:
- name is required
- email format must be valid
- message must meet a minimum length
- required confirmation or agreement must be checked

User experience features:
- inline error messages
- real-time feedback
- success state after valid submission
- no page-breaking behavior

### 7.9 UI Controls and Interaction
Additional interface behavior includes:
- section toggles
- responsive navigation
- back-to-top button
- hover effects
- smooth transitions
- dynamic status and feedback text

---

## 8. State Management

The project uses `localStorage` to preserve selected user preferences and UI states.

Stored data may include:
- theme preference
- visitor name
- section visibility preferences
- UI display options

This helps create a more consistent user experience across visits.

---

## 9. Performance Considerations

The site was designed to remain lightweight and efficient.

Performance-related decisions:
- built with Vanilla JavaScript only
- no large frameworks or unnecessary dependencies
- reusable functions to reduce code duplication
- efficient rendering updates
- optimized front-end structure
- image and asset organization for cleaner loading

These choices help the site load quickly and remain manageable for coursework and future maintenance.

---

## 10. Accessibility and Usability

Accessibility and usability were considered throughout the project.

Implemented practices include:
- semantic HTML
- structured heading order
- keyboard-friendly controls
- visible focus states
- labels and validation messaging for forms
- dynamic feedback using ARIA attributes where appropriate
- responsive layout for different screen sizes

These improvements make the portfolio easier to use for a wider range of users.

---

## 11. Testing and Quality Assurance

The project was tested manually in the browser to verify both appearance and behavior.

Testing areas included:
- desktop and mobile responsiveness
- dark/light mode switching
- saved state using `localStorage`
- project search, filters, and sorting
- GitHub API loading behavior
- fallback behavior if API loading fails
- form validation messages
- navigation and interaction flow

Browsers and tools used:
- Microsoft Edge
- Chrome
- Chrome DevTools responsive mode
- local browser testing through VS Code Live Server

---

## 12. Professional Quality Decisions

The project was finalized with attention to:

- consistent naming and file organization
- clearer documentation
- polished UI details
- preserved portfolio identity
- graceful error handling
- clean visual hierarchy
- maintainable front-end code

The goal was to deliver a project that feels complete, presentable, and realistic as a personal portfolio site.

---

## 13. Known Limitations

Current limitations include:
- the contact form is front-end only and does not send real messages
- GitHub API data depends on network availability and rate limits
- repository content shown is limited to public GitHub data
- some future improvements may require a backend or hosting enhancements

---

## 14. Future Improvements

Possible future improvements:
- backend integration for the contact form
- project detail pages
- downloadable CV or resume
- animation refinement
- more advanced accessibility auditing
- richer project filtering and tagging
- analytics or visitor insights

---

## 15. Conclusion

This project successfully brings together the main technical and presentation goals of Assignment 4.

It demonstrates:
- a complete front-end portfolio website
- practical JavaScript interactivity
- API integration
- state persistence
- user-focused design
- clear project documentation

The portfolio is both a course submission and a foundation for future personal and professional development.