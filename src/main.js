import {EVENTS_NUM} from './const.js';
import {generateEvent} from './mock/mock-event.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/main-presenter.js';

const events = new Array(EVENTS_NUM).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);

const mainPresenter = new MainPresenter(siteHeaderElement, siteMenuElement, filterModel, eventsModel);
mainPresenter.init();
