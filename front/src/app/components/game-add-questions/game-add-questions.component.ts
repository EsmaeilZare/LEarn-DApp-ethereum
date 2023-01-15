import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-game-add-questions',
  templateUrl: './game-add-questions.component.html',
  styleUrls: ['./game-add-questions.component.scss'],
})
export class GameAddQuestionsComponent {
  @Input() gameInfo: any;
  @Output() gameQuestionsAdded: EventEmitter<any> = new EventEmitter();

  questions: Question[];

  constructor() {
    this.questions = [];
  }

  addQuestion(newQuestion: Question) {
    console.log('=-=-=-=-=-=-', this.gameInfo.numQuestions);
    this.questions.push(newQuestion);
  }

  createGameQuestions() {
    const formData: any = {
      // gameId: this.gameId,
      questions: this.questions,
    };

    this.gameQuestionsAdded.emit(formData);
  }
}
