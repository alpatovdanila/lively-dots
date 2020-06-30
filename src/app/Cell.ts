import { Bodies, Body, Sleeping } from "matter-js";
import { Food } from "./Food";
import { Actor } from "../platform/world";
import {
  distanceBetween,
  angleBetween,
  orbitCoordinates,
  testChance
} from "../platform/utils";
import { Chromosome } from "../platform/genethics";

export class Cell extends Actor {
  impulse: number;
  maxEnergy = 200;
  energy = 200;
  size: number;
  chromosome: Chromosome;

  constructor(x, y, chromosome: Chromosome) {
    super();
    this.chromosome = chromosome;
    this.size = chromosome.get("size").value;
    this.impulse = chromosome.get("impulse").value;

    this.body = Bodies.circle(x, y, this.size, {
      restitution: 0.8,
      frictionAir: 0.1
    });
  }

  onCollisionStart({ party }) {
    if (party instanceof Food) {
      party.remove();
      this.energy += 50;
    }

    if (party instanceof Cell) {
      if (this.size / party.size >= 2) {
        party.die();
        this.energy += party.energy;
      }
    }
  }

  die() {
    this.remove();
  }

  getClosestFood() {
    const allFood = this.repository.getByType(Food);
    return allFood.reduce(
      (closest, current) => {
        const distance = distanceBetween(
          current.body.position,
          this.body.position
        );
        if (distance < closest.distance)
          return {
            actor: current,
            distance
          };

        return closest;
      },
      {
        actor: null,
        distance: Infinity
      }
    );
  }

  getReproductionChance() {
    return 0.25 * (this.energy / this.maxEnergy);
  }

  reproduce() {
    const children = Array.from({ length: 2 }, () => {
      let newGenome = testChance(0.25)
        ? this.chromosome.mutate()
        : this.chromosome.fork();
      return new Cell(this.body.position.x, this.body.position.y, newGenome);
    });

    this.repository.add(children);
    this.die();
  }

  onSleepStart() {
    const closestFood = this.getClosestFood();
    if (closestFood.actor) {
      const direction = angleBetween(
        closestFood.actor.body.position,
        this.body.position
      );
      const vector = orbitCoordinates(direction, 0.00001 * this.impulse);
      Sleeping.set(this.body, false);
      Body.applyForce(this.body, this.body.position, vector);
    }

    if (this.energy > this.maxEnergy) this.energy = this.maxEnergy;
    this.energy -= this.impulse;
    this.body.render.opacity = this.energy / 100;
    if (testChance(this.getReproductionChance())) {
      this.reproduce();
      return false;
    }
    if (this.energy <= 0) {
      this.die();
      return false;
    }
  }
}
