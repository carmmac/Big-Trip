import {EVENTS_NUM, FIRST_EVENT_TO_SHOW_IDX, EDIT_EVENT_IDX} from './const.js';
import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import EventView from './view/event.js';
import Statistics from './view/statistics.js';
import ListSortView from './view/list-sort.js';
import EventEditView from './view/event-edit.js';
import NewEventView from './view/new-event.js';
import NewEventWithoutDestinationsView from './view/new-event-without-destinations.js';
import NewEventWithoutOffers from './view/new-event-without-offers.js';
import ListFilteredView from './view/list-filtered.js';
import {generateEvent} from './mock/mock-event.js';
import {filterData, render, RenderPosition} from './utils.js';

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

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, EscPressHandler);
  });
  eventEditComponent.getElement().querySelector(`.event--edit`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  const EscPressHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, EscPressHandler);
    }
  };
};


const siteHeaderElement = document.querySelector(`.trip-main`);
render(siteHeaderElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
render(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMenuElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
render(siteMainElement, new Statistics().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const listFilteredComponent = new ListFilteredView();
render(tripEventsElement, new ListSortView().getElement(), RenderPosition.AFTERBEGIN);
render(tripEventsElement, listFilteredComponent.getElement(), RenderPosition.BEFOREEND);

// const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
// render(listFilteredComponent.getElement(), new EventEditView(filteredEvents[EDIT_EVENT_IDX]).getElement(), RenderPosition.AFTERBEGIN);
// render(listFilteredComponent.getElement(), new NewEventView(filteredEvents[EDIT_EVENT_IDX]).getElement(), RenderPosition.AFTERBEGIN);
// render(listFilteredComponent.getElement(), new NewEventWithoutDestinationsView(filteredEvents[EDIT_EVENT_IDX]).getElement(), RenderPosition.AFTERBEGIN);
// render(listFilteredComponent.getElement(), new NewEventWithoutOffers(filteredEvents[EDIT_EVENT_IDX]).getElement(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < EVENTS_NUM; i++) {
  renderEvent(listFilteredComponent.getElement(), filteredEvents[i]);
}

