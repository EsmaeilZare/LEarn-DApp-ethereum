import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// directives
import { ChangeBgDirective } from './directives/change-bg.directive';

// services
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameCreateComponent } from './components/game/create/game-create.component';
import { GameComponent } from './components/game/home/game.component';
import { ShowGamesComponent } from './components/game/list/show-games.component';
import { QuestionComponent } from './components/question/question.component';
import { GameAddDetailsComponent } from './components/game/add-details/game-add-details.component';
import {} from './components/game/add-questions/game-add-questions.component';
import { GamePlayComponent } from './components/game/play/game-play.component';
import { QuestionCreateComponent } from './components/question/create/create.component';
import { QuestionListComponent } from './components/question/list/list.component';
import { QuestionShowComponent } from './components/question/show/show.component';
import { RegisterComponent } from './components/player/register/register.component';
import { ProfileComponent } from './components/player/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    GameCreateComponent,
    ShowGamesComponent,
    QuestionComponent,
    ChangeBgDirective,
    QuestionCreateComponent,
    GameAddDetailsComponent,
    GamePlayComponent,
    QuestionListComponent,
    QuestionShowComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
