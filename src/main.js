import {EVENTS_NUM} from './const.js';
import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import HeadingView from './view/heading.js';
import TripPresenter from './presenter/trip.js';
import {generateEvent} from './mock/mock-event.js';
import {render, RenderPosition} from './utils/utils-render.js';
import {HeadingTitle} from './utils/utils-render.js';
import EventsModel from './model/events-model.js';

const events = new Array(EVENTS_NUM).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const siteHeaderElement = document.querySelector(`.trip-main`);
render(siteHeaderElement, new InfoView(events), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);

render(siteMenuElement, new HeadingView(HeadingTitle.MENU), RenderPosition.BEFOREEND);
render(siteMenuElement, new MenuView(), RenderPosition.BEFOREEND);
render(siteMenuElement, new HeadingView(HeadingTitle.FILTER), RenderPosition.BEFOREEND);
render(siteMenuElement, new FiltersView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(siteMainElement, eventsModel);
tripPresenter.init(events);
