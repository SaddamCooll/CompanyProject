/* ==========================================================================
   DEVELOPER PORTFOLIO INTERACTIONS
   Saddam Mansoori | Senior Software Developer & Liferay Specialist
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        // Close mobile menu when nav links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    /* 2. DYNAMIC NAVIGATION TRACKER ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section, header');
    const scrollSpyOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '-80px 0px 0px 0px' // Offset header height
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => spyObserver.observe(section));

    /* 3. REVEAL ANIMATIONS VIA INTERSECTION OBSERVER
       ========================================================================== */
    const animElements = document.querySelectorAll('.animate-reveal');
    
    const revealObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Unobserve once shown to prevent repeated animations while scrolling
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    animElements.forEach(element => revealObserver.observe(element));

    /* 4. INTERACTIVE PROJECT FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Trigger dynamic micro scale-up reveal
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay hiding from display grid
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 300);
                }
            });
        });
    });

    /* 5. INTERACTIVE TERMINAL EMULATOR
       ========================================================================== */
    const terminalBody = document.getElementById('terminalBody');
    const terminalInput = document.getElementById('terminalInput');

    if (terminalBody && terminalInput) {
        
        // Auto focus input on terminal area click
        const terminalWrapper = document.querySelector('.terminal-wrapper');
        terminalWrapper.addEventListener('click', () => {
            terminalInput.focus();
        });

        // Command handler
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandText = terminalInput.value.trim();
                if (commandText !== '') {
                    processCommand(commandText);
                }
                terminalInput.value = '';
            }
        });

        function appendLine(text, isCommand = false, type = '') {
            const line = document.createElement('div');
            line.classList.add('terminal-line');
            
            if (isCommand) {
                line.innerHTML = `<span class="terminal-prompt">saddam@mansoori-dev:~$</span> <span class="cmd-text">${escapeHtml(text)}</span>`;
            } else {
                line.innerHTML = text;
                if (type === 'error') line.classList.add('error-text');
                if (type === 'success') line.classList.add('success-text');
            }
            
            terminalBody.appendChild(line);
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        function escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        function processCommand(rawCmd) {
            const command = rawCmd.toLowerCase().trim();
            appendLine(rawCmd, true);

            switch (command) {
                case 'help':
                    appendLine(`Available Commands:<br>
  - <span class="cmd-text">about</span>      : Print Saddam's summary and background.<br>
  - <span class="cmd-text">skills</span>     : View details about development competencies.<br>
  - <span class="cmd-text">experience</span> : Print professional timeline & key stats.<br>
  - <span class="cmd-text">projects</span>   : Output highlighted project list.<br>
  - <span class="cmd-text">contact</span>    : Print contact options & locations.<br>
  - <span class="cmd-text">clear</span>      : Clear the screen output console.<br>
  - <span class="cmd-text">secret</span>     : Execute Easter Egg developer script.`);
                    break;
                
                case 'about':
                    appendLine(`<strong>Saddam Mansoori</strong> | Software Developer<br>
Passionate enterprise systems engineer specializing in Java & Liferay DXP environments.<br>
Experienced in designing high-availability layouts, configuring core OSGi portal integrations,<br>
speeding up server rendering speeds, and deploying reliable REST API payloads.`);
                    break;
                
                case 'skills':
                    appendLine(`<strong>TECHNICAL SKILLS DIRECTORY:</strong><br>
  - <strong>Backend Core</strong>    : Java, Liferay DXP, OSGi Modules, Service Builder, MVC Portlets<br>
  - <strong>Web Frontends</strong> : JavaScript (ES6+), HTML5, CSS3, JSP Templating<br>
  - <strong>Databases</strong>     : MySQL, PostgreSQL, Oracle SQL Server<br>
  - <strong>Tools / QA</strong>     : GitLab, Gradle, Maven, Jira, Agile Scrum, SEO Tags, A11y (WCAG)`);
                    break;
                
                case 'experience':
                    appendLine(`<strong>PROFESSIONAL HISTORY:</strong><br>
  - <strong>InfoAxon Technology Pvt. Ltd.</strong> (July 2022 - Present)<br>
    * Role: Software Developer<br>
    * Built robust Java portlets and Service Builder configurations.<br>
    * <strong>Key Impact:</strong> Accelerated UI rendering performance by 25-30% via modular caching.<br>
    * <strong>Key Impact:</strong> Reduced manual backend operation audits by 40% with workflow APIs.`);
                    break;
                
                case 'projects':
                    appendLine(`<strong>FEATURED PROJECTS RECORD:</strong><br>
  1. <strong>Hyundai Motors India</strong>  : Built Liferay template fragments boosting page delivery speed by 30%.<br>
  2. <strong>Chola MS Insurance</strong>   : Optimized 1,000+ claim entries per hour workflows with messaging APIs.<br>
  3. <strong>PNB Housing</strong>          : Set up custom MVC portlets and automated OTP-less secure login.`);
                    break;
                
                case 'contact':
                    appendLine(`<strong>CONTACT DETAILS:</strong><br>
  - 📧 Email    : <a href="mailto:saddam.mansoori.dev@gmail.com" class="cmd-text">saddam.mansoori.dev@gmail.com</a><br>
  - 📱 Phone    : +91 9871554300<br>
  - 📍 Location : Delhi, India<br>
  - 📄 Resume   : Downloadable via the floating actions above.`);
                    break;
                
                case 'clear':
                    terminalBody.innerHTML = '';
                    appendLine(`Welcome to Saddam Mansoori's Developer Shell v2.1.0 (zsh).`);
                    appendLine(`Type <span class="cmd-text">help</span> to view available terminal commands and hit Enter.`);
                    break;
                
                case 'secret':
                    appendLine(`☕ Loading coffee modules... [OK]<br>
💥 Analyzing developer productivity...<br>
⚡ Performance Optimization: +30% core speedup.<br>
🏆 Key accomplishment unlocked: "Senior Frontend Portfolio Built!"<br>
🚀 <strong>Thanks for playing! Hire me today!</strong>`, false, 'success');
                    break;
                
                default:
                    appendLine(`zsh: command not found: <span class="error-text">${escapeHtml(rawCmd)}</span>. Type <span class="cmd-text">help</span> for assistance.`, false, 'error');
            }
        }
    }
});
