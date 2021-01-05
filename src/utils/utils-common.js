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

const formatEventDuration = (endDate, startDate) => {
  const EventDuration = {
    DAY: Math.trunc(getEventDuration(endDate, startDate, `day`)),
    HOUR: Math.trunc(getEventDuration(endDate, startDate, `hour`)),
    MINUTE: Math.trunc(getEventDuration(endDate, startDate, `minute`) % 60)
  };
  const duration = dayjs().hour(EventDuration.HOUR).minute(EventDuration.MINUTE);

  if (EventDuration.DAY > 0) {
    return `${EventDuration.DAY}D ${duration.$H}H ${duration.$m}M`;
  }
  if (EventDuration.HOUR > 0) {
    return `${duration.$H}H ${duration.$m}M`;
  }
  return `${duration.$m}M`;
};

const getEventDuration = (endDate, startDate, format) => {
  return endDate.diff(startDate, format);
};

export {
  getRandomNum,
  getEmptyDataClassName,
  getUpdatedList,
  formatEventDuration,
  getEventDuration,
};
