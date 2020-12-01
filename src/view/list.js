import {createElement} from '../utils.js';

const createListTemplate = () => {
  return `
    <div>
      <h2 class="visually-hidden">Trip events</h2>
      <ul class="trip-events__list"></ul>
    </div>
  `;
};

export default class List {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createListTemplate();
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
