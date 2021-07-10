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
import moment from 'moment';

import { BaseOptions, dataset1, dataset3, timestamps } from '../configs';

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
      labels: timestamps.map(n => moment(n).format('HH:mm')),
      datasets: [
        {
          label: 'Maximum',
          backgroundColor: 'rgba(177, 64, 0, 0.1)',
          borderColor: '#B46F48',
          data: dataset1,
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: 1,
        },
        {
          label: 'Minimum',
          backgroundColor: 'rgba(0, 147, 156, 0.1)',
          borderColor: '#79BCC0',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 1,
          data: dataset3,
          fill: 'start',
        },
      ],
    };
    this.options = BaseOptions;
  }

  // eslint-disable-next-line no-unused-vars
  firstUpdated(changedProperties) {
    // call on change properties
    const ctx = this.renderRoot.getElementById(this.elementID).getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.typeChart,
      data: this.data,
      options: this.options,
    });
    this.chart.update();
  }

  render() {
    return html`<canvas id="${this.elementID}" width="${this.width}" height="${this.height}"></canvas>`;
  }
}

// Defined component
customElements.define('chart-line', LineChart);
