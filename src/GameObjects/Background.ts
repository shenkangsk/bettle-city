import GameObject from '../Core/GameObject';

export default class Background extends GameObject {
  move() {
    throw new Error("Method not implemented.");
  }
  dispose() {
    throw new Error("Method not implemented.");
  }
  draw() {
    const { ctx } = this;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 900, 900);
  }
}
