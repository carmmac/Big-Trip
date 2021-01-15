import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, remove} from '../utils/utils-render.js';
import {UserAction, UpdateType, BLANK_EVENT} from '../const.js';
import {resetFormState} from '../utils/utils-event.js';

export default class NewPoint {
  constructor(listContainer, changeData, offers, destinations) {
    this._listContainer = listContainer;
    this._changeData = changeData;
    this._eventEditComponent = null;
    this._offers = offers;
    this._destinations = destinations;
    this._BLANK_EVENT = Object.assign(
        {},
        BLANK_EVENT,
        {destination: this._destinations[0]}
    );

    this._newEventFormSubmitHandler = this._newEventFormSubmitHandler.bind(this);
    this._newEventFormDeleteHandler = this._newEventFormDeleteHandler.bind(this);
    this._newEventFormCloseHandler = this._newEventFormCloseHandler.bind(this);
    this._EscPressHandler = this._EscPressHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }
    this._eventEditComponent = new EventEditView(this._BLANK_EVENT, this._offers, this._destinations);
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

  setSavingState() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    this._eventEditComponent.shake(resetFormState(this._eventEditComponent));
  }

  _newEventFormSubmitHandler(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        event
    );
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
