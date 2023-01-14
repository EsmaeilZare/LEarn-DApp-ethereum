import { Component } from '@angular/core';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-show-gamified-question',
  templateUrl: './show-gamified.component.html',
  styleUrls: ['./show-gamified.component.scss'],
})
export class ShowGamifiedQuestionComponent {
  question: Question = {
    text: 'sag',
    options: ['a', 'b', 'c', 'd'],
    answer: 1,
  };
}
