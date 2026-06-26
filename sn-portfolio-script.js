/*

SN portfolio Script

*/

/* ===== Mobile Nav Toggle ===== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    navToggle.setAttribute('aria-expanded',
        navToggle.classList.contains('active'));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    });
});


/* ===== FAQ Accordion ===== */
function faqOpen(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
}

function faqClose(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.remove('open');
    answer.style.maxHeight = '0';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (item.classList.contains('open')) {
            faqClose(item);
        } else {
            faqOpen(item);
        }
    });
});

document.getElementById('faqExpandAll').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(item => faqOpen(item));
});

document.getElementById('faqCollapseAll').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(item => faqClose(item));
});

/* ===== Scroll Reveal ===== */
/* 3-second fallback for iframe previews where IntersectionObserver may not fire */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${i * 60}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));

    /* Fallback: force all reveals visible after 3s (iframe preview) */
    setTimeout(() => {
        reveals.forEach(el => el.classList.add('visible'));
    }, 3000);
} else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

const btn = document.getElementById("backToTop");

// Show button on scroll
window.onscroll = function () {
if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "flex";
} else {
    btn.style.display = "none";
}
};

// Scroll to top + animation
btn.addEventListener("click", function () {
btn.classList.add("animate");

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

// Remove animation class after animation ends
setTimeout(() => {
    btn.classList.remove("animate");
}, 600);
});
