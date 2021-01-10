import {RequestMethod, SuccessHTTPStatusRange, RequestAddress} from './const.js';
import EventsModel from './model/events-model.js';

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
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

  updateEvent(event) {
    return this._load({
      url: `${RequestAddress.POINTS}/${event.id}`,
      method: RequestMethod.PUT,
      body: JSON.stringify(event),
      headers: new Headers({"Content-Type": `application/json`}),
    })
    .then(Api.toJSON)
    .then(EventsModel.adaptEventToClient);
  }

  _load({
    url,
    method = RequestMethod.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
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
}
