import { LitElement, html } from 'lit-element';
import {
  Chart,
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  PolarAreaController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  PolarAreaController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
);

class LineChart extends LitElement {
  static get properties() {
    return {
      elementID: { attribute: true, type: String },
      width: { attribute: true, type: Number },
      height: { attribute: true, type: Number },
      typeChart: { type: String },
      data: { attribute: true, type: Object },
      updatedTime: { attribute: true, type: Number },
    };
  }

  constructor() {
    super();
    this.elementID = '';
    this.width = 1280;
    this.height = 400;
    this.typeChart = 'line';
    this.updatedTime = 1;
    this.data = {
      fill: true,
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 22],
        backgroundColor: 'rgba(220, 53, 69, 1)',
        borderColor: 'rgba(220, 53, 69, 1)',
        borderWidth: 2,
        borderRadius: 10,
      }],
    };
    this.options = {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      title: { display: false },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  }

  // eslint-disable-next-chart-line no-unused-vars
  firstUpdated(changedProperties) {
    const ctx = this.renderRoot.getElementById(this.elementID).getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.typeChart,
      data: this.data,
      options: this.options,
    });
    this.chart.update();
  }

  render() {
    return html`
          <canvas id="${this.elementID}" width="${this.width}" height="${this.height}"></canvas>
        `;
  }
}

customElements.define('line-chart', LineChart);
