import { Card } from "shared";
import { Deck } from "./deck";

enum Team {
  Blue,
  Red,
  Green,
  Yellow,
  Violet,
}

const allTeams = Object.values(Team).filter(
  (value) => typeof value === "number"
) as Team[];

const colors: { [key in Team]: string } = {
  [Team.Blue]: "#4293f5",
  [Team.Red]: "#f54242",
  [Team.Green]: "#31eb6f",
  [Team.Yellow]: "#fae141",
  [Team.Violet]: "#a05de3",
};

export class Player {
  public name: string;
  public team: Team;
  public hand: Card[]; // you can have [Card, Card, Card, Card, Card];
  public state: "awaiting" | "ready" | "finished";
  // ^ or finished at which place. Must take into account dynamic numbers of players, not hardcoded;

  constructor(name: string, existing: Player[], deck: Deck) {
    this.name = name;
    this.team = this.assignTeam(existing);
    this.hand = deck.pickHand();
    this.state = "awaiting";
  }

  private assignTeam(existing: Player[]) {
    const usedTeams = existing.map((player) => player.team);
    const remainingTeams = allTeams.filter((team) => !usedTeams.includes(team));
    const randomIdx = Math.floor(Math.random() * remainingTeams.length);

    return remainingTeams[randomIdx];
  }
}
