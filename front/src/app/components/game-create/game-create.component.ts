import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { UiService } from 'src/app/services/ui.service';
import { GameDetails, Question } from 'src/app/types';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss'],
})
export class GameCreateComponent {
  @Output() gameCreated: EventEmitter<any> = new EventEmitter();

  addQuestionStage: boolean = false;
  previewStage: boolean = false;

  gameDetails: GameDetails;
  questions: Question[];

  gameDetailsSubscription: Subscription;
  questionsSubscription: Subscription;

  constructor(private uiService: UiService) {
    this.questionsSubscription = this.uiService
      .onUpdateActiveQuestionList()
      .subscribe((value) => (this.questions = value));
    this.gameDetailsSubscription = this.uiService
      .onUpdateGameDetails()
      .subscribe((value) => (this.gameDetails = value));

    this.uiService.updateActiveQuestionList([]);
    const defaultGameDetails: GameDetails = {
      title: '',
      description: '',
      price: null,
      numQuestions: null,
      thumbnail: '',
    };
    this.uiService.updateGameDetails(defaultGameDetails);
  }

  ngInit() {}

  addDetails(_gameDetails: GameDetails) {
    this.uiService.updateGameDetails(_gameDetails);
    this.addQuestionStage = true;
  }

  addQuestions(_questions: Question[]) {
    this.questions = [];
    _questions.forEach((question: Question) => {
      this.questions.push(question);
    });
    this.previewStage = true;
  }

  editDetails() {
    console.log('game details while calling edit: ', this.gameDetails);

    this.previewStage = false;
    this.addQuestionStage = false;
  }

  editQuestions() {
    console.log('game questions while calling edit: ', this.questions);

    this.previewStage = false;
    this.addQuestionStage = true;
  }

  submitGame() {
    const formData: any = {
      gameDetails: this.gameDetails,
      questions: this.questions,
    };

    this.gameCreated.emit(formData);
  }
}
