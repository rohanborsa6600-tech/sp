// Particles.js Initialization (Vibrant)
particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: ['#4a7c59', '#6b8e23', '#2c5530'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.2 } },
        size: { value: 3, random: true, anim: { enable: true, speed: 1, size_min: 0.8 } },
        line_linked: { enable: false },
        move: { enable: true, speed: 1.2, direction: 'bottom', random: true, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 100, duration: 0.4 } }
    },
    retina_detect: true
});

// Font & Theme Settings
function applySettings() {
    try {
        const savedSize = localStorage.getItem('fontSize') || 'medium';
        const savedTheme = localStorage.getItem('theme') || 'day';
        document.body.className = `font-size-${savedSize} ${savedTheme === 'night' ? 'night' : ''}`;
        ['small', 'medium', 'large'].forEach(size => {
            const btn = document.getElementById(`font-${size}`);
            if (btn) btn.classList.toggle('active', size === savedSize);
        });
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) themeBtn.textContent = savedTheme === 'night' ? '☀️' : '🌙';
    } catch (err) { console.log('Settings load error:', err); }
}

document.addEventListener('DOMContentLoaded', () => {
    applySettings();

    ['small', 'medium', 'large'].forEach(size => {
        const btn = document.getElementById(`font-${size}`);
        if (btn) {
            btn.addEventListener('click', () => {
                document.body.className = document.body.className.replace(/font-size-\w+/, '');
                document.body.classList.add(`font-size-${size}`);
                localStorage.setItem('fontSize', size);
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        }
    });

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('night');
            const isNight = document.body.classList.contains('night');
            themeToggle.textContent = isNight ? '☀️' : '🌙';
            localStorage.setItem('theme', isNight ? 'night' : 'day');
            themeToggle.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], { duration: 400, fill: 'forwards' });
        });
    }
});

// Double tap/click to go back from chapters
let clickCount = 0;
let clickTimer = null;
document.addEventListener('click', e => {
    if (window.location.pathname.includes('chapter')) {
        clickCount++;
        if (clickCount === 1) clickTimer = setTimeout(() => (clickCount = 0), 300);
        else { clearTimeout(clickTimer); window.location.href = '../index.html'; clickCount = 0; }
    }
}, false);

document.addEventListener('touchend', e => {
    if (window.location.pathname.includes('chapter')) {
        clickCount++;
        if (clickCount === 1) clickTimer = setTimeout(() => (clickCount = 0), 300);
        else { clearTimeout(clickTimer); window.location.href = '../index.html'; clickCount = 0; }
    }
}, false);
