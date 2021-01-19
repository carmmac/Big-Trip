export default class Storage {
  constructor(key, storage) {
    this._storage = storage;
    this._storageKey = key;
  }
  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
        this._storage,
        JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const storage = this._storage.getItems();
    storage.setItem(
        this._storageKey,
        JSON.stringify(
            Object.assign(
                {},
                storage,
                {
                  [key]: value,
                }
            )
        )
    );
  }

  removeItem(key) {
    const storage = this._storage.getItems();
    delete storage[key];
    this._storage.setItem(
        this._storageKey,
        JSON.stringify(storage)
    );
  }
}
