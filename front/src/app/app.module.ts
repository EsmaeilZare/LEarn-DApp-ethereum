import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PollCreateComponent } from './components/poll-create/poll-create.component';
import { PollComponent } from './components/poll/poll.component';
import { PollVoteComponent } from './components/poll-vote/poll-vote.component';
import { PollService } from './services/poll-service/poll.service';
import { GameService } from './services/game-service/game.service';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { PairCreateComponent } from './components/pair-create/pair-create.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { PairsComponent } from './components/pairs/pairs.component';
import { GameComponent } from './components/game/game.component';
import { ShowPairsComponent } from './components/show-pairs/show-pairs.component';

@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    PollComponent,
    PollVoteComponent,
    GameCreateComponent,
    PairCreateComponent,
    HeaderComponent,
    ButtonComponent,
    PairsComponent,
    GameComponent,
    ShowPairsComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [PollService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
