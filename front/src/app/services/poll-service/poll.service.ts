import { Injectable } from '@angular/core';
import { delay, Observable, of} from 'rxjs';
import { poll, PollForm } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  getPolls(): Observable<poll[]> { // Using observable type to get as close to the real blockchain included situation as possible
    return of([
      {
        id: 1,
        question: 'Cats or dogs ?',
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        results: [0, 5, 7],
        options: ["Cats", "Dogs", "Neither"],
        voted: true,

      },
      {
        id: 2,
        question: 'yaboo or khar',
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        results: [1, 6, 4],
        options: ["Yaboo", "Khar", "Madaret"],
        voted: false,

      }]
    ).pipe(delay(2000)); // Again to make it more realistic returning the results after 2 seconds
  }
  vote(pollId: number, voteNumber: number) {
    console.log(pollId, voteNumber)
  }

  createPoll(poll: PollForm) {
    console.log(poll);
  }

}
