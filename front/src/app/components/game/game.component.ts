import { Component } from '@angular/core';
import { PairService } from 'src/app/services/pair.service';
import { Pair } from '../../types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pairs: Pair[] = [];

  constructor(private pairService: PairService) {}

  ngOnInit(): void {
    // this.pairService.getPairs().subscribe((pairs) => (this.pairs = pairs));
  }

  deleteTask(pair: Pair) {
    this.pairService
      .deletePair(pair)
      .subscribe(
        () => (this.pairs = this.pairs.filter((t) => t.id !== pair.id))
      );
  }

  addPair(pair: Pair) {
    console.log("KIRE KHAR:", pair);
    // this.pairService.addPair(pair).subscribe((pair) => this.pairs.push(pair));
  }
}
