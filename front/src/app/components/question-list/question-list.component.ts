import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent {
  @Input() questions: Question[];

  constructor(private questionService: QuestionService) {}

  deleteQuestion(i: number) {
    this.questions.splice(i, 1);
    console.log('Question number ', i, 'deleted');
    return;
  }
}
