import dayjs from "dayjs";


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
  if (days > 0) {
    return `${days}D ${hours - (days * 24)}H ${minutes}M`;
  }
  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

const getEventDuration = (endDate, startDate) => {
  return endDate.diff(startDate, `minute`);
};

export {
  getRandomNum,
  getEmptyDataClassName,
  getUpdatedList,
  formatEventDuration,
  getEventDuration,
};
