document.addEventListener('DOMContentLoaded', () => {
    // Activities Tab Functionality
    const activitiesTabs = document.querySelectorAll('.activities-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (activitiesTabs.length > 0) {
        activitiesTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                activitiesTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get target content id
                const targetId = tab.getAttribute('data-target');
                
                // Hide all content sections
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show target content
                if (targetId) {
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                }
            });
        });
    }
    
    // Activity Cards Animation
    const animateActivityCards = () => {
        const cards = document.querySelectorAll('.activity-card');
        
        // Stagger animation for cards
        cards.forEach((card, index) => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate with delay based on index
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    };
    
    // Timeline Animation
    const animateTimeline = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            
            if (index % 2 === 0) {
                item.style.transform = 'translateX(-20px)';
            } else {
                item.style.transform = 'translateX(20px)';
            }
            
            // Animate with delay based on index
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 150 * index);
        });
    };
    
    // Gallery Lightbox functionality
    const setupGallery = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (galleryItems.length === 0) return;
        
        // Create lightbox elements if not exist
        if (!document.getElementById('activity-lightbox')) {
            const lightbox = document.createElement('div');
            lightbox.id = 'activity-lightbox';
            lightbox.className = 'activity-lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            `;
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 80%;
                max-height: 80%;
            `;
            
            const lightboxImage = document.createElement('img');
            lightboxImage.className = 'lightbox-image';
            lightboxImage.style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 5px;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            `;
            
            const lightboxCaption = document.createElement('div');
            lightboxCaption.className = 'lightbox-caption';
            lightboxCaption.style.cssText = `
                position: absolute;
                bottom: -40px;
                left: 0;
                width: 100%;
                text-align: center;
                color: white;
                font-size: 1rem;
            `;
            
            const closeButton = document.createElement('button');
            closeButton.className = 'lightbox-close';
            closeButton.innerHTML = '&times;';
            closeButton.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
            `;
            
            // Append elements
            lightboxContent.appendChild(lightboxImage);
            lightboxContent.appendChild(lightboxCaption);
            lightboxContent.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Close lightbox when clicking outside or on close button
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target === closeButton) {
                    closeLightbox();
                }
            });
            
            // Close lightbox on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.style.visibility === 'visible') {
                    closeLightbox();
                }
            });
        }
        
        // Function to open lightbox
        const openLightbox = (imageSrc, caption) => {
            const lightbox = document.getElementById('activity-lightbox');
            const lightboxImage = lightbox.querySelector('.lightbox-image');
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            
            lightboxImage.src = imageSrc;
            lightboxCaption.textContent = caption || '';
            
            lightbox.style.visibility = 'visible';
            lightbox.style.opacity = '1';
        };
        
        // Function to close lightbox
        const closeLightbox = () => {
            const lightbox = document.getElementById('activity-lightbox');
            
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.visibility = 'hidden';
            }, 300);
        };
        
        // Add click event to gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-title')?.textContent || '';
                const caption = item.querySelector('.gallery-caption')?.textContent || '';
                
                if (img) {
                    openLightbox(img.src, caption ? `${title} - ${caption}` : title);
                }
            });
        });
    };
    
    // Initialize filters if they exist
    const initFilters = () => {
        const filterSelect = document.getElementById('activity-filter');
        const activityItems = document.querySelectorAll('[data-activity-type]');
        
        if (filterSelect && activityItems.length > 0) {
            filterSelect.addEventListener('change', () => {
                const selectedValue = filterSelect.value;
                
                activityItems.forEach(item => {
                    if (selectedValue === 'all' || item.getAttribute('data-activity-type') === selectedValue) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    };
    
    // Search functionality
    const initSearch = () => {
        const searchInput = document.getElementById('activity-search');
        const activityItems = document.querySelectorAll('[data-activity-search]');
        
        if (searchInput && activityItems.length > 0) {
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                
                activityItems.forEach(item => {
                    const searchText = item.getAttribute('data-activity-search').toLowerCase();
                    
                    if (searchText.includes(searchTerm)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    };
    
    // Initialize all features when activities section is in view
    const activitiesSection = document.querySelector('.activities-section');
    
    if (activitiesSection) {
        // Use Intersection Observer to trigger animations when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Run animations and setup
                    animateActivityCards();
                    animateTimeline();
                    setupGallery();
                    initFilters();
                    initSearch();
                    
                    // Disconnect observer after triggering
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(activitiesSection);
    }
}); 