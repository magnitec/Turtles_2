export type BaseCardColor = "red" | "green" | "blue" | "yellow" | "purple";
export type CardColor = BaseCardColor | "multi";
export type MovementType = "forward" | "backward" | "last";

export type CardSpec = {
  movementType: MovementType;
  movementAmount: number;
  spawnMultiplierBase: number;
  spawnAmountMulti: number;
};

export type Card = {
  color: CardColor;
  movementType: MovementType;
  movementAmount: number;
};

export type CreateRoomResponse = { roomId: string };

export enum ServerError {
  PlayernameTaken,
  RoomCapacityReached,
  RoomNotFound,
}

export const serverErrorMessage: { [key in ServerError]: string } = {
  [ServerError.PlayernameTaken]: "Player name already taken",
  [ServerError.RoomCapacityReached]: "Room capacity reached",
  [ServerError.RoomNotFound]: "Room not found",
};
