import GameObject from '../Core/GameObject';
import {Direction, GAME_STATUS} from '../Utils/Constants';
import Game from '../Game';
import Moveable from '../Core/Moveable';

import resource from '../Config/resource.json';
import Bullet from './Bullet';
import Fireable from '../Core/Fireable';

const SPEED = 1;

const TANK_SIZE = 15;
const START_X = 0;
const START_Y = 0;

export default class Player extends GameObject implements Moveable, Fireable {
  dispose() {
    this.game.players = [];
  }
  private _speed: number;
  private _status: GAME_STATUS;
  private bulletReloading: boolean;
  reloadingTimer;
  bullets: Bullet[];
  layer = 5;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    super(game.getCtx());
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this._speed = SPEED;
    this._status = GAME_STATUS.STAND;
    this.dir = Direction.UP;
    this.bullets = [];
    this.bulletReloading = false;
  }

  disposeBullet(bullet: Bullet) {
    const pos = this.bullets.indexOf(bullet);
    if (pos >= 0) {
      this.bullets.splice(pos, 1);
    }
  }

  move() {
    switch (this.dir) {
      case Direction.UP:
        this.y -= this._speed;
        break;
      case Direction.DOWN:
        this.y += this._speed;
        break;
      case Direction.LEFT:
        this.x -= this._speed;
        break;
      case Direction.RIGHT:
        this.x += this._speed;
        break;
    }
  }

  fire() {
    if (this.bulletReloading) {
      return;
    }
    const bullet = new Bullet(
      this.game,
      this,
      this.x,
      this.y,
      this.dir,
      GAME_STATUS.MOVING
    );
    this.bullets.push(bullet);
    this.bulletReloading = true;

    this.reloadingTimer = setTimeout(() => (this.bulletReloading = false), 500);
  }

  stillFire() {
    this.status = GAME_STATUS.FIRE;
  }

  stopFire() {
    this.status = GAME_STATUS.STAND;
  }

  axis: 'x' | 'y';
  offset: number;
  offsetValue: number;

  stillMove(dir: Direction) {
    this.setDir(dir);
    this.status = GAME_STATUS.MOVING;

    this.timeout = setInterval(
      () => (this.count = this.count === 1 ? 0 : 1),
      800
    );

    return this;
  }

  stopMove() {
    this.status = GAME_STATUS.STAND;
    return this;
  }

  setDir(dir: Direction) {
    this.dir = dir;
    console.log(dir);
    return this;
  }

  count = 0;
  timeout;

  draw() {
    const res = this.game.getResource();
    const {general} = resource.images;
    const {ctx} = this;
    ctx.drawImage(
      res.getImage(general.filename),
      16 * (this.dir * 2 + this.count),
      START_Y,
      16,
      16,
      this.x,
      this.y,
      32,
      32
    );
  }
}
