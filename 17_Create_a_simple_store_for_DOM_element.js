class NodeStore {
  constructor() {
    this._nodeKey = `__node_store_key_${Date.now()}`;
    this._store = {};
  }

  set(node, value) {
    if (this._isValidNode(node)) {
      if (!node[this._nodeKey]) {
        node[this._nodeKey] = `key_${Date.now()}_${Math.random()}`;
      }
      this._store[node[this._nodeKey]] = value;
    }
  }

  get(node) {
    if (this._isValidNode(node) && node[this._nodeKey]) {
      return this._store[node[this._nodeKey]];
    }
    return undefined;
  }

  has(node) {
    return (
      this._isValidNode(node) &&
      !!node[this._nodeKey] &&
      this._store.hasOwnProperty(node[this._nodeKey])
    );
  }

  _isValidNode(node) {
    return node && typeof node === "object" && node.nodeType !== undefined;
  }
}
