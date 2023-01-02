import { Component } from '@angular/core';
import { PairService } from 'src/app/services/pair.service';
import { Pair } from '../../types';
import { words, meanings } from 'src/app/data';
import { game } from '../../types';
import { GameForm } from '../../types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  purchased : boolean = true;

  // pairs: Pair[] = [];
  words: string[] = words;
  meanings: string[] = meanings;
  thumbnail: string = "https://d35aaqx5ub95lt.cloudfront.net/images/f2a2e608c854822ad2563a09595e7827.png"

  constructor(private pairService: PairService) {}

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
    this.pairService.addPair(pair)
    // this.pairService.addPair(pair).subscribe((pair) => this.pairs.push(pair));
  }

  createGame() {
    // if (words.length < 30 || meanings.length < 30) {
    //   alert('Please add at least 30 word-meaning pairs');
    //   return;
    // }

    const newGame: game = {
      purchased : this.purchased,
      words : this.words, // Inja mese koskhola daram instance khode in component az words ro angool mikonam na ooni ke too data.ts e
      meanings : this.meanings, // eyzan
      thumbnail: this.thumbnail,
    }
    // console.log("Game Created\n","Words:", words, "\n", "Meanings:", meanings)
    console.log("SHOD", newGame)

    // inja yahtamel bayad ye eventemitter gozasht ke newGame ro emit kone

    this.purchased = false;
    this.words = []; // Inja am darim instance e words e too in component ro clear mikonim
    this.meanings = [];
    this.thumbnail = "";
  }
}
