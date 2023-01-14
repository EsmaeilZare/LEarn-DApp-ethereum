import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameDetails } from 'src/app/types';

@Component({
  selector: 'app-game-add-questions',
  templateUrl: './game-add-questions.component.html',
  styleUrls: ['./game-add-questions.component.scss'],
})
export class GameAddQuestionsComponent {
  gameAddQuestionsForm: FormGroup;

  @Output() gameQuestionsAdded: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.gameAddQuestionsForm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      numQuestions: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      thumbnail: this.fb.control(''),
    });
  }

  submitForm() {
    const formData: any = {
      gameId: this,
      questions: this,
    };

    this.gameQuestionsAdded.emit(formData);
  }
}
