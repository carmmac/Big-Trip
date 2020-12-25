import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, replace, remove} from '../utils/utils-render.js';
import {UserAction, UpdateType, Mode} from '../const.js';

export default class Point {
  constructor(listContainer, changeData, changeMode) {
    this._listContainer = listContainer;
    this._mode = Mode.DEFAULT;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._eventFormOpenHandler = this._eventFormOpenHandler.bind(this);
    this._eventFormCloseHandler = this._eventFormCloseHandler.bind(this);
    this._eventFormSubmitHandler = this._eventFormSubmitHandler.bind(this);
    this._EscPressHandler = this._EscPressHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._eventFormDeleteHandler = this._eventFormDeleteHandler.bind(this);
  }

  init(event) {
    this._event = event;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;
    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);
    this._eventComponent.setFormOpenHandler(this._eventFormOpenHandler);
    this._eventComponent.setFavoriteClickHandler(this._favoriteClickHandler);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._listContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }
    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._eventFormCloseHandler();
    }
  }

  _eventFormOpenHandler() {
    this._replaceCardToForm();
    this._addHandlers();
  }

  _eventFormSubmitHandler(event) {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        event
    );
    this._replaceFormToCard();
    this._removeHandlers();
  }

  _eventFormCloseHandler() {
    this._eventEditComponent.reset();
    this._replaceFormToCard();
    this._removeHandlers();
  }

  _eventFormDeleteHandler(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }

  _addHandlers() {
    document.addEventListener(`keydown`, this._EscPressHandler);
    this._eventEditComponent.setFormCloseHandler(this._eventFormCloseHandler);
    this._eventEditComponent.setFormSubmitHandler(this._eventFormSubmitHandler);
    this._eventEditComponent.setFormDeleteHandler(this._eventFormDeleteHandler);
  }

  _removeHandlers() {
    document.removeEventListener(`keydown`, this._EscPressHandler);
    this._eventEditComponent.removeFormCloseHandler();
    this._eventEditComponent.removeFormSubmitHandler();
    this._eventEditComponent.removeFormDeleteHandler();
  }

  _EscPressHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventFormCloseHandler();
    }
  }

  _favoriteClickHandler() {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._event,
            {isFavorite: !this._event.isFavorite}
        )
    );
  }
}
