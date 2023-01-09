import { Component, Input, Output } from '@angular/core';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';
import { UiService } from './services/ui.service';
import { Game, GameForm, Player } from './types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showForm = false;
  // activePoll: poll = null as any; // nobooghe khodam error midad

  player: any = null;
  games: any = [];
  showAddTask: boolean = false;
  isRegistered: boolean = true;
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

  async ngOnInit() {
    try {
      this.player = this.ps.getPlayer();
      this.games = this.gs.getGames();

      this.gs.onEvent('GameCreated').subscribe(() => {
        console.log('GameCreated');
        this.games = this.gs.getGames();
      });
      this.ps.onEvent('PlayerRegistered').subscribe(() => {
        console.log('PlayerRegistered');
        this.player = this.ps.getPlayer();
      });
    } catch (error: any) {
      switch (error.message) {
        case 'This user is not registered!':
          this.isRegistered = false;
          break;

        default:
          break;
      }
    }
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

  handleRegister() {
    try {
      this.ps.register();
      this.isRegistered = true;
    } catch (error) {
      console.log('could not register to the game!');
    }
  }

  // handlePollVote(pollVoted: PollVote) {
  //   this.ps.vote(pollVoted.id, pollVoted.vote);
  // }
}
