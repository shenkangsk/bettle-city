import Drawable from './Drawable';
import Game from 'src/Game';
import {Direction, GAME_STATUS} from 'src/Utils/Constants';
import Moveable from './Moveable';

export default abstract class GameObject implements Drawable, Moveable {
  x: number;
  y: number;
  width: number;
  height: number;
  game: Game;
  dir: Direction;
  layer: number;
  status: GAME_STATUS

  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  abstract move();

  abstract draw();

  abstract dispose();
}
