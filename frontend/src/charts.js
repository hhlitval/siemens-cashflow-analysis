const mainColor = '#66666E';
const supportColor = '#258EA6';
const lastYear = document.querySelector('.year');
const lastFcf = document.querySelector('.fcf');
const lastFcfMargin = document.querySelector('.fcf-conversion');
const lastCapexRatio = document.querySelector('.capex-ratio');

fetch('/cashflow.json')
  .then((r) => r.json())
  .then((data) => {
    const years = data.map((d) => d.year);
    const operatingCashflow = data.map((d) => d.operating_cashflow);
    const capex = data.map((d) => d.capex);
    const freeCashflow = data.map((d) => d.free_cashflow);
    const fcfMargin = data.map((d) => d.fcf_margin);

    getKeyMetrics(years, freeCashflow, fcfMargin, capex, operatingCashflow);
    renderCharts(years, operatingCashflow, capex, freeCashflow, fcfMargin);
  });

function renderCharts(
  years,
  operatingCashflow,
  capex,
  freeCashflow,
  fcfMargin
) {
  Chart.defaults.font.family = 'Geist, system-ui, sans-serif';
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
}

function getKeyMetrics(
  years,
  freeCashflow,
  fcfMargin,
  capex,
  operatingCashflow
) {
  lastYear.textContent = `Key Metrics ${getLastElement(years)}`;
  lastFcf.textContent = `${Math.round(
    getLastElement(freeCashflow) / 1000
  )} Mio. €`;
  lastFcfMargin.textContent = `${(getLastElement(fcfMargin) * 100).toFixed(
    0
  )} %`;
  lastCapexRatio.textContent = `${(
    (getLastElement(capex) / getLastElement(operatingCashflow)) *
    100
  ).toFixed(0)} %`;
}

function getLastElement(arr) {
  return arr[arr.length - 1];
}
