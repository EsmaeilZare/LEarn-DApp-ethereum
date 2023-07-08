import { Component } from '@angular/core';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-show-gamified-question',
  templateUrl: './question-show-gamified.component.html',
  styleUrls: ['./question-show-gamified.component.scss'],
})
export class ShowGamifiedQuestionComponent {
  question: Question = {
    text: 'sag',
    options: ['a', 'b', 'c', 'd'],
    answer: 1,
  };
}
