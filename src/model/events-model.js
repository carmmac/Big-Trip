import dayjs from 'dayjs';
import {generateId} from '../mock/mock-event.js';
import Observer from '../utils/observer.js';
import {getEventDuration, getUpdatedList} from '../utils/utils-common.js';

export default class EventsModel extends Observer {
  constructor() {
    super();
    this._events = [];
    this._offers = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(updateType, events) {
    this._events = events.slice();
    this.notify(updateType);
  }

  getOffers() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  updateEvent(updateType, update) {
    this._events = getUpdatedList(this._events, update);
    this.notify(updateType, update);
  }

  addEvent(updateType, newEvent) {
    this._events.push(newEvent);
    this.notify(updateType, newEvent);
  }

  deleteEvent(updateType, deletedEvent) {
    const index = this._events.findIndex((event) => event.id === deletedEvent.id);
    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }
    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];
    this.notify(updateType);
  }

  static adaptEventToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          price: event.base_price,
          date: {
            START: dayjs(event.date_from),
            END: dayjs(event.date_to),
          },
          duration: getEventDuration(dayjs(event.date_to), dayjs(event.date_from)),
          destination: {
            NAME: event.destination.name,
            INFO: event.destination.description,
            PHOTOS: event.destination.pictures,
          },
          offers: event.offers.map((offer) => {
            return {
              type: event.type,
              title: offer.title,
              price: offer.price,
              isChecked: true,
              id: generateId(),
            };
          }),
          isFavorite: event.is_favorite,
        }
    );

    delete adaptedEvent.base_price;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

  static adaptEventToServer(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          "base_price": event.price,
          "date_from": event.date.START.toISOString(),
          "date_to": event.date.END.toISOString(),
          "is_favorite": event.isFavorite,
        }
    );

    delete adaptedEvent.price;
    delete adaptedEvent.date;
    delete adaptedEvent.duration;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
