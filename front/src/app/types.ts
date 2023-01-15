export interface GameDetails {
  title: string;
  description: string;
  price: number;
  numQuestions: number;
  thumbnail: string;
}

enum CorrectOption {
  First,
  Second,
  Third,
  Fourth,
}

export interface Question {
  text: string;
  options: string[];
  answer: CorrectOption;
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
