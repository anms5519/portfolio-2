// Skills Section Core JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // Core elements
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');
    const displayBtns = document.querySelectorAll('.display-btn');
    const skillDisplays = document.querySelectorAll('.skills-displays > div');
    const chartTypeButtons = document.querySelectorAll('.chart-type-btn');
    const chartCategoryButtons = document.querySelectorAll('.chart-category-btn');
    const chartCanvas = document.getElementById('skills-chart');
    
    console.log('Chart canvas found:', chartCanvas);
    
    // Global variables for chart
    let currentChart = null;
    let currentChartType = 'radar';
    let currentChartCategory = 'all';
    
    // Skill data for charts
    const skillData = {
        names: [],
        percentages: [],
        categories: {}
    };
    
    // Initialize everything
    initSkillData();
    setupSkillsFilter();
    setupDisplayToggle();
    setupChartControls();
    
    // Force initial display setup
    const activeDisplayBtn = document.querySelector('.display-btn.active');
    if (activeDisplayBtn) {
        const initialDisplayType = activeDisplayBtn.getAttribute('data-display');
        switchDisplay(initialDisplayType);
    } else {
        // Default to grid view if no active button
        switchDisplay('grid');
    }
    
    // Extract skill data from DOM
    function initSkillData() {
        if (skillCards.length === 0) {
            console.error('No skill cards found');
            return;
        }
        
        skillCards.forEach(card => {
            const name = card.querySelector('.skill-name')?.textContent || 'Unnamed Skill';
            const percentText = card.querySelector('.skill-percentage')?.textContent || '0%';
            const percentage = parseInt(percentText);
            const categories = card.getAttribute('data-category')?.split(' ') || ['all'];
            
            skillData.names.push(name);
            skillData.percentages.push(percentage);
            
            // Organize by categories
            categories.forEach(category => {
                if (!skillData.categories[category]) {
                    skillData.categories[category] = {
                        names: [],
                        percentages: []
                    };
                }
                
                skillData.categories[category].names.push(name);
                skillData.categories[category].percentages.push(percentage);
            });
        });
        
        console.log('Skill data initialized:', skillData);
    }
    
    // Skill filtering functionality
    function setupSkillsFilter() {
        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                skillTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Get selected category
                const category = tab.getAttribute('data-category');
                console.log('Filtering by category:', category);
                
                // Filter cards
                filterSkillCards(category);
            });
        });
    }
    
    function filterSkillCards(category) {
        skillCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category')?.split(' ') || ['all'];
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Display toggle (Grid, Chart, Timeline)
    function setupDisplayToggle() {
        displayBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active button
                displayBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get display type
                const displayType = btn.getAttribute('data-display');
                console.log('Switching to display:', displayType);
                
                // Switch display
                switchDisplay(displayType);
            });
        });
    }
    
    function switchDisplay(displayType) {
        console.log('Switch display called with:', displayType);
        
        // Hide all displays
        skillDisplays.forEach(display => {
            display.classList.remove('active');
            display.style.display = 'none';
        });
        
        // Show target display
        const targetDisplay = document.querySelector(`.skills-${displayType}-display`);
        console.log('Target display found:', targetDisplay);
        
        if (targetDisplay) {
            targetDisplay.classList.add('active');
            targetDisplay.style.display = 'block';
            
            // If chart display becomes active, update the chart
            if (displayType === 'chart') {
                setTimeout(() => {
                    initializeChart();
                }, 100);
            }
        }
    }
    
    // Chart functionality
    function setupChartControls() {
        // Chart type buttons (Radar, Bar, Polar)
        chartTypeButtons.forEach(button => {
            button.addEventListener('click', () => {
                chartTypeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                currentChartType = button.getAttribute('data-chart');
                console.log('Chart type changed to:', currentChartType);
                updateChart();
            });
        });
        
        // Chart category buttons
        chartCategoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                chartCategoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                currentChartCategory = button.getAttribute('data-chart-category');
                console.log('Chart category changed to:', currentChartCategory);
                updateChart();
            });
        });
    }
    
    // Initialize the chart
    function initializeChart() {
        if (!chartCanvas) {
            console.error('Chart canvas element not found');
            return;
        }
        
        try {
            // Make sure Chart is defined
            if (typeof Chart === 'undefined') {
                console.error('Chart.js is not loaded');
                return;
            }
            
            // Verify the canvas is visible and has dimensions
            const chartDisplay = document.querySelector('.skills-chart-display');
            if (chartDisplay && getComputedStyle(chartDisplay).display === 'none') {
                chartDisplay.style.display = 'block';
            }
            
            // Set Chart.js defaults
            Chart.defaults.font.family = "'Poppins', sans-serif";
            Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
            Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            
            console.log('Chart initialized, updating...');
            
            // Create initial chart
            updateChart();
        } catch (error) {
            console.error('Error initializing chart:', error);
        }
    }
    
    // Update chart based on current type and category
    function updateChart() {
        if (!chartCanvas) {
            console.error('Canvas element not available');
            return;
        }
        
        try {
            // Check if the canvas is visible and has dimensions
            if (chartCanvas.offsetWidth === 0 || chartCanvas.offsetHeight === 0) {
                console.warn('Canvas has no dimensions, setting dimensions manually');
                chartCanvas.width = 400;
                chartCanvas.height = 300;
            }
            
            // If we already have a chart, destroy it
            if (currentChart) {
                currentChart.destroy();
                currentChart = null;
            }
            
            // Get data based on current category
            let names, percentages;
            
            if (currentChartCategory === 'all') {
                names = skillData.names;
                percentages = skillData.percentages;
            } else if (skillData.categories[currentChartCategory]) {
                names = skillData.categories[currentChartCategory].names;
                percentages = skillData.categories[currentChartCategory].percentages;
            } else {
                console.error('Invalid chart category:', currentChartCategory);
                // Fallback to all skills
                names = skillData.names;
                percentages = skillData.percentages;
            }
            
            if (names.length === 0) {
                console.error('No skills data available');
                return;
            }
            
            console.log('Creating chart with data:', { names, percentages });
            
            // Create gradient for chart
            const ctx = chartCanvas.getContext('2d');
            let gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(110, 87, 224, 0.8)');
            gradient.addColorStop(1, 'rgba(199, 77, 237, 0.8)');
            
            // Create chart config based on chart type
            let chartConfig;
            
            switch (currentChartType) {
                case 'radar':
                    chartConfig = createRadarChartConfig(names, percentages, gradient);
                    break;
                case 'bar':
                    chartConfig = createBarChartConfig(names, percentages, gradient);
                    break;
                case 'polar':
                    chartConfig = createPolarChartConfig(names, percentages, gradient);
                    break;
                default:
                    console.error('Invalid chart type:', currentChartType);
                    chartConfig = createRadarChartConfig(names, percentages, gradient);
            }
            
            // Create new chart
            currentChart = new Chart(ctx, chartConfig);
            console.log('Chart created successfully');
        } catch (error) {
            console.error('Error updating chart:', error);
        }
    }
    
    // Create radar chart configuration
    function createRadarChartConfig(labels, data, gradient) {
        return {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Skill Level',
                    data: data,
                    backgroundColor: 'rgba(110, 87, 224, 0.2)',
                    borderColor: gradient,
                    borderWidth: 2,
                    pointBackgroundColor: gradient,
                    pointBorderColor: '#fff',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            showLabelBackdrop: false,
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return `Proficiency: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Create bar chart configuration
    function createBarChartConfig(labels, data, gradient) {
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Skill Level',
                    data: data,
                    backgroundColor: gradient,
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return `Proficiency: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Create polar chart configuration
    function createPolarChartConfig(labels, data, gradient) {
        return {
            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(110, 87, 224, 0.7)',
                        'rgba(130, 97, 230, 0.7)',
                        'rgba(150, 107, 235, 0.7)',
                        'rgba(170, 117, 240, 0.7)',
                        'rgba(190, 127, 245, 0.7)',
                        'rgba(199, 77, 237, 0.7)',
                        'rgba(210, 97, 242, 0.7)',
                        'rgba(220, 107, 247, 0.7)',
                        'rgba(230, 117, 252, 0.7)',
                        'rgba(240, 127, 257, 0.7)'
                    ],
                    borderColor: 'white',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        backdropColor: 'rgba(255, 255, 255, 0.05)',
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            showLabelBackdrop: false,
                            display: true
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        };
    }
}); 