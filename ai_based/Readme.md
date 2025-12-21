# Personal Portfolio Webpage

## 🤖 AI Tools Used
**Replit Agent** was used to generate the initial structure and style of this portfolio.
cd 
## 📝 Manual Improvements
While the AI provided a solid foundation, I manually refined the following to ensure quality and responsiveness:

1.  **CSS Architecture**:
    *   Refined CSS variables (`:root`) for consistent color theming (Dark Mode).
    *   Added specific media queries to handle the breakdown from 3 columns (desktop) to 2 (tablet) to 1 (mobile) for the Skills grid.
    *   Added a smooth `backdrop-filter` to the sticky header for a modern glassmorphism effect.

2.  **HTML Structure**:
    *   Ensured semantic tags (`<header>`, `<nav>`, `<section>`, `<footer>`) were used for better accessibility.
    *   Added `aria-label` attributes to buttons and links for screen readers.
    *   Cleaned up the mobile menu structure to work with a simple vanilla JS toggle.

3.  **Responsiveness**:
    *   **Mobile**: Implemented a hamburger menu toggle that slides down, preventing horizontal overflow.
    *   **Tablet**: Adjusted typography sizes and grid gaps to prevent overcrowding.

## 🚀 How to Run
Simply open `index.html` in any modern web browser. No build step or server is required!