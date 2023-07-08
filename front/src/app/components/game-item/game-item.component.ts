import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { Game } from 'src/app/types';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent {
  @Input() _game: Game;
  @Output() gamePurchesed: EventEmitter<Game> = new EventEmitter();
  @Output() gameRated: EventEmitter<any> = new EventEmitter();
  @Output() playingStarted: EventEmitter<Game> = new EventEmitter();
  src : string = "https://getuikit.com/v2/docs/images/placeholder_600x400.svg";


  constructor() {
  }

  isLoaded: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_game'].currentValue != null) {
      this.isLoaded = true;
      console.log("player high score in game ", this._game.id, " is:", this._game.playerStats.highscore)
    }
  }

  rate(_rating: number) {
    try {
      if (_rating == this._game.playerStats.rating) {
        return;
      }
      const payload = {
        gameId: this._game.id,
        rating: _rating,
      };
      this.gameRated.emit(payload);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  purchase() {
    this.gamePurchesed.emit(this._game);
  }

  startPlaying() {
    this.playingStarted.emit(this._game);
  }
}
