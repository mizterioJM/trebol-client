import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  show = false;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.show = event instanceof NavigationStart;
      if (event instanceof NavigationStart) {
        this.show = true;
      } else if (event instanceof NavigationEnd) {
        this.show = false;
      }
    });
  }
}
