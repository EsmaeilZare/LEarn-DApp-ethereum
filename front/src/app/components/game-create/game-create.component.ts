import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameDetails } from 'src/app/types';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss'],
})

export class GameCreateComponent {

  showDetails : boolean = false;

  addDetails(gamedetails: GameDetails) {
    this.showDetails = true;
    console.log("***KIR***");
    return;
  }

  addQuestions(questions: any) {
    console.log("KIRI o TOKHMI", questions);
    return;
  }

  submitGame() {
    console.log("Aghaye Atabaki kiram too sibilet");
    return;
  }
}
