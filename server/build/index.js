"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const model_1 = require("./model");
const routes_1 = require("./routes");
const setCorsHeaders = (response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Request-Method", "*");
    response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    response.setHeader("Access-Control-Allow-Headers", "*");
};
const http = http_1.createServer(async (request, response) => {
    setCorsHeaders(response);
    const [code, data] = await routes_1.route(request);
    response.writeHead(code);
    response.write(data);
    response.end();
});
const sio = socket_io_1.default(http);
const nsp = sio.of(/.*/);
nsp.on("connection", (socket) => {
    var _a;
    const playerName = socket.handshake.query.playerName;
    const roomName = socket.nsp.name.slice(1);
    const player = model_1.players.get(playerName);
    const room = model_1.rooms.get(roomName);
    // console.log("New client connected", playerName, room);
    const privateData = {
        playerHand: player.hand,
        playerTeam: player.team,
    };
    const publicData = {
        playerName: player.name,
        turn: (_a = room.turn) === null || _a === void 0 ? void 0 : _a.name,
    };
    // emit private data to player
    socket.emit("private", privateData);
    // Broadcast publicData to everyone in the room/
    sio.of(socket.nsp.name).emit("public", publicData);
    socket.on("move", (data) => {
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
//# sourceMappingURL=index.js.map