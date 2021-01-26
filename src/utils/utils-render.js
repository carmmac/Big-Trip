import AbstractView from '../view/absract.js';

const draft = ``;
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
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

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export {
  RenderPosition,
  render,
  renderTemplate,
  createElement,
  replace,
  remove,
  draft,
};
