import { IPlayer } from "../types/player";
import { ICard } from "./card";

export interface IGame {
    first: number;
    turn: string;
    board: [any[], any[], any[]];
    tokenBank: any[];
    players: Array<IPlayer>;
    cardBank: any[];
    boardNobles: any[];
  }

type IRow = [number, number, number, number];
