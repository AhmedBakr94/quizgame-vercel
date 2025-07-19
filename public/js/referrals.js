import { db, auth } from '/js/config.js';

export function initReferrals() {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = db.ref('users/' + user.uid);
    const referralCode = generateReferralCode(user.uid);
    
    // حفظ كود الإحالة إذا لم يكن موجود
    userRef.child('referralCode').once('value').then(snap => {
        if (!snap.exists()) {
            userRef.child('referralCode').set(referralCode);
        }
    });

    // عرض كود الإحالة
    document.getElementById('referralCode').textContent = referralCode;

    // نسخ الرابط
    document.getElementById('copyBtn').addEventListener('click', () => {
        const link = `${window.location.origin}/login.html?ref=${referralCode}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('تم نسخ رابط الدعوة!');
        });
    });

    // تحميل قائمة الأصدقاء
    db.ref('referrals').orderByChild('referrer').equalTo(user.uid).on('value', snapshot => {
        const friendsList = document.getElementById('friendsList');
        friendsList.innerHTML = '';
        let total = 0;

        snapshot.forEach(child => {
            const friend = child.val();
            const item = document.createElement('li');
            item.innerHTML = `
                <span>${friend.friendPhone}</span>
                <span>+100 نقطة</span>
            `;
            friendsList.appendChild(item);
            total += 100;
        });

        document.getElementById('totalEarned').textContent = `إجمالي النقاط المكتسبة: ${total} نقطة`;
    });
}

function generateReferralCode(uid) {
    return uid.substring(0, 6).toUpperCase();
}

// التحميل الأولي
auth.onAuthStateChanged(user => {
    if (user) initReferrals();
});
