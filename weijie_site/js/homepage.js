        const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
        const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

        function setActivePanel(panelId, moveFocus) {
            tabButtons.forEach((button) => {
                const isActive = button.dataset.panel === panelId;
                button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                if (isActive && moveFocus) {
                    button.focus();
                }
            });

            panels.forEach((panel) => {
                panel.hidden = panel.id !== panelId;
            });
        }

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => setActivePanel(button.dataset.panel, false));

            button.addEventListener('keydown', (event) => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
                    return;
                }

                event.preventDefault();
                const offset = event.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + offset + tabButtons.length) % tabButtons.length;
                setActivePanel(tabButtons[nextIndex].dataset.panel, true);
            });
        });

        const langTrigger = document.getElementById('langTrigger');
        const langMenu = document.getElementById('langMenu');

        function closeLangMenu() {
            langMenu.classList.remove('open');
            langTrigger.setAttribute('aria-expanded', 'false');
        }

        langTrigger.addEventListener('click', (event) => {
            event.stopPropagation();
            const opened = langMenu.classList.toggle('open');
            langTrigger.setAttribute('aria-expanded', opened ? 'true' : 'false');
        });

        document.addEventListener('click', (event) => {
            if (!langMenu.contains(event.target) && !langTrigger.contains(event.target)) {
                closeLangMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeLangMenu();
            }
        });
