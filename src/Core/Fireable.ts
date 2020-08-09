import Bullet from "src/GameObjects/Bullet";

export default interface Fireable {
  disposeBullet(bullet: Bullet);
}