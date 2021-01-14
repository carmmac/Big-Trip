import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, remove} from '../utils/utils-render.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPoint {
  constructor(listContainer, changeData) {
    this._listContainer = listContainer;
    this._changeData = changeData;
    this._eventEditComponent = null;

    this._newEventFormSubmitHandler = this._newEventFormSubmitHandler.bind(this);
    this._newEventFormDeleteHandler = this._newEventFormDeleteHandler.bind(this);
    this._newEventFormCloseHandler = this._newEventFormCloseHandler.bind(this);
    this._EscPressHandler = this._EscPressHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }
    this._eventEditComponent = new EventEditView();
    this._eventEditComponent.setFormSubmitHandler(this._newEventFormSubmitHandler);
    this._eventEditComponent.setFormDeleteHandler(this._newEventFormDeleteHandler);
    this._eventEditComponent.setFormCloseHandler(this._newEventFormCloseHandler);
    render(this._listContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._EscPressHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }
    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._EscPressHandler);
  }

  _newEventFormSubmitHandler(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        event
    );
    this.destroy();
  }

  _newEventFormDeleteHandler() {
    this.destroy();
  }

  _newEventFormCloseHandler() {
    this.destroy();
  }

  _EscPressHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
