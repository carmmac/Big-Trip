import AbstractView from './absract.js';
import {draft} from '../utils/utils-render.js';

const createMenuTemplate = (menuItems, activeMenuItem) => {
  const renderMenuItems = () => {
    return menuItems.reduce((finalTemplate, currentMenuItemValue) => {
      const getActiveMenuItemClassName = currentMenuItemValue === activeMenuItem ? `trip-tabs__btn--active` : ``;
      const currentTemplate =
        `<a class="trip-tabs__btn ${getActiveMenuItemClassName}" href="#">${currentMenuItemValue}</a>`;
      return `${currentTemplate}${finalTemplate}`;
    }, draft);
  };
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${renderMenuItems()}
    </nav>
  `;
};

export default class Menu extends AbstractView {
  constructor(menuItems, activeMenuItem) {
    super();
    this._menuItems = menuItems;
    this._activeMenuItem = activeMenuItem;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }
  getTemplate() {
    return createMenuTemplate(this._menuItems, this._activeMenuItem);
  }
  _menuClickHandler(evt) {
    evt.preventDefault();
    if (typeof this._callback.menuClick === `function` && evt.target.tagName === `A`) {
      this._callback.menuClick(evt.target.textContent);
    }
  }
  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
