import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, replace} from '../utils/utils-render.js';

export default class Point {
  constructor(listContainer) {
    this._listContainer = listContainer;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._eventFormOpenHandler = this._eventFormOpenHandler.bind(this);
    this._eventFormCloseHandler = this._eventFormCloseHandler.bind(this);
    this._EscPressHandler = this._EscPressHandler.bind(this);
  }

  init(event) {
    this._event = event;
    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);
    this._eventComponent.setFormOpenHandler(this._eventFormOpenHandler);

    render(this._listContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _eventFormOpenHandler() {
    this._replaceCardToForm();
    document.addEventListener(`keydown`, this._EscPressHandler);
    this._eventEditComponent.setFormCloseHandler(this._eventFormCloseHandler);
    this._eventEditComponent.setFormSubmitHandler(this._eventFormCloseHandler);
  }

  _eventFormCloseHandler() {
    this._replaceFormToCard();
    document.removeEventListener(`keydown`, this._EscPressHandler);
    this._eventEditComponent.removeFormCloseHandler();
    this._eventEditComponent.removeFormSubmitHandler();
  }

  _EscPressHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventFormCloseHandler();
    }
  }
}
