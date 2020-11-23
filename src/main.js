import {info} from './view/info.js';
import {menu} from './view/menu.js';
import {filters} from './view/filters.js';
import {statistics} from './view/statistics.js';
import {createList} from './view/list.js';
import {listEmpty} from './view/list-empty.js';
import {listSort} from './view/list-sort.js';
import {edit} from './view/edit.js';
import {newPoint} from './view/new-point.js';
import {newPointWithoutOffers} from './view/new-point-without-offers.js';
import {newPointWithoutDestinations} from './view/new-point-without-destination.js';
import {listFilter} from './view/list-filter.js';
import {generateEvent} from './mock/mock-event.js';

const EVENTS_NUM = 10;
const events = new Array(EVENTS_NUM).fill().map(generateEvent);

const render = function (container, template, position) {
  container.insertAdjacentHTML(position, template);
};

const tripHeaderElement = document.querySelector(`.trip-main`);
render(tripHeaderElement, info(), `afterbegin`);

const tripMenuElement = tripHeaderElement.querySelector(`.trip-controls`);
render(tripMenuElement, menu(), `afterbegin`);
render(tripMenuElement, filters(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
render(siteMainElement, statistics(), `beforeend`);

const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
// render(tripEventsElement, listEmpty(), `afterbegin`);
// render(tripEventsElement, listSort(), `afterbegin`);
for (let i = 0; i < EVENTS_NUM; i++) {
  render(tripEventsElement, createList(events[i]), `afterbegin`);
}
// render(tripEventsElement, listFilter(), `beforeend`);

// const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
// render(tripEventsListElement, edit(), `afterbegin`);
// render(tripEventsListElement, newPointWithoutDestinations(), `afterbegin`);
// render(tripEventsListElement, newPointWithoutOffers(), `afterbegin`);
// render(tripEventsListElement, newPoint(), `afterbegin`);

