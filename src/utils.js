import dayjs from 'dayjs';
import AbstractView from './view/absract.js';

const draft = ``;
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
const HeadingTitle = {
  LIST: `Trip events`,
  MENU: `Switch trip view`,
  FILTER: `Filter events`,
};

const render = (container, child, position) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  if (child instanceof AbstractView) {
    child = child.getElement();
  }
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      return;
    case RenderPosition.BEFOREEND:
      container.append(child);
      return;
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;
  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  parent.replaceChild(newChild, oldChild);
};

const renderTemplate = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
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
  HeadingTitle,
  replace,
};
