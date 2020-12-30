import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import EventPresenter from './point.js';
import NewEventPresenter from './new-point.js';
import {remove, render, RenderPosition, replace} from '../utils/utils-render.js';
import {sortData} from '../utils/utils-event.js';
import {UserAction, UpdateType, SortType, FilterType} from '../const.js';
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
  }

  createEvent() {
    this._filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this._newEventPresenter.init();
  }

  _renderTrip() {
    const events = this._getEvents();
    if (events.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderList();
    this._renderEvents(events);
  }

  _renderSort() {
    this._sortTypes = Object.keys(SortType);
    const prevSortComponent = this._sortComponent;
    this._sortComponent = new SortView(this._sortTypes, this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    if (prevSortComponent === null) {
      render(this._tripBoardComponent, this._sortComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._listComponent, this._userActionHandler, this._eventModeChangeHandler);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderList() {
    render(this._tripBoardComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyList() {
    render(this._tripBoardComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _clearList() {
    this._newEventPresenter.destroy();
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _clearTripBoard() {
    this._clearList();
    remove(this._listComponent);
    remove(this._emptyListComponent);
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
        this._currentSortType = SortType.DAY;
        this._clearTripBoard();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._currentSortType = SortType.DAY;
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
    this._renderTrip();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filtration[filterType](events);

    return sortData(filteredEvents, this._currentSortType);
  }
}
