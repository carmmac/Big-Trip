import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, replace, remove} from '../utils/utils-render.js';

export default class Point {
  constructor(listContainer, changeData) {
    this._listContainer = listContainer;
    this._changeData = changeData;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._eventFormOpenHandler = this._eventFormOpenHandler.bind(this);
    this._eventFormCloseHandler = this._eventFormCloseHandler.bind(this);
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
    if (this._listContainer.getElement().contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }
    if (this._listContainer.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }
    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  _destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
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
