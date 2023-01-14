import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/types';

@Component({
  selector: 'app-show-games',
  templateUrl: './show-games.component.html',
  styleUrls: ['./show-games.component.scss']
})
export class ShowGamesComponent {

  constructor(
    private gameService: GameService,
  ){}

  games = this.gameService.getAllGames()
}
