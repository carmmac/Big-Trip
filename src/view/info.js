import AbstractView from './absract.js';
import {getEmptyDataClassName} from '../utils/utils-common.js';
import {humanizeDate, sortData, SortType} from '../utils/utils-event.js';
import {draft} from '../utils/utils-render.js';
import {MAX_INFO_TITLES} from '../const.js';


const createInfoTemplate = (events) => {
  const sortedEvents = sortData(events, SortType.DAY);
  const getTripInfoTitle = () => {
    if (sortedEvents.length === 0) {
      return ``;
    }
    if (sortedEvents.length > MAX_INFO_TITLES) {
      return `${sortedEvents[0].destination.NAME}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${sortedEvents[sortedEvents.length - 1].destination.NAME}`;
    }
    return sortedEvents.reduce((finalTemplate, currentEvent, currentEventIndex) => {
      let currentTemplate = `${sortedEvents[currentEventIndex].destination.NAME}&nbsp;&mdash;&nbsp;`;
      if (currentEventIndex === sortedEvents.length - 1) {
        currentTemplate = `${sortedEvents[currentEventIndex].destination.NAME}`;
      }
      return `${finalTemplate}${currentTemplate}`;
    }, draft);
  };
  const getTripInfoDates = () => {
    if (sortedEvents.length === 0) {
      return ``;
    }
    return `
      ${humanizeDate(`D MMM`, sortedEvents[0].date.START)}&nbsp;&mdash;&nbsp;${humanizeDate(`D MMM`, sortedEvents[sortedEvents.length - 1].date.START)}
    `;
  };
  const getTotalPrice = () => {
    const totalPrice = 0;
    const offerTotalPrice = 0;
    return events.reduce((totalSum, currentEvent) => {
      const currentEventOffers = currentEvent.offers;
      totalSum += currentEvent.price + currentEventOffers.reduce((sum, currentOffer) => {
        sum += currentOffer.price;
        return sum;
      }, offerTotalPrice);
      return totalSum;
    }, totalPrice);
  };
  return `<section class="trip-main__trip-info  trip-info ${getEmptyDataClassName(events)}">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripInfoTitle()}</h1>
        <p class="trip-info__dates">${getTripInfoDates()}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
      </p>
    </section>`;
};

export default class Info extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }
  getTemplate() {
    return createInfoTemplate(this._events);
  }
}
