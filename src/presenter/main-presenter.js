import InfoView from '../view/info.js';
import MenuView from '../view/menu.js';
import {MenuItem, UserAction} from '../const.js';
import {remove, render, RenderPosition, replace} from '../utils/utils-render.js';
import TripPresenter from './trip.js';
import FilterPresenter from './filter.js';
import {UpdateType, FilterType, ENDPOINT, AUTHORIZATION} from '../const.js';
import StatsView from '../view/statistics.js';
import Api from '../api.js';
import NewEventButtonView from '../view/new-event-button.js';

export default class MainPresenter {
  constructor(headerContainer, menuContainer, filterModel, eventsModel) {
    this._headerContainer = headerContainer;
    this._menuContainer = menuContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._infoComponent = null;
    this._menuComponent = null;
    this._statsComponent = null;
    this._newEventButtonComponent = null;
    this._menuItemActive = MenuItem.TABLE;

    this._api = new Api(ENDPOINT, AUTHORIZATION);

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._newEventClickHandler = this._newEventClickHandler.bind(this);
    this._modelUpdateHandler = this._modelUpdateHandler.bind(this);
    this._userActionHandler = this._userActionHandler.bind(this);

    this._tripBoardContainer = document.querySelector(`.page-main .page-body__container`);
    this._tripPresenter = new TripPresenter(this._tripBoardContainer, filterModel, eventsModel, this._api, this._userActionHandler);
    this._filterPresenter = new FilterPresenter(this._menuContainer, filterModel, eventsModel);
  }

  init() {
    this._eventsModel.addObserver(this._modelUpdateHandler);
    this._renderTripBoard();
    this._requestData();
  }

  _requestData() {
    const requestedEvents = this._api.getEvents();
    const requestedOffers = this._api.getOffers();
    const requestedDestinations = this._api.getDestinations();

    Promise.all([
      requestedEvents,
      requestedOffers,
      requestedDestinations
    ])
      .then((response) => {
        this._eventsModel.setData(UpdateType.INIT, [...response]);
        this._renderInfo();
        this._renderTripControls();
      })
      .catch(() => {
        this._eventsModel.setData(UpdateType.INIT, [], [], []);
        this._renderInfo();
        this._renderTripControls();
      });
  }

  _renderTripControls() {
    this._renderMenu();
    this._renderFilters();
    this._renderNewEventButton();
  }

  _renderInfo() {
    const events = this._eventsModel.getEvents();
    const prevInfoComponent = this._infoComponent;
    this._infoComponent = new InfoView(events);
    if (prevInfoComponent === null) {
      render(this._headerContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  _renderMenu() {
    this._menuItems = Object.values(MenuItem);
    const prevMenuComponent = this._menuComponent;
    this._menuComponent = new MenuView(this._menuItems, this._menuItemActive);
    this._menuComponent.setMenuClickHandler(this._menuClickHandler);
    if (prevMenuComponent === null) {
      render(this._menuContainer, this._menuComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._menuComponent, prevMenuComponent);
    remove(prevMenuComponent);
  }

  _setActiveMenuItem(menuItem) {
    if (this._menuItemActive === menuItem) {
      return;
    }
    this._menuItemActive = menuItem;
    this._renderMenu();
  }

  _menuClickHandler(menuItem) {
    if (this._menuItemActive === menuItem) {
      return;
    }
    this._setActiveMenuItem(menuItem);
    switch (menuItem) {
      case MenuItem.TABLE:
        remove(this._statsComponent);
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._tripPresenter.init();
        break;
      case MenuItem.STATS:
        this._tripPresenter.destroy();
        this._statsComponent = new StatsView(this._eventsModel.getEvents());
        render(this._tripBoardContainer, this._statsComponent, RenderPosition.BEFOREEND);
        break;
    }
  }

  _renderFilters() {
    this._filterPresenter.init();
  }

  _renderNewEventButton({isButtonDisabled = false} = {}) {
    const prevNewEventButtonComponent = this._newEventButtonComponent;
    this._newEventButtonComponent = new NewEventButtonView(isButtonDisabled);
    this._newEventButtonComponent.setNewEventClickHandler(this._newEventClickHandler);
    if (prevNewEventButtonComponent === null) {
      render(this._headerContainer, this._newEventButtonComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._newEventButtonComponent, prevNewEventButtonComponent);
    remove(prevNewEventButtonComponent);
  }

  _renderTripBoard() {
    this._tripPresenter.init();
  }

  _newEventClickHandler() {
    if (this._statsComponent !== null) {
      remove(this._statsComponent);
    }
    this._tripPresenter.destroy();
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._tripPresenter.init();
    this._setActiveMenuItem(MenuItem.TABLE);
    this._tripPresenter.createEvent();
    this._renderNewEventButton({isButtonDisabled: true});
  }

  _userActionHandler(actionType) {
    if (actionType === UserAction.FORM_CLOSE) {
      this._renderNewEventButton();
    }
  }

  _modelUpdateHandler(updateType) {
    if (updateType === UpdateType.MINOR || updateType === UpdateType.MAJOR) {
      this._renderInfo();
    }
  }
}
