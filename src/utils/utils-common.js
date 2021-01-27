import dayjs from "dayjs";
import {humanizeDate} from "./utils-event";

const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getEmptyDataClassName = (data) => data.length === 0 ? `visually-hidden` : ``;

const getUpdatedList = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    throw new Error(`Can't update unexisting item`);
  }
  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

const formatEventDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const days = Math.trunc(hours / 24);
  const minutes = duration % 60;
  const timeToShow = dayjs().hour(hours).minute(minutes);
  if (days > 0) {
    return `${days}D ${humanizeDate(`HH`, timeToShow)}H ${humanizeDate(`mm`, timeToShow)}M`;
  }
  if (hours > 0) {
    return `${humanizeDate(`HH`, timeToShow)}H ${humanizeDate(`mm`, timeToShow)}M`;
  }
  return `${humanizeDate(`mm`, timeToShow)}M`;
};

const getEventDuration = (endDate, startDate) => {
  return endDate.diff(startDate, `minute`);
};

const getUniqueArray = (items) => [...new Set(items)];

const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const isOnline = () => {
  return window.navigator.onLine;
};

export {
  getRandomNum,
  getEmptyDataClassName,
  getUpdatedList,
  formatEventDuration,
  getEventDuration,
  getUniqueArray,
  capitalizeString,
  isOnline,
};
