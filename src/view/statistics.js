import AbstractView from './absract.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {formatEventDuration, getUniqueArray} from '../utils/utils-common.js';
import {CANVAS_BAR_HEIGHT, StatsParameter} from '../const.js';

const getTypesStatistics = (events, types, parameter) => {
  return types.map((type) => {
    let counter = 0;
    if (parameter) {
      events.forEach((event) => {
        if (event.type === type) {
          counter += event[parameter];
        }
      });
    } else {
      events.forEach((event) => {
        if (event.type === type) {
          counter++;
        }
      });
    }
    return counter;
  });
};

const renderMoneyChart = (moneyCtx, events, data) => {
  const {types, typesLabels} = data;
  const prices = getTypesStatistics(events, types, StatsParameter.PRICE);
  moneyCtx.height = CANVAS_BAR_HEIGHT * types.length;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...typesLabels],
      datasets: [{
        data: [...prices],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 70,
      }]
    },
    options: {
      layout: {
        padding: {
          left: 40,
        }
      },
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTypeChart = (typeCtx, events, data) => {
  const {types, typesLabels} = data;
  typeCtx.height = CANVAS_BAR_HEIGHT * types.length;
  const typeCounts = getTypesStatistics(events, types);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...typesLabels],
      datasets: [{
        data: [...typeCounts],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 70,
      }]
    },
    options: {
      layout: {
        padding: {
          left: 40,
        }
      },
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, events, data) => {
  const {types, typesLabels} = data;
  timeCtx.height = CANVAS_BAR_HEIGHT * types.length;
  const timeCounts = getTypesStatistics(events, types, StatsParameter.DURATION);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...typesLabels],
      datasets: [{
        data: [...timeCounts],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 70,
      }]
    },
    options: {
      layout: {
        padding: {
          left: 40,
        }
      },
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${formatEventDuration(val)}`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return `
    <section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--type">
        <canvas class="statistics__chart  statistics__chart--type" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>
  `;
};

export default class Statistics extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
    this._data = {
      types: getUniqueArray(events.map((event) => event.type)),
    };
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--type`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._data.typesLabels = this._data.types.map((type) => type.toUpperCase());

    this._moneyChart = renderMoneyChart(moneyCtx, this._events, this._data);
    this._typeChart = renderTypeChart(typeCtx, this._events, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._events, this._data);
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }
}
