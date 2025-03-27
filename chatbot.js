(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        // Elements
        const chatbotContainer = document.getElementById("chatbot-container");
        const chatbotTrigger = document.getElementById("chatbot-trigger");
        const chatbotClose = document.getElementById("chatbot-close");
        const chatbotMinimize = document.getElementById("chatbot-minimize");
        const chatbotMessages = document.getElementById("chatbot-messages");
        const chatbotInput = document.getElementById("chatbot-input");
        const chatbotSend = document.getElementById("chatbot-send");
        const chatbotToggleSettings = document.getElementById("chatbot-toggle-settings");
        const chatbotSettings = document.getElementById("chatbot-settings");
        const moodButtons = document.querySelectorAll(".mood-option");
        const themeButtons = document.querySelectorAll(".theme-option");
        const suggestionChips = document.getElementById("chatbot-suggestion-chips");
        
        // Chat state
        let chatHistory = [];
        let currentChatMood = "friendly";
        let currentTheme = "dark";
        let isTyping = false;
        let isSettingsOpen = false;
        let particles = [];
        const maxParticles = 20;

        // Knowledge base with enhanced data
const chatbotKnowledge = {
  skills: {
    technical: [
      // Original technical skills
      "AI Development", "Machine Learning", "Python", "JavaScript", "Web Development",
      "Game Development", "Data Visualization", "C/C++", "Cloud Computing", "Blockchain Development",
      "Mobile App Development", "DevOps", "System Architecture", "Cybersecurity", "IoT Development",
      "Quantum Computing", "Node.js", "React", "Angular", "Vue.js", "Express.js", "Django", "Flask",
      "TensorFlow", "PyTorch", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
      // Additional skills from resume
      "Website Development", "SEO Analysis", "Unreal Engine", "MATLAB", "SQL Queries", 
      "Predictive Analytics", "Data Acquisition", "Data Interpretation", "Issue Resolution",
      "Decision Making", "Organizational Strategy", "Social Media Strategy", "Project Coordination",
      "Cybersecurity Tools", "Blockchain-Secure Systems"
    ],
    design: [
      // Original design skills
      "UI/UX Design", "CSS Animation", "Graphic Design", "3D Modeling", "Web Design",
      "Color Theory", "Typography", "Layout Design", "Motion Graphics", "Illustration",
      "Brand Identity", "User Research", "Wireframing", "Prototyping", "Accessibility Design",
      "Design Systems", "Design Thinking", "User Testing", "Responsive Design", "Mobile-First Design",
      // Additional design-related skills from resume
      "Adobe Photoshop", "Adobe Acrobat", "Motion Graphics", "Digital Painting", "Sketching"
    ],
    soft: [
      // Original soft skills
      "Leadership", "Communication", "Problem Solving", "Critical Thinking", "Creativity",
      "Time Management", "Collaboration", "Adaptability", "Emotional Intelligence", "Conflict Resolution",
      // Additional interpersonal skills from resume
      "Multicultural Communication", "Technical Communication", "Team Collaboration", "Public Speaking",
      "Client Interaction", "Customer Service"
    ]
  },
  projects: [
    // Original chatbot projects
    {
      name: "Intelligent Healthcare Assistant",
      description: "AI-powered healthcare assistant that helps diagnose common ailments using deep learning algorithms",
      technologies: ["Python", "TensorFlow", "Flask", "React", "MongoDB"]
    },
    {
      name: "Crypto Market Analyzer",
      description: "Real-time cryptocurrency market analysis tool with predictive algorithms and custom alerts",
      technologies: ["JavaScript", "Node.js", "Express", "WebSockets", "Chart.js", "Blockchain APIs"]
    },
    {
      name: "Smart Home Automation System",
      description: "IoT-based home automation system with voice control and AI-powered energy optimization",
      technologies: ["Python", "Raspberry Pi", "MQTT", "React", "Node.js", "TensorFlow"]
    },
    {
      name: "3D Game Engine",
      description: "Custom game engine with physics simulation and realistic rendering capabilities",
      technologies: ["C++", "OpenGL", "GLSL", "ImGui", "Bullet Physics"]
    },
    {
      name: "Augmented Reality Portfolio",
      description: "Interactive AR portfolio showcasing projects through immersive 3D experiences",
      technologies: ["Unity", "ARKit", "ARCore", "C#", "3D Modeling"]
    },
    // Projects and research from resume
    {
      name: "THETAEnhancer+",
      description: "Advanced AI-driven image restoration and enhancement model for superior image quality",
      technologies: ["Python", "Deep Learning", "AI Algorithms"]
    },
    {
      name: "Interactive 3D/FPS Game",
      description: "Immersive 3D/FPS game developed using Unreal Engine and Python",
      technologies: ["Unreal Engine", "Python", "Game Design"]
    },
    {
      name: "Dynamic Web Interfaces",
      description: "Ultra-advanced CSS styles and animations creating engaging web experiences",
      technologies: ["HTML", "CSS", "JavaScript", "Advanced CSS Animations"]
    },
    {
      name: "AI-Powered Data Visualizer",
      description: "Interactive platform for data visualization enriched with AI insights",
      technologies: ["Python", "Power BI", "Data Analytics"]
    },
    {
      name: "3D Virtual Tour",
      description: "Fully immersive virtual tour built with Three.js and WebGL for an engaging experience",
      technologies: ["Three.js", "WebGL", "3D Modeling"]
    },
    {
      name: "Real-Time Multiplayer Game",
      description: "Online game featuring advanced animations, responsive controls, and real-time interactivity",
      technologies: ["JavaScript", "WebSockets", "Game Development"]
    },
    {
      name: "Quantum Code Simulator",
      description: "Real-time simulation and visualization of quantum computing algorithms",
      technologies: ["JavaScript", "Visualization Libraries"]
    },
    {
      name: "Blockchain Secure Voting",
      description: "Decentralized voting system ensuring security via blockchain technology",
      technologies: ["Blockchain", "Smart Contracts"]
    },
    {
      name: "AI-Powered Cyber Defense",
      description: "Real-time threat detection and prevention system using machine learning techniques",
      technologies: ["Python", "Machine Learning", "Cybersecurity"]
    }
  ],
  education: [
    // Resume education data
    {
      degree: "Bachelor of Science in Computer Science & Engineering",
      school: "Atish Dipankar University of Science & Technology, Dhaka",
      period: "Jan 2022 – Aug 2026",
      additional: "Current CGPA: 3.56/4.00"
    },
    {
      degree: "Higher Secondary School Certificate",
      school: "Adamjee Cantonment College, Dhaka",
      period: "2020",
      additional: "GPA: 5.00/5.00, Faculty: Science"
    },
    {
      degree: "Secondary School Certificate",
      school: "Civil Aviation School & College, Dhaka",
      period: "2018",
      additional: "GPA: 5.00/5.00, Faculty: Science"
    }
  ],
  certifications: [
    // Certifications from resume
    "HHP (Mobile) Service For Hardware and Software (2024-01)",
    "Mobile Game Development (Cross Platform) (2022-02)",
    "Beginner’s Guide to Python 3 Programming (2023-02)",
    "Professional C Programming for Job Interview (2023-06)",
    "EF SET Certificate (2025-02)",
    "CSS (Basic) Certificate (2025-01)",
    "CHAT — Toolkit to Improve Community Engagement in Emergencies (2025-01)",
    "Cybersecurity Analyst Job Simulation (2024-04)",
    "Data Visualization: Empowering Business with Effective Insights (2024-04)",
    "A2Z Of Finance: Finance Beginner Course (2024-04)",
    "Building Generative AI Applications Using Amazon Bedrock (June 9, 2024)",
    "SDG Primer Certificate (Monitoring & Evaluation Analyst at UNDP Bangladesh, 7th September 2024)",
    // Additional certifications from original data
    "Google Cloud Professional Machine Learning Engineer (2022)",
    "AWS Certified Solutions Architect (2021)",
    "TensorFlow Developer Certificate (2020)"
  ],
  experience: [
    // Experience from resume
    {
      role: "Commercial Designer (Freelance)",
      company: "Fiverr",
      period: "Jan 2020 – Present",
      responsibilities: [
        "Designed high-quality branding, advertisements, and marketing materials for international clients",
        "Created logos, business cards, brochures, flyers, and social media ads tailored to client needs",
        "Developed visually compelling UI/UX designs for websites and mobile applications",
        "Maintained a 5-star rating with high client satisfaction"
      ]
    },
    {
      role: "Retail Pharmacist",
      company: "RANI MEDICAL CORNER, Dhaka",
      period: "Jan 2012 – Present",
      responsibilities: [
        "Managed day-to-day pharmacy operations",
        "Sold medicines and provided customer support"
      ]
    },
    {
      role: "Data Visualization Specialist (Internship)",
      company: "Tata Consultancy Services",
      period: "Jun 2024 – Jul 2024",
      responsibilities: [
        "Designed interactive dashboards to represent complex datasets",
        "Utilized Python, Excel, and Power BI for data transformation and visualization",
        "Applied statistical analysis and data storytelling principles"
      ]
    },
    {
      role: "Cybersecurity Analyst (Internship)",
      company: "Tata Consultancy Services",
      period: "Apr 2024 – May 2024",
      responsibilities: [
        "Conducted risk assessments and implemented security measures",
        "Analyzed network vulnerabilities and applied threat detection techniques",
        "Utilized cybersecurity tools for monitoring, detection, and incident response"
      ]
    },
    // Original experience data
    {
      role: "Senior AI Engineer",
      company: "Tesla",
      period: "2021-Present",
      responsibilities: [
        "Lead development of autonomous driving algorithms",
        "Optimize deep learning models for real-time inference",
        "Collaborate with hardware team for AI accelerator integration"
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Google",
      period: "2019-2021",
      responsibilities: [
        "Built scalable web applications using Angular and Node.js",
        "Designed and implemented RESTful APIs",
        "Integrated machine learning models into production systems"
      ]
    },
    {
      role: "Machine Learning Intern",
      company: "NVIDIA",
      period: "2018",
      responsibilities: [
        "Developed GPU-accelerated deep learning algorithms",
        "Optimized training pipelines for computer vision tasks",
        "Collaborated with research team on novel neural network architectures"
      ]
    }
  ],
  trainingsWorkshops: [
    "Undergraduates Projects for CSE Students: A Comprehensive Guideline",
    "Workshop on Beginner’s Guide to Python 3 Programming",
    "Machine Learning and AI Workshop",
    "Web Development Bootcamp",
    "Arduino Programming and Applications Workshop",
    "Workshop on Professional C Programming for Job Interview",
    "AR/VR Workshop",
    "Software Testing and Quality Assurance Conference",
    "DevOps and CI/CD Conference",
    "Game Development Using Unity Webinar",
    "Cybersecurity and Ethical Hacking Workshop",
    "Mobile App Development Seminar",
    "Blockchain and Cryptocurrency Workshop",
    "IoT Workshop",
    "Data Science and Analytics Workshop",
    "Cloud Computing Workshop",
    "Dive Into R: A Hands-on Programming Workshop",
    "SQA Webinar"
  ],
  extracurricular: {
    leadershipVolunteering: [
      "President, Adamjee Eco Amica Club (2019 – 2020)",
      "Graphics Designer, Leo Club of Dhaka Mega City (2022 – 2023)",
      "Treasurer, Vantage IT Limited, Uttara (2022 – 2023)",
      "Event Coordinator, BD Clean, Dhaka (2021 – 2022)",
      "Graphics Designer, ADUST Prothom Alo Bandhu Sabha (2023 – 2024)",
      "Member, ADUST Shomokal Shuhud (2024 – 2025)",
      "Member, Bangabandhu Parishad, Tejgaon (Ongoing)",
      "General Secretary, Social Environment and Human Rights, Implementation Agency, Mohakhali (2023 – 2024)"
    ],
    techCreative: [
      "Organizer, ACC Coding Club",
      "Member, ADUST Programming Club",
      "Member, ACC Photography Club",
      "Mentor, ACC Cultural Club"
    ],
    sports: [
      "Sporting Director, ADUST Football Club",
      "Active Member, Badminton Team"
    ]
  },
  interests: [
    "Programming", "Artificial Intelligence", "Web Development", "Cybersecurity", "Data Science",
    "Cloud Computing", "Game Development", "Robotics", "Blockchain", "Mobile App Development",
    "Character Design", "Animation", "Digital Painting", "Sketching", "Photography", "Traveling",
    "Reading", "Writing", "Music", "Sports", "Board Games", "Cooking", "Gardening"
  ],
  languages: [
    { language: "Bengali", proficiency: "Native" },
    { language: "English", proficiency: "Proficient (C2)" },
    { language: "Hindi", proficiency: "Advanced (C1)" },
    { language: "Urdu", proficiency: "Intermediate (B1)" },
    { language: "Arabic", proficiency: "Basic" }
  ],
  personalInfo: {
    name: "Kholipha",
    fullName: "Kholipha Ahmmad Al-Amin",
    age: 23, // Adjusted according to resume DOB: 07/26/2002
    location: "Dhaka, Bangladesh",
    phone: "+8801320389539",
    email: "kholifaahmadalamin@gmail.com",
    website: "https://kholipha-portfolio.netlify.app",
    socialLinks: {
      github: "https://github.com/anms5519",
      linkedin: "https://www.linkedin.com/in/kholipha-ahmmad-al-amin-3856b1305"
    },
    hobbies: [
      "Photography", "Hiking", "Playing guitar", "Reading sci-fi novels", 
      "Machine learning research", "Game development", "Travel", "Digital Painting", "Sketching"
    ],
    favoriteBooks: [
      "The Innovators by Walter Isaacson", "Sapiens by Yuval Noah Harari",
      "Dune by Frank Herbert", "Neuromancer by William Gibson"
    ],
    favoriteMovies: [
      "Inception", "Interstellar", "The Social Network", "The Matrix", "Her"
    ],
    favoriteTechTools: [
      "PyTorch", "React", "VS Code", "Figma", "Docker", "Adobe Photoshop"
    ],
    funFacts: [
      "I once built a robot that could solve a Rubik's cube in under 30 seconds",
      "I've visited 23 countries across 5 continents",
      "I maintain a photography blog with over 100,000 followers",
      "I can play 5 different musical instruments",
      "I won a hackathon by building an app in 48 hours straight without sleep",
      "I'm a certified scuba diver and have explored several shipwrecks",
      "I helped develop an open-source library that's now used by thousands of developers"
    ],
    goals: [
      "Start a tech company focused on AI for healthcare",
      "Publish research papers in top AI conferences",
      "Develop a popular open-source framework",
      "Mentor 100 young developers from underrepresented backgrounds"
    ],
    values: [
      "Innovation", "Continuous learning", "Ethical development", "Collaboration", "Diversity"
    ],
    pets: {
      name: "Data",
      type: "Cat",
      breed: "Russian Blue",
      age: 3,
      personality: "Curious and playful, loves sitting on keyboards during coding sessions"
    },
    workSummary: "Dynamic and visionary IT professional with a solid foundation in computer science and a proven track record in harnessing artificial intelligence to redefine digital experiences. Adept at spearheading advanced image enhancement projects, immersive 3D/FPS game development with Unreal Engine and Python, and cutting-edge web solutions driven by ultra-modern UI/UX design. Recognized for delivering innovative projects—from AI-powered image restoration and blockchain-secure voting systems to real-time data visualizations—that merge creativity with technical excellence.",
    disclaimer: "I hereby declare that the information provided above is true and correct to the best of my knowledge and belief."
  },
  faqs: [
    {
      question: "What programming languages do you know?",
      answer: "I'm proficient in Python, JavaScript, C, C++, C#, MATLAB, SQL Queries, and have experience with TypeScript, Go, Rust, Ruby, and Swift."
    },
    {
      question: "Are you available for freelance work?",
      answer: "Yes, I'm available for select freelance projects. Please use the contact form on my portfolio website to discuss your project requirements."
    },
    {
      question: "How can I collaborate with you?",
      answer: "I'm always open to interesting collaborations. Reach out via email or connect with me on LinkedIn to discuss potential partnerships."
    },
    {
      question: "Do you have experience with machine learning?",
      answer: "Absolutely! I have extensive experience in machine learning, deep learning, computer vision, natural language processing, and reinforcement learning."
    },
    {
      question: "What are your preferred technologies?",
      answer: "I enjoy working with React, Node.js, TensorFlow, and Python for most projects. For data-intensive applications, I lean towards the MERN stack with GraphQL."
    }
  ],
  conversationalPhrases: {
    greetings: [
      "Hey there! What's up?",
      "Hi friend! Great to see you!",
      "Hello there! How's your day going?",
      "Hey! Ready to chat about some cool tech?",
      "What's happening? How can I help today?",
      "Hi! Awesome to connect with you!",
      "Hey you! What brings you here today?",
      "Hello hello! How's everything going?"
    ],
    transitions: [
      "So anyway, about that...",
      "Oh, before I forget to mention...",
      "That reminds me of something interesting...",
      "Speaking of which...",
      "Not to change the subject, but...",
      "This is kinda related, actually...",
      "You know what else is cool?",
      "Oh! I just remembered something you might like..."
    ],
    enthusiasm: [
      "I'm seriously obsessed with this project!",
      "This tech absolutely blows my mind!",
      "I couldn't be more excited about this!",
      "You have no idea how awesome this is!",
      "I literally stayed up all night working on this!",
      "This is probably the coolest thing I've ever built!",
      "I'm completely in love with how this turned out!",
      "You're going to be amazed by this, trust me!"
    ],
    thinking: [
      "Hmm, let me think about that for a sec...",
      "That's an interesting question, actually...",
      "Let me see if I can remember correctly...",
      "Oh, I need to think about how to explain this best...",
      "Hmm, how should I put this...",
      "Let me gather my thoughts on that...",
      "That's a good question, gimme a moment...",
      "I'm just collecting my thoughts here..."
    ],
    fillers: [
      "y'know?",
      "like",
      "basically",
      "literally",
      "honestly",
      "I mean",
      "actually",
      "so yeah",
      "right?",
      "if that makes sense",
      "know what I mean?",
      "believe it or not"
    ],
    wordReflection: [
      "I noticed you mentioned *word*. Let me tell you about that.",
      "You said *word*, which is interesting because...",
      "Ah, *word* is something I'm quite familiar with!",
      "When you say *word*, I immediately think of...",
      "It's fascinating you brought up *word*. Let me share some thoughts on that.",
      "*word* is definitely worth discussing! Here's what I know:",
      "I'm glad you asked about *word*. That's an important topic.",
      "You're interested in *word*? That's one of my favorite subjects!",
      "Regarding *word* that you mentioned...",
      "Let's explore what you said about *word* a bit more."
    ],
    morningGreetings: [
      "Good morning! Ready to conquer the day?",
      "Morning! The day is full of possibilities.",
      "Rise and shine! What can I help with this morning?",
      "Good morning! Hope you've had your coffee already!",
      "It's a beautiful morning! What's on your mind?"
    ],
    afternoonGreetings: [
      "Good afternoon! How's your day going?",
      "Afternoon! Ready for some productive chat?",
      "Hope you're having a fantastic afternoon!",
      "Afternoon! Still plenty of day left to accomplish great things.",
      "Good afternoon! Need a mid-day brain boost?"
    ],
    eveningGreetings: [
      "Good evening! Winding down or just getting started?",
      "Evening! Hope you had a productive day.",
      "Good evening! What can I help you with tonight?",
      "Evening! Perfect time for some thoughtful conversation.",
      "How's your evening going? Ready to chat?"
    ],
    nightGreetings: [
      "Working late? I'm here to help!",
      "Night owl mode activated! What can I assist with?",
      "It's getting late, but I'm still energized to help you!",
      "Burning the midnight oil? Let's be productive together.",
      "The quiet night is perfect for focused work. What's on your mind?"
    ],
    defaultSuggestions: [
      "Tell me about your skills",
      "What projects have you worked on?",
      "What's your educational background?",
      "Tell me about your work experience",
      "What are your technical strengths?"
    ]
  },
  defaultSuggestions: [
    "Tell me about your skills",
    "What projects have you worked on?",
    "What is your work experience?",
    "What technologies do you use?",
    "What education do you have?"
  ]
};


        // Create floating particles for a more interactive experience
        const createParticles = () => {
            // Clear any existing particles
            const existingParticles = document.querySelectorAll('.chatbot-particle');
            existingParticles.forEach(particle => particle.remove());
            
            // Create new particles
            for (let i = 0; i < maxParticles; i++) {
                createParticle();
            }
        };
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'chatbot-particle';
            
            // Random position within the chatbot container
            const size = Math.floor(Math.random() * 6) + 4; // 4px to 10px
            const left = Math.floor(Math.random() * 100);
            const top = Math.floor(Math.random() * 100);
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            
            // Random animation duration and delay
            const duration = (Math.random() * 10) + 5; // 5s to 15s
            const delay = Math.random() * 5; // 0s to 5s
            
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Different sizes and opacity for depth effect
            const opacity = (Math.random() * 0.6) + 0.2; // 0.2 to 0.8
            particle.style.opacity = opacity;
            
            // Add the particle to the chatbot container
            chatbotContainer.appendChild(particle);
            
            // Store the particle in our array
            particles.push(particle);
            
            // Remove the particle after a random time
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    particles = particles.filter(p => p !== particle);
                    // Create a new particle to replace it
                    createParticle();
                }
            }, (duration + delay) * 1000);
        };

        // Highlight specific words in the user message that the bot responds to
        const highlightKeywordsInUserMessage = (message, keywords) => {
            if (!keywords || !keywords.length) return message;
            
            let highlightedMessage = message;
            keywords.forEach(keyword => {
                // Case insensitive replace with capturing groups to preserve case
                const regex = new RegExp(`(${keyword})`, 'gi');
                highlightedMessage = highlightedMessage.replace(regex, '<span class="highlighted-keyword">$1</span>');
            });
            
            return highlightedMessage;
        };

        // Animate bot message with a typing effect
        const animateBotMessage = (element) => {
            // Subtle scale animation
            gsap.fromTo(
                element,
                { scale: 0.98 },
                {
                    scale: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)",
                }
            );
            
            // Glow effect on hover
            element.addEventListener("mouseenter", () => {
                gsap.to(element, {
                    boxShadow: "0 5px 20px rgba(102, 0, 255, 0.3)",
                    y: -3,
                    duration: 0.3,
                });
            });
            
            element.addEventListener("mouseleave", () => {
                gsap.to(element, {
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    y: 0,
                    duration: 0.3,
                });
            });
            
            // Add floating particles around the message (only sometimes)
            if (Math.random() > 0.7) {
                const particleCount = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < particleCount; i++) {
                    const particleElem = document.createElement("div");
                    particleElem.className = "message-particle";
                    element.appendChild(particleElem);
                    
                    gsap.fromTo(
                        particleElem,
                        {
                            width: Math.random() * 5 + 3,
                            height: Math.random() * 5 + 3,
                            x: Math.random() * 30 - 15,
                            y: Math.random() * 30 - 15,
                            backgroundColor: "rgba(102, 0, 255, 0.4)",
                            borderRadius: "50%",
                            opacity: 0,
                        },
                        {
                            x: "random(-40, 40)",
                            y: "random(-40, 40)",
                            opacity: 0.6,
                            duration: Math.random() * 2 + 2,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                        }
                    );
                }
            }
        };

        // Format markdown in messages
        const formatMarkdown = (text) => {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
        };

        // Generate response based on user input
        const generateResponse = (input) => {
            const normalizedInput = input.toLowerCase();
            let detectedKeywords = [];
            
            // Custom responses based on input
            if (normalizedInput.includes("hello") || normalizedInput.includes("hi") || normalizedInput.includes("hey")) {
                detectedKeywords = ["hello", "hi", "hey"].filter(word => normalizedInput.includes(word));
                return { response: getPersonalizedGreeting(), keywords: detectedKeywords };
            }
            
            if (normalizedInput.includes("thank")) {
                detectedKeywords = ["thank"];
                return { response: "You're welcome! Is there anything else you'd like to know?", keywords: detectedKeywords };
            }
            
            if (normalizedInput.includes("bye") || normalizedInput.includes("goodbye")) {
                detectedKeywords = ["bye", "goodbye"].filter(word => normalizedInput.includes(word));
                return { response: "Thanks for chatting! Feel free to reach out anytime. Have a great day!", keywords: detectedKeywords };
            }
            
            // Extract and reflect on important words from user input
            const reflectionResponse = getWordReflectionResponse(input);
            if (reflectionResponse) {
                return reflectionResponse;
            }
            
            // Skills related queries
            if (normalizedInput.includes("skill") || normalizedInput.includes("tech") || normalizedInput.includes("know") || normalizedInput.includes("ability")) {
                detectedKeywords = ["skill", "tech", "know", "ability"].filter(word => normalizedInput.includes(word));
                const skillsResponse = getSkillsResponse(normalizedInput);
                if (skillsResponse) return { response: skillsResponse, keywords: detectedKeywords };
            }
            
            // Personal info queries
            if (normalizedInput.includes("about you") || normalizedInput.includes("yourself") || 
                normalizedInput.includes("personal") || normalizedInput.includes("hobby") ||
                normalizedInput.includes("hobbies") || normalizedInput.includes("favorite") ||
                normalizedInput.includes("age") || normalizedInput.includes("live") ||
                normalizedInput.includes("location") || normalizedInput.includes("pet") ||
                normalizedInput.includes("fun fact") || normalizedInput.includes("language")) {
                
                detectedKeywords = ["about you", "yourself", "personal", "hobby", "hobbies", "favorite", 
                                   "age", "live", "location", "pet", "fun fact", "language"]
                                  .filter(word => normalizedInput.includes(word));
                                  
                return { response: getPersonalInfoResponse(normalizedInput), keywords: detectedKeywords };
            }
            
            // Project related queries
            if (normalizedInput.includes("project") || normalizedInput.includes("portfolio") || normalizedInput.includes("work") || normalizedInput.includes("built")) {
                detectedKeywords = ["project", "portfolio", "work", "built"].filter(word => normalizedInput.includes(word));
                const projectResponse = getProjectResponse(normalizedInput);
                if (projectResponse) return { response: projectResponse, keywords: detectedKeywords };
            }
            
            // Education related queries
            if (normalizedInput.includes("education") || normalizedInput.includes("degree") || normalizedInput.includes("study") || normalizedInput.includes("learn") || normalizedInput.includes("certification")) {
                detectedKeywords = ["education", "degree", "study", "learn", "certification"].filter(word => normalizedInput.includes(word));
                const educationResponse = getEducationResponse();
                if (educationResponse) return { response: educationResponse, keywords: detectedKeywords };
            }
            
            // Experience related queries
            if (normalizedInput.includes("experience") || normalizedInput.includes("job") || normalizedInput.includes("work") || normalizedInput.includes("career") || normalizedInput.includes("company")) {
                detectedKeywords = ["experience", "job", "work", "career", "company"].filter(word => normalizedInput.includes(word));
                const experienceResponse = getExperienceResponse();
                if (experienceResponse) return { response: experienceResponse, keywords: detectedKeywords };
            }
            
            // FAQ matching
            for (const faq of chatbotKnowledge.faqs) {
                const questionWords = faq.question.toLowerCase().split(' ');
                const matchCount = questionWords.filter(word => normalizedInput.includes(word)).length;
                if (matchCount >= 2 || normalizedInput.includes(faq.question.toLowerCase())) {
                    // Extract matching keywords
                    detectedKeywords = questionWords.filter(word => 
                        word.length > 3 && normalizedInput.includes(word)
                    );
                    return { response: faq.answer, keywords: detectedKeywords };
                }
            }
            
            // Word reflection as fallback - extract important words from input
            const words = input.split(' ')
                .filter(word => word.length > 4)
                .filter(word => !['about', 'what', 'where', 'when', 'which', 'there', 'their', 'would', 'should', 'could'].includes(word.toLowerCase()));
            
            if (words.length > 0) {
                const randomWord = getRandomItem(words);
                const reflectionTemplate = getRandomPhrase("wordReflection");
                detectedKeywords = [randomWord];
                return { 
                    response: reflectionTemplate.replace('*word*', randomWord), 
                    keywords: detectedKeywords 
                };
            }
            
            // Absolute fallback response
            return { 
                response: "I'm not sure I understand. Could you rephrase your question? You can ask me about skills, projects, education, or work experience.", 
                keywords: [] 
            };
        };

        // Helper functions for response generation
        const getPersonalizedGreeting = () => {
            const greeting = getTimeBasedGreeting();
            return greeting;
        };
        
        const getTimeBasedGreeting = () => {
            const hour = new Date().getHours();
            let greetingArray;
            
            if (hour >= 5 && hour < 12) {
                greetingArray = chatbotKnowledge.conversationalPhrases.morningGreetings;
            } else if (hour >= 12 && hour < 17) {
                greetingArray = chatbotKnowledge.conversationalPhrases.afternoonGreetings;
            } else if (hour >= 17 && hour < 22) {
                greetingArray = chatbotKnowledge.conversationalPhrases.eveningGreetings;
            } else {
                greetingArray = chatbotKnowledge.conversationalPhrases.nightGreetings;
            }
            
            return getRandomItem(greetingArray);
        };

        const getWordReflectionResponse = (input) => {
            // Extract significant words (exclude common words and short words)
            const excludedWords = ['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
                                   'and', 'or', 'but', 'if', 'then', 'else', 'when', 'where', 'why', 'how',
                                   'all', 'any', 'both', 'each', 'few', 'more', 'most', 'some', 'such',
                                   'this', 'that', 'these', 'those', 'what', 'which', 'who', 'whom'];
                                   
            const words = input.split(/\s+/)
                .filter(word => word.length > 4)
                .map(word => word.replace(/[.,?!;:'"()]/g, '').toLowerCase())
                .filter(word => !excludedWords.includes(word));
                
            if (words.length === 0) return null;
            
            // Select a random significant word
            const significantWord = getRandomItem(words);
            
            // Check if the word matches any key topics
            if (['skill', 'skills', 'tech', 'ability', 'programming', 'coding', 'develop'].some(topic => significantWord.includes(topic))) {
                return { 
                    response: getSkillsResponse(input), 
                    keywords: [significantWord] 
                };
            }
            
            if (['project', 'portfolio', 'built', 'create', 'develop', 'application', 'software'].some(topic => significantWord.includes(topic))) {
                return { 
                    response: getProjectResponse(input), 
                    keywords: [significantWord] 
                };
            }
            
            if (['education', 'degree', 'study', 'college', 'university', 'school', 'learn', 'certification'].some(topic => significantWord.includes(topic))) {
                return { 
                    response: getEducationResponse(), 
                    keywords: [significantWord] 
                };
            }
            
            if (['experience', 'job', 'work', 'career', 'company', 'professional', 'industry'].some(topic => significantWord.includes(topic))) {
                return { 
                    response: getExperienceResponse(), 
                    keywords: [significantWord] 
                };
            }
            
            if (['personal', 'hobby', 'favorite', 'interest', 'yourself', 'family', 'friend', 'lifestyle'].some(topic => significantWord.includes(topic))) {
                return { 
                    response: getPersonalInfoResponse(input), 
                    keywords: [significantWord] 
                };
            }
            
            // Create a reflection response using the template
            const reflectionTemplate = getRandomPhrase("wordReflection");
            let response = reflectionTemplate.replace('*word*', significantWord);
            
            // Add personalized content based on the word
            if (Math.random() > 0.5) {  // Only do this 50% of the time for variety
                return { 
                    response: response, 
                    keywords: [significantWord] 
                };
            }
            
            return null;  // Allow other response types to trigger
        };

        const getPersonalInfoResponse = (input) => {
            const normalizedInput = input.toLowerCase();
            
            if (normalizedInput.includes("age") || normalizedInput.includes("old")) {
                return `I'm ${chatbotKnowledge.personalInfo.age} years old. The perfect age to be both experienced and innovative in tech!`;
            }
            
            if (normalizedInput.includes("location") || normalizedInput.includes("live") || normalizedInput.includes("from") || normalizedInput.includes("where")) {
                return `I'm based in ${chatbotKnowledge.personalInfo.location}. It's a great hub for tech innovation and creative thinking!`;
            }
            
            if (normalizedInput.includes("hobby") || normalizedInput.includes("hobbies") || normalizedInput.includes("free time") || normalizedInput.includes("fun")) {
                const hobbies = getRandomItems(chatbotKnowledge.personalInfo.hobbies, 3).join(", ");
                return `When I'm not coding, I enjoy ${hobbies}. I find these activities help balance my technical work with creativity and physical activity.`;
            }
            
            if (normalizedInput.includes("book") || normalizedInput.includes("read")) {
                const books = getRandomItems(chatbotKnowledge.personalInfo.favoriteBooks, 2).join(" and ");
                return `I love reading! Some of my favorite books include ${books}. They really inspire my thinking about technology and the future.`;
            }
            
            if (normalizedInput.includes("movie") || normalizedInput.includes("film") || normalizedInput.includes("watch")) {
                const movies = getRandomItems(chatbotKnowledge.personalInfo.favoriteMovies, 2).join(" and ");
                return `I enjoy movies that make me think! My favorites include ${movies}. I'm particularly drawn to sci-fi and stories about innovation.`;
            }
            
            if (normalizedInput.includes("tech") || normalizedInput.includes("tool") || normalizedInput.includes("software") || normalizedInput.includes("hardware")) {
                const tools = getRandomItems(chatbotKnowledge.personalInfo.favoriteTechTools, 2).join(" and ");
                return `I'm a big fan of ${tools}. These tools boost my productivity and creativity in development work.`;
            }
            
            if (normalizedInput.includes("language") || normalizedInput.includes("speak")) {
                const languages = chatbotKnowledge.personalInfo.languages.join(", ");
                return `I can communicate in ${languages}. I believe language skills are valuable for collaboration in our global tech community.`;
            }
            
            if (normalizedInput.includes("fact") || normalizedInput.includes("interesting") || normalizedInput.includes("unique")) {
                const funFact = getRandomItem(chatbotKnowledge.personalInfo.funFacts);
                return `Here's something you might not know about me: ${funFact}. Pretty cool, right?`;
            }
            
            if (normalizedInput.includes("goal") || normalizedInput.includes("aspiration") || normalizedInput.includes("future") || normalizedInput.includes("plan")) {
                const goal = getRandomItem(chatbotKnowledge.personalInfo.goals);
                return `One of my key professional goals is to ${goal}. I'm working steadily toward this while continuing to grow my skills.`;
            }
            
            if (normalizedInput.includes("value") || normalizedInput.includes("believe") || normalizedInput.includes("principle")) {
                const values = getRandomItems(chatbotKnowledge.personalInfo.values, 3).join(", ");
                return `I strongly value ${values}. These principles guide my approach to both work and personal growth.`;
            }
            
            if (normalizedInput.includes("pet") || normalizedInput.includes("cat") || normalizedInput.includes("dog") || normalizedInput.includes("animal")) {
                return `I have a ${chatbotKnowledge.personalInfo.pets.breed} cat named ${chatbotKnowledge.personalInfo.pets.name} who is ${chatbotKnowledge.personalInfo.pets.age} years old. ${chatbotKnowledge.personalInfo.pets.personality}`;
            }
            
            // General personal info
            return `Hi, I'm ${chatbotKnowledge.personalInfo.fullName}, a ${chatbotKnowledge.personalInfo.age}-year-old developer from ${chatbotKnowledge.personalInfo.location}. In my free time, I enjoy ${getRandomItems(chatbotKnowledge.personalInfo.hobbies, 2).join(" and ")}. Want to know anything specific about me?`;
        };

        const getSkillsResponse = (input) => {
            if (input.includes("technical") || input.includes("programming") || input.includes("coding")) {
                const skills = chatbotKnowledge.skills.technical.slice(0, 8).join(", ");
                return `For technical skills, I'm proficient in ${skills}, and more. Any specific technology you're interested in?`;
            }
            
            if (input.includes("design") || input.includes("ui") || input.includes("ux")) {
                const skills = chatbotKnowledge.skills.design.slice(0, 8).join(", ");
                return `In terms of design skills, I work with ${skills}, among others. Would you like to know more about my design process?`;
            }
            
            if (input.includes("soft") || input.includes("people") || input.includes("communication")) {
                const skills = chatbotKnowledge.skills.soft.join(", ");
                return `My soft skills include ${skills}. These are crucial for effective collaboration and project management.`;
            }
            
            // General skills response
            const techSkills = getRandomItems(chatbotKnowledge.skills.technical, 5).join(", ");
            const designSkills = getRandomItems(chatbotKnowledge.skills.design, 3).join(", ");
            return `I have a diverse skill set including technical skills like ${techSkills}, and design skills such as ${designSkills}. Would you like more specific information about any of these areas?`;
        };

        const getProjectResponse = (input) => {
            // Specific project matching
            for (const project of chatbotKnowledge.projects) {
                if (input.includes(project.name.toLowerCase())) {
                    return `**${project.name}**: ${project.description}. It was built using ${project.technologies.join(", ")}.`;
                }
            }
            
            // Technology-specific projects
            for (const tech of ["ai", "machine learning", "python", "javascript", "blockchain", "react"]) {
                if (input.includes(tech)) {
                    const relevantProjects = chatbotKnowledge.projects.filter(
                        p => p.description.toLowerCase().includes(tech) || 
                             p.technologies.some(t => t.toLowerCase().includes(tech))
                    );
                    
                    if (relevantProjects.length > 0) {
                        const project = relevantProjects[0];
                        return `For ${tech}, check out my **${project.name}** project: ${project.description}. It uses ${project.technologies.join(", ")}.`;
                    }
                }
            }
            
            // General projects response
            const randomProject = getRandomItem(chatbotKnowledge.projects);
            return `I've worked on several interesting projects. For example, **${randomProject.name}**: ${randomProject.description}. Would you like to hear about more projects?`;
        };

        const getEducationResponse = () => {
            const degree = chatbotKnowledge.education[0];
            const certs = chatbotKnowledge.education.filter(ed => ed.certification).slice(0, 2);
            
            let response = `I have a **${degree.degree}** from ${degree.school} (${degree.year}), focusing on ${degree.focus}. `;
            
            if (certs.length > 0) {
                response += `I also hold certifications including ${certs.map(c => c.certification).join(" and ")}.`;
            }
            
            return response;
        };

        const getExperienceResponse = () => {
            const currentJob = chatbotKnowledge.experience[0];
            
            let response = `Currently, I'm working as a **${currentJob.role}** at ${currentJob.company} (${currentJob.period}). `;
            response += `My key responsibilities include ${currentJob.responsibilities.slice(0, 2).join(" and ")}. `;
            
            if (chatbotKnowledge.experience.length > 1) {
                const previousJob = chatbotKnowledge.experience[1];
                response += `Before that, I was a ${previousJob.role} at ${previousJob.company}.`;
            }
            
            return response;
        };

        // Utility functions
        const getRandomPhrase = (category) => {
            const phrases = chatbotKnowledge.conversationalPhrases[category];
            return phrases[Math.floor(Math.random() * phrases.length)];
        };
        
        const getRandomItem = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };
        
        const getRandomItems = (array, count) => {
            const shuffled = [...array].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        // Personality customization
        const addPersonality = (text) => {
            switch (currentChatMood) {
                case "friendly":
                    if (Math.random() < 0.3) {
                        const filler = getRandomPhrase("fillers");
                        text = text.replace(/\. /g, `. ${filler} `);
                    }
                    if (Math.random() < 0.2) {
                        text = `${getRandomPhrase("thinking")} ${text}`;
                    }
                    break;
                case "professional":
                    text = text.replace(
                        /Hey there!|Hi friend!|Hey!|What's up\?/g,
                        "Greetings,"
                    );
                    text = text.replace(/gonna|wanna|gotta/g, "going to");
                    text = text.replace(/yeah|yep|nope/g, "yes");
                    text = text.replace(/!{2,}/g, "."); 
                    break;
                case "casual":
                    text = text.replace(/\./g, "...");
                    text = text.replace(/I am/g, "I'm");
                    text = text.replace(/you are/g, "you're");
                    text = text.replace(/do not/g, "don't");
                    if (Math.random() < 0.3) {
                        text += " 😊";
                    }
                    break;
                case "enthusiastic":
                    text = text.replace(/\./g, "!");
                    text = text.replace(/!+/g, "!!!");
                    if (Math.random() < 0.5) {
                        const enthusiasm = getRandomPhrase("enthusiasm");
                        text = `${text} ${enthusiasm}`;
                    }
                    text = text.replace(/good/g, "AMAZING");
                    text = text.replace(/great/g, "INCREDIBLE");
                    text = text.replace(/nice/g, "AWESOME");
                    if (Math.random() < 0.4) {
                        text = text.replace(/([A-Za-z]+)/g, (match, p1) => {
                            return Math.random() < 0.2 ? p1.toUpperCase() : p1;
                        });
                    }
                    const emojis = ["😃", "🤩", "✨", "🔥", "💯", "⭐", "🚀", "🎉"];
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    text += ` ${randomEmoji}`;
                    break;
            }
            return text;
        };

        // Message UI functions
        const addMessage = (text, isUser = false, keywords = []) => {
            const messageDiv = document.createElement("div");
            messageDiv.className = isUser ? "user-message" : "bot-message";
            
            const avatarDiv = document.createElement("div");
            avatarDiv.className = "message-avatar";
            
            if (isUser) {
                avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
            } else {
                // Use the logo.png as the bot's avatar
                avatarDiv.innerHTML = '<img src="logo.png" alt="Bot Avatar" width="32" height="32">';
            }
            
            const contentDiv = document.createElement("div");
            contentDiv.className = "message-content";
            
            // Add timestamp to message
            const timestamp = new Date();
            const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timestampDiv = document.createElement("div");
            timestampDiv.className = "message-timestamp";
            timestampDiv.textContent = timeString;
            
            chatHistory.push({
                isUser,
                text,
                timestamp: timestamp.getTime(),
                keywords: keywords
            });
            
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
            if (isUser) {
                // For user messages, only highlight keywords if they exist
                if (keywords && keywords.length > 0) {
                    contentDiv.innerHTML = highlightKeywordsInUserMessage(text, keywords);
                } else {
                    contentDiv.textContent = text;
                }
                messageDiv.appendChild(timestampDiv);
            }
            
            chatbotMessages.appendChild(messageDiv);
            
            gsap.fromTo(
                messageDiv,
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                }
            );
            
            if (isUser) {
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                gsap.fromTo(
                    avatarDiv,
                    { scale: 0.8, rotation: -5 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: "back.out(2)",
                    }
                );
            } else {
                // Apply personality and format markdown for bot messages
                const personalizedText = addPersonality(text);
                typeEffect(contentDiv, personalizedText, 25);
                animateBotMessage(messageDiv);
                messageDiv.appendChild(timestampDiv);
                
                // Generate suggestion chips after bot message
                updateSuggestionChips();
            }
            
            return contentDiv; 
        };

        const typeEffect = (element, text, speed) => {
            isTyping = true;
            let formattedText = formatMarkdown(text);
            element.innerHTML = "";
            
            let i = 0;
            let htmlContent = "";
            let tagStack = [];
            let isInTag = false;
            let isInEntity = false;
            let entityContent = "";
            
            function type() {
                if (i < formattedText.length) {
                    const char = formattedText[i];
                    
                    if (char === "<") {
                        isInTag = true;
                        htmlContent += char;
                    } else if (char === ">" && isInTag) {
                        isInTag = false;
                        htmlContent += char;
                    } else if (isInTag) {
                        htmlContent += char;
                    } else if (char === "&") {
                        isInEntity = true;
                        entityContent = char;
                    } else if (char === ";" && isInEntity) {
                        isInEntity = false;
                        entityContent += char;
                        htmlContent += entityContent;
                    } else if (isInEntity) {
                        entityContent += char;
                    } else {
                        htmlContent += char;
                        element.innerHTML = htmlContent;
                        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                    }
                    
                    i++;
                    setTimeout(type, isInTag || isInEntity ? 0 : speed);
                } else {
                    isTyping = false;
                    chatbotInput.disabled = false;
                    chatbotSend.disabled = false;
                    chatbotInput.focus();
                }
            }
            
            type();
        };

        // Input processing
        const processInput = () => {
            const userInput = chatbotInput.value.trim();
            if (userInput === "") return;
            
            // First, add the user message
            addMessage(userInput, true);
            chatbotInput.value = "";
            chatbotInput.disabled = true;
            chatbotSend.disabled = true;
            
            // Show typing indicator
            const typingIndicator = document.createElement("div");
            typingIndicator.className = "bot-message typing-indicator";
            typingIndicator.innerHTML = `
                <div class="message-avatar">
                    <img src="logo.png" alt="Bot Avatar" width="32" height="32">
                </div>
                <div class="message-content">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;
            
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            gsap.fromTo(
                typingIndicator,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3 }
            );
            
            // Generate response after a short delay to simulate thinking
            const responseDelay = Math.floor(Math.random() * 500) + 800;
            setTimeout(() => {
                // Get the bot's response with detected keywords
                const { response, keywords } = generateResponse(userInput);
                
                // If there are keywords, update the last user message to highlight them
                if (keywords && keywords.length > 0) {
                    const lastUserMessageDiv = [...chatbotMessages.querySelectorAll('.user-message')]
                        .filter(el => !el.classList.contains('typing-indicator'))
                        .pop();
                    
                    if (lastUserMessageDiv) {
                        const contentDiv = lastUserMessageDiv.querySelector('.message-content');
                        if (contentDiv) {
                            contentDiv.innerHTML = highlightKeywordsInUserMessage(userInput, keywords);
                        }
                    }
                }
                
                // Remove typing indicator and add bot's response
                gsap.to(typingIndicator, {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    onComplete: () => {
                        chatbotMessages.removeChild(typingIndicator);
                        addMessage(response, false, keywords);
                    },
                });
            }, responseDelay);
        };

        // Settings management
        const toggleSettings = () => {
            isSettingsOpen = !isSettingsOpen;
            
            if (isSettingsOpen) {
                gsap.to(chatbotSettings, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
                chatbotSettings.classList.add("visible");
            } else {
                gsap.to(chatbotSettings, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        chatbotSettings.classList.remove("visible");
                    }
                });
            }
        };

        const getMoodChangeMessage = (mood) => {
            switch (mood) {
                case "friendly":
                    return "I'll keep our chat friendly and approachable! How can I help you today?";
                case "professional":
                    return "I've switched to a more professional tone. How may I assist you with your inquiry?";
                case "casual":
                    return "Cool, switching to casual mode! What's up? What do you wanna know?";
                case "enthusiastic":
                    return "OMG! I'm SUPER excited to chat with you now!! What AMAZING thing can I tell you about?!?";
                default:
                    return "Chat style updated. How can I help you?";
            }
        };

        const setTheme = (theme) => {
            currentTheme = theme;
            document.body.setAttribute("data-chatbot-theme", theme);
            
            let themeMessage;
            switch (theme) {
                case "dark":
                    themeMessage = "Switched to dark theme. Your eyes will thank you!";
                    break;
                case "light":
                    themeMessage = "Switched to light theme. Keep it bright!";
                    break;
                case "purple":
                    themeMessage = "Switched to purple theme. Royal vibes!";
                    break;
                case "blue":
                    themeMessage = "Switched to blue theme. Ocean mood!";
                    break;
                default:
                    themeMessage = "Theme updated.";
            }
            
            addMessage(themeMessage);
        };

        // Suggestion chips functionality
        const updateSuggestionChips = () => {
            // Clear existing chips
            suggestionChips.innerHTML = "";
            
            // Get suggestions based on context
            let suggestions = [];
            
            const lastBotMessage = chatHistory
                .filter(msg => !msg.isUser)
                .pop();
                
            if (lastBotMessage) {
                if (lastBotMessage.text.includes("skill")) {
                    suggestions = ["Technical skills", "Design skills", "Soft skills"];
                } else if (lastBotMessage.text.includes("project")) {
                    suggestions = ["AI projects", "Web development projects", "Mobile projects"];
                } else if (lastBotMessage.text.includes("education")) {
                    suggestions = ["Certifications", "Courses", "Academic background"];
                } else if (lastBotMessage.text.includes("experience")) {
                    suggestions = ["Current role", "Previous jobs", "Achievements"];
                } else {
                    // Default suggestions if no context is matched
                    suggestions = getRandomItems(chatbotKnowledge.defaultSuggestions, 3);
                }
            } else {
                suggestions = getRandomItems(chatbotKnowledge.defaultSuggestions, 3);
            }
            
            // Create and add suggestion chips
            suggestions.forEach(suggestion => {
                const chip = document.createElement("button");
                chip.className = "suggestion-chip";
                chip.textContent = suggestion;
                chip.addEventListener("click", () => {
                    chatbotInput.value = suggestion;
                    processInput();
                });
                
                suggestionChips.appendChild(chip);
                
                gsap.fromTo(
                    chip,
                    { scale: 0.8, opacity: 0 },
                    { 
                        scale: 1, 
                        opacity: 1, 
                        duration: 0.3,
                        ease: "back.out(1.7)",
                        delay: Math.random() * 0.3
                    }
                );
            });
        };

        // Event listeners
        chatbotTrigger.addEventListener("click", () => {
            if (chatbotContainer.classList.contains("chatbot-closed")) {
                chatbotContainer.classList.remove("chatbot-closed");
                chatbotContainer.style.display = "flex";
                
                // Create floating particles when opening the chatbot
                createParticles();
                
                gsap.fromTo(
                    chatbotContainer,
                    {
                        opacity: 0,
                        scale: 0.9,
                        transformOrigin: "bottom right",
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    }
                );
                
                chatbotTrigger.style.display = "none";
                
                // Only show welcome message if chat history is empty
                if (chatHistory.length === 0) {
                    const welcomeMessage = getTimeBasedGreeting() + ` I'm your Legendary AI assistant, here to have a personal conversation with you! I can provide detailed information about ${chatbotKnowledge.personalInfo.name}'s skills, projects, education, and anything else you'd like to know. Just talk to me as if we're having a casual chat. What would you like to discuss today?`;
                    setTimeout(() => {
                        addMessage(welcomeMessage);
                    }, 300);
                }
            }
        });

        chatbotClose.addEventListener("click", () => {
            gsap.to(chatbotContainer, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    chatbotContainer.style.display = "none";
                    chatbotContainer.classList.add("chatbot-closed");
                    chatbotTrigger.style.display = "flex";
                },
            });
        });

        chatbotMinimize.addEventListener("click", () => {
            if (chatbotContainer.classList.contains("chatbot-minimized")) {
                // Expand chatbot
                gsap.to(chatbotContainer, {
                    height: "550px",
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        chatbotContainer.classList.remove("chatbot-minimized");
                        chatbotMessages.style.display = "flex";
                        chatbotInput.style.display = "block";
                        chatbotSend.style.display = "flex";
                        suggestionChips.style.display = "flex";
                    }
                });
            } else {
                // Minimize chatbot
                chatbotMessages.style.display = "none";
                chatbotInput.style.display = "none";
                chatbotSend.style.display = "none";
                suggestionChips.style.display = "none";
                
                gsap.to(chatbotContainer, {
                    height: "60px",
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        chatbotContainer.classList.add("chatbot-minimized");
                    }
                });
            }
        });

        chatbotInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey && !isTyping) {
                e.preventDefault();
                processInput();
            }
        });

        chatbotSend.addEventListener("click", () => {
            if (!isTyping) {
                processInput();
            }
        });

        if (chatbotToggleSettings) {
            chatbotToggleSettings.addEventListener("click", toggleSettings);
        }

        if (moodButtons) {
            moodButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    moodButtons.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                    currentChatMood = btn.getAttribute("data-mood");
                    const moodChangeMessage = getMoodChangeMessage(currentChatMood);
                    addMessage(moodChangeMessage);
                });
            });
        }

        if (themeButtons) {
            themeButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    themeButtons.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                    setTheme(btn.getAttribute("data-theme"));
                });
            });
        }

        // Initialize default suggestions
        updateSuggestionChips();
        
        // Add style for keyword highlighting
        const style = document.createElement('style');
        style.textContent = `
            .highlighted-keyword {
                background: linear-gradient(to right, rgba(120, 60, 240, 0.1), rgba(120, 60, 240, 0.3), rgba(120, 60, 240, 0.1));
                padding: 0 2px;
                border-radius: 3px;
                font-weight: bold;
                color: white;
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
                animation: keyword-glow 2s infinite alternate;
            }
            
            @keyframes keyword-glow {
                0% { box-shadow: 0 0 5px rgba(120, 60, 240, 0.3); }
                100% { box-shadow: 0 0 8px rgba(120, 60, 240, 0.6); }
            }
            
            .message-particle {
                position: absolute;
                pointer-events: none;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    });
})(); 