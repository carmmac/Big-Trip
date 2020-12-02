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
import {filterData, render, RenderPosition, HeadingTitle} from './utils.js';

const events = new Array(EVENTS_NUM).fill().map(generateEvent);
const filteredEvents = filterData(events, `date`);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);
  const replaceCardToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };
  const replaceFormToCard = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);

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
render(siteHeaderElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
render(siteMenuElement, new HeadingView(HeadingTitle.MENU).getElement(), RenderPosition.BEFOREEND);
render(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
if (events.length === 0) {
  render(tripEventsElement, new HeadingView(HeadingTitle.LIST).getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteMenuElement, new HeadingView(HeadingTitle.FILTER).getElement(), RenderPosition.BEFOREEND);
  render(siteMenuElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new HeadingView(HeadingTitle.LIST).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new ListSortView().getElement(), RenderPosition.BEFOREEND);
  const listComponent = new ListView();
  render(tripEventsElement, listComponent.getElement(), RenderPosition.BEFOREEND);
  for (let i = 0; i < EVENTS_NUM; i++) {
    renderEvent(listComponent.getElement(), filteredEvents[i]);
  }
  render(siteMainElement, new Statistics().getElement(), RenderPosition.BEFOREEND);
}
