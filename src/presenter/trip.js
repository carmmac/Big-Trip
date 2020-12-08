import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import HeadingView from '../view/heading.js';
import {render, RenderPosition, replace} from '../utils/utils-render.js';
import {checkEmptyData} from '../utils/utils-common.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripBoardComponent = new TripBoardView();
    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();
    this._headingComponent = new HeadingView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    render(this._tripContainer, this._tripBoardComponent, RenderPosition.AFTERBEGIN);

    this._renderTrip();
  }

  _renderTrip() {
    if (checkEmptyData(this._tripEvents)) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderList();
    this._renderEvents();
  }

  _renderSort() {
    render(this._tripBoardComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderList() {
    render(this._tripBoardComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    this._tripEvents.forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);
    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };
    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };
    render(this._listComponent, eventComponent, RenderPosition.BEFOREEND);
    const eventFormOpenHandler = () => {
      replaceCardToForm();
      document.addEventListener(`keydown`, EscPressHandler);
      eventEditComponent.setFormCloseHandler(eventFormCloseHandler);
      eventEditComponent.setFormSubmitHandler(eventFormCloseHandler);
    };
    const eventFormCloseHandler = () => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, EscPressHandler);
      eventEditComponent.removeFormCloseHandler();
      eventEditComponent.removeFormSubmitHandler();
    };
    const EscPressHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        eventFormCloseHandler();
      }
    };
    eventComponent.setFormOpenHandler(eventFormOpenHandler);
  }

  _renderEmptyList() {
    render(this._tripBoardComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }
}
