import {createElement} from '../utils.js';

const createlistFilteredTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
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
