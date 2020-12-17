import AbstractView from './absract.js';
import {getEmptyDataClassName} from '../utils/utils-common.js';


const createInfoTemplate = (events) => {
  const getTotalPrice = () => {
    const totalPrice = 0;
    const offerTotalPrice = 0;
    return events.reduce((totalSum, currentEvent) => {
      const currentEventOffers = Array.from(currentEvent.offers);
      totalSum += currentEvent.price + currentEventOffers.reduce((sum, currentOffer) => {
        sum += currentOffer.price;
        return sum;
      }, offerTotalPrice);
      return totalSum;
    }, totalPrice);
  };
  return `<section class="trip-main__trip-info  trip-info ${getEmptyDataClassName(events)}">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
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
