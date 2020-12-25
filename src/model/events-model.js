import Observer from '../utils/observer.js';

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
}
