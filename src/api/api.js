import {RequestMethod, SuccessHTTPStatusRange, RequestAddress, RequestHeader} from '../const.js';
import EventsModel from '../model/events-model.js';

export default class Api {
  constructor(endPoint, authorization) {
    this._endpoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: RequestAddress.POINTS})
      .then(Api.toJSON)
      .then((events) => events.map(EventsModel.adaptEventToClient));
  }

  getOffers() {
    return this._load({url: RequestAddress.OFFERS})
      .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({url: RequestAddress.DESTINATIONS})
      .then(Api.toJSON)
      .then((destinations) => destinations.map(EventsModel.adaptDestinationToClient));
  }

  updateEvent(event) {
    return this._load({
      url: `${RequestAddress.POINTS}/${event.id}`,
      method: RequestMethod.PUT,
      body: JSON.stringify(EventsModel.adaptEventToServer(event)),
      headers: new Headers(RequestHeader.CONTENT_TYPE),
    })
    .then(Api.toJSON)
    .then(EventsModel.adaptEventToClient);
  }

  addEvent(event) {
    return this._load({
      url: `${RequestAddress.POINTS}`,
      method: RequestMethod.POST,
      body: JSON.stringify(EventsModel.adaptEventToServer(event)),
      headers: new Headers(RequestHeader.CONTENT_TYPE),
    })
    .then(Api.toJSON)
    .then(EventsModel.adaptEventToClient);
  }

  deleteEvent(event) {
    return this._load({
      url: `${RequestAddress.POINTS}/${event.id}`,
      method: RequestMethod.DELETE,
    });
  }

  _load({
    url,
    method = RequestMethod.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endpoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static catchError(error) {
    throw error;
  }

  static toJSON(response) {
    return response.json();
  }

  sync(data) {
    return this._load({
      url: `${RequestAddress.POINTS}/${RequestAddress.SYNC}`,
      method: RequestMethod.POST,
      body: JSON.stringify(data),
      headers: new Headers(RequestHeader.CONTENT_TYPE)
    })
      .then(Api.toJSON);
  }
}
