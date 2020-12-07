import {EVENTS_NUM} from './const.js';
import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import EventView from './view/event.js';
import ListSortView from './view/list-sort.js';
import EventEditView from './view/event-edit.js';
import ListView from './view/list.js';
import EmptyListView from './view/list-empty.js';
import HeadingView from './view/heading.js';
import {generateEvent} from './mock/mock-event.js';
import {render, replace, RenderPosition} from './utils/utils-render.js';
import {filterData} from './utils/utils-event.js';
import {HeadingTitle, checkEmptyData} from './utils/utils-common.js';

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
    eventEditComponent.removeFormCloseHandler();
    eventEditComponent.removeFormSubmitHandler();
  };

  const EscPressHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      eventFormCloseHandler();
    }
  };
  eventComponent.setFormOpenHandler(eventFormOpenHandler);
};

const siteHeaderElement = document.querySelector(`.trip-main`);
render(siteHeaderElement, new InfoView(filteredEvents), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteMenuElement, new HeadingView(HeadingTitle.MENU), RenderPosition.BEFOREEND);
render(siteMenuElement, new MenuView(), RenderPosition.BEFOREEND);
render(siteMenuElement, new HeadingView(HeadingTitle.FILTER), RenderPosition.BEFOREEND);
render(siteMenuElement, new FiltersView(), RenderPosition.BEFOREEND);

const renderTripEvents = (tripEvents, eventsContainer) => {
  if (checkEmptyData(tripEvents)) {
    render(eventsContainer, new HeadingView(HeadingTitle.LIST), RenderPosition.BEFOREEND);
    render(eventsContainer, new EmptyListView(), RenderPosition.BEFOREEND);
    return;
  }
  render(eventsContainer, new HeadingView(HeadingTitle.LIST), RenderPosition.AFTERBEGIN);
  render(eventsContainer, new ListSortView(), RenderPosition.BEFOREEND);
  const listComponent = new ListView();
  render(eventsContainer, listComponent, RenderPosition.BEFOREEND);
  for (let i = 0; i < EVENTS_NUM; i++) {
    renderEvent(listComponent.getElement(), tripEvents[i]);
  }
};

renderTripEvents(filteredEvents, tripEventsElement);
