import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import HeadingView from '../view/heading.js';
import EventPresenter from './point.js';
import {render, RenderPosition} from '../utils/utils-render.js';
import {getUpdatedList} from '../utils/utils-common.js';
import {sortData, SortType} from '../utils/utils-event.js';

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._eventPresenter = {};
    this._tripBoardComponent = new TripBoardView();
    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();
    this._headingComponent = new HeadingView();
    this._currentSortType = SortType.DAY;

    this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._eventModeChangeHandler = this._eventModeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = sortData(tripEvents, this._currentSortType);
    this._originalEvents = tripEvents.slice();
    this._renderTrip();
    render(this._tripContainer, this._tripBoardComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderList();
    this._renderEvents();
  }

  _renderSort() {
    render(this._tripBoardComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderList() {
    render(this._tripBoardComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    this._tripEvents.forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._listComponent, this._eventChangeHandler, this._eventModeChangeHandler);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEmptyList() {
    render(this._tripBoardComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _sortEvents(sortType) {
    if (sortType === SortType.DAY) {
      this._tripEvents = this._originalEvents.slice();
    } else {
      this._tripEvents = sortData(this._tripEvents, sortType);
    }
    this._currentSortType = sortType;
  }

  _clearList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _eventModeChangeHandler() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _eventChangeHandler(updatedEvent) {
    this._tripEvents = getUpdatedList(this._tripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }
  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
    this._clearList();
    this._renderEvents();
  }

  _getEvents() {
    return this._eventsModel.getEvents();
  }
}
