import { Component, Input, Output } from '@angular/core';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';
import { UiService } from './services/ui.service';
import { Game, GameDetails, Player, Question } from './types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentGameInfo = {
    id: 1,
    numQuestions: 2,
  };

  showForm = false;

  player: any = null;
  games = new Map<number, Game>();
  activeGame: Game = null;

  showAddTask: boolean = false;
  isRegistered: boolean = false;
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
      (await this.gs.getAllGames()).forEach((game) => {
        this.games.set(game.id, game);
      });

      this.ps.onEvent('PlayerRegistered').subscribe(async (data: any) => {
        this.player = this.ps.getPlayer();
        (await this.gs.getAllGames()).forEach((game) => {
          this.games.set(game.id, game);
        });
      });

      this.gs.onEvent('GameCreated').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.games.set(gameId, game);
      });

      this.ps.onEvent('GamePurchased').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.games.set(gameId, game);
      });

      this.ps.onEvent('NewHighscore').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const score = parseInt(data.payload.score);
        const game = this.games.get(gameId);
        game.playerStats.highscore = score;
        this.games.set(gameId, game);
      });

      this.gs.onEvent('GameRated').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.games.set(gameId, game);
      });
    } catch (error: any) {
      switch (error.message) {
        case 'This user is not registered!':
          this.isRegistered = false;
          break;
        default:
          break;
      }
      console.error(error.message);
    }
  }

  setActiveGame(game: Game) {
    this.activeGame = game;
  }

  handleRegisterPlayer() {
    try {
      this.ps.registerPlayer();
      this.isRegistered = true;
    } catch (error: any) {
      console.error('could not register to the game! Due to: ', error.message);
    }
  }

  handleGameCreate(_formData: {
    gameDetails: GameDetails;
    questions: Question[];
  }) {
    try {
      this.gs.createGame(_formData.gameDetails, _formData.questions);
    } catch (error: any) {
      console.error('could not create game due to: ', error.message);
    }
  }

  handlePurchase(_gameId: number) {
    this.ps.purchase(_gameId);
  }

  handlePlay(_gameId: number, _score: number) {
    this.ps.play(_gameId, _score);
  }

  handleRateGame(_gameId: number, _rating: number) {
    this.ps.rateGame(_gameId, _rating);
  }
}
