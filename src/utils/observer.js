export default class Observer {
  constructor() {
    this._observers = [];
  }
  addObserver(observer) {
    this._observers.push(observer);
  }
  removeObserver(observer) {
    this._observers.filter((item) => item !== observer);
  }
  notify(instance, payload) {
    this._observers.forEach((observer) => observer(instance, payload));
  }
}
