import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import HeadingView from '../view/heading.js';
import EventPresenter from './point.js';
import {render, RenderPosition} from '../utils/utils-render.js';
import {checkEmptyData, updateItem} from '../utils/utils-common.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._tripBoardComponent = new TripBoardView();
    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();
    this._headingComponent = new HeadingView();

    this._eventChangeHandler = this._eventChangeHandler.bind(this);
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
    const eventPresenter = new EventPresenter(this._listComponent, this._eventChangeHandler);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEmptyList() {
    render(this._tripBoardComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _eventChangeHandler(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }
}
