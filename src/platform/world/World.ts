import { Engine, Render, Runner } from "matter-js";
import { ActorsRepository } from "./ActorsRepository";

export class World {
  readonly actors: ActorsRepository;
  private engine: Engine;
  private runner: Runner;

  constructor(
    element: HTMLElement,
    { width, height, iterations, wireframes = true }
  ) {
    const engine = Engine.create({
      enableSleeping: true,
      positionIterations: iterations,
      velocityIterations: iterations
    });

    const render = Render.create({
      element,
      engine,
      options: {
        width: width,
        height: height,
        wireframes
      }
    });

    engine.world.gravity.y = 0;
    const runner = Runner.create({});
    Render.run(render);
    Runner.run(runner, engine);

    const actors = new ActorsRepository(engine);
    this.engine = engine;
    this.actors = actors;
    this.runner = runner;
  }
}
