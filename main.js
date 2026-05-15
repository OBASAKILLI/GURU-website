/**
 * GURU - Main Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Active Menu Highlighting
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.querySelector('nav .container').appendChild(mobileToggle);

    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    const navLinksList = document.querySelector('.nav-links');
    
    const toggleMenu = () => {
        navLinksList.classList.toggle('active');
        navOverlay.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinksList.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
            document.body.style.overflow = ''; 
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 4. Guru AI Agent (Chat Widget)
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <button class="chat-btn"><i class="fa-solid fa-robot"></i></button>
        <div class="chat-window">
            <div class="chat-header">
                <div class="status-dot"></div>
                <h4>Guru Lab Agent</h4>
            </div>
            <div class="chat-body">
                <div class="chat-msg bot">Hello! I'm the Guru Lab Agent. How can I help you with AI Labs or Hardware today?</div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your inquiry...">
                <button class="btn btn-primary" style="padding: 8px 12px;"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    const chatBtn = chatWidget.querySelector('.chat-btn');
    const chatWin = chatWidget.querySelector('.chat-window');
    const chatInput = chatWidget.querySelector('input');
    const chatSend = chatWidget.querySelector('.chat-input button');
    const chatBody = chatWidget.querySelector('.chat-body');

    chatBtn.addEventListener('click', () => chatWin.classList.toggle('active'));

    const addMessage = (text, type) => {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${type}`;
        msg.innerText = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleChat = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        chatInput.value = '';
        
        setTimeout(() => {
            let response = "That's a great question. I'll connect you with a research specialist. Can you provide your institutional email?";
            if (text.toLowerCase().includes('gpu') || text.toLowerCase().includes('h100')) {
                response = "Our current lead time for H100 Tensor Core chips is 4-6 weeks. Would you like a bulk quote?";
            } else if (text.toLowerCase().includes('lab')) {
                response = "We design modular labs from 5 to 50 seats. Which department is this for?";
            }
            addMessage(response, 'bot');
        }, 1000);
    };

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleChat(); });

    // 5. Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Form Submission Handling (Prevent Default)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            // Simulate API Call
            setTimeout(() => {
                btn.innerText = 'Inquiry Sent!';
                btn.style.background = '#00c853';
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 5. Interactive Logo Parallax (Subtle)
    const logo = document.querySelector('.logo');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        if (window.scrollY < 200 && logo) {
            logo.style.textShadow = `${x}px ${y}px 10px rgba(0, 242, 255, 0.2)`;
        }
    });

    // 6. Tab Switching (Research Page)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const researchCards = document.querySelectorAll('.research-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.innerText;
            researchCards.forEach(card => {
                const cardCategory = card.querySelector('.category').innerText;
                if (category === 'All Research' || cardCategory.includes(category)) {
                    card.style.display = 'flex';
                    setTimeout(() => card.classList.add('active'), 50);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
        });
    });

    // 7. Dynamic Metrics (Optional cloning for seamlessness)
    const metricsTrack = document.querySelector('.metrics-track');
    if (metricsTrack) {
        const items = metricsTrack.innerHTML;
        metricsTrack.innerHTML = items + items + items; // Triple for safety
    }
});
