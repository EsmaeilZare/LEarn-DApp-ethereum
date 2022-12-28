import { Injectable } from '@angular/core';
import { delay, Observable, of} from 'rxjs';
import { game, GameForm } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGames(): Observable<game[]> { // Using observable type to get as close to the real blockchain included situation as possible
    return of([
      {
        id: 1,
        words: ['house', 'kir'],
        meanings: ['home', 'dashagh'],
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        purchased: true,
      },
      {
        id: 2,
        words: ['house', 'kir'],
        meanings: ['home', 'dashagh'],
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        purchased: false,

      }]
    ).pipe(delay(2000)); // Again to make it more realistic returning the results after 2 seconds
  }

  // vote(pollId: number, voteNumber: number) {
  //   console.log(pollId, voteNumber)
  // }

  createGame(game: GameForm) {
    console.log(game);
  }

}
