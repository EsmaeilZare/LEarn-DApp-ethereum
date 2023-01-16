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

  appState: string = 'IN_GAME_LIST';
  isRegistered: boolean = false;
  appStateSubscription: Subscription;
  isRegisteredSubscription: Subscription;

  constructor(
    private ps: PlayerService,
    private gs: GameService,
    private uiService: UiService
  ) {
    this.appStateSubscription = this.uiService
      .onUpdateAppState()
      .subscribe((value) => (this.appState = value));
    this.isRegisteredSubscription = this.uiService
      .onUpdateIsRegistered()
      .subscribe((value) => (this.isRegistered = value));
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   // let isOK = true;
  //   if (changes['questions'].currentValue != null) {
  //     this.isLoaded = true;
  //   }
  //   // for (const propName in changes) {
  //   //   const chng = changes[propName];
  //   //   const cur = JSON.stringify(chng.currentValue);
  //   //   const prev = JSON.stringify(chng.previousValue);
  //   //   console.log(
  //   //     `${propName}: currentValue = ${cur}, previousValue = ${prev}`
  //   //   );
  //   //   if (cur == null) {
  //   //     isOK = false;
  //   //   }
  //   // }
  //   // this.isLoaded = isOK;
  // }

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
        this.uiService.updateIsRegistered(true);
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
    this.uiService.updateAppState('IN_GAME_CREATE');
  }

  showAllGames() {
    this.setActiveGamesList(null);
    this.uiService.updateAppState('IN_GAME_LIST');
  }

  showCreatedGames() {
    this.setActiveGamesList(this.player.createdGames);
    this.uiService.updateAppState('IN_GAME_LIST');
  }

  showPurchasedGames() {
    this.setActiveGamesList(this.player.purchasedGames);
    this.uiService.updateAppState('IN_GAME_LIST');
  }

  startPlayingGame(_game: Game) {
    this.setActiveGame(_game);
    this.uiService.updateAppState('IN_GAME_PLAY');
  }

  setActiveGame(game: Game) {
    this.activeGame = game;
  }

  handleRegisterPlayer() {
    const response = this.ps.registerPlayer();
    this.uiService.updateIsRegistered(response);
  }

  handleGameCreated(_formData: {
    gameDetails: GameDetails;
    questions: Question[];
  }) {
    const response = this.gs.createGame(
      _formData.gameDetails,
      _formData.questions
    );
    if (response) {
      this.uiService.updateAppState('IN_GAME_LIST');
    }
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

  handleFinishGame(_formData: { gameId: number; score: number }) {
    this.ps.play(_formData.gameId, _formData.score);
    this.uiService.updateAppState('IN_GAME_LIST');
  }

  handleRateGame(_formData: { gameId: number; rating: number }) {
    this.ps.rateGame(_formData.gameId, _formData.rating);
  }
}
