

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

const getTimeFromMinutes = (minutes) => {
  const hours = Math.trunc(minutes / 60);
  const restMinutes = minutes % 60;
  return `${hours}:${restMinutes}`;
};

const getEventDuration = (endDate, startDate) => {
  return endDate.diff(startDate, `minute`);
};

export {
  getRandomNum,
  getEmptyDataClassName,
  getUpdatedList,
  getTimeFromMinutes,
  getEventDuration
};
