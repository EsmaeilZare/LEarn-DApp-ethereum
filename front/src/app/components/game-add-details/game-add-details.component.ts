import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { GameDetails } from 'src/app/types';

@Component({
  selector: 'app-game-add-details',
  templateUrl: './game-add-details.component.html',
  styleUrls: ['./game-add-details.component.scss'],
})
export class GameAddDetailsComponent {
  @Output() gameDetailsAdded: EventEmitter<GameDetails> = new EventEmitter();
  form: FormGroup;

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

  get title() {return this.form.get('title');}
  get price() {return this.form.get('price')}
  get qn() {return this.form.get("numQuestions")}

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
