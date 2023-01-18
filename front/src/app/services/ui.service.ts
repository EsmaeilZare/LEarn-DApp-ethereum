import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Game, GameDetails, Question } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private appState: string = 'IN_HOME';
  private isRegistered: boolean = false;
  private activeGame: Game = null;
  private activeGameList: Game[] = [];
  private activeQuestionList: Question[] = [];
  private gameDetails: GameDetails = null;
  private numPlayers: number = 0;
  private numGames: number = 0;

  private appStateSubject = new Subject<string>();
  private isRegisteredSubject = new Subject<boolean>();
  private activeGameSubject = new Subject<Game>();
  private activeGameListSubject = new Subject<Game[]>();
  private activeQuestionListSubject = new Subject<Question[]>();
  private gameDetailsSubject = new Subject<GameDetails>();
  private numPlayersSubject = new Subject<number>();
  private numGamesSubject = new Subject<number>();

  constructor() {}

  updateAppState(value: string): void {
    this.appState = value;
    this.appStateSubject.next(this.appState);
  }

  onUpdateAppState(): Observable<any> {
    return this.appStateSubject.asObservable();
  }

  updateIsRegistered(value: boolean): void {
    this.isRegistered = value;
    this.isRegisteredSubject.next(this.isRegistered);
  }

  onUpdateIsRegistered(): Observable<any> {
    return this.isRegisteredSubject.asObservable();
  }

  updateActiveGame(value: Game): void {
    this.activeGame = value;
    this.activeGameSubject.next(this.activeGame);
  }

  onUpdateActiveGame(): Observable<any> {
    return this.activeGameSubject.asObservable();
  }

  updateActiveGameList(value: Game[]): void {
    this.activeGameList = value;
    this.activeGameListSubject.next(this.activeGameList);
  }

  onUpdateActiveGameList(): Observable<any> {
    return this.activeGameListSubject.asObservable();
  }

  updateActiveQuestionList(value: Question[]): void {
    this.activeQuestionList = value;
    this.activeQuestionListSubject.next(this.activeQuestionList);
  }

  onUpdateActiveQuestionList(): Observable<any> {
    return this.activeQuestionListSubject.asObservable();
  }

  updateGameDetails(value: GameDetails): void {
    this.gameDetails = value;
    this.gameDetailsSubject.next(this.gameDetails);
  }

  onUpdateGameDetails(): Observable<any> {
    return this.gameDetailsSubject.asObservable();
  }

  updateNumPlayers(value: number): void {
    this.numPlayers = value;
    this.numPlayersSubject.next(this.numPlayers);
  }

  onUpdateNumPlayers(): Observable<any> {
    return this.numPlayersSubject.asObservable();
  }

  updateNumGames(value: number): void {
    this.numGames = value;
    this.numGamesSubject.next(this.numGames);
  }

  onUpdateNumGames(): Observable<any> {
    return this.numGamesSubject.asObservable();
  }
}
