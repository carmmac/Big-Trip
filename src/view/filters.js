import AbstractView from './absract.js';
import {FilterType} from '../const.js';
import {draft} from '../utils/utils-render.js';

const createFiltersTemplate = (filters, currentFilter) => {
  const renderFilterItems = () => {
    return filters.reduce((finalTemplate, currentFilterItem) => {
      const getCheckedFilterAttribute = FilterType[currentFilterItem] === currentFilter ? `checked` : ``;
      const currentTemplate = `
        <div class="trip-filters__filter">
          <input id="filter-${FilterType[currentFilterItem].toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType[currentFilterItem]}" ${getCheckedFilterAttribute}>
          <label class="trip-filters__filter-label" for="filter-${FilterType[currentFilterItem].toLowerCase()}">${FilterType[currentFilterItem]}</label>
        </div>
      `;
      return `${currentTemplate}${finalTemplate}`;
    }, draft);
  };

  return `
    <form class="trip-filters" action="#" method="get">
      ${renderFilterItems()}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (typeof this._callback.filterChange === `function`) {
      this._callback.filterChange(evt.target.value);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
