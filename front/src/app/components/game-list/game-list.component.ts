import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/types';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
  @Input() _games: Game[];
  @Output() gamePurchesed: EventEmitter<Game> = new EventEmitter();
  @Output() gameRated: EventEmitter<any> = new EventEmitter();

  // games: Game[];

  purchase(_game: Game) {
    this.gamePurchesed.emit(_game);
  }

  rateGame(_formData: any) {
    this.gameRated.emit(_formData);
  }

  // constructor() {
  //   this.setGames();
  // }

  // setGames() {
  //   let currentRate = 6;
  //   const game1: Game = {
  //     id: 1,
  //     details: {
  //       title: 'Avalin Bazi',
  //       description:
  //         'In avali bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain',
  //       price: 100,
  //       numQuestions: 2,
  //       thumbnail:
  //         'https://d35aaqx5ub95lt.cloudfront.net/images/f2a2e608c854822ad2563a09595e7827.png',
  //     },

  //     stats: {
  //       numBuyers: 1,
  //       rating: 70,
  //       numRaters: 1,
  //     },

  //     questions: [],
  //     playerStats: {
  //       isCreator: true,
  //       isPurchased: false,
  //       highscore: 100,
  //       rating: 100,
  //     },
  //   };

  //   const game2: Game = {
  //     id: 2,
  //     details: {
  //       title: 'Dovomin Bazi',
  //       description:
  //         'In dovomin bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain',
  //       price: 30,
  //       numQuestions: 2,
  //       thumbnail: 'https://pbs.twimg.com/media/EBX6u-xW4AAlhoR.jpg',
  //     },

  //     stats: {
  //       numBuyers: 1,
  //       rating: 50,
  //       numRaters: 1,
  //     },

  //     questions: [],
  //     playerStats: {
  //       isCreator: false,
  //       isPurchased: true,
  //       highscore: 100,
  //       rating: 20,
  //     },
  //   };

  //   const game3: Game = {
  //     id: 3,
  //     details: {
  //       title: 'Sevomin Bazi',
  //       description:
  //         'In sevomin bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain',
  //       price: 100,
  //       numQuestions: 2,
  //       thumbnail:
  //         'https://upload.wikimedia.org/wikipedia/commons/f/f5/Alex_Ferguson_02_%28cropped%29.jpg',
  //     },

  //     stats: {
  //       numBuyers: 1,
  //       rating: 5,
  //       numRaters: 1,
  //     },

  //     questions: [],
  //     playerStats: {
  //       isCreator: false,
  //       isPurchased: true,
  //       highscore: 100,
  //       rating: 40,
  //     },
  //   };

  //   const game4: Game = {
  //     id: 4,
  //     details: {
  //       title: 'Sevomin Bazi',
  //       description:
  //         'In sevomin bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain',
  //       price: 100,
  //       numQuestions: 2,
  //       thumbnail:
  //         'https://upload.wikimedia.org/wikipedia/commons/f/f5/Alex_Ferguson_02_%28cropped%29.jpg',
  //     },

  //     stats: {
  //       numBuyers: 1,
  //       rating: 5,
  //       numRaters: 1,
  //     },

  //     questions: [],
  //     playerStats: {
  //       isCreator: true,
  //       isPurchased: true,
  //       highscore: 100,
  //       rating: 80,
  //     },
  //   };

  //   this.games = [];
  //   // this._games.splice(0);
  //   // while (this._games.length) {
  //   //   console.log('sag');
  //   //   this._games.pop();
  //   // }
  //   this.games.push(game1);
  //   this.games.push(game2);
  //   this.games.push(game3);
  //   this.games.push(game4);
  // }
}
