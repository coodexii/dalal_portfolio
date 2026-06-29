// ═══════════════════════════════════════
//   DCoder Portfolio — script.js
// ═══════════════════════════════════════

// ─── State ───
const state = {
    theme: localStorage.getItem('theme') || 'dark',
    lang: localStorage.getItem('lang') || 'en'
};

// ─── DOM ───
const themeToggle = document.getElementById('theme-toggle');
const langToggle  = document.getElementById('lang-toggle');
const langText    = langToggle.querySelector('.lang-text');
const htmlEl      = document.documentElement;

// ─── Init ───
function init() {
    applyTheme(state.theme);
    applyLang(state.lang);
    setupEventListeners();
    setupScrollAnimations();
    startTypingEffect();
}

// ─── Theme ───
function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(state.theme);
}

// ─── Language ───
function applyLang(lang) {
    htmlEl.setAttribute('lang', lang);
    langText.textContent = lang === 'en' ? 'AR' : 'EN';
    localStorage.setItem('lang', lang);

    // Text content
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });

    // Placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        const text = el.getAttribute(`data-placeholder-${lang}`);
        if (text) el.setAttribute('placeholder', text);
    });

    // Labels inside input-groups
    document.querySelectorAll('.input-group label[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });
}

function toggleLang() {
    state.lang = state.lang === 'en' ? 'ar' : 'en';
    applyLang(state.lang);
}

// ─── Event Listeners ───
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    langToggle.addEventListener('click', toggleLang);
}

// ─── Scroll Animations ───
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.skill-card, .project-card, .section-header, .about-text, .about-visual, .terminal-window, .contact-intro, .social-link, .contact-right, .edu-inline')
        .forEach((el, i) => {
            el.classList.add('fade-in');
            if (i % 3 === 1) el.classList.add('delay-1');
            if (i % 3 === 2) el.classList.add('delay-2');
            observer.observe(el);
        });
}

// ─── Typing Effect ───
function startTypingEffect() {
    const el = document.getElementById('typed');
    if (!el) return;

    const phrases = [
        'whoami',
        'echo "building UIs"',
        'git commit -m "hello world"',
        'npm run portfolio'
    ];

    let phraseIndex = 0;
    let charIndex   = 0;
    let deleting    = false;
    let pause       = false;

    function type() {
        const current = phrases[phraseIndex];

        if (pause) {
            pause = false;
            setTimeout(type, 1200);
            return;
        }

        if (!deleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                pause    = true;
            }
            setTimeout(type, 80);
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting    = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            setTimeout(type, 40);
        }
    }

    type();
}

// ─── Run ───
document.addEventListener('DOMContentLoaded', init);