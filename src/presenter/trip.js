import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import EventPresenter from './point.js';
import NewEventPresenter from './new-point.js';
import {remove, render, RenderPosition} from '../utils/utils-render.js';
import {sortData} from '../utils/utils-event.js';
import {UserAction, UpdateType, SortType} from '../const.js';
import {filtration} from '../utils/utils-filter.js';

export default class Trip {
  constructor(tripContainer, filterModel, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._eventPresenter = {};
    this._tripBoardComponent = new TripBoardView();
    this._sortComponent = null;
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();
    this._currentSortType = SortType.DAY;

    this._userActionHandler = this._userActionHandler.bind(this);
    this._modelUpdateHandler = this._modelUpdateHandler.bind(this);
    this._eventModeChangeHandler = this._eventModeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._newEventPresenter = new NewEventPresenter(this._listComponent, this._userActionHandler);
  }

  init() {
    this._eventsModel.addObserver(this._modelUpdateHandler);
    this._filterModel.addObserver(this._modelUpdateHandler);
    this._renderTrip();
    render(this._tripContainer, this._tripBoardComponent, RenderPosition.AFTERBEGIN);
    render(this._tripBoardComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    this._clearTripBoard({resetSortType: true});
    remove(this._listComponent);
    remove(this._emptyListComponent);
    remove(this._tripBoardComponent);
    this._eventsModel.removeObserver(this._modelUpdateHandler);
    this._filterModel.removeObserver(this._modelUpdateHandler);
  }

  createEvent() {
    this._newEventPresenter.init();
  }

  _renderTrip() {
    const events = this._getEvents();
    if (events.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderEvents(events);
  }

  _renderSort() {
    this._sortTypes = Object.keys(SortType);
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._sortTypes, this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    render(this._tripBoardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvents(events) {
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
    this._newEventPresenter.destroy();
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _clearTripBoard({resetSortType = false} = {}) {
    this._clearList();
    remove(this._emptyListComponent);
    remove(this._sortComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _eventModeChangeHandler() {
    this._newEventPresenter.destroy();
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
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTripBoard();
    this._renderTrip();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filtration[filterType](events);

    return sortData(filteredEvents, this._currentSortType);
  }
}
