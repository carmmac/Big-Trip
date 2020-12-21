import {humanizeDate} from '../utils/utils-event.js';
import {draft} from '../utils/utils-render.js';
import {eventTypes, destinations, generatedDestinations} from '../mock/mock-event.js';
import {offers as offersMock} from '../mock/mock-event.js';
import SmartView from './smart.js';

const createEventEditTemplate = (data = {}) => {
  const {type, destination, price, offers, eventHasInfo, eventHasPhotos} = data;
  const eventDate = `${humanizeDate(`DD/MM/YY HH:mm`)}`;

  const createEventTypeListTemplate = () => {
    return eventTypes.reduce((finalTemplate, currentType) => {
      const currentTypeNameToLowerCase = currentType.toLowerCase();
      const currentTemplate = `
        <div class="event__type-item">
          <input id="event-type-${currentTypeNameToLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${currentType === type ? `checked` : ``}>
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


  const createEventOffersSectionTemplate = () => {
    const renderOffers = () => {
      return offersMock
      .filter((offer) => offer.type === type)
      .reduce((finalTemplate, currentOffer, currentOfferIndex) => {
        const getCheckedOfferAttribute = () => offers.some((eventOffer) => eventOffer.title === currentOffer.title) ? `checked` : ``;
        const currentTemplate = `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type.toLowerCase()}-${currentOfferIndex}" type="checkbox" name="event-offer-${type.toLowerCase()}" ${getCheckedOfferAttribute()}>
            <label class="event__offer-label" for="event-offer-${type.toLowerCase()}-${currentOfferIndex}">
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

  const createEventDestinationSectionTemplate = () => {
    if (!eventHasInfo) {
      return ``;
    }
    const renderPhotos = () => {
      return destination.PHOTOS.reduce((finalTemplate, currentPhoto) => {
        const currentTemplate = `<img class="event__photo" src="${currentPhoto}" alt="Event photo"></img>`;
        return `${currentTemplate}${finalTemplate}`;
      }, draft);
    };
    const renderPhotosContainer = () => {
      if (!eventHasPhotos) {
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
        <p class="event__destination-description">${destination.INFO.join()}</p>
        ${renderPhotosContainer()}
      </section>
    `;
  };

  const createEventDetailsSectionTemplate = () => {
    return `
      <section class="event__details">
        ${createEventOffersSectionTemplate()}
        ${createEventDestinationSectionTemplate()}
      </section>
    `;
  };


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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.NAME}" list="destination-list-1">
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
        ${createEventDetailsSectionTemplate(type, offers, destination, eventHasInfo, eventHasPhotos)}
      </form>
    </li>
  `;
};

export default class EventEdit extends SmartView {
  constructor(event) {
    super();
    this._event = JSON.parse(JSON.stringify(event));
    this._data = EventEdit.parseEventToData(event);

    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);
    this._eventOffersToggleHandler = this._eventOffersToggleHandler.bind(this);

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
      TIME: {
        START: `event-start-time-1`,
        END: `event-end-time-1`,
      },
      PRICE: `event-price-1`,
    };

    evt.target.reportValidity();
    if (evt.target.value.length === 0) {
      switch (evt.target.id) {
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
    this.updateData({
      type: evt.target.value,
      offers: this._clearOffersList(),
    });
  }

  _eventDestinationChangeHandler(evt) {
    this._changeDestination(evt);
  }

  _eventPriceChangeHandler(evt) {
    this.updateData({price: evt.target.value}, true);
    this._checkInputValidity(evt);
  }

  _eventOffersToggleHandler(evt) {
    this.updateData({offers: this._updateOffersList(evt)});
  }

  _clearOffersList() {
    this._data.offers.clear();
    return this._data.offers;
  }

  _updateOffersList(evt) {
    const offerIndex = Number(evt.target.id.substring(evt.target.id.length - 1));
    const offerToAdd = offersMock
    .filter((offer) => offer.type === this._data.type)
    .find((offer, index) => index === offerIndex);
    if (this._data.offers.includes(offerToAdd)) {
      this._data.offers.splice(this._data.offers.indexOf(offerToAdd), 1);
      return this._data.offers;
    } else {
      this._data.offers.push(offerToAdd);
      return this._data.offers;
    }
  }

  _changeDestination(evt) {
    if (!destinations.some((destination) => destination === evt.target.value)) {
      evt.target.setCustomValidity(`Please choose specified destination from list!`);
      evt.target.reportValidity();
      return;
    } else {
      evt.target.setCustomValidity(``);
      const getNewDestination = () => {
        const newDestination = generatedDestinations.find((destination) => destination.NAME === evt.target.value);
        return newDestination;
      };
      this.updateData({destination: getNewDestination()}, true);
      this._data = EventEdit.parseEventToData(this._data);
      this.updateElement();
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._eventDestinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._eventPriceChangeHandler);
    this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._eventOffersToggleHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormCloseHandler(this._callback.close);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          eventHasInfo: event.destination.INFO.length !== 0,
          eventHasPhotos: event.destination.PHOTOS.length !== 0,
        });
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);
    delete data.eventHasInfo;
    delete data.eventHasPhotos;
    return data;
  }

  reset() {
    this.updateData(EventEdit.parseEventToData(this._event));
  }
}
