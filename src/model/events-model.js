import Observer from '../utils/observer.js';
import {getUpdatedList} from '../utils/utils-common.js';

export default class EventsModel extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = events.slice();
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
}
