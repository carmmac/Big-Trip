import AbstractView from './absract.js';

const createListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class List extends AbstractView {
  getTemplate() {
    return createListTemplate();
  }
}
