import { Component } from '@angular/core';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-question-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class QuestionShowComponent {
  question: Question = {
    text: 'sag',
    options: ['a', 'b', 'c', 'd'],
    answer: 1,
  };
}
