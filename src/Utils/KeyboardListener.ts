export default class KeyboardListener {
  private _cbs;
  private _lastCode: string = '';
  private _keyUpTimeout;
  constructor() {
    this._cbs = {};
  }
  on(event, cb) {
    if (!this._cbs[event]) {
      this._cbs[event] = [];
    }
    this._cbs[event].push(cb);
  }
  listen() {
    this.on('keyChange', (code) => (this._lastCode = code));

    document.addEventListener('keypress', ({code}) => {
      clearTimeout(this._keyUpTimeout);

      if (this._lastCode !== code) {
        this.notify('keyChange', code);
      }

      this._keyUpTimeout = setTimeout(() => {
        this.notify('keyChange', '');
      }, 500);
    });
  }

  notify(event, value) {
    this._cbs[event]?.forEach((cb) => cb(value));
  }
}
