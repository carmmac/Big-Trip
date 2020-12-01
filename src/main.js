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
import {generateEvent} from './mock/mock-event.js';
import {filterData, render, RenderPosition} from './utils.js';

const events = new Array(EVENTS_NUM).fill().map(generateEvent);
const filteredEvents = filterData(events, `date`);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);
  const eventEditCloseBtn = eventEditComponent.getElement().querySelector(`.event__rollup-btn`);
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
    eventEditCloseBtn.addEventListener(`click`, eventFormCloseHandler);
  };

  const eventFormCloseHandler = (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, EscPressHandler);
    eventEditCloseBtn.removeEventListener(`click`, eventFormCloseHandler);
  };

  const EscPressHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, eventFormOpenHandler);
  eventEditComponent.getElement().querySelector(`.event--edit`).addEventListener(`submit`, eventFormCloseHandler);
};

const siteHeaderElement = document.querySelector(`.trip-main`);
render(siteHeaderElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
render(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
render(siteMainElement, new Statistics().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
if (events.length === 0) {
  render(tripEventsElement, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new ListSortView().getElement(), RenderPosition.AFTERBEGIN);
  render(siteMenuElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
  const listComponent = new ListView();
  render(tripEventsElement, listComponent.getElement(), RenderPosition.BEFOREEND);
  for (let i = 0; i < EVENTS_NUM; i++) {
    renderEvent(listComponent.getElement(), filteredEvents[i]);
  }
}
