import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { GameDetails, Question } from 'src/app/types';

@Component({
  selector: 'app-game-add-questions',
  templateUrl: './game-add-questions.component.html',
  styleUrls: ['./game-add-questions.component.scss'],
})
export class GameAddQuestionsComponent {
  @Input() _questions: Question[];
  @Input() numQuestions: number;
  @Output() gameQuestionsAdded: EventEmitter<Question[]> = new EventEmitter();

  isLoaded: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_questions'].currentValue != null) {
      this.isLoaded = true;
    }
  }

  addQuestion(newQuestion: Question) {
    try {
      if (
        this._questions
          .map((question) => question.text.toLowerCase())
          .includes(newQuestion.text.toLowerCase())
      ) {
        alert('question already exists');
        return;
      }
      this._questions.push(newQuestion);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  createGameQuestions() {
    this.gameQuestionsAdded.emit(this._questions);
  }
}
