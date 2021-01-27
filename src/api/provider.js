import EventsModel from '../model/events-model.js';
import {LocalstorageKey} from '../const.js';
import {isOnline} from '../utils/utils-common.js';

const getSyncedEvents = (events) => {
  return events.filter(({success}) => success)
    .map(({payload}) => payload.event);
};

const createStorageStructure = (items, storageKey) => {
  return items.reduce((acc, currentItem) => {
    switch (storageKey) {
      case LocalstorageKey.EVENTS:
        return Object.assign(
            {},
            acc,
            {
              [currentItem.id]: currentItem
            });
      case LocalstorageKey.OFFERS:
        return Object.assign(
            {},
            acc,
            {
              [currentItem.type]: currentItem
            });
      case LocalstorageKey.DESTINATIONS:
        return Object.assign(
            {},
            acc,
            {
              [currentItem.NAME]: currentItem
            });
      default:
        return {};
    }
  }, {});
};

export default class Provider {
  constructor(api, storage) {
    this._api = api;
    this._storage = storage;
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStorageStructure(events.map(EventsModel.adaptEventToServer), LocalstorageKey.EVENTS);
          this._storage.setItems(items, LocalstorageKey.EVENTS);
          return events;
        });
    }
    const eventsFromStorage = Object.values(this._storage.getItems(LocalstorageKey.EVENTS));
    return Promise.resolve(eventsFromStorage.map(EventsModel.adaptEventToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStorageStructure(offers, LocalstorageKey.OFFERS);
          this._storage.setItems(items, LocalstorageKey.OFFERS);
          return offers;
        });
    }
    const offersFromStorage = Object.values(this._storage.getItems(LocalstorageKey.OFFERS));
    return Promise.resolve(offersFromStorage);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStorageStructure(destinations, LocalstorageKey.DESTINATIONS);
          this._storage.setItems(items, LocalstorageKey.DESTINATIONS);
          return destinations;
        });
    }
    const destinationsFromStorage = Object.values(this._storage.getItems(LocalstorageKey.DESTINATIONS));
    return Promise.resolve(destinationsFromStorage.map(EventsModel.adaptDestinationToClient));
  }

  updateEvent(event) {
    if (isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._storage.setItem(LocalstorageKey.EVENTS, updatedEvent.id, EventsModel.adaptEventToServer(updatedEvent));
          return updatedEvent;
        });
    }
    this._storage.setItem(LocalstorageKey.EVENTS, event.id, EventsModel.adaptEventToServer(event));
    return Promise.resolve(event);
  }

  addEvent(event) {
    if (isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._storage.setItem(LocalstorageKey.EVENTS, newEvent.id, EventsModel.adaptEventToServer(newEvent));
          return newEvent;
        });
    }
    return Promise.reject(new Error(`Failed while adding event`));
  }

  deleteEvent(event) {
    if (isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._storage.removeItem(LocalstorageKey.EVENTS, event.id));
    }
    return Promise.reject(new Error(`Failed while deleting event`));
  }

  sync() {
    if (isOnline()) {
      const eventsFromStorage = Object.values(this._storage.getItems(LocalstorageKey.EVENTS));
      return this._api.sync(eventsFromStorage)
        .then((response) => {
          const newEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);
          const events = createStorageStructure([...newEvents], [...updatedEvents]);
          this._storage.setItems(events);
        });
    }
    return Promise.reject(new Error(`Failed while data sync`));
  }
}
