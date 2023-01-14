import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-question-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class QuestionCreateComponent {
  questionForm: FormGroup;

  @Output() questionCreated: EventEmitter<Question> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      questionText: this.fb.control('', [Validators.required]),
      Op1: this.fb.control('', [Validators.required]),
      Op2: this.fb.control('', [Validators.required]),
      Op3: this.fb.control('', [Validators.required]),
      Op4: this.fb.control('', [Validators.required]),
      answer: this.fb.control('', [Validators.required]),
    });
  }

  submitForm() {
    const formData: Question = {
      text: this.questionForm.get('text').value,
      options: [
        this.questionForm.get('op1').value,
        this.questionForm.get('op2').value,
        this.questionForm.get('op3').value,
        this.questionForm.get('op4').value,
      ],
      answer: this.questionForm.get('answer').value,
    };
    console.log(formData);

    this.questionCreated.emit(formData);
  }
}
