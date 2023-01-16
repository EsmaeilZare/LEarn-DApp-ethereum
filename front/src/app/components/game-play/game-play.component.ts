import { outputAst } from '@angular/compiler';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { start } from '@popperjs/core';
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
  isAnswerable: boolean = true;
  conuntdown: number = 0;
  lastAnswer: number = 0;
  lastSelectedOption: number = 0;

  public currentQNumber: number = 0;
  public points: number = 0;
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.startQuestion(this.currentQNumber, 15);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['questionList'].currentValue.length != 0) {
      this.isLoaded = true;
    }
  }

  answer(currentQno: number, optionIndex: number) {
    this.endQuestion(currentQno);

    const question = this.questionList[currentQno];
    this.lastAnswer = question.answer;
    this.lastSelectedOption = optionIndex;

    console.log(optionIndex, question.answer);
    if (optionIndex == question.answer) {
      // correct answer
      this.points += Math.round(100 / this.questionList.length);
      this.correctAnswers++;

      setTimeout(() => {
        this.getProgressPercent();
        this.startQuestion(currentQno + 1, 15);
      }, 2000);
    } else {
      // incorrect answer
      this.incorrectAnswers++;

      setTimeout(() => {
        this.getProgressPercent();
        this.startQuestion(currentQno + 1, 15);
      }, 2000);
    }
  }

  startQuestion(qNumber: number, responsetimePeriod: number) {
    if (qNumber >= this.questionList.length) {
      this.isQuizCompleted = true;
      return;
    }
    this.conuntdown = responsetimePeriod;
    this.isAnswerable = true;

    this.interval$ = interval(1000).subscribe((val) => {
      if (this.conuntdown > 0) {
        this.conuntdown--;
      } else {
        this.endQuestion(qNumber);
        this.startQuestion(qNumber + 1, responsetimePeriod);
      }
    });
  }

  endQuestion(qNumber: number) {
    this.isAnswerable = false;
    this.interval$.unsubscribe();
    setTimeout(() => {
      this.currentQNumber++;
    }, 2000);
  }

  resetQuiz() {
    this.endQuestion;
    this.points = 0;
    this.currentQNumber = 0;
    this.progress = '0';
    this.startQuestion(this.currentQNumber, 15);
  }

  getProgressPercent() {
    this.progress = (
      (this.currentQNumber / this.questionList.length) *
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
