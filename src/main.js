import {EVENTS_NUM, FIRST_EVENT_TO_SHOW_IDX, EDIT_EVENT_IDX} from './const.js';
import {createInfo} from './view/info.js';
import {menu} from './view/menu.js';
import {filters} from './view/filters.js';
import {statistics} from './view/statistics.js';
import {createListSort} from './view/list-sort.js';
import {createEditPoint} from './view/edit.js';
import {createlistFiltered} from './view/list-filter.js';
import {generateEvent} from './mock/mock-event.js';
import {filterData} from './utils.js';

const events = new Array(EVENTS_NUM).fill().map(generateEvent);

const render = function (container, template, position) {
  container.insertAdjacentHTML(position, template);
};

const tripHeaderElement = document.querySelector(`.trip-main`);
render(tripHeaderElement, createInfo(events), `afterbegin`);

const tripMenuElement = tripHeaderElement.querySelector(`.trip-controls`);
render(tripMenuElement, menu(), `afterbegin`);
render(tripMenuElement, filters(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
render(siteMainElement, statistics(), `beforeend`);

const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(tripEventsElement, createListSort(), `afterbegin`);

const filteredEvents = filterData(events, `date`);
for (let i = FIRST_EVENT_TO_SHOW_IDX; i < EVENTS_NUM; i++) {
  render(tripEventsElement, createlistFiltered(filteredEvents[i]), `beforeend`);
}

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
render(tripEventsListElement, createEditPoint(filteredEvents[EDIT_EVENT_IDX]), `afterbegin`);
