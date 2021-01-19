import FiltersView from '../view/filters.js';
import {UpdateType} from '../const.js';
import {FilterType} from '../const.js';
import {render, RenderPosition, replace, remove} from '../utils/utils-render.js';
import {filtration} from '../utils/utils-filter.js';


export default class Filter {
  constructor(filterContainer, filterModel, eventModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventModel;
    this._currentFilter = null;
    this._filters = [];
    this._filterComponent = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._modelUpdateHandler = this._modelUpdateHandler.bind(this);

    this._filterModel.addObserver(this._modelUpdateHandler);
    this._eventsModel.addObserver(this._modelUpdateHandler);
  }

  init() {
    const filterButtonsState = this._checkDisabledFilterButtons();
    this._filters = Object.keys(FilterType);
    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FiltersView(this._filters, this._currentFilter, filterButtonsState);
    this._filterComponent.setFilterTypeChangeHandler(this._filterChangeHandler);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _modelUpdateHandler() {
    this.init();
  }

  _filterChangeHandler(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _checkDisabledFilterButtons() {
    const events = this._eventsModel.getEvents();
    let isButtonPastDisabled = false;
    let isButtonFutureDisabled = false;
    if (filtration[FilterType.PAST](events).length === 0) {
      isButtonPastDisabled = true;
    }
    if (filtration[FilterType.FUTURE](events).length === 0) {
      isButtonFutureDisabled = true;
    }
    return {
      PAST: isButtonPastDisabled,
      FUTURE: isButtonFutureDisabled,
      EVERYTHING: false,
    };
  }
}
