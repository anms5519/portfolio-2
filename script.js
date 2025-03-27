(() => {
    "use strict";
    const config = {
        particleCount: 1000,
        particleColor: 0xff6f61,
        particleSize: 0.15,
        debounceWait: 16,
        themeToggleIcons: { dark: "🌙", light: "🌞" },
    };
    function debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this,
                args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    emailjs.init("QCLwAOKe38NGkZrCE");
    window.addEventListener("load", () => {
        gsap.to("#preloader", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.getElementById("preloader").style.display = "none";
            },
        });
    });
    document.querySelectorAll(".nav-links a").forEach((anchor) => {
        const scrollToSection = (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(
                e.target.getAttribute("href")
            );
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };
        anchor.addEventListener("mouseenter", scrollToSection);
        anchor.addEventListener("click", scrollToSection);
    });
    const navToggle = document.getElementById("nav-toggle");
    const slideMenu = document.getElementById("slide-menu");
    const toggleSlideMenu = () => {
        if (slideMenu.classList.contains("active")) {
            gsap.to(slideMenu, {
                left: -300,
                duration: 0.6,
                ease: "power3.inOut",
            });
            slideMenu.classList.remove("active");
            navToggle.classList.remove("active");
            gsap.set(slideMenu.querySelectorAll("li"), {
                clearProps: "all",
            });
        } else {
            gsap.to(slideMenu, {
                left: 0,
                duration: 0.6,
                ease: "power3.inOut",
            });
            gsap.fromTo(
                slideMenu.querySelectorAll("li"),
                {
                    opacity: 0,
                    x: -30,
                    y: 20,
                    rotationY: -20,
                    transformOrigin: "left center",
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.2,
                }
            );
            slideMenu.querySelectorAll("li").forEach((item, index) => {
                gsap.to(item, {
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                    duration: 0.3,
                    delay: 0.3 + index * 0.08,
                    ease: "power2.inOut",
                });
            });
            slideMenu.classList.add("active");
            navToggle.classList.add("active");
        }
    };
    navToggle.addEventListener("click", toggleSlideMenu);
    document.querySelectorAll("#slide-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            gsap.to(slideMenu, {
                left: -300,
                duration: 0.6,
                ease: "power3.inOut",
            });
            slideMenu.classList.remove("active");
            navToggle.classList.remove("active");
        });
    });
    const themeToggle = document.getElementById("theme-toggle");
    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            themeToggle.innerHTML = config.themeToggleIcons.dark;
        } else {
            document.body.classList.remove("dark-mode");
            themeToggle.innerHTML = config.themeToggleIcons.light;
        }
        localStorage.setItem("theme", theme);
    };
    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
        const systemPrefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (systemPrefersDark) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
        initWorkExperienceTimeline();
        initAboutCounters();
        initAboutTyping();
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from(".hero-content h1", {
                duration: 1,
                opacity: 0,
                y: -50,
                ease: "power2.out",
            })
            .from(
                "#typed",
                { duration: 1, opacity: 0, y: 50, ease: "power2.out" },
                "-=0.5"
            )
            .from(
                ".btn",
                { duration: 1, opacity: 0, scale: 0.8, ease: "back.out(1.7)" },
                "-=0.5"
            );
        gsap.utils.toArray("section").forEach((section) => {
            gsap.from(section, {
                scrollTrigger: { trigger: section, start: "top 80%" },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
            });
        });
        document
            .querySelectorAll(".project-card, .certificate-card")
            .forEach((card) => {
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                });
                card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                });
            });
        const legendaryTypingEffect = () => {
            const typedElement = document.getElementById("typed");
            const phrases = [
                { text: "AI MAESTRO", color: "#ff6f61" },
                { text: "3D VIRTUOSO", color: "#6a7cff" },
                { text: "WEB ARCHITECT", color: "#7cff6a" },
                { text: "GAME ENGINEER", color: "#ff6aeb" },
                { text: "CODE ARTISAN", color: "#ffc56a" },
                { text: "TECH ALCHEMIST", color: "#6afdff" },
                { text: "DIGITAL ORACLE", color: "#d16aff" },
                { text: "CYBER GUARDIAN", color: "#ff6a8b" },
            ];
            const wrapper = document.createElement("div");
            wrapper.className = "legendary-typed-wrapper";
            typedElement.appendChild(wrapper);
            const textElement = document.createElement("div");
            textElement.className = "legendary-typed-text";
            wrapper.appendChild(textElement);
            const particlesContainer = document.createElement("div");
            particlesContainer.className = "legendary-typed-particles";
            wrapper.appendChild(particlesContainer);
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement("div");
                particle.className = "legendary-particle";
                particlesContainer.appendChild(particle);
                gsap.set(particle, {
                    x: gsap.utils.random(-100, 100),
                    y: gsap.utils.random(-50, 50),
                    scale: gsap.utils.random(0.5, 1.5),
                    opacity: gsap.utils.random(0.3, 0.8),
                });
            }
            let currentIndex = 0;
            const particles = document.querySelectorAll(".legendary-particle");
            const style = document.createElement("style");
            style.textContent = `
                .legendary-typed-wrapper {
                    position: relative;
                    perspective: 1000px;
                    height: 60px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: visible;
                }
                .legendary-typed-text {
                    font-size: 2.5rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    text-shadow: 0 0 10px rgba(255,255,255,0.5);
                    transform-style: preserve-3d;
                    position: relative;
                    z-index: 2;
                }
                .legendary-typed-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                }
                .legendary-particle {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #fff;
                    box-shadow: 0 0 10px rgba(255,255,255,0.8);
                    pointer-events: none;
                }
                @media (max-width: 768px) {
                    .legendary-typed-text {
                        font-size: 1.8rem;
                        letter-spacing: 2px;
                    }
                }
            `;
            document.head.appendChild(style);
            const animateText = () => {
                const phrase = phrases[currentIndex];
                const timeline = gsap.timeline({
                    onComplete: () => {
                        currentIndex = (currentIndex + 1) % phrases.length;
                        setTimeout(animateText, 500);
                    },
                });
                timeline
                    .set(textElement, { opacity: 0, rotationX: -90, text: "" })
                    .to(textElement, {
                        opacity: 1,
                        rotationX: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    });
                const chars = phrase.text.split("");
                chars.forEach((char, index) => {
                    timeline.add(() => {
                        textElement.textContent =
                            textElement.textContent + char;
                        gsap.to(textElement, {
                            color: phrase.color,
                            textShadow: `0 0 10px ${phrase.color}80, 0 0 20px ${phrase.color}40`,
                            duration: 0.5,
                        });
                        particles.forEach((particle) => {
                            gsap.to(particle, {
                                x: gsap.utils.random(-20, 20) + index * 15,
                                y: gsap.utils.random(-20, 20),
                                backgroundColor: phrase.color,
                                boxShadow: `0 0 10px ${phrase.color}`,
                                opacity: gsap.utils.random(0.4, 0.9),
                                scale: gsap.utils.random(0.5, 1.5),
                                duration: 0.3,
                            });
                        });
                    }, `+=${0.05}`);
                });
                timeline.to(
                    textElement,
                    {
                        rotationY: 10,
                        rotationX: 5,
                        y: -5,
                        duration: 2,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: 1,
                    },
                    "+=0.5"
                );
                timeline
                    .to(
                        textElement,
                        {
                            opacity: 0,
                            y: 20,
                            rotationX: 90,
                            duration: 0.8,
                            ease: "back.in(1.7)",
                        },
                        "+=0.5"
                    )
                    .to(
                        particles,
                        {
                            opacity: 0,
                            y: 50,
                            stagger: {
                                each: 0.01,
                                from: "random",
                            },
                            duration: 0.5,
                        },
                        "-=0.8"
                    );
                return timeline;
            };
            animateText();
        };
        legendaryTypingEffect();
        const addCursorParticleEffect = () => {
            const heroSection = document.querySelector(".hero");
            const particleContainer = document.createElement("div");
            particleContainer.className = "cursor-particle-container";
            heroSection.appendChild(particleContainer);
            const style = document.createElement("style");
            style.textContent = `
                .cursor-particle-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 3;
                    overflow: hidden;
                }
                .cursor-particle {
                    position: absolute;
                    background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                    z-index: 3;
                }
            `;
            document.head.appendChild(style);
            let mouseX = 0;
            let mouseY = 0;
            heroSection.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY - heroSection.getBoundingClientRect().top;
                createParticleAtCursor(mouseX, mouseY);
            });
            const createParticleAtCursor = (x, y) => {
                if (Math.random() > 0.3) return;
                const particle = document.createElement("div");
                particle.className = "cursor-particle";
                particleContainer.appendChild(particle);
                const size = Math.random() * 50 + 10;
                const colors = [
                    "#ff6f61",
                    "#6a7cff",
                    "#7cff6a",
                    "#ff6aeb",
                    "#ffc56a",
                    "#6afdff",
                    "#d16aff",
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                gsap.set(particle, {
                    x: x,
                    y: y,
                    width: size,
                    height: size,
                    backgroundColor: color,
                    opacity: 0,
                });
                gsap.to(particle, {
                    x: x + (Math.random() - 0.5) * 100,
                    y: y + (Math.random() - 0.5) * 100,
                    opacity: 0.7,
                    duration: 0.2,
                    ease: "power1.out",
                    onComplete: () => {
                        gsap.to(particle, {
                            opacity: 0,
                            scale: 2,
                            duration: 1,
                            ease: "power2.out",
                            onComplete: () => {
                                if (particle.parentNode === particleContainer) {
                                    particleContainer.removeChild(particle);
                                }
                            },
                        });
                    },
                });
            };
            heroSection.addEventListener("touchmove", (e) => {
                const touch = e.touches[0];
                mouseX = touch.clientX;
                mouseY =
                    touch.clientY - heroSection.getBoundingClientRect().top;
                createParticleAtCursor(mouseX, mouseY);
            });
        };
        addCursorParticleEffect();
    });
    themeToggle.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            applyTheme("light");
        } else {
            applyTheme("dark");
        }
    });
    const certificateModal = document.getElementById("certificate-modal");
    const certificateImage = document.getElementById("certificate-image");
    const modalContent = document.querySelector(".certificate-modal-content");
    const openModal = (imgSrc) => {
        certificateImage.src = imgSrc;
        certificateModal.style.display = "flex";
        gsap.fromTo(
            modalContent,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        );
    };
    const closeModal = () => {
        gsap.to(modalContent, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                certificateModal.style.display = "none";
                certificateImage.src = "";
            },
        });
    };
    document.querySelectorAll(".certificate-card").forEach((card) => {
        card.addEventListener("click", () => {
            const imgSrc = card.getAttribute("data-img");
            openModal(imgSrc);
        });
    });
    const closeCertificateModal = document.querySelector(
        "#certificate-modal .close-btn"
    );
    closeCertificateModal.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === certificateModal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certificateModal.style.display === "flex")
            closeModal();
    });
    const showToast = (message) => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.display = "block";
        gsap.fromTo(
            toast,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
        );
        setTimeout(() => {
            gsap.to(toast, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    toast.style.display = "none";
                },
            });
        }, 3000);
    };
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        emailjs
            .sendForm("service_0ietc2e", "template_jihmbkn", contactForm)
            .then((response) => {
                console.log("SUCCESS!", response.status, response.text);
                showToast("Message sent successfully!");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("FAILED...", error);
                showToast("Failed to send message. Please try again later.");
            });
    });
    const canvas = document.getElementById("bg-canvas");
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;
    const particleCount = window.innerWidth < 768 ? 500 : 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(particleCount * 3);
    const starSizes = new Float32Array(particleCount);
    const starColors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        starPositions[i3] = (Math.random() - 0.5) * 100;
        starPositions[i3 + 1] = (Math.random() - 0.5) * 100;
        starPositions[i3 + 2] = (Math.random() - 0.5) * 100;
        starSizes[i] = Math.random() * 2 + 0.5;
        const colorChoice = Math.random();
        if (colorChoice < 0.3) {
            starColors[i3] = 0.1 + Math.random() * 0.2; 
            starColors[i3 + 1] = 0.3 + Math.random() * 0.3; 
            starColors[i3 + 2] = 0.7 + Math.random() * 0.3; 
        } else if (colorChoice < 0.6) {
            starColors[i3] = 0.5 + Math.random() * 0.3; 
            starColors[i3 + 1] = 0.1 + Math.random() * 0.2; 
            starColors[i3 + 2] = 0.7 + Math.random() * 0.3; 
        } else {
            starColors[i3] = 0.1 + Math.random() * 0.2; 
            starColors[i3 + 1] = 0.7 + Math.random() * 0.3; 
            starColors[i3 + 2] = 0.7 + Math.random() * 0.3; 
        }
    }
    starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(starPositions, 3)
    );
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(starColors, 3)
    );
    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wNC0xOVQxNDozMDo0My0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDQtMTlUMTQ6MzE6MjktMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTI1MTE1NmQtOGM1ZC03YzRlLTk2NzQtZGUzYmY2NTgyNDc2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyNTExNTZkLThjNWQtN2M0ZS05Njc0LWRlM2JmNjU4MjQ3NiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUyNTExNTZkLThjNWQtN2M0ZS05Njc0LWRlM2JmNjU4MjQ3NiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTI1MTE1NmQtOGM1ZC03YzRlLTk2NzQtZGUzYmY2NTgyNDc2IiBzdEV2dDp3aGVuPSIyMDIwLTA0LTE5VDE0OjMwOjQzLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pnuh+cMAAAXmSURBVFiFpZdbbJxHFcd/Z2a/b3ftXe/6vthOHMdOSNskKE3aAEVpm1SEVEAqRYiHeOgTb0VCQkK88VA15QUQggYJRCWEhBBUIBGVS9MW0jZp4yZxSGI7sWM7Xse73vX3srvf7gwPs7bj1KhipJFmvpn5n3P+55yZOeIr+zpY77QBeaAN8IFNwHrJPjAPFIEy8GfgG985yJdl03rIxWwCngYeBR4Dtq3Rngs4CZwD3gX+BuQBRxJwCWOBrcBTwA+Bu1biBojXCK6OtXxPA4+XsM+8d+qCZBVyZqVDOCPAd4GXgJ1ArGaNIsDu7aEtmY1kCOxSE77VjGc141lNeFYjvtWEbzXj61ZyZhPT8k+Av/x+4lLITuCnwH7AUyvD9/XWXSOnGdk3SjI7SCwzSGJwoF5ZPKXzl0eZPT7OzNGj5N/9CJUr4tkZJFuPR/fCgHM6X2xPp0ee1Ymo53+Xod6wRPb2BqZf+w7xse3YiX6idj9RKkm5EtTrOiZPZ+ZxomO40THC879j+uUXsH0/xBNuAR7BwzxYDpwGsBvoX0keQNMUrd9+kMzTB7BT/URtfUSdCcqBRdWxlxnHdY3tK8n7txId/Z1Qev8FvC98TGyzz2L6N/bm/q6fCuC5lXJ9zxg9P3mM5Be+TdQxQKXlFkqepKoUSkrEahVsrGUJBBqIkUGd6UZ1dDL1zC/RmQzxLQPgeruFZ/tKIa9dKbc77yb78nfRu48QdmapJKaoCofQ92vCGrYQQiCEAiEQukbYnoZskrmfv0Dl7RbsXVkc1gXQ9s67ZGsE+F4ggj3fJ/viy5S9GQpZQaFNUIkZmC0xjJYEZiKOEfMwPA/DdTEcB8MwiBkmhqYQ0UA4btL21V10n/Io/XOMoP2DLtfznmlOZOUieXYcCQlGvvgYJRVRaLcoD9cYwqJtZ5LM7haS2TRufQHL9zGDMrpvIPwAEUYoRxF13UnXkUv4v/sV5d4e5OnQdCZO1GrTtX4wY44+Sde+R6h2DVJod5i/OcLcJw6pe1U2TFmkt3fRNFzHaW1BSokQAi0MEKZ59/FdDCNOY0MXyb2PUvhXJ51Ht9OTuaOJgOXJrqUJHevMsPHAbpTnUOgQFK/azF9ySO/vYscDaSzfR1sW1hIiVsYQVOdDKnMR4Q2bhdwC4bEclmtaHoIABmL9TXgdDYjmbiodDqV+i4XxJJu+1E37qEs4N0/T6CCdT+1n4YOTFN49QTiTZ/70NWauRKTuH8Vua0NGk+jMOA5BrOYEDnEG1vWjuwQ1zyNqSxH3NpHeZ9M2kiS8NcfAI7tRukIEaWL97bTv2Yba/hnIpdh4sJGB4W6im1fR3QvY41fpiPVk6wg0Y6sSRhQhaoKwL0mlT2Bvk/Qd6kT4PrK1uXbRLJeG2/sZvXcn1tZtwBiVD/6BQYGWUzdo17ZvryNQBcZoNAyqcxGVXJWoGpIYb0CN9RK15YlOvYfX00d1Zob8hYuosRxTf34deSOg1peg680G4uoyCjUgHtSbrKbhYRAGxItVTMdg6rUQdeMc1uHdpF78JqJ3I97ZS+T/+gbBzbPMP/FNxPZRmjfW095xgurZDkToIbUOEAjU28ChOgIlEv3nSORs5JUb+OcnCc5cwR3bgRx7gNQz3yI+2ofUNFQ+T3TqP6jzx3HPnCc4fwpvvonmsQ581cXEPRNUfn2d+BZvEY7DwGt1tXBsKtYY29H1mBbLGsG1k+T/8AfqwcXZnCe//27CD89Rnpymy2hgKrGF+c+1klzvIKQilnIpfvAqydj7UJxeosWblWq4E8Uj1VrcffgX85XDp/QdyRaVhw5SZJKb48fovLJAc7+G16AQQhDLNFKdmmTi6W9QTnqkdnYjfXk3ufcAr1JjAa9eTT1gL/A4qT2/0dW2u1xrZ4CslaShrZHmlhSBo5i6MsHkH35HIfc+1o0S1u15gg9XkK9aT0wuwm8FHlx8PgAMrfweAOYQTAPjwFXgE+DC4vsJ4L/8H2L+TXbIqvGaAAAAAElFTkSuQmCC"
    );
    const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
            texture: { value: starTexture },
            time: { value: 0 },
        },
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            void main() {
                vColor = color;
                vec3 pos = position;
                pos.x += sin(time * 0.2 + position.z * 0.5) * 0.3;
                pos.y += cos(time * 0.1 + position.x * 0.5) * 0.3;
                pos.z += sin(time * 0.3 + position.y * 0.5) * 0.3;
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (350.0 / -mvPosition.z) * (sin(time * 0.5 + position.x) * 0.2 + 0.8);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D texture;
            varying vec3 vColor;
            void main() {
                vec4 texColor = texture2D(texture, gl_PointCoord);
                gl_FragColor = vec4(vColor, 1.0) * texColor;
                if (gl_FragColor.a < 0.3) discard;
            }
        `,
        transparent: true,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x4444ff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
    });
    const linesGeometry = new THREE.BufferGeometry();
    const segments = Math.min(particleCount, 300); 
    const positions = new Float32Array(segments * 6); 
    linesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    const orbsCount = 15;
    const orbs = [];
    const orbGroup = new THREE.Group();
    for (let i = 0; i < orbsCount; i++) {
        const size = Math.random() * 0.8 + 0.5;
        const orb = new THREE.Mesh(
            new THREE.SphereGeometry(size, 16, 16),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color(
                    0.5 + Math.random() * 0.5,
                    0.5 + Math.random() * 0.5,
                    0.5 + Math.random() * 0.5
                ),
                transparent: true,
                opacity: 0.5,
                blending: THREE.AdditiveBlending,
            })
        );
        const radius = 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        orb.position.x = radius * Math.sin(phi) * Math.cos(theta);
        orb.position.y = radius * Math.sin(phi) * Math.sin(theta);
        orb.position.z = radius * Math.cos(phi);
        orb.userData = {
            initialX: orb.position.x,
            initialY: orb.position.y,
            initialZ: orb.position.z,
            speed: Math.random() * 0.5 + 0.5,
            phase: Math.random() * Math.PI * 2,
        };
        orbGroup.add(orb);
        orbs.push(orb);
    }
    scene.add(orbGroup);
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    window.addEventListener("mousemove", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        targetRotation.x = mouse.y * 0.5;
        targetRotation.y = mouse.x * 0.5;
    });
    window.addEventListener(
        "touchmove",
        (event) => {
            if (event.touches.length > 0) {
                mouse.x =
                    (event.touches[0].clientX / window.innerWidth) * 2 - 1;
                mouse.y =
                    -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
                targetRotation.x = mouse.y * 0.5;
                targetRotation.y = mouse.x * 0.5;
            }
        },
        { passive: true }
    );
    window.addEventListener("resize", () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    const updateConnections = () => {
        const positions = lines.geometry.attributes.position.array;
        const starPositions = stars.geometry.attributes.position.array;
        const threshold = 10; 
        let lineIndex = 0;
        for (let i = 0; i < segments && lineIndex < positions.length - 5; i++) {
            const index1 = Math.floor(Math.random() * particleCount) * 3;
            const x1 = starPositions[index1];
            const y1 = starPositions[index1 + 1];
            const z1 = starPositions[index1 + 2];
            let closestDist = threshold;
            let closestIndex = -1;
            for (let j = 0; j < particleCount; j++) {
                const index2 = j * 3;
                if (index1 === index2) continue;
                const x2 = starPositions[index2];
                const y2 = starPositions[index2 + 1];
                const z2 = starPositions[index2 + 2];
                const dx = x2 - x1;
                const dy = y2 - y1;
                const dz = z2 - z1;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIndex = index2;
                }
            }
            if (closestIndex !== -1) {
                positions[lineIndex++] = x1;
                positions[lineIndex++] = y1;
                positions[lineIndex++] = z1;
                positions[lineIndex++] = starPositions[closestIndex];
                positions[lineIndex++] = starPositions[closestIndex + 1];
                positions[lineIndex++] = starPositions[closestIndex + 2];
            }
        }
        lines.geometry.attributes.position.needsUpdate = true;
    };
    let time = 0;
    const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;
        starMaterial.uniforms.time.value = time;
        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
        scene.rotation.x = currentRotation.x;
        scene.rotation.y = currentRotation.y;
        if (time % 0.5 < 0.02) {
            updateConnections();
        }
        orbs.forEach((orb) => {
            const data = orb.userData;
            orb.position.x =
                data.initialX + Math.sin(time * data.speed + data.phase) * 5;
            orb.position.y =
                data.initialY + Math.cos(time * data.speed + data.phase) * 5;
            orb.position.z =
                data.initialZ +
                Math.sin(time * data.speed * 0.5 + data.phase) * 5;
            orb.material.opacity = 0.3 + 0.2 * Math.sin(time * 2 + data.phase);
        });
        renderer.render(scene, camera);
    };
    animate();
    document.addEventListener("DOMContentLoaded", () => {
        // Chatbot code has been moved to chatbot.js
        // Other non-chatbot related initialization code can remain here
    });
    document.addEventListener("DOMContentLoaded", () => {
        if (!document.getElementById("skills-chart")) return;
        const skillsData = {
            technical: {
                labels: [
                    "AI Development",
                    "Machine Learning",
                    "Python",
                    "JavaScript",
                    "Web Development",
                    "Game Dev",
                    "Data Visualization",
                    "C/C++",
                ],
                datasets: [
                    {
                        label: "Technical Skills",
                        data: [95, 90, 88, 85, 92, 87, 83, 80],
                        backgroundColor: "rgba(78, 0, 224, 0.5)",
                        borderColor: "rgba(78, 0, 224, 1)",
                        borderWidth: 2,
                        pointBackgroundColor: "rgba(138, 43, 226, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(138, 43, 226, 1)",
                        pointRadius: 5,
                        pointHoverRadius: 7,
                    },
                ],
            },
            design: {
                labels: [
                    "UI/UX Design",
                    "CSS Animation",
                    "Graphic Design",
                    "3D Modeling",
                    "Web Design",
                    "Color Theory",
                    "Typography",
                    "Layout Design",
                ],
                datasets: [
                    {
                        label: "Design Skills",
                        data: [88, 92, 78, 85, 90, 83, 75, 80],
                        backgroundColor: "rgba(0, 128, 255, 0.5)",
                        borderColor: "rgba(0, 128, 255, 1)",
                        borderWidth: 2,
                        pointBackgroundColor: "rgba(0, 191, 255, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(0, 191, 255, 1)",
                        pointRadius: 5,
                        pointHoverRadius: 7,
                    },
                ],
            },
            soft: {
                labels: [
                    "Leadership",
                    "Communication",
                    "Problem Solving",
                    "Teamwork",
                    "Time Management",
                    "Adaptability",
                    "Creativity",
                    "Critical Thinking",
                ],
                datasets: [
                    {
                        label: "Soft Skills",
                        data: [85, 88, 92, 87, 90, 93, 95, 89],
                        backgroundColor: "rgba(255, 105, 180, 0.5)",
                        borderColor: "rgba(255, 105, 180, 1)",
                        borderWidth: 2,
                        pointBackgroundColor: "rgba(255, 20, 147, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255, 20, 147, 1)",
                        pointRadius: 5,
                        pointHoverRadius: 7,
                    },
                ],
            },
        };
        const chartConfig = {
            radar: {
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                color: "rgba(255, 255, 255, 0.2)",
                            },
                            grid: {
                                color: "rgba(255, 255, 255, 0.2)",
                            },
                            pointLabels: {
                                color: "rgba(255, 255, 255, 0.8)",
                                font: {
                                    size: 12,
                                },
                            },
                            ticks: {
                                backdropColor: "transparent",
                                color: "rgba(255, 255, 255, 0.6)",
                                z: 100,
                            },
                            suggestedMin: 50,
                            suggestedMax: 100,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            titleFont: {
                                size: 14,
                            },
                            bodyFont: {
                                size: 14,
                            },
                            padding: 10,
                            cornerRadius: 8,
                            displayColors: false,
                        },
                    },
                    animation: {
                        duration: 2000,
                        easing: "easeOutQuart",
                    },
                },
            },
            bars: {
                options: {
                    indexAxis: "y",
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: "rgba(255, 255, 255, 0.1)",
                            },
                            ticks: {
                                color: "rgba(255, 255, 255, 0.6)",
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                        },
                        y: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: "rgba(255, 255, 255, 0.8)",
                                font: {
                                    size: 12,
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            titleFont: {
                                size: 14,
                            },
                            bodyFont: {
                                size: 14,
                            },
                            padding: 10,
                            cornerRadius: 8,
                            displayColors: false,
                        },
                    },
                    animation: {
                        duration: 2000,
                        easing: "easeOutQuart",
                    },
                },
            },
            doughnut: {
                options: {
                    cutout: "60%",
                    plugins: {
                        legend: {
                            position: "right",
                            labels: {
                                color: "rgba(255, 255, 255, 0.8)",
                                font: {
                                    size: 12,
                                },
                                padding: 20,
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            titleFont: {
                                size: 14,
                            },
                            bodyFont: {
                                size: 14,
                            },
                            padding: 10,
                            cornerRadius: 8,
                            displayColors: false,
                        },
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 2000,
                        easing: "easeOutQuart",
                    },
                },
            },
        };
        let currentChart = null;
        let currentChartType = "radar";
        let currentCategory = "technical";
        const initChart = () => {
            const ctx = document
                .getElementById("skills-chart")
                .getContext("2d");
            if (currentChart) {
                currentChart.destroy();
            }
            if (currentChartType === "radar") {
                currentChart = new Chart(ctx, {
                    type: "radar",
                    data: skillsData[currentCategory],
                    options: chartConfig.radar.options,
                });
            } else if (currentChartType === "bars") {
                currentChart = new Chart(ctx, {
                    type: "bar",
                    data: skillsData[currentCategory],
                    options: chartConfig.bars.options,
                });
            } else if (currentChartType === "doughnut") {
                const doughnutData = {
                    labels: skillsData[currentCategory].labels,
                    datasets: [
                        {
                            data: skillsData[currentCategory].datasets[0].data,
                            backgroundColor: [
                                "rgba(78, 0, 224, 0.7)",
                                "rgba(138, 43, 226, 0.7)",
                                "rgba(0, 128, 255, 0.7)",
                                "rgba(0, 191, 255, 0.7)",
                                "rgba(255, 105, 180, 0.7)",
                                "rgba(255, 20, 147, 0.7)",
                                "rgba(255, 215, 0, 0.7)",
                                "rgba(255, 140, 0, 0.7)",
                            ],
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            borderWidth: 2,
                        },
                    ],
                };
                currentChart = new Chart(ctx, {
                    type: "doughnut",
                    data: doughnutData,
                    options: chartConfig.doughnut.options,
                });
            }
            gsap.from("#skills-chart", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
            });
        };
        document.querySelectorAll(".viz-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                document
                    .querySelectorAll(".viz-btn")
                    .forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                currentChartType = btn.getAttribute("data-chart");
                initChart();
            });
        });
        document.querySelectorAll(".category-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                document
                    .querySelectorAll(".category-btn")
                    .forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                currentCategory = btn.getAttribute("data-category");
                initChart();
            });
        });
        initChart();
    });
    document.addEventListener("DOMContentLoaded", () => {
        const scrollToTop = document.getElementById("scroll-to-top");
        if (scrollToTop) {
            window.addEventListener("scroll", () => {
                if (window.pageYOffset > 300) {
                    if (scrollToTop.style.display !== "flex") {
                        gsap.to(scrollToTop, {
                            display: "flex",
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                } else {
                    if (scrollToTop.style.opacity !== "0") {
                        gsap.to(scrollToTop, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.in",
                            onComplete: () => {
                                scrollToTop.style.display = "none";
                            },
                        });
                    }
                }
            });
            scrollToTop.addEventListener("click", () => {
                gsap.to(window, {
                    scrollTo: {
                        y: 0,
                        autoKill: false,
                    },
                    duration: 0.1,
                    ease: "power3.inOut",
                });
                gsap.fromTo(
                    scrollToTop,
                    { scale: 1 },
                    {
                        scale: 1.2,
                        duration: 0.3,
                        ease: "power2.out",
                        yoyo: true,
                        repeat: 1,
                    }
                );
            });
        }
        document.querySelectorAll(".social-icon").forEach((icon) => {
            icon.addEventListener("mouseenter", () => {
                gsap.to(icon, {
                    y: -5,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                });
            });
            icon.addEventListener("mouseleave", () => {
                gsap.to(icon, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });
        const footer = document.querySelector("footer");
        if (footer) {
            window.addEventListener("mousemove", (e) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 20;
                const yPos = (clientY / window.innerHeight - 0.5) * 20;
                gsap.to(footer, {
                    backgroundPosition: `${xPos}px ${yPos}px`,
                    duration: 1,
                    ease: "power1.out",
                });
            });
        }
        document
            .querySelectorAll(".nav-links a, .footer-links a")
            .forEach((link) => {
                link.addEventListener("mouseenter", () => {
                    gsap.to(link, {
                        color: "var(--accent-color)",
                        duration: 0.3,
                    });
                });
                link.addEventListener("mouseleave", () => {
                    gsap.to(link, {
                        color: "",
                        duration: 0.3,
                    });
                });
            });
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 1000,
                easing: "ease-in-out",
                once: true,
            });
        }
        console.log("Enhanced UI interactions initialized");
    });
    document.addEventListener("DOMContentLoaded", function () {
        const filterBtns = document.querySelectorAll(".filter-btn");
        const projectCards = document.querySelectorAll(".project-card");
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterBtns.forEach((btn) => btn.classList.remove("active"));
                btn.classList.add("active");
                const filterValue = btn.getAttribute("data-filter");
                projectCards.forEach((card) => {
                    if (
                        filterValue === "all" ||
                        card.getAttribute("data-category") === filterValue
                    ) {
                        card.style.display = "flex";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0) scale(1)";
                        }, 50);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(20px) scale(0.95)";
                        setTimeout(() => {
                            card.style.display = "none";
                        }, 300);
                    }
                });
            });
        });
        projectCards.forEach((card) => {
            if (!card.classList.contains("game-card")) {
                card.addEventListener("click", () => {
                    const title = card.getAttribute("data-title");
                    const description = card.getAttribute("data-description");
                    if (title && description) {
                        openProjectModal(title, description);
                    }
                });
            }
        });
        const demoTriggers = document.querySelectorAll(".demo-trigger");
        demoTriggers.forEach((trigger) => {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const demoType = trigger.getAttribute("data-demo");
                switch (demoType) {
                    case "voice-assistant":
                        alert(
                            "Voice Assistant Demo: This would open an interactive voice assistant demo"
                        );
                        break;
                    case "ar-demo":
                        alert(
                            "AR Demo: This would play a demo video of the AR application"
                        );
                        break;
                    default:
                        console.log(
                            "No specific demo defined for this trigger"
                        );
                }
            });
        });
    });
    function openProjectModal(title, description) {
        let modal = document.getElementById("project-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "project-modal";
            modal.className = "project-modal";
            modal.innerHTML = `
                <div class="project-modal-content">
                    <span class="close-btn">&times;</span>
                    <h2 id="modal-title"></h2>
                    <div id="modal-description"></div>
                </div>
            `;
            document.body.appendChild(modal);
            const closeBtn = modal.querySelector(".close-btn");
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.style.display = "none";
                }
            });
        }
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
        modalTitle.textContent = title;
        modalDescription.innerHTML = description;
        
        // Update GitHub and live links if they exist in the project card
        const projectCard = document.querySelector(`.project-card[data-title="${title}"]`);
        if (projectCard) {
            const githubLink = projectCard.getAttribute('data-github');
            const liveLink = projectCard.getAttribute('data-live');
            
            const modalGithub = document.getElementById('modal-github');
            const modalLive = document.getElementById('modal-live');
            
            if (modalGithub) {
                if (githubLink) {
                    modalGithub.href = githubLink;
                    modalGithub.style.display = 'inline-flex';
                } else {
                    modalGithub.style.display = 'none';
                }
            }
            
            if (modalLive) {
                if (liveLink) {
                    modalLive.href = liveLink;
                    modalLive.style.display = 'inline-flex';
                } else {
                    modalLive.style.display = 'none';
                }
            }
        }
        
        modal.style.display = "block";
    }
    document.addEventListener("DOMContentLoaded", () => {
        const gameConfig = {
            spaceShooting: {
                difficulty: "dynamic",
                enemySpeed: 2.5,
                playerSpeed: 5,
                bulletSpeed: 8,
                maxEnemies: 15,
                powerupFrequency: 0.02,
                particleEffects: true,
                sounds: true,
            },
            tetrisStyle: {
                speed: 500,
                speedIncrease: 50,
                maxLevel: 10,
                particleEffects: true,
                sounds: true,
            },
            runnerGame: {
                gravity: 0.6,
                jumpForce: 12,
                speed: 6,
                obstacleFrequency: 0.015,
                particleEffects: true,
                sounds: true,
            },
        };
        document.querySelectorAll(".game-card").forEach((gameCard) => {
            gameCard.addEventListener("click", (e) => {
                e.preventDefault();
                const parentSection =
                    gameCard.closest("section") ||
                    document.querySelector("main");
                let gameSection = document.getElementById(
                    "legendary-game-section"
                );
                if (!gameSection) {
                    gameSection = document.createElement("div");
                    gameSection.id = "legendary-game-section";
                    gameSection.className = "legendary-game-section";
                    const gameHeader = document.createElement("div");
                    gameHeader.className = "game-header";
                    gameHeader.innerHTML = `
                        <h3 id="game-title">Legendary Game</h3>
                        <div class="game-controls">
                            <button class="pause-btn">Pause</button>
                            <button class="close-btn">Close Game</button>
                        </div>
                    `;
                    const gameCanvas = document.createElement("canvas");
                    gameCanvas.width = 800;
                    gameCanvas.height = 600;
                    gameCanvas.className = "game-canvas";
                    gameCanvas.id = "game-canvas";
                    const gameFooter = document.createElement("div");
                    gameFooter.className = "game-footer";
                    gameFooter.id = "game-footer";
                    gameSection.appendChild(gameHeader);
                    gameSection.appendChild(gameCanvas);
                    gameSection.appendChild(gameFooter);
                    parentSection.appendChild(gameSection);
                    const closeBtn = gameHeader.querySelector(".close-btn");
                    const pauseBtn = gameHeader.querySelector(".pause-btn");
                    closeBtn.addEventListener("click", () => {
                        gameSection.classList.add("game-closing");
                        setTimeout(() => {
                            if (gameSection.parentNode) {
                                gameSection.parentNode.removeChild(gameSection);
                            }
                        }, 500);
                    });
                    pauseBtn.addEventListener("click", () => {
                        if (window.gameState && window.gameState.paused) {
                            window.gameState.paused = false;
                            pauseBtn.textContent = "Pause";
                        } else if (window.gameState) {
                            window.gameState.paused = true;
                            pauseBtn.textContent = "Resume";
                        }
                    });
                } else {
                    gameSection.classList.remove("game-closing");
                    const canvas = document.getElementById("game-canvas");
                    const context = canvas.getContext("2d");
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
                document.getElementById("game-title").textContent =
                    gameCard.getAttribute("data-title") || "Legendary Game";
                gameSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                const gameType = gameCard.getAttribute("data-game-type");
                const gameCanvas = document.getElementById("game-canvas");
                const gameFooter = document.getElementById("game-footer");
                switch (gameType) {
                    case "space-shooter":
                        initSpaceShooterGame(
                            gameCanvas,
                            gameFooter,
                            gameConfig.spaceShooting
                        );
                        break;
                    case "tetris":
                        initTetrisGame(
                            gameCanvas,
                            gameFooter,
                            gameConfig.tetrisStyle
                        );
                        break;
                    case "runner":
                        initRunnerGame(
                            gameCanvas,
                            gameFooter,
                            gameConfig.runnerGame
                        );
                        break;
                    default:
                        gameFooter.innerHTML =
                            "<p>Game type not recognized. Please try another game.</p>";
                }
                const style = document.createElement("style");
                style.textContent = `
                    .legendary-game-section {
                        width: 100%;
                        max-width: 850px;
                        margin: 2rem auto;
                        background: rgba(10, 10, 25, 0.95);
                        border-radius: 10px;
                        box-shadow: 0 0 30px rgba(78, 0, 224, 0.6);
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        border: 2px solid rgba(138, 43, 226, 0.6);
                        animation: gameAppear 0.5s ease-out forwards;
                    }
                    @keyframes gameAppear {
                        from { opacity: 0; transform: scale(0.9); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .game-closing {
                        animation: gameDisappear 0.5s ease-in forwards;
                    }
                    @keyframes gameDisappear {
                        from { opacity: 1; transform: scale(1); }
                        to { opacity: 0; transform: scale(0.9); }
                    }
                    .game-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 15px;
                        background: rgba(30, 30, 50, 0.8);
                        border-bottom: 2px solid rgba(138, 43, 226, 0.4);
                    }
                    .game-header h3 {
                        margin: 0;
                        color: white;
                        font-size: 1.2rem;
                        font-weight: 600;
                        text-shadow: 0 0 10px rgba(138, 43, 226, 0.8);
                    }
                    .game-controls {
                        display: flex;
                        gap: 10px;
                    }
                    .game-controls button {
                        background: rgba(60, 60, 80, 0.6);
                        border: 1px solid rgba(138, 43, 226, 0.6);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .game-controls button:hover {
                        background: rgba(138, 43, 226, 0.6);
                    }
                    .game-controls .close-btn {
                        background: rgba(200, 50, 50, 0.4);
                    }
                    .game-controls .close-btn:hover {
                        background: rgba(255, 50, 50, 0.8);
                    }
                    .game-canvas {
                        width: 100%;
                        height: auto;
                        aspect-ratio: 4/3;
                        background: #000;
                        display: block;
                    }
                    .game-footer {
                        padding: 10px 15px;
                        color: white;
                        font-size: 0.9rem;
                        background: rgba(30, 30, 50, 0.8);
                        border-top: 2px solid rgba(138, 43, 226, 0.4);
                    }
                    .game-stat {
                        display: inline-block;
                        margin-right: 15px;
                        background: rgba(60, 60, 80, 0.6);
                        padding: 3px 10px;
                        border-radius: 15px;
                        font-weight: 600;
                    }
                    .game-over-screen {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.7);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        text-align: center;
                        z-index: 10;
                    }
                    .game-over-screen h2 {
                        font-size: 2.5rem;
                        margin-bottom: 20px;
                        text-shadow: 0 0 20px rgba(138, 43, 226, 1);
                    }
                    .game-over-screen .score {
                        font-size: 1.5rem;
                        margin-bottom: 30px;
                    }
                    .game-over-screen button {
                        background: rgba(138, 43, 226, 0.7);
                        color: white;
                        border: none;
                        padding: 10px 25px;
                        font-size: 1.1rem;
                        border-radius: 25px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .game-over-screen button:hover {
                        background: rgba(138, 43, 226, 1);
                        transform: scale(1.05);
                    }
                    @media (max-width: 768px) {
                        .legendary-game-section {
                            max-width: 95%;
                        }
                        .game-header h3 {
                            font-size: 1rem;
                        }
                        .game-controls button {
                            padding: 4px 8px;
                            font-size: 0.9rem;
                        }
                        .game-footer {
                            font-size: 0.8rem;
                        }
                    }
                `;
                if (!document.getElementById("game-styles")) {
                    style.id = "game-styles";
                    document.head.appendChild(style);
                }
            });
        });
    });
    const heroInit = () => {
        initParticles();
        const heroContent = document.querySelector(".hero-content");
        if (heroContent) {
            let ticking = false;
            let xAxis = 0;
            let yAxis = 0;
            let rafId = null;
            const updateTransform = () => {
                heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
                ticking = false;
            };
            heroContent.addEventListener("mousemove", (e) => {
                xAxis = (window.innerWidth / 2 - e.pageX) / 35;
                yAxis = (window.innerHeight / 2 - e.pageY) / 35;
                if (!ticking) {
                    rafId = requestAnimationFrame(updateTransform);
                    ticking = true;
                }
            });
            heroContent.addEventListener("mouseleave", () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                gsap.to(heroContent, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        }
        document.querySelectorAll(".nav-bubble").forEach((bubble) => {
            bubble.addEventListener("mouseenter", () => {
                gsap.to(bubble, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
            bubble.addEventListener("mouseleave", () => {
                gsap.to(bubble, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });
        document.querySelectorAll(".social-icon-hero").forEach((icon) => {
            icon.addEventListener("mouseenter", () => {
                gsap.to(icon, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
            icon.addEventListener("mouseleave", () => {
                gsap.to(icon, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });
    };
    const initParticles = () => {
        const particleContainer = document.querySelector(".particle-container");
        if (!particleContainer) return;
        particleContainer.innerHTML = "";
        const particleCount = window.innerWidth < 768 ? 50 : 100;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            const colors = [
                "var(--primary-color)",
                "var(--secondary-color)",
                "var(--accent-color)",
                "rgba(255, 255, 255, 0.8)",
            ];
            particle.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `float ${duration}s ${delay}s infinite alternate ease-in-out`;
            particleContainer.appendChild(particle);
        }
    };
    const initCosmicLogo = () => {
        const logo = document.getElementById("hero-logo");
        if (!logo) return;
        const orbitalContainer = document.createElement("div");
        orbitalContainer.className = "orbital-container";
        logo.parentNode.insertBefore(orbitalContainer, logo);
        for (let i = 0; i < 3; i++) {
            const orbital = document.createElement("div");
            orbital.className = `orbital-ring orbital-${i}`;
            orbitalContainer.appendChild(orbital);
            for (let j = 0; j < 8; j++) {
                const particle = document.createElement("div");
                particle.className = "orbital-particle";
                const angle = (j / 8) * Math.PI * 2;
                particle.style.animationDelay = `${j * 0.5}s`;
                const hue = (i * 30 + j * 15) % 360;
                particle.style.backgroundColor = `hsla(${hue}, 70%, 60%, 0.8)`;
                orbital.appendChild(particle);
            }
        }
        const style = document.createElement("style");
        style.textContent = `
            .orbital-container {
                position: absolute;
                width: 200px;
                height: 200px;
                pointer-events: none;
                transform-style: preserve-3d;
                z-index: 4;
            }
            .orbital-ring {
                position: absolute;
                border-radius: 50%;
                border: 1px solid rgba(255, 255, 255, 0.1);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: rotateOrbit 20s linear infinite;
            }
            .orbital-0 {
                width: 180px;
                height: 180px;
                animation-duration: 20s;
                transform: translate(-50%, -50%) rotateX(60deg);
            }
            .orbital-1 {
                width: 220px;
                height: 220px;
                animation-duration: 25s;
                transform: translate(-50%, -50%) rotateX(30deg) rotateY(30deg);
            }
            .orbital-2 {
                width: 260px;
                height: 260px;
                animation-duration: 30s;
                transform: translate(-50%, -50%) rotateX(-20deg) rotateY(60deg);
            }
            .orbital-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.8);
                filter: blur(1px);
                box-shadow: 0 0 10px currentColor;
                animation: orbitRotate 10s linear infinite, particlePulse 3s ease-in-out infinite alternate;
            }
            @keyframes rotateOrbit {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
            @keyframes orbitRotate {
                0% { transform: rotate(0deg) translateX(calc(var(--orbital-size, 90px) - 3px)) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(calc(var(--orbital-size, 90px) - 3px)) rotate(-360deg); }
            }
            @keyframes particlePulse {
                0% { transform: scale(0.8); opacity: 0.5; }
                100% { transform: scale(1.2); opacity: 1; }
            }
            .orbital-0 .orbital-particle { --orbital-size: 90px; }
            .orbital-1 .orbital-particle { --orbital-size: 110px; }
            .orbital-2 .orbital-particle { --orbital-size: 130px; }
        `;
        document.head.appendChild(style);
    };
    const enhanceBubbleNavigation = () => {
        const bubbles = document.querySelectorAll(".nav-bubble");
        const cosmicBubblesContainer = document.querySelector(
            ".cosmic-bubbles"
        );
        if (!bubbles.length || !cosmicBubblesContainer) return;
        cosmicBubblesContainer.addEventListener("mousemove", (e) => {
            const containerRect = cosmicBubblesContainer.getBoundingClientRect();
            const containerX = containerRect.left + containerRect.width / 2;
            const containerY = containerRect.top + containerRect.height / 2;
            bubbles.forEach((bubble) => {
                const bubbleRect = bubble.getBoundingClientRect();
                const bubbleX = bubbleRect.left + bubbleRect.width / 2;
                const bubbleY = bubbleRect.top + bubbleRect.height / 2;
                const distX = e.clientX - bubbleX;
                const distY = e.clientY - bubbleY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                if (distance < 100) {
                    const translateX = distX / 8;
                    const translateY = distY / 8;
                    const scale = 1 + (100 - distance) / 200;
                    bubble.style.transform =
                        bubble.style.transform.replace(
                            /translate3d\([^)]+\)/,
                            ""
                        ) +
                        ` translate3d(${translateX}px, ${translateY}px, 20px) scale(${scale})`;
                    bubble.style.transition = "transform 0.2s ease-out";
                    bubble.style.zIndex = "15";
                    bubble.style.boxShadow = `0 5px 15px rgba(0, 0, 0, 0.2), 
                                            inset 0 0 15px rgba(255, 255, 255, 0.3),
                                            0 0 ${
                                                (100 - distance) / 2
                                            }px var(--accent-color)`;
                } else {
                    bubble.style.transition =
                        "transform 0.5s ease-out, box-shadow 0.5s ease-out";
                    bubble.style.zIndex = "10";
                    bubble.style.boxShadow = `0 5px 15px rgba(0, 0, 0, 0.2), 
                                            inset 0 0 15px rgba(255, 255, 255, 0.3)`;
                }
            });
        });
        cosmicBubblesContainer.addEventListener("mouseleave", () => {
            bubbles.forEach((bubble) => {
                bubble.style.transition =
                    "transform 0.5s ease-out, box-shadow 0.5s ease-out";
                bubble.style.boxShadow = `0 5px 15px rgba(0, 0, 0, 0.2), 
                                        inset 0 0 15px rgba(255, 255, 255, 0.3)`;
                bubble.style.zIndex = "10";
            });
        });
        bubbles.forEach((bubble) => {
            bubble.addEventListener("click", (e) => {
                const ripple = document.createElement("div");
                ripple.className = "bubble-ripple";
                bubble.appendChild(ripple);
                setTimeout(() => {
                    ripple.remove();
                }, 1000);
                const audio = new Audio();
                audio.src =
                    "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwMD4+Pj4+PkxMTExMTFpaWlpaWhoaGhoaHZ2dnZ2doSEhISEhJKSkpKSkqCgoKCgoK6urq6urrKysrKysr6+vr6+vsLCwsLCwtLS0tLS0tra2tra2Tk5OTk5PDw8PDw8P7+/v7+/v////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAA//tAxAAAAAABPAAAACAAAP4AAAAETEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
                audio.volume = 0.4;
                audio.play().catch((e) => console.log("Audio play failed:", e));
            });
        });
        const style = document.createElement("style");
        style.textContent = `
            .bubble-ripple {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                animation: bubbleRipple 1s ease-out forwards;
                z-index: 0;
            }
            @keyframes bubbleRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.8;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };
    document.addEventListener("DOMContentLoaded", () => {
        heroInit();
        initCosmicLogo();
        enhanceBubbleNavigation();
        gsap.from(".hero-content", {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: "power3.out",
        });
        gsap.from(".nav-bubble", {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.5,
        });
        gsap.from(".social-icon-hero", {
            opacity: 0,
            y: 30,
            rotationY: 90,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 1,
        });
        gsap.from(".pulse-btn", {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            delay: 1.5,
        });
    });
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setVhVariable();
    window.addEventListener("resize", () => {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(() => {
            setVhVariable();
        }, 250);
    });
    window.addEventListener("orientationchange", () => {
        setTimeout(setVhVariable, 100);
    });
    document.addEventListener("DOMContentLoaded", function () {
        const menuLinks = document.querySelectorAll("#slide-menu a");
        const navToggle = document.getElementById("nav-toggle");
        const slideMenu = document.getElementById("slide-menu");
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    slideMenu.classList.remove("active");
                    navToggle.classList.remove("active");
                }
            });
        });
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add("touch-device");
        }
        const lazyImages = document.querySelectorAll("img[data-src]");
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            if (img.dataset.srcset) {
                                img.srcset = img.dataset.srcset;
                            }
                            img.removeAttribute("data-src");
                            img.removeAttribute("data-srcset");
                            imageObserver.unobserve(img);
                        }
                    });
                }
            );
            lazyImages.forEach((img) => {
                imageObserver.observe(img);
            });
        } else {
            lazyImages.forEach((img) => {
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                img.removeAttribute("data-src");
                img.removeAttribute("data-srcset");
            });
        }
        const videoContainers = document.querySelectorAll(".video-container");
        videoContainers.forEach((container) => {
            const iframe = container.querySelector("iframe");
            if (iframe) {
                const ratio = (iframe.height / iframe.width) * 100;
                container.style.paddingTop = ratio + "%";
            }
        });
    });
    const enhanceMobileForms = () => {
        const inputs = document.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            input.addEventListener("focus", () => {
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        input.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                    }, 300);
                }
            });
            input.addEventListener("blur", () => {
                if (input.value.trim() !== "") {
                    input.classList.add("has-content");
                } else {
                    input.classList.remove("has-content");
                }
            });
        });
    };
    document.addEventListener("DOMContentLoaded", enhanceMobileForms);
    document.addEventListener("DOMContentLoaded", () => {
        if ("loading" in HTMLImageElement.prototype) {
            const lazyElements = document.querySelectorAll("img, iframe");
            lazyElements.forEach((el) => {
                if (el.dataset.src) {
                    el.src = el.dataset.src;
                    el.removeAttribute("data-src");
                }
                el.loading = "lazy";
            });
        }
    });
    const adjustFontSize = () => {
        const bodyWidth = document.body.clientWidth;
        if (bodyWidth < 768) {
            const baseFontSize = Math.max(14, Math.min(16, bodyWidth * 0.04));
            document.documentElement.style.fontSize = `${baseFontSize}px`;
        } else {
            document.documentElement.style.fontSize = "";
        }
    };
    window.addEventListener("resize", adjustFontSize);
    adjustFontSize();
    
    document.addEventListener("DOMContentLoaded", function () {
        // Chatbot code has been moved to chatbot.js
        // Other non-chatbot related initialization code can remain here
    });
    
    function enhancePremiumSections() {
        const particleContainer = document.querySelector(".particle-container");
        if (particleContainer) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement("div");
                particle.className = "cosmic-particle";
                particle.style.width = `${Math.random() * 3 + 1}px`;
                particle.style.height = particle.style.width;
                particle.style.opacity = Math.random() * 0.5 + 0.2;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${
                    Math.random() * 10 + 10
                }s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particleContainer.appendChild(particle);
            }
        }
        const aboutSection = document.querySelector(".about-section");
        if (aboutSection) {
            const floatingElements = ["✦", "✧", "⋆", "✴", "✺", "✹"];
            const container = aboutSection.querySelector(".container");
            for (let i = 0; i < 12; i++) {
                const floatingEl = document.createElement("span");
                floatingEl.className = "floating-element";
                floatingEl.textContent =
                    floatingElements[
                        Math.floor(Math.random() * floatingElements.length)
                    ];
                floatingEl.style.left = `${Math.random() * 100}%`;
                floatingEl.style.top = `${Math.random() * 100}%`;
                floatingEl.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
                floatingEl.style.animationDuration = `${
                    Math.random() * 15 + 10
                }s`;
                floatingEl.style.animationDelay = `${Math.random() * 5}s`;
                floatingEl.style.opacity = Math.random() * 0.3 + 0.1;
                floatingEl.style.color = `rgba(${Math.floor(
                    Math.random() * 100
                )}, 0, ${Math.floor(Math.random() * 255 + 100)}, 0.5)`;
                container.appendChild(floatingEl);
            }
        }
        const eduSection = document.getElementById("education");
        if (eduSection) {
            const rows = eduSection.querySelectorAll("tr");
            rows.forEach((row) => {
                row.addEventListener("mouseenter", () => {
                    gsap.to(row, {
                        backgroundColor: "rgba(98, 0, 234, 0.05)",
                        boxShadow: "0 0 20px rgba(98, 0, 234, 0.2)",
                        scale: 1.02,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });
                row.addEventListener("mouseleave", () => {
                    gsap.to(row, {
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        boxShadow: "0 0 0px rgba(98, 0, 234, 0)",
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });
            });
            if (typeof ScrollTrigger !== "undefined") {
                gsap.from(eduSection.querySelector("table"), {
                    scrollTrigger: {
                        trigger: eduSection,
                        start: "top 80%",
                        end: "top 30%",
                        toggleActions: "play none none none",
                    },
                    y: 50,
                    opacity: 0,
                    rotationX: 15,
                    duration: 1.2,
                    ease: "power3.out",
                });
            }
        }
    }
    function enhanceHeroInteraction() {
        const heroContent = document.querySelector(".hero-content");
        const heroLogo = document.getElementById("hero-logo");
        const heroHeading = document.querySelector(".hero h1");
        const heroSubheading = document.querySelector(".hero h2");
        if (heroContent) {
            const depths = {
                content: 10,
                logo: 30,
                heading: 20,
                subheading: 15,
            };
            document
                .querySelector(".hero")
                .addEventListener("mousemove", (e) => {
                    const xPos = (window.innerWidth / 2 - e.clientX) / 25;
                    const yPos = (window.innerHeight / 2 - e.clientY) / 25;
                    gsap.to(heroContent, {
                        rotationY: xPos / depths.content,
                        rotationX: -yPos / depths.content,
                        transformPerspective: 1000,
                        duration: 0.8,
                        ease: "power1.out",
                    });
                    if (heroLogo) {
                        gsap.to(heroLogo, {
                            x: -xPos * 2,
                            y: -yPos * 2,
                            duration: 0.8,
                            ease: "power1.out",
                        });
                    }
                    if (heroHeading) {
                        gsap.to(heroHeading, {
                            x: -xPos,
                            y: -yPos,
                            duration: 0.8,
                            ease: "power1.out",
                        });
                    }
                    if (heroSubheading) {
                        gsap.to(heroSubheading, {
                            x: -xPos * 0.5,
                            y: -yPos * 0.5,
                            duration: 0.8,
                            ease: "power1.out",
                        });
                    }
                });
            document
                .querySelector(".hero")
                .addEventListener("mouseleave", () => {
                    gsap.to(
                        [heroContent, heroLogo, heroHeading, heroSubheading],
                        {
                            rotationY: 0,
                            rotationX: 0,
                            x: 0,
                            y: 0,
                            duration: 1.2,
                            ease: "elastic.out(1, 0.5)",
                        }
                    );
                });
        }
    }
    function enhanceAboutTextAnimation() {
        const aboutText = document.querySelector(
            ".about-section .responsive-text"
        );
        if (aboutText && typeof ScrollTrigger !== "undefined") {
            const text = aboutText.innerHTML;
            const words = text.split(" ");
            aboutText.innerHTML = words
                .map((word) => `<span class="animated-word">${word}</span>`)
                .join(" ");
            const animatedWords = document.querySelectorAll(".animated-word");
            gsap.from(animatedWords, {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 1,
                    toggleActions: "play none none none",
                },
                opacity: 0.2,
                y: 10,
                rotationZ: 1,
                stagger: 0.01,
                ease: "power1.out",
            });
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        enhancePremiumSections();
        enhanceHeroInteraction();
        enhanceAboutTextAnimation();
        enhanceCertificationsSection();
        initAboutTyping();
        initCounters();
        enhanceContactForm();
        enhanceFooter();
        const style = document.createElement("style");
        style.textContent = `
            .cosmic-particle {
                position: absolute;
                background: white;
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(120, 0, 255, 0.8);
                animation: floatParticle linear infinite;
                z-index: 1;
            }
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(50px, -30px) rotate(90deg);
                }
                50% {
                    transform: translate(0, -60px) rotate(180deg);
                }
                75% {
                    transform: translate(-50px, -30px) rotate(270deg);
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                }
            }
            .floating-element {
                position: absolute;
                animation: floatEffect ease-in-out infinite alternate;
                z-index: 1;
                pointer-events: none;
            }
            @keyframes floatEffect {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                100% {
                    transform: translate(10px, -10px) rotate(5deg);
                }
            }
            .about-section {
                position: relative;
            }
            .animated-word {
                display: inline-block;
                transition: all 0.3s ease;
            }
            .animated-word:hover {
                color: #6200ea;
                transform: translateY(-2px);
                text-shadow: 0 2px 4px rgba(98, 0, 234, 0.3);
            }
        `;
        document.head.appendChild(style);
    });
    document.addEventListener("DOMContentLoaded", function () {
        initAboutTyping();
        initCounters();
        enhanceContactForm();
    });
    function initAboutTyping() {
        const typingContainer = document.querySelector(
            ".typing-container .typed-text"
        );
        if (!typingContainer) return;
        const roles = [
            "Full Stack Developer",
            "AI Specialist",
            "Game Developer",
            "UI/UX Designer",
            "Problem Solver",
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 150;
        let erasingDelay = 75;
        let newTextDelay = 2000; 
        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingContainer.textContent = currentRole.substring(
                    0,
                    charIndex - 1
                );
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                typingContainer.textContent = currentRole.substring(
                    0,
                    charIndex + 1
                );
                charIndex++;
                typingDelay = 150;
            }
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = newTextDelay;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500;
            }
            setTimeout(type, typingDelay);
        }
        setTimeout(type, newTextDelay);
    }
    function initCounters() {
        const counters = document.querySelectorAll(".counter-number");
        if (!counters.length) return;
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(
                        target.getAttribute("data-count")
                    );
                    let currentValue = 0;
                    const increment = Math.ceil(finalValue / 50); 
                    const updateCounter = () => {
                        if (currentValue < finalValue) {
                            currentValue += increment;
                            if (currentValue > finalValue) {
                                currentValue = finalValue;
                            }
                            target.textContent = currentValue;
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(target);
                }
            });
        }, options);
        counters.forEach((counter) => {
            observer.observe(counter);
        });
    }
    function enhanceContactForm() {
        const contactForm = document.getElementById("contact-form");
        const formSuccess = document.getElementById("form-success");
        const formError = document.getElementById("form-error");
        if (!contactForm) return;
        const resetFormStatus = () => {
            if (formSuccess) formSuccess.classList.add("hidden");
            if (formError) formError.classList.add("hidden");
        };
        const showFormSuccess = () => {
            resetFormStatus();
            if (formSuccess) {
                formSuccess.classList.remove("hidden");
                setTimeout(() => {
                    formSuccess.classList.add("hidden");
                }, 5000);
            }
        };
        const showFormError = () => {
            resetFormStatus();
            if (formError) {
                formError.classList.remove("hidden");
                setTimeout(() => {
                    formError.classList.add("hidden");
                }, 5000);
            }
        };
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML =
                '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-circle-notch fa-spin"></i></span>';
            submitButton.disabled = true;
            emailjs
                .sendForm("service_0ietc2e", "template_jihmbkn", contactForm)
                .then((response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    showFormSuccess();
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                })
                .catch((error) => {
                    console.error("FAILED...", error);
                    showFormError();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
        });
        const formInputs = contactForm.querySelectorAll("input, textarea");
        formInputs.forEach((input) => {
            input.addEventListener("focus", () => {
                input.parentElement.classList.add("focused");
            });
            input.addEventListener("blur", () => {
                if (input.value.trim() === "") {
                    input.parentElement.classList.remove("focused");
                }
            });
            if (input.value.trim() !== "") {
                input.parentElement.classList.add("focused");
            }
        });
    }
    function enhanceFooter() {
        const currentYearElement = document.getElementById("current-year");
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
        const footerScrollTop = document.getElementById("footer-scroll-top");
        if (footerScrollTop) {
            footerScrollTop.addEventListener("click", () => {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: 0,
                    ease: "power3.inOut",
                });
                const rocket = footerScrollTop.querySelector("i");
                if (rocket) {
                    gsap.to(rocket, {
                        y: -15,
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            gsap.to(rocket, {
                                y: 0,
                                opacity: 1,
                                duration: 0.5,
                                delay: 0.5,
                            });
                        },
                    });
                }
            });
        }
        const footerSections = document.querySelectorAll(".footer-section");
        footerSections.forEach((section) => {
            section.addEventListener("mouseenter", () => {
                gsap.to(section, {
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    duration: 0.3,
                });
            });
            section.addEventListener("mouseleave", () => {
                gsap.to(section, {
                    y: 0,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    duration: 0.3,
                });
            });
        });
        addFooterParticles();
    }
    function addFooterParticles() {
        const footerParticles = document.querySelector(".footer-particles");
        if (!footerParticles) return;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div");
            particle.classList.add("footer-particle");
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            footerParticles.appendChild(particle);
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        enhanceFooter();
    });
    document.addEventListener("DOMContentLoaded", function () {
        const style = document.createElement("style");
        style.textContent = `
            .footer-particle {
                position: absolute;
                background: rgba(161, 155, 246, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: floatingParticle linear infinite;
            }
            @keyframes floatingParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                20% {
                    opacity: 0.8;
                }
                80% {
                    opacity: 0.8;
                }
                100% {
                    transform: translate(${Math.random() > 0.5 ? "" : "-"}${
            Math.random() * 100 + 50
        }px, ${Math.random() > 0.5 ? "" : "-"}${
            Math.random() * 100 + 50
        }px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    });
    function enhanceCertificationsSection() {
        const certParticles = document.querySelector(
            ".certifications-particles"
        );
        if (certParticles) {
            certParticles.innerHTML = "";
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement("div");
                particle.classList.add("particle");
                const size = Math.random() * 5 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                const hue = Math.random() * 30 - 15; 
                particle.style.backgroundColor = `hsla(${
                    240 + hue
                }, 80%, 75%, ${Math.random() * 0.5 + 0.3})`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particle.style.animationDuration = `${
                    Math.random() * 10 + 10
                }s`;
                certParticles.appendChild(particle);
            }
        }
        const filterButtons = document.querySelectorAll(".filter-btn");
        const certificateCards = document.querySelectorAll(".certificate-card");
        if (filterButtons.length && certificateCards.length) {
            certificateCards.forEach(card => {
                card.style.opacity = "1";
                card.style.transform = "none";
            });
            filterButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const currentActive = document.querySelector(
                        ".filter-btn.active"
                    );
                    if (currentActive !== button) {
                        gsap.to(currentActive, {
                            scale: 0.95,
                            duration: 0.2,
                            onComplete: () => {
                                currentActive.classList.remove("active");
                                gsap.to(currentActive, {
                                    scale: 1,
                                    duration: 0.2,
                                });
                            },
                        });
                        gsap.to(button, {
                            scale: 1.05,
                            duration: 0.2,
                            onComplete: () => {
                                button.classList.add("active");
                                gsap.to(button, {
                                    scale: 1,
                                    duration: 0.2,
                                });
                            },
                        });
                    }
                    const filter = button.getAttribute("data-filter");
                    let visibleCount = 0;
                    certificateCards.forEach((card, index) => {
                        const category = card.getAttribute("data-category");
                        if (filter === "all" || filter === category) {
                            visibleCount++;
                            if (card.style.display === "none") {
                                card.style.display = "block";
                                card.style.opacity = "0";
                                card.style.transform =
                                    "scale(0.8) translateY(20px)";
                                gsap.to(card, {
                                    scale: 1,
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    delay: index * 0.05,
                                    ease: "back.out(1.7)",
                                    clearProps: "all",
                                    onStart: () => {
                                        const highlight = document.createElement(
                                            "div"
                                        );
                                        highlight.classList.add(
                                            "card-highlight"
                                        );
                                        highlight.style.position = "absolute";
                                        highlight.style.inset = "0";
                                        highlight.style.borderRadius = "20px";
                                        highlight.style.boxShadow =
                                            "0 0 20px 5px rgba(161, 155, 246, 0.3)";
                                        highlight.style.zIndex = "-1";
                                        highlight.style.opacity = "0";
                                        card.appendChild(highlight);
                                        gsap.to(highlight, {
                                            opacity: 1,
                                            duration: 0.3,
                                            onComplete: () => {
                                                gsap.to(highlight, {
                                                    opacity: 0,
                                                    duration: 0.5,
                                                    delay: 0.2,
                                                    onComplete: () => {
                                                        highlight.remove();
                                                    },
                                                });
                                            },
                                        });
                                    },
                                });
                            }
                        } else {
                            gsap.to(card, {
                                scale: 0.8,
                                opacity: 0,
                                y: 20,
                                duration: 0.4,
                                ease: "power2.in",
                                onComplete: () => {
                                    card.style.display = "none";
                                },
                            });
                        }
                    });
                    if (visibleCount <= 3) {
                        gsap.to(".certificates-wrapper", {
                            height: "auto",
                            duration: 0.5,
                            ease: "power2.out",
                        });
                    }
                });
            });
        }
        const modal = document.getElementById("certificate-modal");
        const modalTitle = document.getElementById("certificate-modal-title");
        const modalDate = document.getElementById("certificate-modal-date");
        const certificateImage = document.getElementById("certificate-image");
        const downloadBtn = document.getElementById("download-certificate");
        const verifyBtn = document.getElementById("verify-certificate");
        const viewCertButtons = document.querySelectorAll(".view-cert-btn");
        if (viewCertButtons.length) {
            viewCertButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const card = button.closest(".certificate-card");
                    openCertificateModal(card);
                    const ripple = document.createElement("span");
                    ripple.classList.add("ripple");
                    button.appendChild(ripple);
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = `${size}px`;
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }
        certificateCards.forEach((card) => {
            let startX, startY;
            card.addEventListener("mousedown", (e) => {
                startX = e.clientX;
                startY = e.clientY;
            });
            card.addEventListener("click", (event) => {
                const moveX = Math.abs(event.clientX - startX);
                const moveY = Math.abs(event.clientY - startY);
                if (moveX > 5 || moveY > 5) return;
                if (event.target.classList.contains("verify-btn")) {
                    return;
                }
                if (
                    !card.querySelector(".certificate-inner").style.transform ||
                    card
                        .querySelector(".certificate-inner")
                        .style.transform.includes("0deg")
                ) {
                    gsap.to(card.querySelector(".certificate-inner"), {
                        rotationY: 180,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    });
                } else {
                    openCertificateModal(card);
                }
            });
        });
        function openCertificateModal(card) {
            const title = card.getAttribute("data-title");
            const imgSrc = card.getAttribute("data-img");
            const dateElement = card.querySelector(".cert-date");
            const date = dateElement
                ? dateElement.textContent.replace(/.*:\s*/, "")
                : "";
            modalTitle.textContent = title;
            modalDate.textContent = `Issued: ${date}`;
            const preloadImage = new Image();
            preloadImage.src = imgSrc;
            certificateImage.style.opacity = "0";
            const loader = document.createElement("div");
            loader.classList.add("cert-loader");
            loader.innerHTML = `
                <div class="spinner"></div>
                <p>Loading certificate...</p>
            `;
            certificateImage.parentNode.appendChild(loader);
            preloadImage.onload = () => {
                certificateImage.src = imgSrc;
                setTimeout(() => {
                    loader.remove();
                    gsap.to(certificateImage, {
                        opacity: 1,
                        duration: 0.5,
                    });
                }, 500); 
            };
            downloadBtn.setAttribute("href", imgSrc);
            downloadBtn.setAttribute("download", `Certificate - ${title}.png`);
            verifyBtn.setAttribute("href", "#"); 
            modal.style.display = "flex";
            gsap.fromTo(
                ".certificate-modal-content",
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.9,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                }
            );
        }
        const closeBtn = modal.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => {
            closeModalWithAnimation();
        });
        
        // Add verification functionality
        verifyBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const certificateTitle = modalTitle.textContent;
            showToast(`Verifying certificate: "${certificateTitle}"... Certificate is valid and authenticated.`);
        });
        
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModalWithAnimation();
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.style.display === "flex") {
                closeModalWithAnimation();
            }
        });
        function closeModalWithAnimation() {
            gsap.to(".certificate-modal-content", {
                y: 50,
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    modal.style.display = "none";
                    setTimeout(() => {
                        certificateImage.src = "";
                        certificateImage.style.opacity = "0";
                    }, 300);
                },
            });
        }
    }
    function initEducationParticles() {
        const particlesContainer = document.querySelector(
            ".education-particles"
        );
        if (!particlesContainer) return;
        const particleCount = 15;
        const colors = ["#a29bfe", "#81ecec", "#ff7675", "#74b9ff"];
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "floating-particle";
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 15 + 15;
            const delay = Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particlesContainer.appendChild(particle);
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        initEducationParticles();
    });
    function enhanceTrainingsSection() {
        const trainingCards = document.querySelectorAll(".training-card");
        const filterBtns = document.querySelectorAll(
            ".trainings-filter .filter-btn"
        );
        trainingCards.forEach((card) => {
            const category = card.getAttribute("data-category");
            if (category) {
                const badge = document.createElement("div");
                badge.className = "category-badge";
                badge.textContent =
                    category.charAt(0).toUpperCase() + category.slice(1);
                card.appendChild(badge);
                const isNew = Math.random() > 0.8; 
                if (isNew) {
                    card.classList.add("new");
                }
                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty("--x", `${x}%`);
                    card.style.setProperty("--y", `${y}%`);
                });
                card.addEventListener("mouseleave", () => {
                    card.style.setProperty("--x", "50%");
                    card.style.setProperty("--y", "50%");
                });
            }
        });
        if (filterBtns.length > 0) {
            filterBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    filterBtns.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                    const filter = btn.getAttribute("data-filter");
                    trainingCards.forEach((card) => {
                        if (
                            filter === "all" ||
                            card.getAttribute("data-category") === filter
                        ) {
                            card.style.display = "flex";
                            setTimeout(() => {
                                card.style.opacity = "1";
                                card.style.transform = "";
                            }, Math.random() * 300);
                        } else {
                            card.style.opacity = "0";
                            card.style.transform = "scale(0.8)";
                            setTimeout(() => {
                                card.style.display = "none";
                            }, 300);
                        }
                    });
                });
            });
        }
        trainingCards.forEach((card) => {
            const icon = card.querySelector(".training-icon");
            if (icon) {
                card.addEventListener("mouseenter", () => {
                    icon.style.animationPlayState = "running";
                });
                card.addEventListener("mouseleave", () => {
                    setTimeout(() => {
                        icon.style.animationPlayState = "paused";
                    }, 1000);
                });
            }
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
        initEducationParticles();
        enhanceTrainingsSection();
    });
    function enhanceActivitiesSection() {
        const activityCards = document.querySelectorAll(".activity-card");
        const tabBtns = document.querySelectorAll(".activities-tabs .tab-btn");
        const tabContents = document.querySelectorAll(".tab-content");
        activityCards.forEach((card) => {
            const isNew = Math.random() > 0.85;
            if (isNew) {
                card.classList.add("new");
            }
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty("--x", `${x}%`);
                card.style.setProperty("--y", `${y}%`);
            });
            card.addEventListener("mouseleave", () => {
                card.style.setProperty("--x", "50%");
                card.style.setProperty("--y", "50%");
            });
        });
        if (tabBtns.length > 0) {
            tabBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    tabBtns.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                    const tabId = btn.getAttribute("data-tab");
                    tabContents.forEach((content) => {
                        content.classList.remove("active");
                        if (content.id === tabId) {
                            const tabCards = content.querySelectorAll(
                                ".activity-card"
                            );
                            content.classList.add("active");
                            tabCards.forEach((card, index) => {
                                card.style.opacity = "0";
                                card.style.transform = "translateY(20px)";
                                setTimeout(() => {
                                    card.style.opacity = "1";
                                    card.style.transform = "translateY(0)";
                                }, 100 + index * 50);
                            });
                        }
                    });
                });
            });
        }
        const activitiesSection = document.querySelector(".activities-section");
        if (activitiesSection) {
            window.addEventListener("scroll", () => {
                const rect = activitiesSection.getBoundingClientRect();
                const isVisible =
                    rect.top <= window.innerHeight * 0.5 &&
                    rect.bottom >= window.innerHeight * 0.5;
                if (isVisible) {
                    activityCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("animated");
                        }, index * 100);
                    });
                }
            });
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        initEducationParticles();
        enhanceTrainingsSection();
        enhanceActivitiesSection();
    });
    document.addEventListener("DOMContentLoaded", function () {
        const galleryItems = document.querySelectorAll(".gallery-item");
        const galleryLightbox = document.querySelector(
            ".gallery-lightbox-modal"
        );
        const galleryModalImg = document.getElementById("gallery-modal-img");
        const galleryCaption = document.getElementById("gallery-caption-title");
        const galleryClose = document.querySelector(".gallery-close");
        const galleryPrev = document.getElementById("gallery-prev");
        const galleryNext = document.getElementById("gallery-next");
        const galleryFilters = document.querySelectorAll(".gallery-filter");
        let currentIndex = 0;
        let filteredItems = [...galleryItems];
        galleryItems.forEach((item, index) => {
            const lightboxLink = item.querySelector(".gallery-lightbox");
            if (lightboxLink) {
                lightboxLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    const imgSrc = this.getAttribute("href");
                    const imgTitle = this.getAttribute("data-title");
                    openLightbox(imgSrc, imgTitle, index);
                });
            }
            item.addEventListener("mouseenter", function () {
                setTimeout(() => {
                    this.classList.add("hover");
                }, 50);
            });
            item.addEventListener("mouseleave", function () {
                this.classList.remove("hover");
            });
        });
        function openLightbox(src, title, index) {
            galleryModalImg.src = src;
            galleryCaption.textContent = title;
            currentIndex = index;
            galleryLightbox.style.display = "block";
            setTimeout(() => {
                galleryLightbox.style.opacity = "1";
            }, 50);
            document.body.style.overflow = "hidden";
        }
        function closeLightbox() {
            galleryLightbox.style.opacity = "0";
            setTimeout(() => {
                galleryLightbox.style.display = "none";
                galleryModalImg.src = "";
            }, 300);
            document.body.style.overflow = "";
        }
        function showPrevImage() {
            currentIndex =
                currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
            const prevItem = filteredItems[currentIndex];
            const prevLink = prevItem.querySelector(".gallery-lightbox");
            if (prevLink) {
                const imgSrc = prevLink.getAttribute("href");
                const imgTitle = prevLink.getAttribute("data-title");
                galleryModalImg.style.opacity = "0";
                galleryCaption.style.opacity = "0";
                setTimeout(() => {
                    galleryModalImg.src = imgSrc;
                    galleryCaption.textContent = imgTitle;
                    galleryModalImg.style.opacity = "1";
                    galleryCaption.style.opacity = "1";
                }, 200);
            }
        }
        function showNextImage() {
            currentIndex =
                currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
            const nextItem = filteredItems[currentIndex];
            const nextLink = nextItem.querySelector(".gallery-lightbox");
            if (nextLink) {
                const imgSrc = nextLink.getAttribute("href");
                const imgTitle = nextLink.getAttribute("data-title");
                galleryModalImg.style.opacity = "0";
                galleryCaption.style.opacity = "0";
                setTimeout(() => {
                    galleryModalImg.src = imgSrc;
                    galleryCaption.textContent = imgTitle;
                    galleryModalImg.style.opacity = "1";
                    galleryCaption.style.opacity = "1";
                }, 200);
            }
        }
        galleryFilters.forEach((filter) => {
            filter.addEventListener("click", function () {
                galleryFilters.forEach((btn) => btn.classList.remove("active"));
                this.classList.add("active");
                const filterValue = this.getAttribute("data-filter");
                filteredItems = [...galleryItems].filter((item) => {
                    if (filterValue === "all") {
                        item.style.display = "block";
                        return true;
                    } else {
                        const itemCategory = item.getAttribute("data-category");
                        if (itemCategory === filterValue) {
                            item.style.display = "block";
                            return true;
                        } else {
                            item.style.display = "none";
                            return false;
                        }
                    }
                });
                filteredItems.forEach((item, idx) => {
                    item.style.opacity = "0";
                    item.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                    }, idx * 50);
                });
            });
        });
        galleryClose.addEventListener("click", closeLightbox);
        galleryPrev.addEventListener("click", showPrevImage);
        galleryNext.addEventListener("click", showNextImage);
        galleryLightbox.addEventListener("click", function (e) {
            if (e.target === galleryLightbox) {
                closeLightbox();
            }
        });
        document.addEventListener("keydown", function (e) {
            if (galleryLightbox.style.display === "block") {
                if (e.key === "Escape") {
                    closeLightbox();
                } else if (e.key === "ArrowLeft") {
                    showPrevImage();
                } else if (e.key === "ArrowRight") {
                    showNextImage();
                }
            }
        });
    });

    // Enhanced Work Experience Section
    document.addEventListener('DOMContentLoaded', function() {
        // Make sure work experience content is visible
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.opacity = '1';
            item.style.visibility = 'visible';
            
            // Force timeline content to be visible
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
            }
            
            // Make sure card is visible
            const card = item.querySelector('.timeline-card');
            if (card) {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            }
        });
        
        // 3D card effect for work experience cards
        const timelineCards = document.querySelectorAll('.timeline-card');
        
        timelineCards.forEach(card => {
            // Ensure content within cards is visible
            const elements = card.querySelectorAll('*');
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });
            
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 20;
                const deltaY = (y - centerY) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(20px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
        
        // Initialize skill tag animations
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.setProperty('--tag-index', index);
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.style.opacity = '1';
            tag.style.visibility = 'visible';
        });
        
        // Fix any potentially broken animations
        const fixAnimations = () => {
            document.querySelectorAll('.timeline-item').forEach(item => {
                const content = item.querySelector('.timeline-content');
                if (content) {
                    content.style.animationPlayState = 'running';
                }
            });
        };
        
        // Run animation fix on load and scroll
        fixAnimations();
        window.addEventListener('scroll', fixAnimations);
        
        // Animate experience meters on scroll
        const experienceMeters = document.querySelectorAll('.meter-fill');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const meterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const meter = entry.target;
                    try {
                        if (meter.getAttribute('style') && meter.getAttribute('style').includes('width:')) {
                            meter.style.width = meter.getAttribute('style').split('width:')[1].trim();
                        } else {
                            // Default width if not specified
                            meter.style.width = '80%';
                        }
                    } catch (e) {
                        console.error('Error animating meter', e);
                        meter.style.width = '80%';
                    }
                    meterObserver.unobserve(meter);
                }
            });
        }, observerOptions);
        
        experienceMeters.forEach(meter => {
            // Make sure meter is visible
            meter.style.opacity = '1';
            meter.style.visibility = 'visible';
            
            try {
                // Start with 0 width
                const originalWidth = meter.style.width || '80%';
                meter.style.width = '0%';
                // Ensure the meter becomes visible after a short delay
                setTimeout(() => {
                    meterObserver.observe(meter);
                }, 500);
            } catch (e) {
                console.error('Error setting up meter animation', e);
                meter.style.width = '80%';
            }
        });

        // Ensure section is visible
        const workSection = document.querySelector('.work-section');
        if (workSection) {
            workSection.style.visibility = 'visible';
            workSection.style.opacity = '1';
        }
        
        // Rest of the original code...
        // Initialize rotating cubes
        const logoCubes = document.querySelectorAll('.logo-cube');
        
        logoCubes.forEach(cube => {
            // Ensure cube is visible
            cube.style.visibility = 'visible';
            cube.style.opacity = '1';
            
            let rotateX = 0;
            let rotateY = 0;
            let autoRotate = true;
            
            const parent = cube.closest('.timeline-card');
            
            if (parent) {
                parent.addEventListener('mouseenter', () => {
                    autoRotate = false;
                });
                
                parent.addEventListener('mouseleave', () => {
                    autoRotate = true;
                });
            }
            
            // Auto-rotation animation
            function animateCube() {
                if (autoRotate) {
                    rotateX += 0.2;
                    rotateY += 0.3;
                    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
                requestAnimationFrame(animateCube);
            }
            
            animateCube();
        });
        
        // Timeline progress animation
        const workTimeline = document.querySelector('.work-timeline');
        const progressBall = document.querySelector('.progress-ball');
        
        if (workTimeline && progressBall) {
            // Ensure progress ball is visible
            progressBall.style.visibility = 'visible';
            progressBall.style.opacity = '1';
            
            window.addEventListener('scroll', () => {
                const timelineRect = workTimeline.getBoundingClientRect();
                const scrollPercentage = Math.min(
                    Math.max(
                        (window.innerHeight - timelineRect.top) / 
                        (timelineRect.height + window.innerHeight),
                        0
                    ),
                    1
                );
                
                progressBall.style.top = `${scrollPercentage * 100}%`;
            });
        }
        
        // Count up animation for experience summary stats
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // Ensure stats are visible
        statNumbers.forEach(stat => {
            stat.style.visibility = 'visible';
            stat.style.opacity = '1';
        });
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    let targetNumber;
                    try {
                        targetNumber = parseInt(statElement.textContent);
                        if (isNaN(targetNumber)) targetNumber = 10;
                    } catch (e) {
                        targetNumber = 10;
                    }
                    
                    let count = 0;
                    const duration = 2000; // ms
                    const interval = Math.max(10, duration / targetNumber);
                    
                    const timer = setInterval(() => {
                        count += 1;
                        statElement.textContent = count;
                        
                        if (count >= targetNumber) {
                            statElement.textContent = targetNumber + (statElement.textContent.includes('+') ? '+' : '');
                            clearInterval(timer);
                        }
                    }, interval);
                    
                    countObserver.unobserve(statElement);
                }
            });
        }, { threshold: 0.7 });
        
        statNumbers.forEach(stat => {
            countObserver.observe(stat);
        });
    });
})();