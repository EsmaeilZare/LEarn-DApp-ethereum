// In component skii az add-task
// should be renamed to create question

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Question } from '../../types';


@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})


export class PairsComponent implements OnInit{
  @Output() onAddQuestion: EventEmitter<Question> = new EventEmitter();

  context: Question["context"];
  answer: Question["answer"];
  wrongOption1: Question["wrongOption1"];
  wrongOption2: Question["wrongOption2"];
  wrongOption3: Question["wrongOption3"];
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

   ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

  onSubmit() {
    if (!this.context) {
      alert('Please add a word');
      return;
    }
    if (!this.answer) {
      alert('Please add an answer!');
      return;
    }

    if (!this.wrongOption1 || !this.wrongOption2 || !this.wrongOption3) {
      alert('Please add all optoins!')
      return;
    }

    const newQuestion: Question = {
      context: this.context,
      answer: this.answer,
      wrongOption1: this.wrongOption1,
      wrongOption2: this.wrongOption2,
      wrongOption3: this.wrongOption3

    };

    this.onAddQuestion.emit(newQuestion);

    this.context = '';
    this.answer = '';
    this.wrongOption1 = '';
    this.wrongOption2 = '';
    this.wrongOption3 = '';
    }
}
