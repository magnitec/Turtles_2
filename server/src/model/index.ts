import type { Room } from "./room";
import type { Player } from "./player";

export const rooms = new Map<string, Room>();
export const players = new Map<string, Player>();

export type { Room, Player };
