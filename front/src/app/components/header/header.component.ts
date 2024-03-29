import { Component, OnInit, Output } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Blockchain Game';
  showAddTask: boolean = false;
  subscription: Subscription;
  @Output() taskos: boolean = this.showAddTask;

  constructor(private uiService: UiService, private router: Router) {
    // this.subscription = this.uiService
    //   .onToggle()
    //   .subscribe((value) => (this.showAddTask = value));
  }
  ngOnInit(): void {}

  // toggleAddTask() {
  //   this.uiService.toggleAddTask();
  // }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
