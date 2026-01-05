const years = [2021, 2022, 2023, 2024, 2025];

const operatingCashflow = [10109, 10325, 12293, 11814, 13448];
const capex = [-1730, -2021, -2146, -2088, -2445];
const freeCashflow = [8379, 8304, 10146, 9726, 11004];

const fcfMargin = freeCashflow.map((fcf, i) =>
  (fcf / operatingCashflow[i]).toFixed(2)
);

new Chart(document.getElementById('cashflowChart'), {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      {
        label: 'Operating Cashflow',
        data: operatingCashflow,
        borderColor: '#519872',
        tension: 0.3,
      },
      {
        label: 'Free Cashflow',
        data: freeCashflow,
        borderColor: '#000',
        tension: 0.3,
      },
    ],
  },
  options: {
    borderWidth: 1.5,
    pointStyle: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { display: false } },
      x: { grid: { display: false } },
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
        backgroundColor: '#519872',
      },
      {
        label: 'CapEx',
        data: capex,
        backgroundColor: '#000',
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: '#f3f4f6' } },
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
        borderColor: '#519872',
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
      y: { grid: { display: false } },
      x: { grid: { display: false } },
    },
  },
});
