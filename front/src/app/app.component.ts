import { Component } from '@angular/core';
import { PollService } from './poll-service/poll.service';
import { GameService } from './game-service/game.service';
import { GameForm, poll, PollForm, PollVote } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;
  activePoll: poll = null as any; // nobooghe khodam error midad

  polls = this.ps.getPolls()
  games = this.gs.getGames()

  constructor(private ps: PollService, private gs: GameService) {

  }

  setActivePoll(poll: poll) { // nobooghe khodam error midad
    this.activePoll = null as any; // nobooghe khodam error midad

    setTimeout(() => {
      this.activePoll = poll;
    }, 100);
  }

  handlePollCreate(poll: PollForm) {
    this.ps.createPoll(poll);
  }

  handleGameCreate(game: GameForm) {
    this.gs.createGame(game);
  }

  handlePollVote(pollVoted: PollVote) {
    this.ps.vote(pollVoted.id, pollVoted.vote);
  }
}
