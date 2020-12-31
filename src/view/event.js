import {humanizeDate} from '../utils/utils-event.js';
import {getEmptyDataClassName, getEventDuration} from '../utils/utils-common.js';
import {draft} from '../utils/utils-render.js';
import AbstractView from './absract.js';
import he from 'he';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const createEventTemplate = (event) => {
  const {type, destination, date, price, offers, isFavorite} = event;
  const eventDate = humanizeDate(`MMM DD`, date.START);
  const eventDateTime = humanizeDate(`YYYY-MM-DD`, date.START);
  const eventDateTimeFull = {
    START: humanizeDate(`YYYY-MM-DDTHH:mm`, date.START),
    END: humanizeDate(`YYYY-MM-DDTHH:mm`, date.END),
  };
  const emptyOffersClassName = getEmptyDataClassName(offers);
  const favoriteClassName = isFavorite ? `event__favorite-btn--active` : ``;
  const getEventTime = () => {
    return {
      START: humanizeDate(`HH:mm`, date.START),
      END: humanizeDate(`HH:mm`, date.END),
      DURATION: getEventDuration(date.END, date.START),
    };
  };

  const renderOffers = () => {
    return offers.reduce((finalTemplate, currentOffer) => {
      const currentTemplate = `
      <li class="event__offer">
        <span class="event__offer-title">${currentOffer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${currentOffer.price}</span>
      </li>
      `;
      return `${currentTemplate}${finalTemplate}`;
    }, draft);
  };

  return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${eventDateTime}">${eventDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${he.encode(destination.NAME)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${eventDateTimeFull.START}">${getEventTime().START}</time>
            &mdash;
            <time class="event__end-time" datetime="${eventDateTimeFull.END}">${getEventTime().END}</time>
          </p>
          <p class="event__duration">${getEventTime().DURATION}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers ${emptyOffersClassName}">
        ${renderOffers()}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._formOpenHandler = this._formOpenHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }
  getTemplate() {
    return createEventTemplate(this._event);
  }
  _formOpenHandler() {
    if (typeof this._callback.open === `function`) {
      this._callback.open();
    }
  }
  _favoriteClickHandler() {
    if (typeof this._callback.favorite === `function`) {
      this._callback.favorite();
    }
  }
  setFormOpenHandler(callback) {
    this._callback.open = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formOpenHandler);
  }
  setFavoriteClickHandler(callback) {
    this._callback.favorite = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
