import { Component, Input } from '@angular/core';
import { GameDetails } from 'src/app/types';

@Component({
  selector: 'app-game-show-details',
  templateUrl: './game-show-details.component.html',
  styleUrls: ['./game-show-details.component.scss']
})
export class GameShowDetailsComponent {
  @Input() _gameDetails : GameDetails;
  ngOnInit() {

  }
}
