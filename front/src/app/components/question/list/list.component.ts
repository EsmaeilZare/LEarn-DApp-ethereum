import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class QuestionListComponent {
  public questionList: any = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      res.questions.forEach((element: any) => {
        this.questionList.push({
          text: element.text,
          options: element.options,
          answer: element.answer,
        });
      });
      // this.questionList = res.questions;
    });
  }

  deleteQuestion(i: number) {
    this.questionList.splice(i, 1);
    console.log('Question number ', i, 'deleted');
    return;
  }
}
