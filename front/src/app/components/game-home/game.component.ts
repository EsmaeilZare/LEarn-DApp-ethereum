// should be renamed to create-game

import { Component } from '@angular/core';
import { PairService } from 'src/app/services/pair.service';
import { Pair, Question } from 'src/app/types';
import { words, meanings } from 'src/app/data';
import { GameService } from 'src/app/services/game.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  purchased: boolean = false;

  // pairs: Pair[] = [];
  words: string[] = words;
  meanings: string[] = meanings;
  // thumbnail: string =
  //   'https://d35aaqx5ub95lt.cloudfront.net/images/f2a2e608c854822ad2563a09595e7827.png';
  title: string;
  thumbnail: string;
  description: string;

  constructor(
    private pairService: PairService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    // this.pairService.getPairs().subscribe((pairs) => (this.pairs = pairs));
  }

  // deletePair(pair: Pair) {
  //   this.pairService
  //     .deletePair(pair)
  //     .subscribe(
  //       () => (this.pairs = this.pairs.filter((t) => t.id !== pair.id))
  //     );
  // }

  addPair(pair: Pair) {
    // console.log("KIRE KHAR:", pair);
    this.pairService.addPair(pair);
    // this.pairService.addPair(pair).subscribe((pair) => this.pairs.push(pair));
  }

  addQuestion(question: Question) {
    this.pairService.addQuestion(question);
  }

  createGame() {
    // if (words.length < 30 || meanings.length < 30) {
    //   alert('Please add at least 30 word-meaning pairs');
    //   return;
    // }

    const newGame = {
      words: this.words, // Inja mese koskhola daram instance khode in component az words ro angool mikonam na ooni ke too data.ts e
      meanings: this.meanings, // eyzan
      title: this.title,
      thumbnail: this.thumbnail,
      description: this.description,
    };
    // console.log("Game Created\n","Words:", words, "\n", "Meanings:", meanings)
    console.log('SHOD', newGame);
    // this.gameService.createGame(newGame);
    console.log('Mohaghagh shod');

    // inja yahtamel bayad ye eventemitter gozasht ke newGame ro emit kone

    this.purchased = false;
    this.words = []; // Inja am darim instance e words e too in component ro clear mikonim
    this.meanings = [];
    this.thumbnail = '';
  }
}
