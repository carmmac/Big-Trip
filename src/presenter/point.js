import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, replace, remove} from '../utils/utils-render.js';

const Mode = {
  DEFAULT: `default`,
  EDITING: `editing`,
};

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
      this._replaceFormToCard();
    }
  }

  _eventFormOpenHandler() {
    this._replaceCardToForm();
    document.addEventListener(`keydown`, this._EscPressHandler);
    this._eventEditComponent.setFormCloseHandler(this._eventFormCloseHandler);
    this._eventEditComponent.setFormSubmitHandler(this._eventFormSubmitHandler);
  }

  _eventFormSubmitHandler(event) {
    this._changeData(event);
    this._replaceFormToCard();
    document.removeEventListener(`keydown`, this._EscPressHandler);
    this._eventEditComponent.removeFormCloseHandler();
    this._eventEditComponent.removeFormSubmitHandler();
  }

  _eventFormCloseHandler() {
    this._eventEditComponent.reset(this._event);
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
  _favoriteClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._event,
            {isFavorite: !this._event.isFavorite}
        )
    );
  }
}
