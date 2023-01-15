import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GameDetails, Question } from 'src/app/types';

@Component({
  selector: 'app-game-add-questions',
  templateUrl: './game-add-questions.component.html',
  styleUrls: ['./game-add-questions.component.scss'],
})
export class GameAddQuestionsComponent {
  @Input() _questions?: Question[];
  @Input() numQuestions: number;
  @Output() gameQuestionsAdded: EventEmitter<Question[]> = new EventEmitter();

  questions: Question[];

  constructor() {
    this.initQuestions();
  }

  initQuestions() {
    this.questions = [];
    if (this._questions != null) {
      this._questions.forEach((question) => {
        this.questions.push(question);
      });
    }
  }

  addQuestion(newQuestion: Question) {
    try {
      if (
        this.questions
          .map((question) => question.text.toLowerCase())
          .includes(newQuestion.text.toLowerCase())
      ) {
        alert('question already exists');
        return;
      }
      this.questions.push(newQuestion);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  createGameQuestions() {
    this.gameQuestionsAdded.emit(this.questions);
  }
}
