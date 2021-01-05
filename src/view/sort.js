import AbstractView from './absract.js';
import {draft} from '../utils/utils-render.js';
import {SortType} from '../const.js';

const createListSortTemplate = (sortTypeNames, currentSortType) => {
  const renderSortItems = () => {
    return sortTypeNames.reduce((finalTemplate, currentSortTypeItem) => {
      const getCheckedSortItemAttribute = SortType[currentSortTypeItem] === currentSortType ? `checked` : ``;
      const isSortItemDisabled = () => currentSortTypeItem === `OFFER` || currentSortTypeItem === `EVENT`;
      const getDisabledSortItemAttribute = isSortItemDisabled() ? `disabled` : ``;
      const getDataSetSortAttribute = isSortItemDisabled() ? `` : `data-sort-type="${SortType[currentSortTypeItem]}"`;
      const currentTemplate = `
      <div class="trip-sort__item  trip-sort__item--${currentSortTypeItem.toLowerCase()}">
        <input id="sort-${currentSortTypeItem.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${currentSortTypeItem.toLowerCase()}" ${getCheckedSortItemAttribute} ${getDisabledSortItemAttribute}>
        <label class="trip-sort__btn" for="sort-${currentSortTypeItem.toLowerCase()}" ${getDataSetSortAttribute}>${currentSortTypeItem}</label>
      </div>`;
      return `${currentTemplate}${finalTemplate}`;
    }, draft);
  };

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${renderSortItems()}
    </form>
  `;
};

export default class ListSort extends AbstractView {
  constructor(sortTypeNames, currentSortType) {
    super();
    this._sortTypeNames = sortTypeNames;
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createListSortTemplate(this._sortTypeNames, this._currentSortType);
  }
  _sortTypeChangeHandler(evt) {
    if (typeof this._callback.sort === `function`) {
      if (!evt.target.hasAttribute(`data-sort-type`)) {
        return;
      }
      this._callback.sort(evt.target.dataset.sortType);
    }
  }
  setSortTypeChangeHandler(callback) {
    this._callback.sort = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
