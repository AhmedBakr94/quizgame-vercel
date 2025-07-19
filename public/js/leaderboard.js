import { db } from '/js/config.js';

const leaderboardList = document.getElementById('leaderboardList');
const ctx = document.getElementById('statsChart').getContext('2d');
let chart;

export function loadLeaderboard(timeRange = 'daily') {
    const ref = db.ref('leaderboard/' + timeRange).orderByChild('points').limitToLast(10);
    
    ref.once('value').then(snapshot => {
        leaderboardList.innerHTML = '';
        const data = [];
        const labels = [];
        const points = [];

        snapshot.forEach(child => {
            const player = child.val();
            const item = document.createElement('li');
            item.innerHTML = `
                <span class="rank">${data.length + 1}</span>
                <span class="phone">${player.phone}</span>
                <span class="points">${player.points} نقطة</span>
            `;
            leaderboardList.appendChild(item);

            labels.push(player.phone.substring(0, 6) + '***');
            points.push(player.points);
            data.push(player);
        });

        updateChart(labels, points);
    });
}

function updateChart(labels, data) {
    if (chart) chart.destroy();
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'النقاط',
                data: data,
                backgroundColor: '#0fdcff'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// تبديل التبويبات
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        loadLeaderboard(this.dataset.tab);
    });
});

// التحميل الأولي
loadLeaderboard('daily');
