import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  // private appStateValue = new BehaviorSubject<string>('IN_HOME'); // true is your initial value
  // appStateValue$ = this.appStateValue.asObservable();

  // set appState(value: string) {
  //   this.appStateValue.next(value);
  //   console.log('appState changed', value);
  // }

  // get appState(): string {
  //   return this.appStateValue.getValue();
  // }

  private appState: string = 'IN_HOME';
  private isRegistered: boolean = false;
  private appStateSubject = new Subject<string>();
  private isRegisteredSubject = new Subject<boolean>();

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
    return this.appStateSubject.asObservable();
  }
}
