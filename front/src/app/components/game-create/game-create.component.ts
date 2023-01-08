// IN COMPONENT KOSSHER MAHZE
import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms' ;
import { GameForm } from '../../types';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent {
  gameForm: FormGroup;

  @Output() gameCreated: EventEmitter<GameForm> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      // word: this.fb.control('', [Validators.required]),
      // meaning: this.fb.control('', [Validators.required]),
      thumbnail: this.fb.control(''),
    });
  }

  // submitForm() {
  //   const formData: GameForm = {
  //     words: [], // this should be drived from the pair create components
  //     meanings: [],
  //     thumbnail: this.gameForm.get("thumbnail").value,
  //   };

  //   this.gameCreated.emit(formData);
  // }

}
