import { Component, Input } from '@angular/core';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-show-plain-question',
  templateUrl: './question-show-plain.component.html',
  styleUrls: ['./question-show-plain.component.scss'],
})
export class ShowPlainQuestionComponent {
  @Input()
  question: Question;

  showOptions: boolean = false;

  // question: Question = {
  //   text: 'sag',
  //   options: ['a', 'b', 'c', 'd'],
  //   answer: 1,
  // };
}
