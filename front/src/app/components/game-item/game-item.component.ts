import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
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

  rating: number = 0;

  constructor() {
    this.initRating();
  }

  initRating() {
    if (this._game != null) {
      this.rating = this._game.playerStats.rating;
    }
  }

  rate(_rating: number) {
    try {
      console.log('dskfjdsalkjfdslkj');
      if (_rating == this.rating) {
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
