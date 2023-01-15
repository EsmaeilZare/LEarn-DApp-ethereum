import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './player-register.component.html',
  styleUrls: ['./player-register.component.scss'],
})
export class RegisterComponent {

  @Output() playerRegistered: EventEmitter<any> = new EventEmitter();
  register(){
    this.playerRegistered.emit()
  }
}
