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
  showForm = false;

  player: Player = null;
  gamesMap = new Map<number, Game>();
  activeGame: Game = null;
  activeGameList: Game[] = [];

  appState = new Map<string, boolean>([
    ['GameList', true],
    ['Registeration', false],
    ['GameCreation', false],
    ['Playing', false],
  ]);

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
      this.player = await this.ps.getPlayer();
      (await this.gs.getAllGames()).forEach((game) => {
        this.gamesMap.set(game.id, game);
      });

      this.ps.onEvent('PlayerRegistered').subscribe(async (data: any) => {
        this.player = await this.ps.getPlayer();
        (await this.gs.getAllGames()).forEach((game) => {
          this.gamesMap.set(game.id, game);
        });
        this.appState.set('Registration', false);
        this.appState.set('GameList', true);
      });

      this.gs.onEvent('GameCreated').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.gamesMap.set(gameId, game);
      });

      this.ps.onEvent('GamePurchased').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.gamesMap.set(gameId, game);
      });

      this.ps.onEvent('NewHighscore').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const score = parseInt(data.payload.score);
        const game = this.gamesMap.get(gameId);
        game.playerStats.highscore = score;
        this.gamesMap.set(gameId, game);
      });

      this.gs.onEvent('GameRated').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.gamesMap.set(gameId, game);
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

  setActiveGamesList(_gameIds: number[]) {
    this.activeGameList = [];
    if (_gameIds == null) {
      _gameIds = [...this.gamesMap.keys()];
    }
    _gameIds.forEach((gameId) => {
      this.activeGameList.push(this.gamesMap.get(gameId));
    });
  }

  showCreateGame() {
    this.appState.set('GameCreation', true);
    this.appState.set('GameList', false);
  }

  showAllGames() {
    this.setActiveGamesList(null);
    this.appState.set('GameCreation', false);
    this.appState.set('GameList', true);
  }

  showCreatedGames() {
    this.setActiveGamesList(this.player.createdGames);
    this.appState.set('GameCreation', false);
    this.appState.set('GameList', true);
  }

  showPurchasedGames() {
    this.setActiveGamesList(this.player.purchasedGames);
    this.appState.set('GameCreation', false);
    this.appState.set('GameList', true);
  }

  startPlaying(_game: Game) {
    this.setActiveGame(_game);
    this.appState.set('GameCreation', false);
    this.appState.set('GameList', false);
    this.appState.set('Playing', true);
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
    this.appState.set('GameCreation', false);
    this.appState.set('GameList', true);
  }

  handlePurchase(_game: Game) {
    if (_game.playerStats.isCreator) {
      alert('You cannot buy your own games!');
      console.error('You cannot buy your own games!');
    } else if (_game.playerStats.isPurchased) {
      alert('You have already purchased this game!');
      console.error('You have already purchased this game!');
    } else if (_game.details.price > this.player.credit) {
      alert('not enough credit for buying this game!');
      console.error('not enough credit for buying this game!');
    } else {
      this.ps.purchase(_game.id);
    }
  }

  handlePlayGame(_formData: { gameId: number; score: number }) {
    this.ps.play(_formData.gameId, _formData.score);
    this.appState.set('Playing', false);
    this.appState.set('GameList', true);
  }

  handleRateGame(_formData: { gameId: number; rating: number }) {
    this.ps.rateGame(_formData.gameId, _formData.rating);
  }
}
