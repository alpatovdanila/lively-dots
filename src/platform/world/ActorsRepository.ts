import { Actor } from "./Actor";
import { Engine, Composite } from "matter-js";
import { EventsManager } from "./EventsManager";
import { Body } from "matter-js";

export class ActorsRepository {
  private actors: Actor[];
  private engine: Engine;
  private eventsManager: EventsManager;
  private bodyToActor: Map<Body, Actor> = new Map();

  constructor(engine: Engine) {
    this.engine = engine;
    this.eventsManager = new EventsManager(engine, this);
    this.actors = [];
  }

  private addActor(actor: Actor) {
    this.actors.push(actor);
    actor.register(this);
    requestAnimationFrame(() => Composite.add(this.engine.world, actor.body));
    this.eventsManager.register(actor);
    this.bodyToActor.set(actor.body, actor);
  }

  private removeActor(actor: Actor) {
    this.bodyToActor.delete(actor.body);
    actor.unregister();
    this.actors.splice(this.actors.indexOf(actor), 1);
    Composite.remove(this.engine.world, actor.body);
    this.eventsManager.unregister(actor);
    actor.onRemoved(this);
  }

  add(actor: Actor | Actor[]) {
    if (actor instanceof Array) actor.forEach(a => this.addActor(a));
    else this.addActor(actor);
  }

  remove(actor: Actor | Actor[]) {
    if (actor instanceof Array) actor.forEach(a => this.removeActor(a));
    else this.removeActor(actor);
  }

  all() {
    return this.actors;
  }

  getByBody(body: Body): Actor | null {
    return this.bodyToActor.get(body);
  }

  getByType(body: { new (): Actor }): Actor[] {
    return this.actors.filter(actor => actor instanceof body);
  }

  getByLabel() {}
}
