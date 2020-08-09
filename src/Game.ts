import {Direction, GAME_STATUS} from './Utils/Constants';
import Background from './GameObjects/Background';
import Player from './GameObjects/Player';
import GameFrame from './Utils/GameFrame';
import KeyboardListener from './Utils/KeyboardListener';
import Resource from './Utils/Resource';

import gameConfig from './Config/game.json';
import resouces from './Config/resource.json';
import GameObject from './Core/GameObject';

export default class Game {
  private _ctx: CanvasRenderingContext2D;
  private _frame: GameFrame;
  private _bg: Background;
  players: Player[];
  private _keyboard: KeyboardListener;
  private _resource: Resource;

  constructor() {
    this._ctx = document.querySelector<any>('#battleCity').getContext('2d');
    this._frame = new GameFrame(gameConfig.FPS);
    this.players = [];
    this._bg = new Background(this._ctx);
    this._keyboard = new KeyboardListener();
    this._resource = new Resource('assets');
    this.initialize();
  }

  private initialize() {
    // 将绘制操作添加到游戏帧中
    this._frame.addCb(this.run.bind(this));

    this._frame.start();

    this._keyboard.listen();

    Object.keys(resouces.images).forEach((key) =>
      this._resource.loadImage(resouces.images[key].filename)
    );
  }

  private run() {
    this._bg.draw();
    this.players.forEach((player) => {
      player.bullets.forEach(this.handleGameObjectByStatus);
      this.handleGameObjectByStatus(player);
    });
  }

  private handleGameObjectByStatus(obj) {
    console.log(obj.status);
    switch (obj.status) {
      case GAME_STATUS.MOVING:
        obj.move();
        break;
      case GAME_STATUS.DISPOSE:
        obj.dispose();
        break;
      case GAME_STATUS.FIRE:
        obj.fire();
        break;
    }

    obj.draw();
  }

  getCtx() {
    return this._ctx;
  }

  getFrame() {
    return this._frame;
  }

  getResource() {
    return this._resource;
  }

  start() {
    const player1 = new Player(this, 0, 0, 50, 50);
    this.players[0] = player1;

    this._keyboard.on('keyChange', this.onKeyChange.bind(this));
    this._keyboard.on('keyChange', console.log);
  }

  onKeyChange(code: string) {
    const player1 = this.players[0];

    switch (code) {
      case 'KeyW':
        player1.stillMove(Direction.UP);
        break;
      case 'KeyS':
        player1.stillMove(Direction.DOWN);
        break;
      case 'KeyA':
        player1.stillMove(Direction.LEFT);
        break;
      case 'KeyD':
        player1.stillMove(Direction.RIGHT);
        break;
      case '':
        player1.stopMove();
        player1.stopFire();
        break;
      case 'Space':
        console.log('Fire');
        player1.stillFire();
        break;
    }
  }
}
