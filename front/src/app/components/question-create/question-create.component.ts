import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss'],
})
export class QuestionCreateComponent {
  @Output() questionCreated: EventEmitter<Question> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      questionText: this.fb.control('', [Validators.required]),
      op0: this.fb.control('', [Validators.required]),
      op1: this.fb.control('', [Validators.required]),
      op2: this.fb.control('', [Validators.required]),
      op3: this.fb.control('', [Validators.required]),
      answer: this.fb.control('', [Validators.required]),
    });
  }

  submit() {
    const question: Question = {
      text: this.form.get('questionText').value,
      options: [
        this.form.get('op0').value,
        this.form.get('op1').value,
        this.form.get('op2').value,
        this.form.get('op3').value,
      ],
      answer: Number(this.form.get('answer').value),
    };
    this.initForm();
    this.questionCreated.emit(question);
  }
}
