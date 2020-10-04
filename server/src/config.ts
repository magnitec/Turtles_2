import { CardSpec, CardColor } from "shared";

export const cardTemplates: CardSpec[] = [
  {
    movementType: "forward",
    movementAmount: 1,
    spawnMultiplierBase: 5,
    spawnAmountMulti: 5,
  },
  {
    movementType: "forward",
    movementAmount: 2,
    spawnMultiplierBase: 1,
    spawnAmountMulti: 0,
  },
  {
    movementType: "backward",
    movementAmount: 1,
    spawnMultiplierBase: 1,
    spawnAmountMulti: 1,
  },
  {
    movementType: "backward",
    movementAmount: 2,
    spawnMultiplierBase: 0,
    spawnAmountMulti: 1,
  },
  {
    movementType: "last",
    movementAmount: 1,
    spawnMultiplierBase: 1,
    spawnAmountMulti: 0,
  },
  {
    movementType: "last",
    movementAmount: 2,
    spawnMultiplierBase: 1,
    spawnAmountMulti: 0,
  },
];

export const colors: CardColor[] = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "multi",
];

export const tileAmount = 10; // client?
