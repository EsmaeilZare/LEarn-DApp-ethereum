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
    if (this._gameDetails) {
      if (this._gameDetails.thumbnail == '') {
        console.log("THUMBNAIL:", this._gameDetails.thumbnail);
        this._gameDetails.thumbnail = "https://getuikit.com/v2/docs/images/placeholder_600x400.svg";
      }

    }
  }
}
