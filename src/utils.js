import dayjs from 'dayjs';

export const getRadomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomIndex = (data) => {
  const randomData = data[getRadomNum(0, data.length - 1)];
  return randomData;
};

export const humanizeDate = (format, date) => {
  return dayjs(date).format(format);
};

export const getEmptyDataClassName = (data) => data.length === 0 ? `visually-hidden` : ``;
