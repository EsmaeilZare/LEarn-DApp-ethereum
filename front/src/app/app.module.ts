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
import { GameCreateComponent } from './components/game-create/game-create.component';
import { GameComponent } from './components/game-home/game.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { QuestionComponent } from './components/question/question.component';
import { GameAddDetailsComponent } from './components/game-add-details/game-add-details.component';
import { GameAddQuestionsComponent } from './components/game-add-questions/game-add-questions.component';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { QuestionCreateComponent } from './components/question-create/question-create.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { ShowGamifiedQuestionComponent } from './components/question-show-gamified/question-show-gamified.component';
import { RegisterComponent } from './components/player-register/player-register.component';
import { ProfileComponent } from './components/player-profile/player-profile.component';
import { GameItemComponent } from './components/game-item/game-item.component';
import { ShowPlainQuestionComponent } from './components/question-show-plain/question-show-plain.component';
import { GameShowDetailsComponent } from './components/game-show-details/game-show-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    GameCreateComponent,
    GameAddQuestionsComponent,
    GameListComponent,
    QuestionComponent,
    ChangeBgDirective,
    QuestionCreateComponent,
    GameAddDetailsComponent,
    GamePlayComponent,
    QuestionListComponent,
    ShowGamifiedQuestionComponent,
    RegisterComponent,
    ProfileComponent,
    GameItemComponent,
    ShowPlainQuestionComponent,
    GameShowDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
