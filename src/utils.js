import dayjs from 'dayjs';

export const draft = ``;
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

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

export const isEmpty = (data) => data.length === 0;

export const getEmptyDataClassName = (data) => isEmpty(data) ? `visually-hidden` : ``;

export const filterData = (data, parameter) => {
  const sortedEvents = data.slice();
  sortedEvents.sort((left, right) => {
    return left[parameter] - right[parameter];
  });
  return sortedEvents;
};
