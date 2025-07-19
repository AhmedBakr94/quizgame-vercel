import { db, auth } from '/js/config.js';

// دالة لعرض الإشعارات
export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// دالة لتحميل بيانات المستخدم
export async function getUserData() {
    const user = auth.currentUser;
    if (!user) return null;
    
    const snapshot = await db.ref('users/' + user.uid).once('value');
    return snapshot.val();
}

// دالة لتشغيل الأصوات
export function playSound(soundName) {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.play().catch(e => console.log('لا يمكن تشغيل الصوت:', e));
}
