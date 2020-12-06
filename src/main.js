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
import {HeadingTitle} from './utils/utils-common.js';

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
      replaceFormToCard();
    }
  };
  eventComponent.setFormOpenHandler(eventFormOpenHandler);
};

const siteHeaderElement = document.querySelector(`.trip-main`);
const infoComponent = new InfoView(filteredEvents);
render(siteHeaderElement, infoComponent, RenderPosition.AFTERBEGIN);

const siteMenuElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteMenuElement, new HeadingView(HeadingTitle.MENU), RenderPosition.BEFOREEND);
render(siteMenuElement, new MenuView(), RenderPosition.BEFOREEND);
render(siteMenuElement, new HeadingView(HeadingTitle.FILTER), RenderPosition.BEFOREEND);
render(siteMenuElement, new FiltersView(), RenderPosition.BEFOREEND);

const renderData = (tripPoints, listContainer) => {
  if (tripPoints.length === 0) {
    infoComponent.getElement().classList.add(`visually-hidden`);
    render(listContainer, new HeadingView(HeadingTitle.LIST), RenderPosition.BEFOREEND);
    render(listContainer, new EmptyListView(), RenderPosition.BEFOREEND);
    return;
  }
  render(listContainer, new HeadingView(HeadingTitle.LIST), RenderPosition.AFTERBEGIN);
  render(listContainer, new ListSortView(), RenderPosition.BEFOREEND);
  const listComponent = new ListView();
  render(listContainer, listComponent, RenderPosition.BEFOREEND);
  for (let i = 0; i < EVENTS_NUM; i++) {
    renderEvent(listComponent.getElement(), tripPoints[i]);
  }
};

renderData(filteredEvents, tripEventsElement);
