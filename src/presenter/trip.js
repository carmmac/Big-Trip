import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import EventPresenter from './point.js';
import NewEventPresenter from './new-point.js';
import {remove, render, RenderPosition} from '../utils/utils-render.js';
import {sortData} from '../utils/utils-event.js';
import {UserAction, UpdateType, SortType, FormState} from '../const.js';
import {filtration} from '../utils/utils-filter.js';
import LoadingView from '../view/loading.js';

export default class Trip {
  constructor(tripContainer, filterModel, eventsModel, api) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._eventPresenter = {};
    this._tripBoardComponent = new TripBoardView();
    this._sortComponent = null;
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();
    this._loadingComponent = new LoadingView();
    this._isLoading = true;
    this._currentSortType = SortType.DAY;

    this._userActionHandler = this._userActionHandler.bind(this);
    this._modelUpdateHandler = this._modelUpdateHandler.bind(this);
    this._eventModeChangeHandler = this._eventModeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._newEventPresenter = null;
  }

  init() {
    this._eventsModel.addObserver(this._modelUpdateHandler);
    this._filterModel.addObserver(this._modelUpdateHandler);
    render(this._tripBoardComponent, this._listComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
    render(this._tripContainer, this._tripBoardComponent, RenderPosition.AFTERBEGIN);
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
    this._newEventPresenter = new NewEventPresenter(this._listComponent, this._userActionHandler, this._offers, this._destinations);
    this._newEventPresenter.init();
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    this._getData();
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
    const eventPresenter = new EventPresenter(this._listComponent, this._userActionHandler, this._eventModeChangeHandler, this._offers, this._destinations);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEmptyList() {
    render(this._tripBoardComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._tripBoardComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearList() {
    if (this._newEventPresenter !== null) {
      this._newEventPresenter.destroy();
    }
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _clearTripBoard({resetSortType = false} = {}) {
    this._clearList();
    remove(this._emptyListComponent);
    remove(this._sortComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _eventModeChangeHandler() {
    if (this._newEventPresenter !== null) {
      this._newEventPresenter.destroy();
    }
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _userActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenter[update.id].setViewState(FormState.SAVING);
        this._api.updateEvent(update)
          .then((response) => this._eventsModel.updateEvent(updateType, response))
          .catch(() => this._eventPresenter[update.id].setViewState(FormState.ABORTING));
        break;
      case UserAction.ADD_EVENT:
        this._newEventPresenter.setSavingState();
        this._api.addEvent(update)
          .then((response) => this._eventsModel.addEvent(updateType, response))
          .catch(() => this._newEventPresenter.setAborting());
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter[update.id].setViewState(FormState.DELETING);
        this._api.deleteEvent(update)
          .then(() => this._eventsModel.deleteEvent(updateType, update))
          .catch(() => this._eventPresenter[update.id].setViewState(FormState.ABORTING));
        break;
    }
  }

  _modelUpdateHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripBoard();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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

  _getData() {
    this._offers = this._eventsModel.getOffers();
    this._destinations = this._eventsModel.getDestinations();
  }
}
