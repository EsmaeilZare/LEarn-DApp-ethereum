import { Component } from '@angular/core';
import { Player } from 'src/app/types';
import { faCoffee, faSackDollar, faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  credit : number = 10;
  faCoffee = faCoffee;
  faWallet = faWallet;

}
