import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { PairCreateComponent } from './components/pair-create/pair-create.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { PairsComponent } from './components/pairs/pairs.component';
import { GameComponent } from './components/game/game.component';
import { ShowPairsComponent } from './components/show-pairs/show-pairs.component';
import { ShowGamesComponent } from './components/show-games/show-games.component';
import { PlayGameComponent } from './components/play-game/play-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCreateComponent,
    PairCreateComponent,
    HeaderComponent,
    ButtonComponent,
    PairsComponent,
    GameComponent,
    ShowPairsComponent,
    ShowGamesComponent,
    PlayGameComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
