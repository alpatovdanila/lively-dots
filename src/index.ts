import { World } from "./platform/world";
import { Cell } from "./app/Cell";
import { Wall } from "./app/Wall";
import { Food } from "./app/Food";
import { randomBetween } from "./platform/utils";
import { Chromosome } from "./platform/genethics";
const world = new World(document.getElementById("app"), {
  width: 600,
  height: 600,
  iterations: 16,
  wireframes: false
});

const chromosome = Chromosome.create([
  {
    name: "impulse",
    value: 50,
    range: [0, 100],
    mutationStep: 1
  },
  {
    name: "size",
    value: 2,
    range: [2, 50],
    mutationStep: 2
  }
]);

world.actors.add([
  new Wall(300, -20, 600, 40),
  new Wall(300, 620, 600, 40),
  new Wall(-20, 300, 40, 600),
  new Wall(620, 300, 40, 600),
  ...Array.from({ length: 50 }, () => new Food()),
  ...Array.from(
    { length: 100 },
    () => new Cell(randomBetween(50, 550), randomBetween(50, 550), chromosome)
  )
]);

console.log(world);
