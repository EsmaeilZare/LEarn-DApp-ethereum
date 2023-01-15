import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameDetails } from 'src/app/types';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss'],
})
export class GameCreateComponent {
  form: FormGroup;

  @Output() gameDetailsAdded: EventEmitter<GameDetails> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.formInit();
  }

  formInit() {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      numQuestions: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      thumbnail: this.fb.control(''),
    });
  }

  submitForm() {
    const gameDetails: GameDetails = {
      title: this.form.get('title').value,
      price: this.form.get('price').value,
      numQuestions: this.form.get('numQuestions').value,
      description: this.form.get('description').value,
      thumbnail: this.form.get('thumbnail').value,
    };
    this.formInit();

    this.gameDetailsAdded.emit(gameDetails);
  }
}
