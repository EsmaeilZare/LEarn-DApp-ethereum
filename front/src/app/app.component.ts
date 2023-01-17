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
  player: Player = null;
  gamesMap = new Map<number, Game>();

  appState: string = 'IN_GAME_LIST';
  isLoaded: boolean = false;
  isRegistered: boolean = false;
  activeGame: Game = null;
  activeGameList: Game[] = [];
  activeQuestionList: Question[] = [];

  appStateSubscription: Subscription;
  isRegisteredSubscription: Subscription;
  activeGameSubscription: Subscription;
  activeGameListSubscription: Subscription;
  activeQuestionListSubscription: Subscription;

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
    this.activeGameSubscription = this.uiService
      .onUpdateActiveGame()
      .subscribe((value) => (this.activeGame = value));
    this.activeGameListSubscription = this.uiService
      .onUpdateActiveGameList()
      .subscribe((value) => (this.activeGameList = value));
    this.activeQuestionListSubscription = this.uiService
      .onUpdateActiveQuestionList()
      .subscribe((value) => (this.activeQuestionList = value));
  }

  async ngOnInit() {
    try {
      this.ps.getPlayer().then((player) => {
        this.isLoaded = true;
        if (player == null) {
          this.uiService.updateIsRegistered(false);
        } else {
          this.player = player;
          this.uiService.updateIsRegistered(true);
        }
      });

      (await this.gs.getAllGames()).forEach((game) => {
        this.gamesMap.set(game.id, game);
      });

      this.ps.onEvent('PlayerRegistered').subscribe(async (data: any) => {
        this.player = await this.ps.getPlayer();
        this.uiService.updateIsRegistered(true);
        (await this.gs.getAllGames()).forEach((game) => {
          this.gamesMap.set(game.id, game);
        });
        this.uiService.updateAppState('IN_GAME_LIST');
      });

      this.gs.onEvent('GameCreated').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.player.credit -= game.details.price * 5;
        this.gamesMap.set(gameId, game);
        this.uiService.updateAppState('IN_GAME_LIST');
      });

      this.ps.onEvent('GamePurchased').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.player.credit -= game.details.price;
        this.gamesMap.set(gameId, game);
        this.setActiveGamesList(null);
        this.uiService.updateAppState('IN_GAME_LIST');
      });

      this.ps.onEvent('GameResult').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = this.gamesMap.get(gameId);
        this.player.credit = parseInt(data.payload.playerCredit);
        console.log(
          'this is the high score',
          data.payload.highscore,
          'driven from blockchain event on game ',
          gameId
        );
        game.playerStats.highscore = parseInt(data.payload.highscore);
        this.gamesMap.set(gameId, game);
        this.setActiveGamesList(null);
        this.uiService.updateAppState('IN_GAME_LIST');
      });

      this.gs.onEvent('GameRated').subscribe(async (data: any) => {
        const gameId = parseInt(data.payload.gameId);
        const game = await this.gs.getGameInfo(gameId);
        this.gamesMap.set(gameId, game);
        this.setActiveGamesList(null);
        this.uiService.updateAppState('IN_GAME_LIST');
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
    const _activeGameList: Game[] = [];
    if (_gameIds == null) {
      _gameIds = [...this.gamesMap.keys()];
    }
    _gameIds.forEach((gameId) => {
      _activeGameList.push(this.gamesMap.get(gameId));
    });
    this.uiService.updateActiveGameList(_activeGameList);
  }

  showCreateGame() {
    console.log('KIR');
    this.uiService.updateAppState('IN_GAME_CREATE');
    console.log(this.appState);
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
    this.setActiveQuestionList().then(() =>
      this.uiService.updateAppState('IN_GAME_PLAY')
    );
  }

  setActiveGame(_game: Game) {
    this.uiService.updateActiveGame(_game);
  }

  async setActiveQuestionList(): Promise<void> {
    const questions = await this.gs.getGameQuestions(this.activeGame.id);
    this.uiService.updateActiveQuestionList(questions);
  }

  handleRegisterPlayer() {
    this.ps.registerPlayer();
  }

  handleGameCreated(_formData: {
    gameDetails: GameDetails;
    questions: Question[];
  }) {
    this.gs.createGame(_formData.gameDetails, _formData.questions);
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
  }

  handleRateGame(_formData: { gameId: number; rating: number }) {
    this.ps.rateGame(_formData.gameId, _formData.rating);
  }

  scroll(el: HTMLElement) {
    console.log('OMAD ', el);
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
