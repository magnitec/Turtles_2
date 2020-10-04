import { createServer, ServerResponse } from "http";
import io from "socket.io";
import { Room } from "./model/room";
import { Player } from "./model/player";
import { players, rooms } from "./model";
import { route } from "./routes";
import { Card } from "shared";

const setCorsHeaders = (response: ServerResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Request-Method", "*");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.setHeader("Access-Control-Allow-Headers", "*");
};

const http = createServer(async (request, response) => {
  setCorsHeaders(response);
  const [code, data] = await route(request);

  response.writeHead(code);
  response.write(data);
  response.end();
});

// -----

type Move = {
  player: Player;
  card: Card;
};

const sio = io(http);
const nsp = sio.of(/.*/);

nsp.on("connection", (socket) => {
  const playerName = socket.handshake.query.playerName;
  const roomName = socket.nsp.name.slice(1);
  const player = <Player>players.get(playerName);
  const room = <Room>rooms.get(roomName);

  // console.log("New client connected", playerName, room);

  const privateData = {
    playerHand: player.hand,
    playerTeam: player.team,
  };

  const publicData = {
    playerName: player.name,
    turn: room.turn?.name,
  };

  // emit private data to player
  socket.emit("private", privateData);

  // Broadcast publicData to everyone in the room/
  sio.of(socket.nsp.name).emit("public", publicData);

  socket.on("move", (data: Move) => {
    console.log("Client moved", data);
    // check which player

    console.log("player is moving...");
    console.log("player", player);

    // check if their turn
    console.log("is their turn", room.turn === player);

    if (room.turn !== player) {
      throw new Error("Invalid turn for player" + player);
    }

    // check if they already won
    console.log("has won?", player.state === "finished");

    if (player.state === "finished") {
      throw new Error("Invalid move - player has finished" + player);
    }

    // get card data
    console.log("card", data.card);
    // change turtles states accordingly to that card
    // check if somebody finished
    // if everyone finished, end the game
    // if the player finished change his state to finished

    // move that card from hand to used
    // check if deck empty and refill if empty
    // give the user a new card
    // change turns
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

http.listen(3001);

export {};
