import InfoView from '../view/info.js';
import MenuView from '../view/menu.js';
import {MenuItem} from '../const.js';
import {remove, render, RenderPosition, replace} from '../utils/utils-render.js';
import TripPresenter from './trip.js';
import FilterPresenter from './filter.js';
import {UpdateType, FilterType, END_POINT, AUTHORIZATION} from '../const.js';
import StatsView from '../view/statistics.js';
import Api from '../api.js';

export default class MainPresenter {
  constructor(headerContainer, menuContainer, filterModel, eventsModel) {
    this._headerContainer = headerContainer;
    this._menuContainer = menuContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._menuComponent = null;
    this._statsComponent = null;
    this._menuItemActive = MenuItem.TABLE;

    this._api = new Api(END_POINT, AUTHORIZATION);

    this._tripBoardContainer = document.querySelector(`.page-main .page-body__container`);
    this._tripPresenter = new TripPresenter(this._tripBoardContainer, filterModel, eventsModel);
    this._filterPresenter = new FilterPresenter(this._menuContainer, filterModel, eventsModel);

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._newEventClickHandler = this._newEventClickHandler.bind(this);

    this._setNewEventClickHandler();
  }

  init() {
    const requestedEvents = this._requestEvents();
    const requestedOffers = this._requestOffers();
    Promise.all([
      requestedEvents,
      requestedOffers
    ])
      .then(() => this._renderTripBoard());
  }

  _requestEvents() {
    this._api.getEvents()
      .then((events) => {
        this._eventsModel.setEvents(UpdateType.INIT, events);
        this._renderInfo();
        this._renderTripControls();
      })
      .catch(() => {
        this._eventsModel.setEvents(UpdateType.INIT, []);
        this._renderInfo();
        this._renderTripControls();
      });
  }

  _requestOffers() {
    this._api.getOffers()
      .then((offers) => this._eventsModel.setOffers(offers))
      .catch(this._eventsModel.setOffers([]));
  }

  _renderTripControls() {
    this._renderMenu();
    this._renderFilters();
  }

  _renderInfo() {
    const events = this._eventsModel.getEvents();
    this._infoComponent = new InfoView(events);
    render(this._headerContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMenu() {
    this._menuItems = Object.values(MenuItem);
    const prevMenuComponent = this._menuComponent;
    this._menuComponent = new MenuView(this._menuItems, this._menuItemActive);
    this._menuComponent.setMenuClickHandler(this._menuClickHandler);
    if (prevMenuComponent === null) {
      render(this._menuContainer, this._menuComponent, RenderPosition.BEFOREEND);
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
}
