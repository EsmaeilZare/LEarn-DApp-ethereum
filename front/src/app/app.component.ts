import { Component, Input, Output } from '@angular/core';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';
import { UiService } from './services/ui.service';
import { GameForm } from './types';
// import { PairService } from './services/pair-service/pair.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showForm = false;
  // activePoll: poll = null as any; // nobooghe khodam error midad

  player = this.ps.getPlayer();
  games = this.gs.getGames();
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(
    private ps: PlayerService,
    private gs: GameService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit() {
    this.gs.onEvent('GameCreated').subscribe(() => {
      this.games = this.gs.getGames();
    });
  }

  // setActivePoll(poll: poll) {
  //   // nobooghe khodam error midad
  //   this.activePoll = null as any; // nobooghe khodam error midad

  //   setTimeout(() => {
  //     this.activePoll = poll;
  //   }, 100);
  // }

  handleGameCreate(game: GameForm) {
    this.gs.createGame(game);
  }

  // handlePollVote(pollVoted: PollVote) {
  //   this.ps.vote(pollVoted.id, pollVoted.vote);
  // }
}
