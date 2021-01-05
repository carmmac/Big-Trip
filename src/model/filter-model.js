import Observer from '../utils/observer.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }
  getFilter() {
    return this._activeFilter;
  }
  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this.notify(updateType, filter);
  }
}
