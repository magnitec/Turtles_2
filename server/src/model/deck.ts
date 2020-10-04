import { Card, CardSpec } from "shared";
import * as config from "../config";

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.cards = this.generateCards();
  }

  pickHand() {
    if (!this.cards || !this.cards.length) {
      throw new Error("Empty Deck");
    }
    if (this.cards.length < 5) {
      throw new Error(`Deck of length ${this.cards.length} is too short`);
    }

    return this.cards.splice(0, 5);
  }

  pickTopCard(): Card | undefined {
    return this.cards && this.cards.splice(0, 1)[0];
  }

  generateCards(): Card[] {
    const cards = config.cardTemplates.map(createCardsFromTemplate).flat(2);

    return shuffle(cards);
  }
}

const createCardsFromTemplate = ({
  movementType,
  movementAmount,
  spawnMultiplierBase,
  spawnAmountMulti,
}: CardSpec) => {
  return config.colors.map((color) => {
    const cardAmount =
      color === "multi" ? spawnAmountMulti : spawnMultiplierBase;

    const newCard: Card = {
      color,
      movementType,
      movementAmount,
    };

    return new Array(cardAmount).fill(newCard);
  });
};

const shuffle = (arr: any[]): any[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
