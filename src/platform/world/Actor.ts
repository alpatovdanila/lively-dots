import { Body } from "matter-js";
import { CollisionEvent } from "./EventsManager";
import { ActorsRepository } from "./ActorsRepository";

export abstract class Actor {
  body: Body;
  repository: ActorsRepository | null;
  onCollisionStart(event: CollisionEvent) {}
  onCollisionEnd(event: CollisionEvent) {}
  onCollisionActive(event: CollisionEvent) {}
  onSleepStart() {}
  onSleepEnd() {}
  onRemoved(repository: Repository) {}

  register(repository: ActorsRepository) {
    this.repository = repository;
  }

  unregister() {
    this.repository = null;
  }

  remove() {
    if (this.repository) this.repository.remove(this);
  }
}
