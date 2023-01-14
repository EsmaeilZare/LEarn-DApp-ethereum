import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameDetails } from 'src/app/types';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss'],
})
export class GameCreateComponent {
  gameDetailsForm: FormGroup;

  @Output() gameInfoAdded: EventEmitter<GameDetails> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.gameDetailsForm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      numQuestions: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      thumbnail: this.fb.control(''),
    });
  }

  submitForm() {
    const formData: GameDetails = {
      title: this.gameDetailsForm.get('title').value,
      price: this.gameDetailsForm.get('price').value,
      numQuestions: this.gameDetailsForm.get('numQuestions').value,
      description: this.gameDetailsForm.get('description').value,
      thumbnail: this.gameDetailsForm.get('thumbnail').value,
    };

    this.gameInfoAdded.emit(formData);
  }
}
