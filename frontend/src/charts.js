const years = [2021, 2022, 2023, 2024, 2025];

const operatingCashflow = [10109, 10325, 12293, 11814, 13448];
const capex = [-1730, -2021, -2146, -2088, -2445];
const freeCashflow = [8379, 8304, 10146, 9726, 11004];
const mainColor = '#7C90A0';
const supportColor = '#F24236';

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
        borderColor: `${mainColor}`,
        tension: 0.3,
      },
      {
        label: 'Free Cashflow',
        data: freeCashflow,
        borderColor: `${supportColor}`,
        tension: 0.3,
      },
    ],
  },
  options: {
    borderWidth: 2,
    pointStyle: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 4,
        },
      },
      y: {
        display: true,
        ticks: { display: false },
        border: { display: false },
        grid: { display: false },
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
        backgroundColor: `${mainColor}`,
        barThickness: 8,
      },
      {
        label: 'CapEx',
        data: capex,
        backgroundColor: `${supportColor}`,
        barThickness: 8,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        display: true,
        ticks: { display: false },
        border: { display: false },
        grid: {
          drawBorder: false,
          color: (ctx) => (ctx.tick.value === 0 ? '#e5e7eb' : 'transparent'),
          lineWidth: (ctx) => (ctx.tick.value === 0 ? 1 : 0),
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 4,
        },
      },
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
        borderColor: `${mainColor}`,
        tension: 0.3,
        fill: false,
      },
    ],
  },
  options: {
    pointStyle: false,
    borderWidth: 2,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 4,
        },
      },
      y: {
        display: true,
        ticks: { display: false },
        border: { display: false },
        suggestedMin: 0.79,
        suggestedMax: 0.85,
        // ticks: {
        //   maxTicksLimit: 4,
        //   callback: (value) => `${Math.round(value * 100)}%`,
        // },
        grid: { display: false },
      },
    },
  },
});
