import { db, auth } from '/js/config.js';

export function initNotifications() {
    const user = auth.currentUser;
    if (!user) return;

    // استلام الإشعارات
    db.ref(`notifications/${user.uid}`).limitToLast(10).on('value', snapshot => {
        const notifications = [];
        snapshot.forEach(child => {
            notifications.push(child.val());
        });
        
        updateBadge(notifications.filter(n => !n.read).length);
        renderNotifications(notifications);
    });

    // إرسال إشعارات
    window.sendNotification = function(title, message) {
        const notifRef = db.ref(`notifications/${user.uid}`).push();
        notifRef.set({
            id: notifRef.key,
            title: title,
            message: message,
            date: new Date().toISOString(),
            read: false
        });
    };
}

function updateBadge(unreadCount) {
    const badge = document.getElementById('notifBadge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

function renderNotifications(notifications) {
    const container = document.getElementById('notificationsContainer');
    if (!container) return;
    
    container.innerHTML = notifications.map(notif => `
        <div class="notification ${notif.read ? '' : 'unread'}">
            <h4>${notif.title}</h4>
            <p>${notif.message}</p>
            <small>${new Date(notif.date).toLocaleString()}</small>
        </div>
    `).join('');
}
