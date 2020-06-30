import { Bodies } from "matter-js";
import { Actor } from "../platform/world";

export class Wall extends Actor {
  constructor(x, y, w, h) {
    super();
    this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
  }
}
