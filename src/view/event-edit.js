import {humanizeDate} from '../utils/utils-event.js';
import {draft} from '../utils/utils-render.js';
import {eventTypes, destinations} from '../mock/mock-event.js';
import SmartView from './smart.js';

const createEventTypeListTemplate = (eventType) => {
  return eventTypes.reduce((finalTemplate, currentType) => {
    const currentTypeNameToLowerCase = currentType.toLowerCase();
    const currentTemplate = `
      <div class="event__type-item">
        <input id="event-type-${currentTypeNameToLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentTypeNameToLowerCase}" ${currentType === eventType ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${currentTypeNameToLowerCase}" for="event-type-${currentTypeNameToLowerCase}-1">${currentType}</label>
      </div>
    `;
    return `${currentTemplate}${finalTemplate}`;
  }, draft);
};

const createDestinationOptionsTemplate = () => {
  return destinations.reduce((finalTemplate, currentOption) => {
    const currentTemplate = `<option value="${currentOption}"></option>`;
    return `${currentTemplate}${finalTemplate}`;
  }, draft);
};


const createEventOffersSectionTemplate = (offers, hasOffers) => {
  if (!hasOffers) {
    return ``;
  }
  const renderOffers = () => {
    return Array.from(offers).reduce((finalTemplate, currentOffer) => {
      const currentTemplate = `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${currentOffer.type.toLowerCase()}-1" type="checkbox" name="event-offer-${currentOffer.type.toLowerCase()}" ${currentOffer.isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${currentOffer.type.toLowerCase()}-1">
            <span class="event__offer-title">${currentOffer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${currentOffer.price}</span>
          </label>
        </div>
      `;
      return `${currentTemplate}${finalTemplate}`;
    }, draft);
  };
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${renderOffers()}
      </div>
    </section>
  `;
};

const createEventDestinationSectionTemplate = (info, photos, hasInfo, hasPhotos) => {
  if (!hasInfo) {
    return ``;
  }
  const renderPhotos = () => {
    return photos.reduce((finalTemplate, currentPhoto) => {
      const currentTemplate = `<img class="event__photo" src="${currentPhoto}" alt="Event photo"></img>`;
      return `${currentTemplate}${finalTemplate}`;
    }, draft);
  };
  const renderPhotosContainer = () => {
    if (!hasPhotos) {
      return ``;
    }
    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${renderPhotos()}
        </div>
      </div>
    `;
  };
  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${info.join()}</p>
      ${renderPhotosContainer()}
    </section>
  `;
};

const createEventDetailsSectionTemplate = (offers, info, photos, hasOffers, hasInfo, hasPhotos) => {
  return `
    <section class="event__details">
      ${createEventOffersSectionTemplate(offers, hasOffers)}
      ${createEventDestinationSectionTemplate(info, photos, hasInfo, hasPhotos)}
    </section>
  `;
};


const createEventEditTemplate = (data = {}) => {
  const {type, destination, info, price, offers, photos, eventHasOffers, eventHasInfo, eventHasPhotos} = data;
  const eventDate = `${humanizeDate(`DD/MM/YY HH:mm`)}`;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeListTemplate(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationOptionsTemplate()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        ${createEventDetailsSectionTemplate(offers, info, photos, eventHasOffers, eventHasInfo, eventHasPhotos)}
      </form>
    </li>
  `;
};

export default class EventEdit extends SmartView {
  constructor(event) {
    super();
    this._data = EventEdit.parseEventToData(event);

    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);

    this._setInnerHandlers();
  }
  getTemplate() {
    return createEventEditTemplate(this._data);
  }
  _formCloseHandler() {
    if (typeof this._callback.close === `function`) {
      this._callback.close();
    }
  }
  _formSubmitHandler(evt) {
    evt.preventDefault();
    if (typeof this._callback.formSubmit === `function`) {
      this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
    }
  }
  setFormCloseHandler(callback) {
    this._callback.close = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseHandler);
  }
  removeFormCloseHandler() {
    this.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, this._formCloseHandler);
  }
  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._formSubmitHandler);
  }
  removeFormSubmitHandler() {
    this.getElement().querySelector(`.event--edit`).removeEventListener(`submit`, this._formSubmitHandler);
  }

  _checkInputValidity(evt) {
    const InputId = {
      DESTINATION: `event-destination-1`,
      PRICE: `event-price-1`,
    };

    evt.target.reportValidity();
    if (evt.target.value.length === 0) {
      switch (evt.target.id) {
        case InputId.DESTINATION:
          evt.target.setCustomValidity(`Please fill in destination point!`);
          break;
        case InputId.PRICE:
          evt.target.setCustomValidity(`Please fill in event price!`);
          break;
        default:
          //* сообщение для даты сделаю во второй части задания
          evt.target.setCustomValidity(``);
      }
    } else {
      evt.target.setCustomValidity(``);
    }
  }

  _eventTypeChangeHandler(evt) {
    this.updateData({type: evt.target.value});
  }

  _eventDestinationChangeHandler(evt) {
    this.updateData({destination: evt.target.value}, true);
    this._checkInputValidity(evt);
  }

  _eventPriceChangeHandler(evt) {
    this.updateData({price: evt.target.value}, true);
    this._checkInputValidity(evt);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, this._eventDestinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._eventPriceChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormCloseHandler(this._callback.close);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event, {
          eventHasOffers: event.offers.length !== 0,
          eventHasInfo: event.info.length !== 0,
          eventHasPhotos: event.photos.length !== 0,
        });
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    if (!data.eventHasOffers) {
      data.offers = [];
    }
    if (!data.eventHasInfo) {
      data.info = [];
    }
    if (!data.eventHasPhotos) {
      data.photos = [];
    }
    delete data.eventHasOffers;
    delete data.eventHasInfo;
    delete data.eventHasPhotos;

    return data;
  }

  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }
}
