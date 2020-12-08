import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import TripBoardView from '../view/board.js';
import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import EmptyListView from '../view/list-empty.js';
import HeadingView from '../view/heading.js';
import {render, RenderPosition} from '../utils/utils-render.js';
import {checkEmptyData} from '../utils/utils-common.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripBoardComponent = new TripBoardView();
    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();
    this._headingComponent = new HeadingView();
  }
  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
  }
  renderSort() {}
  renderEvent() {}
  renderList() {}
  renderEmptyList() {}
  renderTrip() {}
}
