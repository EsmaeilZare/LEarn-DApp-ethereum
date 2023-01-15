import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent {
  @Input() questions: Question[] = null;

  isLoaded: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    // let isOK = true;
    if (changes['questions'].currentValue != null) {
      this.isLoaded = true;
    }
    // for (const propName in changes) {
    //   const chng = changes[propName];
    //   const cur = JSON.stringify(chng.currentValue);
    //   const prev = JSON.stringify(chng.previousValue);
    //   console.log(
    //     `${propName}: currentValue = ${cur}, previousValue = ${prev}`
    //   );
    //   if (cur == null) {
    //     isOK = false;
    //   }
    // }
    // this.isLoaded = isOK;
  }

  deleteQuestion(i: number) {
    this.questions.splice(i, 1);
    console.log('Question number ', i, 'deleted');
    return;
  }
}
