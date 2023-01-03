export interface poll extends PollForm {
  id: number; // id Number of the poll e.g: 21
  results: number[]; // [0, 2, 3]
  voted: boolean; // Wheter the user has voted for the poll or not
}

export interface game extends GameForm {
  id?: number;
  createdByMe?: boolean; // added ? to make it optional to remove the error from delay part in game service
  purchased?: boolean;
  nextLevel?: number; // added ? to make it optional to remove the error from delay part in game service
  winnersCount?: number; // added ? to make it optional to remove the error from delay part in game service
}

// export interface pair {
//   id: number;
//   wmpair: string[];
// }

export interface PollForm {
  question: string; // The question of the poll, like what's your favorite animal ?
  options: string[]; // ["Dogs", "Cats", "Owls"]
  thumbnail: string; // Link to the thumbnail image for the question
}

export interface GameForm {
  words: string[];
  meanings: string[];
  thumbnail: string;
}

export interface PairForm {
  word: string;
  meaning: string;
}

export interface PollVote {
  id: number;
  vote: number;
}

export interface Voter {
  id: string; // id of the voter, in practice the hash
  voted: number[]; // id of the polls that the voter has voted for e.g [21]
}

// export interface Task {
//   id?: number;
//   text: string;
//   day: string;
//   reminder: boolean;
// }

  export interface Pair {
    id?: number;
    word: string;
    meaning: string;
  }

