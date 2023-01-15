import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/types';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent {
  @Input() _game: Game;
  @Output() gamePurchesed: EventEmitter<Game> = new EventEmitter();

  purchase() {
    this.gamePurchesed.emit(this._game);
  }

  startPlaying() {}

  openRateBox() {}

}
