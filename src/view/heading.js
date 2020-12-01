import {createElement} from '../utils.js';

const createHeadingTemplate = (headingName) => {
  return `<h2 class="visually-hidden">${headingName}</h2>`
};

export default class Heading {
  constructor(headingName) {
    this._element = null;
    this._headingName = headingName;
  }
  getTemplate() {
    return createHeadingTemplate(this._headingName);
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
