import { outputAst } from '@angular/compiler';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { Game, Question } from 'src/app/types';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
})
export class GamePlayComponent implements OnInit {
  @Input() _game: Game;
  @Input() questionList: any;
  @Output() gamePlayed: EventEmitter<any> = new EventEmitter();

  isLoaded: boolean = false;

  tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
  crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
  htmlToAdd: string;
  public name: string = '';
  // public questionList: any = [];

  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 15;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  constructor() {}

  ngOnInit(): void {
    // this.getAllQuestions();
    this.startCounter();
  }

  ngOnChanges(changes: SimpleChanges) {
    // let isOK = true;
    if (changes['questionList'].currentValue.length != 0) {
      this.isLoaded = true;
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

  // getAllQuestions() {
  //   this.questionList = this._game.questions;
  // }

  answer(currentQno: number, optionIndex: number) {
    if (currentQno === this.questionList.length - 1) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    const question = this.questionList[currentQno];

    console.log(optionIndex, question.answer);
    if (optionIndex == question.answer) {
      this.htmlToAdd = this.tickIconTag;
      this.points += Math.round(100 / this.questionList.length);
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    } else {
      this.htmlToAdd = this.crossIconTag;
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 15;
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    if (this.currentQuestion === this.questionList.length) {
      this.isQuizCompleted = true;
    }
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 15;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.points = 0;
    this.counter = 15;
    this.currentQuestion = 0;
    this.progress = '0';
  }
  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }

  quitQuiz() {
    const formData: any = {
      gameId: this._game.id,
      score: this.points,
    };

    this.gamePlayed.emit(formData);
  }
}
