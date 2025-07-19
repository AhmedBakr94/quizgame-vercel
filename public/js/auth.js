import { auth } from '/js/config.js';

// متابعة حالة المصادقة
auth.onAuthStateChanged(user => {
    const authPages = ['/login.html', '/register.html'];
    const currentPage = window.location.pathname;
    
    if (user) {
        if (authPages.includes(currentPage)) {
            window.location.href = "/index.html";
        }
    } else {
        if (!authPages.includes(currentPage)) {
            window.location.href = "/login.html";
        }
    }
});

// وظيفة تسجيل الخروج العامة
window.logout = function() {
    auth.signOut().then(() => {
        window.location.href = "/login.html";
    });
};
