import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/main-presenter.js';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);

const mainPresenter = new MainPresenter(siteHeaderElement, siteMenuElement, filterModel, eventsModel);
mainPresenter.init();

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/service-worker.js`);
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  mainPresenter.syncData();
});
