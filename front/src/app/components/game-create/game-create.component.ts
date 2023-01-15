import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';
import { GameDetails, Question } from 'src/app/types';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss'],
})
export class GameCreateComponent {
  @Output() gameCreated: EventEmitter<any> = new EventEmitter();

  addQuestionStage: boolean = false;
  previewStage: boolean = false;

  questions: Question[];
  gameDetails: GameDetails;

  constructor() {}

  ngInit() {}

  addDetails(_gameDetails: GameDetails) {
    this.gameDetails = _gameDetails;
    this.addQuestionStage = true;
  }

  addQuestions(_questions: Question[]) {
    this.questions = [];
    _questions.forEach((question: Question) => {
      this.questions.push(question);
    });
    this.previewStage = true;
  }

  editDetails() {
    console.log('game details while calling edit: ', this.gameDetails);

    this.previewStage = false;
    this.addQuestionStage = false;
  }

  editQuestions() {
    console.log('game questions while calling edit: ', this.questions);

    this.previewStage = false;
    this.addQuestionStage = true;
  }

  submitGame() {
    const formData: any = {
      gameDetails: this.gameDetails,
      questions: this.questions,
    };

    this.gameCreated.emit(formData);
  }
}
