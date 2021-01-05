const EVENTS_NUM = 17;

const INFO_SENTENCE_MAX_NUM = 5;
const OFFERS_MAX_NUM = 5;
const PHOTOS_MAX_NUM = 4;
const OFFER_PRICE = {
  MIN: 10,
  MAX: 100,
};
const EVENT_PRICE = {
  MIN: 10,
  MAX: 500,
};

const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

const Mode = {
  DEFAULT: `default`,
  EDITING: `editing`,
};

const SortType = {
  OFFER: `offers`,
  PRICE: `price`,
  TIME: `duration`,
  EVENT: `event`,
  DAY: `date`,
};

const FilterType = {
  PAST: `Past`,
  FUTURE: `Future`,
  EVERYTHING: `Everything`,
};

export {
  EVENTS_NUM,
  INFO_SENTENCE_MAX_NUM,
  OFFERS_MAX_NUM,
  PHOTOS_MAX_NUM,
  OFFER_PRICE,
  EVENT_PRICE,
  UserAction,
  UpdateType,
  Mode,
  SortType,
  FilterType,
};
