/**
 * Mobile Navigation Menu Handler
 * Using snake_case convention as per project standards.
 */
document.addEventListener('DOMContentLoaded', () => {
    const nav_toggle = document.getElementById('nav_toggle');
    const main_header = document.getElementById('main_header');

    if (nav_toggle && main_header) {
        nav_toggle.addEventListener('click', () => {
            const is_open = main_header.classList.toggle('nav_open');
            nav_toggle.setAttribute('aria-expanded', is_open);
        });

        // Close menu when clicking outside header
        document.addEventListener('click', (event) => {
            if (!main_header.contains(event.target) && main_header.classList.contains('nav_open')) {
                main_header.classList.remove('nav_open');
                nav_toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
