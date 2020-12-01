import dayjs from 'dayjs';

const draft = ``;
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template.trim();
  return container.firstChild;
};

const getRadomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
  draft,
  RenderPosition,
  render,
  renderTemplate,
  createElement,
  getRadomNum,
  generateRandomIndex,
  humanizeDate,
  checkEmptyData,
  getEmptyDataClassName,
  filterData,
};
