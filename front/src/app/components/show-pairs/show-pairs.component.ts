import { Component, Input } from '@angular/core';
import { Pair } from '../../types';
import { PairService } from 'src/app/services/pair.service';
import { words, meanings } from 'src/app/data';


@Component({
  selector: 'app-show-pairs',
  templateUrl: './show-pairs.component.html',
  styleUrls: ['./show-pairs.component.scss']
})
export class ShowPairsComponent {
  // @Input() word: string;
  words: string[] = words;
  meanings: string[] = meanings;

  deletePair(i:number) {
    words.splice(i, 1);
    meanings.splice(i, 1);
    console.log("Words now:", words, "Meanings now:", meanings)
    return;
  }
}
