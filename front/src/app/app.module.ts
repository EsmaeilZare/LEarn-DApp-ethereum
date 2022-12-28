import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PollCreateComponent } from './components/poll-create/poll-create.component';
import { PollComponent } from './components/poll/poll.component';
import { PollVoteComponent } from './components/poll-vote/poll-vote.component';
import { PollService } from './services/poll-service/poll.service';
import { GameService } from './services/game-service/game.service';
import { PairService } from './services/pair-service/pair.service';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { PairCreateComponent } from './components/pair-create/pair-create.component';

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
