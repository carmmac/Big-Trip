import dayjs from 'dayjs';
import {getRadomNum} from './utils-common.js';

const generateRandomIndex = (data) => {
  const randomData = data[getRadomNum(0, data.length - 1)];
  return randomData;
};

const humanizeDate = (format, date) => {
  return dayjs(date).format(format);
};

const checkEmptyData = (data) => data.length === 0;

const getEmptyDataClassName = (data) => checkEmptyData(data) ? `visually-hidden` : ``;

const filterData = (data, parameter) => {
  const sortedEvents = data.slice();
  sortedEvents.sort((left, right) => {
    return left[parameter] - right[parameter];
  });
  return sortedEvents;
};

export {
  generateRandomIndex,
  humanizeDate,
  getEmptyDataClassName,
  checkEmptyData,
  filterData,
};
