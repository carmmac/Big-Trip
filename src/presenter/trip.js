import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import HeadingView from '../view/heading.js';
import EventPresenter from './point.js';
import {remove, render, RenderPosition} from '../utils/utils-render.js';
import {getUpdatedList} from '../utils/utils-common.js';
import {sortData, SortType} from '../utils/utils-event.js';
import {UserAction, UpdateType} from '../const.js';

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._eventPresenter = {};
    this._tripBoardComponent = new TripBoardView();
    this._sortComponent = null;
    this._listComponent = null;
    this._emptyListComponent = new EmptyListView();
    this._headingComponent = new HeadingView();
    this._currentSortType = SortType.DAY;

    this._userActionHandler = this._userActionHandler.bind(this);
    this._modelUpdateHandler = this._modelUpdateHandler.bind(this);
    this._eventModeChangeHandler = this._eventModeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._eventsModel.addObserver(this._modelUpdateHandler);
  }

  init() {
    this._renderTrip();
    render(this._tripContainer, this._tripBoardComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderList();
    this._renderEvents();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView();
    render(this._tripBoardComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderList() {
    if (this._listComponent !== null) {
      this._listComponent = null;
    }
    this._listComponent = new ListView();
    render(this._tripBoardComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    const events = this._getEvents();
    events.forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._listComponent, this._userActionHandler, this._eventModeChangeHandler);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEmptyList() {
    render(this._tripBoardComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _clearList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _clearTripBoard() {
    this._clearList();
    remove(this._sortComponent);
    remove(this._listComponent);
    remove(this._emptyListComponent);
  }

  _eventModeChangeHandler() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _userActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _modelUpdateHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter.init(data);
        break;
      case UpdateType.MINOR:
        this._clearList();
        this._renderEvents();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard();
        //* метод отрисовки статистики
        break;
    }
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearList();
    this._renderEvents();
  }

  _getEvents() {
    if (this._currentSortType === SortType.DAY) {
      return sortData(this._eventsModel.getEvents(), SortType.DAY);
    } else {
      return sortData(this._eventsModel.getEvents(), this._currentSortType);
    }
  }
}
