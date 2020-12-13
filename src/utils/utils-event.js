import dayjs from 'dayjs';
import {getRadomNum} from './utils-common.js';

const SortType = {
  DAY: `day`,
  EVENT: `event`,
  DURATION: `duration`,
  PRICE: `price`,
  OFFERS: `offers`,
};

const generateRandomIndex = (data) => {
  const randomData = data[getRadomNum(0, data.length - 1)];
  return randomData;
};

const humanizeDate = (format, date) => {
  return dayjs(date).format(format);
};

const sortData = (data, parameter) => {
  if (parameter === SortType.DURATION) {
    data.sort((left, right) => {
      if (left[parameter].HOUR < right[parameter].HOUR) {
        return -1;
      }
      if (left[parameter].HOUR > right[parameter].HOUR) {
        return 1;
      }
      if (left[parameter].HOUR === right[parameter].HOUR) {
        if (left[parameter].MINUTE < right[parameter].MINUTE) {
          return -1;
        }
        if (left[parameter].MINUTE > right[parameter].MINUTE) {
          return 1;
        }
        return 0;
      }
      return null;
    });
    return data;
  } else {
    data.sort((left, right) => {
      return left[parameter] - right[parameter];
    });
    return data;
  }
};

export {
  generateRandomIndex,
  humanizeDate,
  sortData,
  SortType,
};
