document.addEventListener('DOMContentLoaded', () => {
    // Language Tabs Functionality
    const languageTabs = document.querySelectorAll('.language-tab');
    const languageContents = document.querySelectorAll('.languages-content');
    
    if (languageTabs.length > 0) {
        languageTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                languageTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get target content id
                const targetId = tab.getAttribute('data-target');
                
                // Hide all content sections
                languageContents.forEach(content => {
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
    
    // Progress bars animation
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.language-progress-bar');
        
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-progress') || '0';
            
            // Only animate if not already animated
            if (!bar.style.width) {
                // Start at 0
                bar.style.width = '0%';
                
                // Animate to the target percentage
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                }, 100);
            }
        });
    };
    
    // Badge flip animation (optional enhancement)
    const badges = document.querySelectorAll('.language-badge');
    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            const inner = badge.querySelector('.badge-inner');
            
            // Toggle rotated class
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
        });
    });
    
    // Filter languages by category (if needed)
    const languageFilter = document.getElementById('languageFilter');
    const languageCards = document.querySelectorAll('.language-card');
    
    if (languageFilter) {
        languageFilter.addEventListener('change', () => {
            const selectedCategory = languageFilter.value;
            
            languageCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Search languages functionality (if needed)
    const languageSearch = document.getElementById('languageSearch');
    
    if (languageSearch) {
        languageSearch.addEventListener('input', () => {
            const searchTerm = languageSearch.value.toLowerCase();
            
            languageCards.forEach(card => {
                const name = card.querySelector('.language-name').textContent.toLowerCase();
                const skills = card.querySelectorAll('.language-skill');
                let skillsMatch = false;
                
                skills.forEach(skill => {
                    if (skill.textContent.toLowerCase().includes(searchTerm)) {
                        skillsMatch = true;
                    }
                });
                
                if (name.includes(searchTerm) || skillsMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Sort languages by proficiency (if needed)
    const languageSort = document.getElementById('languageSort');
    
    if (languageSort) {
        languageSort.addEventListener('change', () => {
            const sortDirection = languageSort.value;
            const container = document.querySelector('.languages-container');
            
            if (!container) return;
            
            const cards = Array.from(languageCards);
            
            cards.sort((a, b) => {
                const progressA = parseInt(a.querySelector('.language-progress-bar').getAttribute('data-progress')) || 0;
                const progressB = parseInt(b.querySelector('.language-progress-bar').getAttribute('data-progress')) || 0;
                
                return sortDirection === 'asc' ? progressA - progressB : progressB - progressA;
            });
            
            // Clear container
            container.innerHTML = '';
            
            // Append sorted cards
            cards.forEach(card => {
                container.appendChild(card);
            });
        });
    }
    
    // Initialize language skills chart if using Chart.js
    const initLanguageChart = () => {
        const ctx = document.getElementById('languageChart');
        
        if (ctx) {
            const chartData = {
                labels: [],
                datasets: [{
                    label: 'Language Proficiency',
                    data: [],
                    backgroundColor: [
                        'rgba(98, 0, 234, 0.6)',
                        'rgba(0, 201, 255, 0.6)',
                        'rgba(255, 94, 94, 0.6)',
                        'rgba(183, 94, 255, 0.6)',
                        'rgba(94, 255, 94, 0.6)',
                        'rgba(255, 183, 94, 0.6)',
                    ],
                    borderColor: [
                        'rgb(98, 0, 234)',
                        'rgb(0, 201, 255)',
                        'rgb(255, 94, 94)',
                        'rgb(183, 94, 255)',
                        'rgb(94, 255, 94)',
                        'rgb(255, 183, 94)',
                    ],
                    borderWidth: 1
                }]
            };
            
            // Extract data from language cards
            document.querySelectorAll('.language-card').forEach(card => {
                const name = card.querySelector('.language-name').textContent;
                const progress = parseInt(card.querySelector('.language-progress-bar').getAttribute('data-progress')) || 0;
                
                chartData.labels.push(name);
                chartData.datasets[0].data.push(progress);
            });
            
            // Create chart if Chart.js is available
            if (typeof Chart !== 'undefined') {
                new Chart(ctx, {
                    type: 'radar',
                    data: chartData,
                    options: {
                        scales: {
                            r: {
                                angleLines: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                pointLabels: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                },
                                ticks: {
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    backdropColor: 'transparent'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }
                            }
                        }
                    }
                });
            }
        }
    };
    
    // Call functions when languages section is in view
    const languagesSection = document.querySelector('.languages-section');
    
    if (languagesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Initialize animations and charts when section is visible
                    animateProgressBars();
                    initLanguageChart();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(languagesSection);
    }
}); 