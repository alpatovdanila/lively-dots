import { Engine, Events, IEventCollision } from "matter-js";
import { Actor } from "./Actor";
import { ActorsRepository } from "./ActorsRepository";

export type CollisionEvent = {
  party: Actor;
};

export class EventsManager {
  listeners: Actor[];
  actors: ActorsRepository;
  engine: Engine;

  constructor(engine: Engine, actors: ActorsRepository) {
    this.actors = actors;
    this.engine = engine;
    this.listeners = [];

    Events.on(engine, "collisionStart", event => {
      this.dispatchCollisionEvent(event, (listener, event) => {
        listener.onCollisionStart(event);
      });
    });

    Events.on(engine, "collisionEnd", event => {
      this.dispatchCollisionEvent(event, (listener, event) =>
        listener.onCollisionEnd(event)
      );
    });

    Events.on(engine, "collisionActive", event => {
      this.dispatchCollisionEvent(event, (listener, event) =>
        listener.onCollisionActive(event)
      );
    });
  }

  register(listener: Actor) {
    this.listeners.push(listener);
    Events.on(listener.body, "sleepStart", () => listener.onSleepStart());
    Events.on(listener.body, "sleepEnd", () => listener.onSleepEnd());
  }

  unregister(listener: Actor) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }

  private dispatchCollisionEvent(
    event: IEventCollision<Engine>,
    dispatcher: (listener: Actor, event: CollisionEvent) => void
  ) {
    event.pairs.forEach(pair => {
      this.listeners.forEach(actor => {
        const { bodyA, bodyB } = pair;
        if (actor.body === bodyA || actor.body === bodyB) {
          const collisionEvent: CollisionEvent = {
            party:
              actor.body === bodyA
                ? this.actors.getByBody(bodyB)
                : this.actors.getByBody(bodyA)
          };
          dispatcher(actor, collisionEvent);
        }
      });
    });
  }
}
