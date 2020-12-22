

const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getEmptyDataClassName = (data) => data.length === 0 ? `visually-hidden` : ``;

const getUpdatedList = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }
  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}:${minutes}`;
};

export {
  getRandomNum,
  getEmptyDataClassName,
  getUpdatedList,
  getTimeFromMins,
};
