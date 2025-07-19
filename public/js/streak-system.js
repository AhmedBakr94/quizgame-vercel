import { db, auth } from '/js/config.js';

export function initDailyChallenge() {
    const user = auth.currentUser;
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const userRef = db.ref(`users/${user.uid}/challenges/${today}`);

    userRef.once('value').then(snap => {
        const challenge = snap.val() || { progress: 0, completed: false };
        
        updateUI(challenge);
        
        document.getElementById('startChallenge').addEventListener('click', () => {
            window.location.href = "/questions.html?challenge=true";
        });
    });

    // تحميل سجل الجوائز
    db.ref(`users/${user.uid}/challenges`).limitToLast(5).on('value', snapshot => {
        const rewardsList = document.getElementById('rewardsList');
        rewardsList.innerHTML = '';
        
        snapshot.forEach(child => {
            const date = child.key;
            const challenge = child.val();
            
            if (challenge.completed) {
                const item = document.createElement('li');
                item.innerHTML = `
                    <span>${formatDate(date)}</span>
                    <span>+${challenge.reward} نقطة</span>
                `;
                rewardsList.appendChild(item);
            }
        });
    });
}

function updateUI(challenge) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (challenge.completed) {
        progressBar.style.width = '100%';
        progressText.textContent = 'مكتمل!';
        document.getElementById('startChallenge').disabled = true;
    } else {
        progressBar.style.width = `${challenge.progress * 10}%`;
        progressText.textContent = `${challenge.progress}/10`;
    }
}

function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('ar-EG', options);
}

// التحميل الأولي
auth.onAuthStateChanged(user => {
    if (user) initDailyChallenge();
});
