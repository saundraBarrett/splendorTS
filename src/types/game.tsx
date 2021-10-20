import { IPlayer } from "../types/player";
import { ICard } from "./card";

export interface IGame {
    first: string;
    turn: string;
    board: [any[], any[], any[]];
    tokenBank: any[];
    players: Array<IPlayer>;
    cardBank: any[];
    gameStarted: boolean;
    playerGameEnded: string;
    boardNobles: any[];
  }

type IRow = [number, number, number, number];
