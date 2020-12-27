import {FilterType} from '../const.js';
import {isPastEvent} from './utils-event.js';

export const filtration = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => !isPastEvent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event)),
};
