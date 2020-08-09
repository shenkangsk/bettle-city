class GameFrame {
  private _fpsInterval: number;
  private _lastFrame: number;
  private _fps: number;
  private _cbs: (() => void)[];
  private _stop: boolean;

  constructor(fps: number) {
    this._fps = fps;
    this._cbs = [];
    this._fpsInterval = 1000 / this._fps;
    this._lastFrame = new Date().getTime();
    this._stop = false;
  }

  setFPS(fps: number) {
    this._fps = fps;
    this._fpsInterval = 1000 / this._fps;
    return this;
  }

  addCb(cb: () => void) {
    this._cbs.push(cb);
    
    return this;
  }

  removeCb(cb: () => void) {
    const pos = this._cbs.indexOf(cb);

    if (pos >= 0) {
      this._cbs.splice(pos, 1);
    }

    return this;
  }

  start() {
    if (this._stop) {
      return this;
    }

    requestAnimationFrame(this.start.bind(this));

    const now = new Date().getTime();

    const elapsed = now - this._lastFrame;

    if (elapsed > this._fpsInterval) {
      this._lastFrame = now - (elapsed % this._fpsInterval);

      this.execute();
    }

    return this;
  }

  execute() {
    this._cbs.forEach((cb) => cb());

    return this;
  }

  stop() {
    this._stop = true;

    return this;
  }
}

export default GameFrame;
