import dayjs from 'dayjs';
import {getRandomNum} from './utils-common.js';

const SortType = {
  DAY: `date`,
  DURATION: `duration`,
  PRICE: `price`,
};

const generateRandomIndex = (data) => {
  const randomData = data[getRandomNum(0, data.length - 1)];
  return randomData;
};

const humanizeDate = (format, date) => {
  return dayjs(date).format(format);
};

const sortData = (data, parameter) => {
  switch (parameter) {
    case SortType.DURATION:
      data.sort((left, right) => {
        return (right[parameter].HOUR * 60 + right[parameter].MINUTE) - (left[parameter].HOUR * 60 + left[parameter].MINUTE);
      });
      break;
    case SortType.PRICE:
      data.sort((left, right) => {
        return right[parameter] - left[parameter];
      });
      break;
    default:
      data.sort((left, right) => {
        return left[parameter] - right[parameter];
      });
  }
  return data;
};

export {
  generateRandomIndex,
  humanizeDate,
  sortData,
  SortType,
};
