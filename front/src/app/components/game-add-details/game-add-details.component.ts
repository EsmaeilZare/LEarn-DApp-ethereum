import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';

import { GameDetails } from 'src/app/types';

@Component({
  selector: 'app-game-add-details',
  templateUrl: './game-add-details.component.html',
  styleUrls: ['./game-add-details.component.scss'],
})
export class GameAddDetailsComponent {
  @Input() _gameDetails: GameDetails;
  @Output() gameDetailsAdded: EventEmitter<GameDetails> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  isLoaded: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    // let isOK = true;
    if (changes['_gameDetails'].currentValue != null) {
      this.isLoaded = true;
      this.formInit();
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

  formInit() {
    // if (this._gameDetails == null) {
    //   this._gameDetails = {
    //     title: null,
    //     price: null,
    //     numQuestions: null,
    //     description: null,
    //     thumbnail: null,
    //   };
    // }
    this.form = this.fb.group({
      title: this.fb.control(this._gameDetails.title, [Validators.required]),
      price: this.fb.control(this._gameDetails.price, [Validators.required]),
      numQuestions: this.fb.control(this._gameDetails.numQuestions, [
        Validators.required,
      ]),
      description: this.fb.control(this._gameDetails.description),
      thumbnail: this.fb.control(this._gameDetails.thumbnail),
    });
  }

  get title() {
    return this.form.get('title');
  }
  get price() {
    return this.form.get('price');
  }
  get qn() {
    return this.form.get('numQuestions');
  }

  submitForm() {
    const gameDetails: GameDetails = {
      title: this.form.get('title').value,
      price: this.form.get('price').value,
      numQuestions: this.form.get('numQuestions').value,
      description: this.form.get('description').value || '',
      thumbnail: this.form.get('thumbnail').value || '',
    };
    this.formInit();

    this.gameDetailsAdded.emit(gameDetails);
  }
}
