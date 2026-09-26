document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll reveal observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Consultation form submission handler
    const consultForm = document.getElementById('consultation-form');
    const formSuccess = document.getElementById('form-success');

    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault();
            consultForm.reset();
            if (formSuccess) {
                formSuccess.classList.remove('hidden');
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 6000);
            }
        });
    }

    // TDEE & Macro Calculator logic
    const calcBtn = document.getElementById('calc-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const gender = document.getElementById('calc-gender').value;
            const goal = document.getElementById('calc-goal').value;
            const weight = parseFloat(document.getElementById('calc-weight').value) || 75;
            const height = parseFloat(document.getElementById('calc-height').value) || 175;
            const age = parseFloat(document.getElementById('calc-age').value) || 25;
            const activity = parseFloat(document.getElementById('calc-activity').value) || 1.375;

            // Mifflin-St Jeor Equation for BMR
            let bmr = (10 * weight) + (6.25 * height) - (5 * age);
            if (gender === 'male') {
                bmr += 5;
            } else {
                bmr -= 161;
            }

            let tdee = bmr * activity;

            if (goal === 'cut') {
                tdee *= 0.8; // 20% deficit
            } else if (goal === 'bulk') {
                tdee *= 1.15; // 15% surplus
            }

            const cals = Math.round(tdee);
            const protein = Math.round(weight * 2.2); // ~2.2g per kg
            const fats = Math.round((cals * 0.25) / 9); // 25% calories from fat
            const carbs = Math.round((cals - (protein * 4) - (fats * 9)) / 4);

            document.getElementById('res-cals').textContent = cals;
            document.getElementById('res-protein').textContent = protein + 'g';
            document.getElementById('res-carbs').textContent = carbs + 'g';
            document.getElementById('res-fats').textContent = fats + 'g';

            const resultsBox = document.getElementById('calc-results');
            if (resultsBox) {
                resultsBox.classList.remove('hidden');
                resultsBox.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
