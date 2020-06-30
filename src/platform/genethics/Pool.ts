import { Chromosome } from "./Chromosome";

export class Population {
  private chromosomes: Chromosome[];
  readonly prev: Population;

  constructor(chromosomes: Chromosome[]) {
    this.chromosomes = chromosomes;
  }

  private addChromosome(chromosome: Chromosome) {
    this.chromosomes.push(chromosome);
  }

  private removeChromosome(chromosome: Chromosome) {
    this.chromosomes.splice(this.chromosomes.indexOf(chromosome), 1);
  }

  add(chromosome: Chromosome[] | Chromosome) {
    if (chromosome instanceof Array)
      chromosome.forEach(c => this.addChromosome(c));
    else this.addChromosome(chromosome);
    return this;
  }

  remove(chromosome: Chromosome[] | Chromosome) {
    if (chromosome instanceof Array)
      chromosome.forEach(c => this.removeChromosome(c));
    else this.addChromosome(chromosome);
    return this;
  }

  clear() {
    this.chromosomes = [];
    return this;
  }

  all() {
    return this.chromosomes;
  }

  toString() {
    return this.chromosomes.map(chromosome => chromosome.toString()).join(" ");
  }
}
