import Chart from '/lib/chartjs/chart.min.js';

export function createBarChart(ctx, labels, data) {
    return new Chart(ctx, {
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
