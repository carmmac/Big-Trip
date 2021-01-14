import InfoView from '../view/info.js';
import MenuView from '../view/menu.js';
import {MenuItem} from '../const.js';
import {remove, render, RenderPosition, replace} from '../utils/utils-render.js';
import TripPresenter from './trip.js';
import FilterPresenter from './filter.js';
import {UpdateType, FilterType, ENDPOINT, AUTHORIZATION, destinations} from '../const.js';
import StatsView from '../view/statistics.js';
import Api from '../api.js';

export default class MainPresenter {
  constructor(headerContainer, menuContainer, filterModel, eventsModel) {
    this._headerContainer = headerContainer;
    this._menuContainer = menuContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._infoComponent = null;
    this._menuComponent = null;
    this._statsComponent = null;
    this._menuItemActive = MenuItem.TABLE;

    this._api = new Api(ENDPOINT, AUTHORIZATION);

    this._tripBoardContainer = document.querySelector(`.page-main .page-body__container`);
    this._tripPresenter = new TripPresenter(this._tripBoardContainer, filterModel, eventsModel, this._api);
    this._filterPresenter = new FilterPresenter(this._menuContainer, filterModel, eventsModel);

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._newEventClickHandler = this._newEventClickHandler.bind(this);
    this._modelUpdateHandler = this._modelUpdateHandler.bind(this);

    this._setNewEventClickHandler();
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
        this._eventsModel.setData(UpdateType.INIT, [], [], destinations);
        this._renderInfo();
        this._renderTripControls();
      });
  }

  _renderTripControls() {
    this._renderMenu();
    this._renderFilters();
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
  }

  _setNewEventClickHandler() {
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, this._newEventClickHandler);
  }

  _modelUpdateHandler(updateType) {
    if (updateType === UpdateType.MINOR) {
      this._renderInfo();
    }
  }
}
