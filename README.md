
# Responsive Student Portfolio & Academic Management Website

## Project Overview
This project is a fully functional, multi-page web platform designed as a personal academic portfolio and student management system. Built using semantic HTML5, responsive CSS3, and vanilla JavaScript, this site serves a dual purpose: showcasing professional academic achievements and providing interactive tools to manage daily student activities.

This project was developed for the **COS 106 - Introduction to Web Technologies** term project at MIVA Open University.

---

## Live Demo & Repository
*   **GitHub Repository:** [Insert your GitHub repo link here]
*   **Live Hosted Website:** [Insert your live deployment link here, e.g., GitHub Pages/Netlify]

---

## Key Features & Page Breakdown

1.  **Homepage (`index.html`)**
    *   Professional layout introducing the student with a name, photograph, and a welcoming introduction.
    *   Global, unified navigation menu across all pages.
    *   Brief introductory biography.

2.  **About Me Page (`about.html`)**
    *   Detailed educational background and long-term career aspirations.
    *   A structured breakdown of core technical skills.
    *   Personal hobbies and outside interests.

3.  **Projects Page (`projects.html`)**
    *   Showcases a minimum of three distinct sample projects.
    *   Includes explicit descriptions, visual screenshots, and active/simulated project links.

4.  **Academic Planner Page (`planner.html`)**
    *   An interactive, JavaScript-driven task management application.
    *   Features dynamic tracking enabling users to dynamically **Add**, **Mark as Completed**, and **Delete** tasks.

5.  **Contact Page (`contact.html`)**
    *   A student communication form collecting Name, Email, Phone Number, and Message.
    *   Robust vanilla JavaScript validation ensuring no empty inputs, proper email formatting, and digits-only validation for phone numbers.

---

## Technical Stack & Requirements Met

### HTML Requirements
*   **Semantic Structure:** Built using proper structure layouts (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
*   **Data Layouts:** Implemented forms for contact queries, data tables, structural lists, hyperlinks, and embedded images.
*   **Multimedia Integration:** Embedded native video/audio media items within the platform.

### CSS Requirements
*   **Architecture:** Structured entirely using a single unified external stylesheet (`style.css`).
*   **Layout Engine:** Leveraged Flexbox/CSS Grid to produce an fully responsive layout.
*   **UI/UX Details:** Configured custom responsive navigation bars, cohesive typography, standardized color themes, and smooth interactive hover animations/transitions.

### JavaScript Requirements
*   **DOM Manipulation & Event Handling:** Programmed form submission interception and interactive elements.
*   **Data Logic:** Arrays and operational functions power the dynamic client-side task tracker app ecosystem.

---

## Project Structure
```text
student-portfolio-platform/
│
├── index.html          (Homepage)
├── about.html          (About Me Page)
├── projects.html       (Projects Page)
├── planner.html        (Academic Planner Page)
├── contact.html        (Contact Page)
│
├── css/
│   └── style.css       (Global External Stylesheet)
│
├── js/
│   ├── planner.js      (Academic Planner Logic)
│   └── validation.js   (Contact Form Validation)
│
└── assets/
    ├── images/         (Profile & Project Media)
    └── videos/         (Multimedia Components)

```

---

## Getting Started Locally

To run this project on your local machine:

1. Clone the repository:

```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)

```

2. Navigate into the project folder:

```bash
   cd student-portfolio-platform

```

3. Launch `index.html` directly inside any modern web browser or run it using an extension like **Live Server** in VS Code.

---

## Author

* **Student Name:** [Your Name]
* **Course:** COS 106 - Introduction to Web Technologies
* **Institution:** MIVA Open University

```

### Next Step:
Save this file, stage it, and commit it with a clear message:
```bash
git add README.md
git commit -m "Docs: Add comprehensive README documentation"
git push origin main

```
