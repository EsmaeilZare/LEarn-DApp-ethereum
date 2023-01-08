export interface Game extends GameForm {
  id?: number;
  createdByMe?: boolean; // added ? to make it optional to remove the error from delay part in game service
  purchased?: boolean;
  nextLevel?: number; // added ? to make it optional to remove the error from delay part in game service
  winnersCount?: number; // added ? to make it optional to remove the error from delay part in game service
}

export interface GameForm {
  words: string[];
  meanings: string[];
  title: string;
  description: string;
  thumbnail: string;
}

export interface PairForm {
  word: string;
  meaning: string;
}

export interface Pair {
  id?: number;
  word: string;
  meaning: string;
}

export interface Player {
  id: string;
  credit: number;
  createdGames: number[];
  purchasedGames: number[];
}
