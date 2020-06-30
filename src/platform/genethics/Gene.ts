import { pickRandom } from "../utils";

export type GeneDefinition = {
  name: string;
  value: number;
  range?: [number, number];
  mutationStep?: number;
};

export class Gene {
  readonly value: number;
  readonly name: string;
  readonly range: [number, number] | null;
  readonly mutationStep: number | null;

  constructor({ name, value, range, mutationStep }: GeneDefinition) {
    this.name = name;
    this.value = value;
    this.range = range || null;
    this.mutationStep = mutationStep || null;
  }

  /** Returns a copy of the gene with mutation */
  mutate(): Gene {
    let newValue = this.value;

    if (this.mutationStep && this.range) {
      const mutationSign = pickRandom([-1, 1]);
      const {
        range: [min, max],
        mutationStep,
        value
      } = this;

      newValue = value + mutationStep * mutationSign;
      if (newValue > max) newValue = max;
      if (newValue < min) newValue = min;
    }

    return new Gene({
      name: this.name,
      value: newValue,
      range: this.range,
      mutationStep: this.mutationStep
    });
  }

  /** Copies gene as-is with no mutations */
  fork(): Gene {
    return new Gene({
      name: this.name,
      value: this.value,
      range: this.range,
      mutationStep: this.mutationStep
    });
  }

  toString() {
    return this.value;
  }
}
