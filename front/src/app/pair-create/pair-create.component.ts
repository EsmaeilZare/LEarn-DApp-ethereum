import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameForm, PairForm } from '../types';

@Component({
  selector: 'app-pair-create',
  templateUrl: './pair-create.component.html',
  styleUrls: ['./pair-create.component.scss']
})
export class PairCreateComponent {
  pairForm: FormGroup;

  @Output() pairCreated: EventEmitter<PairForm> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.pairForm = this.fb.group({
      word: this.fb.control('', [Validators.required]),
      meaning: this.fb.control('', [Validators.required]),
      thumbnail: this.fb.control(''),
    });
  }

  submitForm() {
    const formData: PairForm = {
      word: this.pairForm.get("word").value,
      meaning: this.pairForm.get("meaning").value,
    };

    this.pairCreated.emit(formData);
  }

}
