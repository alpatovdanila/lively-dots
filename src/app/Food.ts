import { Bodies } from "matter-js";
import { Actor } from "../platform/world";
import { randomBetween } from "../platform/utils";
export class Food extends Actor {
  constructor() {
    super();
    this.body = Bodies.circle(
      randomBetween(50, 550),
      randomBetween(50, 550),
      1,
      {
        isStatic: true,
        isSensor: true,
        render: { fillStyle: "cyan" }
      }
    );
  }

  onRemoved(repository) {
    setTimeout(() => {
      repository.add(new Food());
    }, randomBetween(1000, 2000));
  }
}
