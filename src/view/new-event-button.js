import AbstractView from "./absract";

const createNewEventButtonTemplate = (isDisabled) => {
  const disabledButtonAttribute = isDisabled ? `disabled` : ``;
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${disabledButtonAttribute}>New event</button>`;
};

export default class NewEventButton extends AbstractView {
  constructor(isDisabled) {
    super();
    this._isDisabled = isDisabled;
    this._newEventClickHandler = this._newEventClickHandler.bind(this);
  }
  getTemplate() {
    return createNewEventButtonTemplate(this._isDisabled);
  }
  _newEventClickHandler() {
    if (typeof this._callback.addNewEvent === `function`) {
      this._callback.addNewEvent();
    }
  }
  setNewEventClickHandler(callback) {
    this._callback.addNewEvent = callback;
    this.getElement().addEventListener(`click`, this._newEventClickHandler);
  }
}
