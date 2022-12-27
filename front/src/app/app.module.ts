import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollComponent } from './poll/poll.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { PollService } from './poll-service/poll.service';
import { GameService } from './game-service/game.service';
import { PairService } from './pair-service/pair.service';
import { GameCreateComponent } from './game-create/game-create.component';
import { PairCreateComponent } from './pair-create/pair-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    PollComponent,
    PollVoteComponent,
    GameCreateComponent,
    PairCreateComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [PollService, GameService, PairService],
  bootstrap: [AppComponent]
})
export class AppModule { }
