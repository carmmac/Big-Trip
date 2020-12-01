import {createElement} from '../utils.js';

const createlistFilteredTemplate = () => {
  return `
    <div>
      <h2 class="visually-hidden">Trip events</h2>
      <ul class="trip-events__list"></ul>
    </div>
  `;
};

export default class ListFiltered {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createlistFilteredTemplate();
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
