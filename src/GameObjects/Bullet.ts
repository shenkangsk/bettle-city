import GameObject from '../Core/GameObject';
import Moveable from '../Core/Moveable';
import Game from '../Game';
import Fireable from '../Core/Fireable';
import {Direction, GAME_STATUS} from '../Utils/Constants';

import resource from '../Config/resource.json';

export default class Bullet extends GameObject implements Moveable {
  dispose() {
    this.parent.disposeBullet(this);
  }
  parent: Fireable;
  speed: number;
  layer: 4;

  constructor(
    game: Game,
    parent: Fireable,
    x: number,
    y: number,
    dir: Direction,
    status: GAME_STATUS
  ) {
    super(game.getCtx());
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.game = game;
    this.speed = 4;
    this.dir = dir;
    this.status = status;
  }

  move() {
    switch (this.dir) {
      case Direction.UP:
        this.y -= this.speed;
        break;
      case Direction.DOWN:
        this.y += this.speed;
        break;
      case Direction.LEFT:
        this.x -= this.speed;
        break;
      case Direction.RIGHT:
        this.x += this.speed;
        break;
    }
    console.log(this.x, this.y);
    if (this.x < 0 || this.y < 0 || this.x > 900 || this.y > 900) {
      this.parent.disposeBullet(this);
    }
  }
  draw() {
    const res = this.game.getResource();
    const {general} = resource.images;
    const {ctx} = this;
    ctx.drawImage(
      res.getImage(general.filename),
      16 * 20,
      16 * 6,
      8,
      16,
      this.x,
      this.y,
      16,
      32
    );
  }
}
