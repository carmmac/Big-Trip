import InfoView from '../view/info.js';
import MenuView from '../view/menu.js';
import {MenuItem} from '../const.js';
import {remove, render, RenderPosition, replace} from '../utils/utils-render.js';
import TripPresenter from './trip.js';
import FilterPresenter from './filter.js';
import {UpdateType, FilterType} from '../const.js';


export default class MainPresenter {
  constructor(headerContainer, menuContainer, filterModel, eventsModel) {
    this._headerContainer = headerContainer;
    this._menuContainer = menuContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._menuComponent = null;
    this._menuItemActive = MenuItem.TABLE;

    this._tripBoardContainer = document.querySelector(`.page-main .page-body__container`);
    this._tripPresenter = new TripPresenter(this._tripBoardContainer, filterModel, eventsModel);
    this._filterPresenter = new FilterPresenter(this._menuContainer, filterModel, eventsModel);


    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._newEventClickHandler = this._newEventClickHandler.bind(this);

    this._setNewEventClickHandler();
  }

  init() {
    this._renderInfo();
    this._renderTripControls();
    this._renderTripBoard();
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
        // hide stats
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._tripPresenter.init();
        break;
      case MenuItem.STATS:
        this._tripPresenter.destroy();
        // show stats
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
    // hide stats
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
