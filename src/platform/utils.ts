const RAD_TO_DEG = 57.2958;
const DEG_TO_RAD = 0.0174533;

type Vector = { x: number; y: number };

export const distanceBetween = (vectorA: Vector, vectorB: Vector) => {
  const { x: x1, y: y1 } = vectorA;
  const { x: x2, y: y2 } = vectorB;
  return Math.hypot(x2 - x1, y2 - y1);
};

export const angleBetween = (vectorA: Vector, vectorB: Vector) =>
  Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x) * RAD_TO_DEG;

export const pickRandom = (array: any[]) => {
  return array[(Math.random() * array.length) >> 0];
};

export const randomBetween = (from: number, to: number) =>
  Math.floor(Math.random() * to + from);

export const testChance = (chance: number) => 1 - Math.random() * 1 < chance;

export const orbitCoordinates = (degree, distance): Vector => {
  const x = -Math.cos(degree * DEG_TO_RAD) * distance;
  const y = -Math.sin(degree * DEG_TO_RAD) * distance;
  return { x, y };
};
