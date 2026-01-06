const years = [2021, 2022, 2023, 2024, 2025];

const operatingCashflow = [10109, 10325, 12293, 11814, 13448];
const capex = [-1730, -2021, -2146, -2088, -2445];
const freeCashflow = [8379, 8304, 10146, 9726, 11004];

const fcfMargin = freeCashflow.map((fcf, i) =>
  (fcf / operatingCashflow[i]).toFixed(2)
);

Chart.defaults.font.family =
  'Geist, system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.color = '#000';

new Chart(document.getElementById('cashflowChart'), {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      {
        label: 'Operating Cashflow',
        data: operatingCashflow,
        borderColor: '#626562',
        tension: 0.3,
      },
      {
        label: 'Free Cashflow',
        data: freeCashflow,
        borderColor: '#A9B0AF',
        tension: 0.3,
      },
    ],
  },
  options: {
    borderWidth: 1.5,
    pointStyle: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 4,
        },
      },
    },
  },
});

new Chart(document.getElementById('capexChart'), {
  type: 'bar',
  data: {
    labels: years,
    datasets: [
      {
        label: 'Operating Cashflow',
        data: operatingCashflow,
        backgroundColor: '#626562',
        barThickness: 6,
      },
      {
        label: 'CapEx',
        data: capex,
        backgroundColor: '#A9B0AF',
        barThickness: 6,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        grid: {
          color: (context) => {
            if (context.tick.value === 0) {
              return '#e5e7eb';
            }
            return 'transparent';
          },
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      x: { grid: { display: false } },
    },
  },
});

new Chart(document.getElementById('marginChart'), {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      {
        label: 'FCF Margin',
        data: fcfMargin,
        borderColor: '#626562',
        tension: 0.3,
        fill: false,
      },
    ],
  },
  options: {
    pointStyle: false,
    borderWidth: 1.5,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: {
        suggestedMin: 0.75,
        ticks: {
          maxTicksLimit: 4,
          callback: (value) => `${Math.round(value * 100)}%`,
        },
        grid: { display: false },
      },
    },
  },
});
