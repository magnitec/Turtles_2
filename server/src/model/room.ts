import uuidv4 from "uuid/v4";
import { Player } from "./player";
import { Deck } from "./deck";

export class Room {
  public id: string;
  public deck: Deck;
  public turn: Player | null;
  public players: Player[] = [];

  constructor() {
    this.id = uuidv4(); // move outside after object is initialized to do dependency injection
    this.deck = new Deck();
    this.turn = null;
  }

  public getPlayers = () => [...this.players];

  public createAndAddPlayer(username: string) {
    if (this.players.length >= 5) {
      throw Error("User capacity reached!");
    }

    const newPlayer = new Player(username, this.players, this.deck);
    this.players.push(newPlayer);

    return newPlayer;
  }
}

// type Room = {
//   id: string;
//   getPlayers: () => Player[];
//   addPlayer: (username: string) => Player;
//   deck: Deck;
//   turn: Player | null;
// };

// const createRoom = (): Room => {
//   const players: Player[] = [];
//   const getPlayers = () => [...players];
//   const deck = new Deck();
//   deck.generateCards();

//   const addPlayer = (username: string) => {
//     if (players.length >= 5) {
//       throw Error("User capacity reached");
//     }

//     const newPlayer = new Player(username, players, deck);
//     players.push(newPlayer);

//     return newPlayer;
//   };

//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
//   return {
//     id: uuidv4(),
//     getPlayers,
//     addPlayer,
//     deck,
//     turn: null,
//   };
// };

// export { Room, createRoom };
