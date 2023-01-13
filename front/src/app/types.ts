export interface GameDetails {
  title: string;
  description: string;
  price: number;
  numQuestions: number;
  thumbnails: string;
}

export interface Question {
  context: string;
  answer: string;
  wrongOption1: string;
  wrongOption2: string;
  wrongOption3: string;
}

export interface GameStats {
  numBuyers: number;
  rating: number;
  numRaters: number;
}

export interface PlayerGameStats {
  isCreator: boolean;
  isPurchased: boolean;
  highscore: number;
  rating: number; // from 0 to 100
}

export interface Game {
  id: number;
  details: GameDetails;
  stats: GameStats;
  questions: Question[];
  playerStats: PlayerGameStats;
}

export interface Player {
  id: string;
  isRegistered: boolean;
  credit: number;
  createdGames: number[];
  purchasedGames: number[];
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
