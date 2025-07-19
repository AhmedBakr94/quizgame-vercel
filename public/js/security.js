import { db, auth } from '/js/config.js';

export function initSecurity() {
    // منع حقن XSS
    document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('input', e => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                e.target.value = sanitizeInput(e.target.value);
            }
        });
    });

    // التحقق من الصلاحيات
    auth.onAuthStateChanged(user => {
        if (!user) return;
        
        db.ref(`users/${user.uid}/isAdmin`).once('value').then(snap => {
            if (window.location.pathname.includes('admin.html') && !snap.val()) {
                window.location.href = '/index.html';
            }
        });
    });
}

function sanitizeInput(input) {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// حماية من التكرار
export function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}
