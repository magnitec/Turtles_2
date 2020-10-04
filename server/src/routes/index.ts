import { IncomingMessage } from "http";
import { Room } from "../model/room";
import { rooms, players } from "../model";
import { ServerError } from "shared";

type RequestBody = {
  username: string;
  roomId: string;
};

const usernameTaken = (username: string) => players.has(username);
const usernameTakenStatus: [number, string] = [
  409,
  // JSON.stringify({ message: "Username already taken" }),
  JSON.stringify(ServerError.PlayernameTaken), // is this different or same like returning "0"?
];

export const route = async (
  request: IncomingMessage
): Promise<[number, string]> => {
  const body = await getRequestBody(request);
  const url = (param: string) => request.url?.includes(param);

  console.log("username", body.username);

  if (url("create")) {
    return handleCreateRoom(body.username);
  } else if (url("join")) {
    return handleJoinRoom(body.username, body.roomId);
  } else if (url("room")) {
    return handleEnterRoom(body.roomId); // dafuq, that's why I have all these bugs
  }

  return [404, "Invalid URL"];
  // return usernameTakenStatus;
};

const getRequestBody = async (request: IncomingMessage) =>
  new Promise<RequestBody>((resolve, reject) => {
    let data: string = "";

    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      resolve(JSON.parse(data));
    });
    request.on("error", (err) => reject(err));
  });

const handleCreateRoom = (username: string): [number, string] => {
  if (usernameTaken(username)) {
    return usernameTakenStatus;
  }

  const newRoom = new Room();
  rooms.set(newRoom.id, newRoom);

  return [200, JSON.stringify({ roomId: newRoom.id })];
};

const handleJoinRoom = (username: string, roomId: string): [number, string] => {
  const room = rooms.get(roomId);

  if (!room) {
    return [404, JSON.stringify(ServerError.RoomNotFound)];
  }

  if (usernameTaken(username)) {
    return usernameTakenStatus;
  }

  try {
    const newPlayer = room.createAndAddPlayer(username);
    players.set(newPlayer.name, newPlayer);

    if (!room.turn) {
      room.turn = newPlayer;
    }

    return [
      200,
      JSON.stringify({
        roomId: room.id,
      }),
    ];
  } catch (e) {
    return [500, e.message]; // client shouldnt be really informed about any error tho
  }
};

const handleEnterRoom = (roomId: string): [number, string] => {
  return [200, JSON.stringify({ roomId: roomId })];
};
