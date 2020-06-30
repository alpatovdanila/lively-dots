import { pickRandom } from "../utils";
import { Gene, GeneDefinition } from "./Gene";

export class Chromosome {
  readonly genes: Gene[];
  readonly prev: Chromosome;

  constructor(genes: Gene[], prev = null) {
    this.genes = genes;
    this.prev = null;
  }

  /** Copy chromosome as is without mutations */
  fork(): Chromosome {
    const materialCopy = this.genes.map(gene => gene.fork());
    return new Chromosome(materialCopy, this);
  }

  mutate(): Chromosome {
    const genes = this.genes.map(gene => gene.fork());
    const mutationTarget = pickRandom(genes);
    const mutantGenes = genes.map(gene =>
      gene === mutationTarget ? gene.mutate() : gene
    );
    return new Chromosome(mutantGenes, this);
  }

  /** Get gene by gene name */
  get(geneName: string): Gene {
    return this.genes.find(gene => gene.name === geneName);
  }

  get generation() {
    return this.prev ? this.prev.generation + 1 : 1;
  }

  /**
   * Create gene from geneDefinitions array, this is shortcut to
   * new Chromosome([new Gene({geneDefinition}), ...])
   * @param geneDefinitions
   */
  static create(geneDefinitions: GeneDefinition[]) {
    return new Chromosome(
      geneDefinitions.map(definition => new Gene(definition))
    );
  }

  toString() {
    return this.genes.map(gene => gene.toString()).join("-");
  }
}
