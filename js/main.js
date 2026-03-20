document.addEventListener('DOMContentLoaded', () => {
    console.log('Venue Booking Platform JS Loaded');

    // Toggle mobile menu (Placeholder)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar-nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Auth Tab Switching with Glider Animation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authTabsContainers = document.querySelectorAll('.auth-tabs');

    // Initialize Gliders
    authTabsContainers.forEach(container => {
        // Check if glider already exists
        if (!container.querySelector('.glider')) {
            const glider = document.createElement('div');
            glider.classList.add('glider');
            container.appendChild(glider);

            // Initial positioning
            const activeBtn = container.querySelector('.tab-btn.active');
            if (activeBtn) {
                setTimeout(() => {
                    glider.style.width = activeBtn.offsetWidth + 'px';
                    glider.style.left = activeBtn.offsetLeft + 'px';
                }, 50);
            }
        }
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find the parent container
            const parent = btn.closest('.auth-tabs') || btn.closest('.flex');

            // Move Glider if parent is an auth-tabs container
            if (parent && parent.classList.contains('auth-tabs')) {
                const glider = parent.querySelector('.glider');
                if (glider) {
                    glider.style.width = btn.offsetWidth + 'px';
                    glider.style.left = btn.offsetLeft + 'px';
                }
            }

            // Finding sibling buttons
            const siblings = parent ? parent.querySelectorAll('.tab-btn') : tabButtons;

            // Remove active class from sibling buttons
            siblings.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Handle Pane Switching with Animation
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);

            if (targetPane) {
                const paneContainer = targetPane.parentElement;
                const siblingPanes = paneContainer.querySelectorAll('.tab-pane');

                siblingPanes.forEach(p => {
                    if (p !== targetPane) {
                        p.classList.remove('active');
                        p.classList.add('hidden');
                        p.style.display = 'none';
                    }
                });

                // Show target pane
                targetPane.classList.remove('hidden');
                targetPane.style.display = 'block';
                requestAnimationFrame(() => {
                    targetPane.classList.add('active');
                });
            }
        });
    });

    // Window Resize Handler to reset glider position
    window.addEventListener('resize', () => {
        authTabsContainers.forEach(container => {
            const activeBtn = container.querySelector('.tab-btn.active');
            const glider = container.querySelector('.glider');
            if (activeBtn && glider) {
                glider.style.width = activeBtn.offsetWidth + 'px';
                glider.style.left = activeBtn.offsetLeft + 'px';
            }
        });
    });

    // Mock Form Submission removed to allow specific forms to handle their own data

    // Owner Dashboard - Approve/Reject Logic
    const approveBtns = document.querySelectorAll('.js-approve-btn');
    const rejectBtns = document.querySelectorAll('.js-reject-btn');

    approveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const badge = card.querySelector('.badge');
            const actionsDiv = e.target.closest('.flex'); // The div containing buttons

            // Update Badge
            badge.className = 'badge badge-approved';
            badge.textContent = 'Approved';

            // Hide Buttons
            actionsDiv.style.display = 'none';

            alert('Booking Approved!');
        });
    });

    rejectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const badge = card.querySelector('.badge');
            const actionsDiv = e.target.closest('.flex'); // The div containing buttons

            // Update Badge
            badge.className = 'badge badge-cancelled'; // Using red style for rejected
            badge.textContent = 'Rejected';

            // Hide Buttons
            actionsDiv.style.display = 'none';

            alert('Booking Rejected!');
        });
    });    // Admin User/Owner Management
    document.addEventListener('click', (e) => {
        // Handle Ban Button
        if (e.target.classList.contains('js-ban-btn')) {
            const btn = e.target;
            const row = btn.closest('tr');
            const badge = row.querySelector('.badge');

            if (btn.textContent.trim() === 'Ban') {
                if (confirm('Are you sure you want to ban this user?')) {
                    badge.className = 'badge badge-cancelled'; // Red style
                    badge.textContent = 'Banned';
                    btn.textContent = 'Unban';
                    btn.classList.remove('text-danger', 'border-danger');
                    btn.classList.add('text-success', 'border-success');
                }
            } else {
                badge.className = 'badge badge-confirmed'; // Green/Active style
                badge.textContent = 'Active';
                btn.textContent = 'Ban';
                btn.classList.add('text-danger', 'border-danger');
                btn.classList.remove('text-success', 'border-success');
            }
        }

        // Handle Verify Button
        if (e.target.classList.contains('js-verify-btn')) {
            const btn = e.target;
            const row = btn.closest('tr');
            const badge = row.querySelector('.badge');

            if (confirm('Verify this owner?')) {
                badge.className = 'badge badge-approved';
                badge.textContent = 'Verified';
                btn.replaceWith('Verified');
            }
        }
    });

});
