import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

// directives
import { ChangeBgDirective } from './directives/change-bg.directive';

// services
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameCreateComponent } from './components/game/game-create/game-create.component';
import { GameComponent } from './components/game/home/game.component';
import { ShowGamesComponent } from './components/game/list/show-games.component';
import { QuestionComponent } from './components/question/question.component';
import { GameAddDetailsComponent } from './components/game/game-add-details/game-add-details.component';
import { GameAddQuestionsComponent } from './components/game-add-questions/game-add-questions.component';
import { GamePlayComponent } from './components/game/play/game-play.component';
import { QuestionCreateComponent } from './components/question-create/question-create.component';
import { QuestionListComponent } from './components/question/list/list.component';
import { ShowGamifiedQuestionComponent } from './components/question/show-gamified/show-gamified.component';
import { RegisterComponent } from './components/player/register/register.component';
import { ProfileComponent } from './components/player/profile/profile.component';
import { ListItemComponent } from './components/game/list-item/list-item.component';
import { ShowPlainQuestionComponent } from './components/question/show-plain/show-plain.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    GameCreateComponent,
    GameAddQuestionsComponent,
    ShowGamesComponent,
    QuestionComponent,
    ChangeBgDirective,
    QuestionCreateComponent,
    GameAddDetailsComponent,
    GamePlayComponent,
    QuestionListComponent,
    ShowGamifiedQuestionComponent,
    RegisterComponent,
    ProfileComponent,
    ListItemComponent,
    ShowPlainQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
