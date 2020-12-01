import {createElement} from '../utils.js';

const createEmptyListTemplate = () => {
  return `
    <div>
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Click New Event to create your first point</p>
    </div>
  `;
};

export default class EmptyList {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createEmptyListTemplate();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
