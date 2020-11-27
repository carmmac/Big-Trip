import {EVENTS_NUM, FIRST_EVENT_TO_SHOW_IDX, EDIT_EVENT_IDX} from './const.js';
import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import EventView from './view/event.js';
import {statistics} from './view/statistics.js';
import ListSortView from './view/list-sort.js';
import EventEditView from './view/event-edit.js';
import ListFilteredView from './view/list-filtered.js';
import {generateEvent} from './mock/mock-event.js';
import {filterData, renderTemplate, renderElement, RenderPosition} from './utils.js';

const events = new Array(EVENTS_NUM).fill().map(generateEvent);
const filteredEvents = filterData(events, `date`);

const siteHeaderElement = document.querySelector(`.trip-main`);
renderElement(siteHeaderElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
renderElement(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMenuElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
renderTemplate(siteMainElement, statistics(), `beforeend`);

const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const listFilteredComponent = new ListFilteredView();
renderElement(tripEventsElement, new ListSortView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripEventsElement, listFilteredComponent.getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
renderElement(listFilteredComponent.getElement(), new EventEditView(filteredEvents[EDIT_EVENT_IDX]).getElement(), RenderPosition.AFTERBEGIN);

// const eventComponent = new EventView();
for (let i = FIRST_EVENT_TO_SHOW_IDX; i < EVENTS_NUM; i++) {
  renderElement(listFilteredComponent.getElement(), new EventView(filteredEvents[i]).getElement(), RenderPosition.BEFOREEND);
}

