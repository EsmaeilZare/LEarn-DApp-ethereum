import { Component, Input, Output } from '@angular/core';
import { PollService } from './services/poll-service/poll.service';
import { GameService } from './services/game-service/game.service';
import { GameForm, PairForm, poll, PollForm, PollVote } from './types';
// import { PairService } from './services/pair-service/pair.service';
import { UiService } from './services/ui.service';
import { Subscription } from 'rxjs';


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
  showAddTask: boolean = false;
  subscription: Subscription;


  constructor(private ps: PollService, private gs: GameService, private uiService:UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
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
