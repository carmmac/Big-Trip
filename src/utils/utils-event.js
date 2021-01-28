import dayjs from 'dayjs';
import {SortType} from '../const.js';

const humanizeDate = (format, date) => {
  return dayjs(date).format(format);
};

const sortData = (data, parameter) => {
  switch (parameter) {
    case SortType.TIME:
      data.sort((left, right) => {
        return right[parameter] - left[parameter];
      });
      break;
    case SortType.PRICE:
      data.sort((left, right) => {
        return right[parameter] - left[parameter];
      });
      break;
    default:
      data.sort((left, right) => {
        return left[parameter].START - right[parameter].START;
      });
  }
  return data;
};

const isPastEvent = (event) => {
  return event.date.START < dayjs();
};

const resetFormState = (formComponent) => {
  formComponent.updateData({
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });
};

export {
  humanizeDate,
  sortData,
  SortType,
  isPastEvent,
  resetFormState,
};
