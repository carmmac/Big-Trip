export default class Storage {
  constructor(storage) {
    this._storage = storage;
  }

  getItems(storageKey) {
    try {
      return JSON.parse(this._storage.getItem(storageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  setItems(items, storageKey) {
    this._storage.setItem(
        storageKey,
        JSON.stringify(items)
    );
  }

  setItem(storageKey, itemKey, value) {
    const storage = this.getItems(storageKey);
    this._storage.setItem(
        storageKey,
        JSON.stringify(
            Object.assign(
                {},
                storage,
                {
                  [itemKey]: value,
                }
            )
        )
    );
  }

  removeItem(storageKey, itemKey) {
    const storage = this.getItems(storageKey);
    delete storage[itemKey];
    this._storage.setItem(
        storageKey,
        JSON.stringify(storage)
    );
  }
}
