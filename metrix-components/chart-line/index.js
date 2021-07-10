import { LitElement, html } from 'lit-element';
import Chart from 'chart.js/auto';

import { timestamps, dataset1, dataset2, dataset3 } from '../configs';

class LineChart extends LitElement {
  static get properties() {
    return {
      elementID: { attribute: true, type: String },
      width: { attribute: true, type: Number },
      height: { attribute: true, type: Number },
      typeChart: { type: String },
      data: { attribute: true, type: Object },
      updatedTime: { attribute: true, type: Number },
      chartTitle: { attribute: true, type: String },
    };
  }

  constructor() {
    super();
    this.elementID = '';
    this.width = 1280;
    this.height = 400;
    this.typeChart = 'line';
    this.updatedTime = 1;
    this.chartTitle = '';
    this.data = {
      labels: timestamps,
      datasets: [
        {
          label: 'Maximum',
          backgroundColor: 'rgba(177, 64, 0, 0.1)',
          borderColor: '#B46F48',
          data: dataset1,
          borderWidth: 1,
          pointRadius: 1,
          pointHoverRadius: 2,
          fill: 1,
          tension: 0.25,
        },
        {
          label: 'Minimum',
          backgroundColor: 'rgba(0, 147, 156, 0.1)',
          borderColor: '#79BCC0',
          borderWidth: 1,
          pointRadius: 1,
          pointHoverRadius: 2,
          data: dataset3,
          fill: 'start',
          tension: 0.25,
        },
      ],
    };
    // TODO: Decomposition options for Line/Bar/Pie
    this.options = {
      responsive: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          align: 'start',
          labels: { boxWidth: 15 },
        },
        title: {
          display: true,
          text: this.title,
          font: { size: 16 },
        },
        tooltip: {
          callbacks: {}, // Callback for tooltip (Percent: (Max - Min)/100)
        },
        maintainAspectRatio: false,
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },

      scales: {
        x: [
          {
            type: 'time',
            display: true,
            time: {
              unit: 'minute',
              displayFormats: {
                minute: 'HH:mm',
              },
            },
            gridLines: {
              zeroLineWidth: 0,
              tickMarkLength: 0,
              color: 'rgba(0,0,0,0.08)',
            },
            ticks: {
              maxRotation: 0,
              minRotation: 0,
              autoSkipPadding: 20,
              padding: 5,
              fontSize: 10,
            },
            scaleLabel: {
              display: false,
            },
          },
        ],
        y: [
          {
            display: true,
            scaleLabel: {
              display: false,
            },
            ticks: {
              padding: 5,
              fontSize: 10,
              autoSkipPadding: 30,
            },
            gridLines: {
              tickMarkLength: 0,
              color: 'rgba(0,0,0,0.08)',
            },
          },
        ],
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  firstUpdated(changedProperties) {
    const ctx = this.renderRoot.getElementById(this.elementID).getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.typeChart,
      data: this.data,
      options: this.options,
    });
    this.chart.options.plugins.title.text = this.chartTitle;
    this.chart.update();
  }

  render() {
    return html` <canvas id="${this.elementID}" width="${this.width}" height="${this.height}"></canvas> `;
  }
}

customElements.define('chart-line', LineChart);
