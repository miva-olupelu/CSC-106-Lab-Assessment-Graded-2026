document.addEventListener('DOMContentLoaded', () => {
    // Select all images inside project cards
    const projectImages = document.querySelectorAll('.project-card img');
    
    if (projectImages.length === 0) return;

    // Create the Lightbox DOM elements dynamically
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    
    const imgContainer = document.createElement('div');
    imgContainer.className = 'lightbox-img-container';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close full screen image');
    
    // Assemble
    imgContainer.appendChild(lightboxImage);
    imgContainer.appendChild(closeBtn);
    overlay.appendChild(imgContainer);
    document.body.appendChild(overlay);

    // Function to close lightbox
    const closeLightbox = () => {
        overlay.classList.remove('active');
        // Wait for CSS transition to finish before clearing source to prevent jarring blink
        setTimeout(() => {
            if (!overlay.classList.contains('active')) {
                lightboxImage.src = '';
            }
        }, 300);
    };

    // Attach click listeners to open lightbox
    projectImages.forEach(img => {
        img.classList.add('lightbox-trigger'); // Add class for CSS pointer/zoom
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            overlay.classList.add('active');
        });
    });

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeBtn) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
});
