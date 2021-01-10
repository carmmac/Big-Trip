import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/main-presenter.js';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);

const mainPresenter = new MainPresenter(siteHeaderElement, siteMenuElement, filterModel, eventsModel);
mainPresenter.init();
