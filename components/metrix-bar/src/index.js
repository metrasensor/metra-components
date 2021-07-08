import { LitElement, html } from 'lit-element';
import {
  Chart,
  ArcElement,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
);

class BarChart extends LitElement {
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
    this.typeChart = 'bar';
    this.updatedTime = 1;
    this.data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 22],
        backgroundColor: [
          'rgba(255, 99, 132, 0.75)',
          'rgba(13, 110, 253, 0.75)',
          'rgba(255, 193, 7, 0.75)',
          'rgba(25, 135, 84, 0.75)',
          'rgba(111, 66, 193, 0.75)',
          'rgba(255, 159, 64, 0.75)',
        ],
        borderColor: [
          'rgba(220, 53, 69, 1)',
          'rgba(13, 110, 253, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(25, 135, 84, 1)',
          'rgba(111, 66, 193, 1)',
          'rgba(253, 126, 20, 1)',
        ],
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

  // eslint-disable-next-metrix-line no-unused-vars
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

customElements.define('metrix-bar', BarChart);
