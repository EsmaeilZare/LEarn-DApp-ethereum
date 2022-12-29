// In component skii az add-task

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Pair } from '../../types';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})
export class PairsComponent implements OnInit{
  @Output() onAddPair: EventEmitter<Pair> = new EventEmitter();
  word: string;
  meaning: string;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

   ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

  onSubmit() {
    if (!this.word) {
      alert('Please add a task!');
      return;
    }

    const newPair: Pair = {
      word: this.word,
      meaning: this.meaning,
    };

    this.onAddPair.emit(newPair);

    this.word = '';
    this.meaning = '';
  }
}
