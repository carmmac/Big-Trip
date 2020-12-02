import {EVENTS_NUM} from './const.js';
import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import EventView from './view/event.js';
import Statistics from './view/statistics.js';
import ListSortView from './view/list-sort.js';
import EventEditView from './view/event-edit.js';
import ListView from './view/list.js';
import EmptyListView from './view/list-empty.js';
import HeadingView from './view/heading.js';
import {generateEvent} from './mock/mock-event.js';
import {filterData, render, replace, RenderPosition, HeadingTitle} from './utils.js';

const events = new Array(EVENTS_NUM).fill().map(generateEvent);
const filteredEvents = filterData(events, `date`);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);
  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };
  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);

  const eventFormOpenHandler = () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, EscPressHandler);
    eventEditComponent.setFormCloseHandler(eventFormCloseHandler);
    eventEditComponent.setFormSubmitHandler(eventFormCloseHandler);
  };

  const eventFormCloseHandler = () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, EscPressHandler);
    eventEditComponent.removeFormCloseHandler(eventFormCloseHandler);
    eventEditComponent.removeFormSubmitHandler(eventFormCloseHandler);
  };

  const EscPressHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
    }
  };
  eventComponent.setFormOpenHandler(eventFormOpenHandler);
};

const siteHeaderElement = document.querySelector(`.trip-main`);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
render(siteMenuElement, new HeadingView(HeadingTitle.MENU), RenderPosition.BEFOREEND);
render(siteMenuElement, new MenuView(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(siteMenuElement, new HeadingView(HeadingTitle.FILTER), RenderPosition.BEFOREEND);
render(siteMenuElement, new FiltersView(), RenderPosition.BEFOREEND);

if (events.length === 0) {
  render(tripEventsElement, new HeadingView(HeadingTitle.LIST), RenderPosition.BEFOREEND);
  render(tripEventsElement, new EmptyListView(), RenderPosition.BEFOREEND);
} else {
  render(siteHeaderElement, new InfoView(events), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new HeadingView(HeadingTitle.LIST), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new ListSortView(), RenderPosition.BEFOREEND);
  const listComponent = new ListView();
  render(tripEventsElement, listComponent, RenderPosition.BEFOREEND);
  for (let i = 0; i < EVENTS_NUM; i++) {
    renderEvent(listComponent.getElement(), filteredEvents[i]);
  }
  render(siteMainElement, new Statistics(), RenderPosition.BEFOREEND);
}
