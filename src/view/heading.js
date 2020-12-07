import AbstractView from './absract.js';

const createHeadingTemplate = (headingName) => {
  return `<h2 class="visually-hidden">${headingName}</h2>`;
};

export default class Heading extends AbstractView {
  constructor(headingName) {
    super();
    this._headingName = headingName;
  }
  getTemplate() {
    return createHeadingTemplate(this._headingName);
  }
}
