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

  purchase(_game: Game) {
    this.gamePurchesed.emit(_game);
  }
}
