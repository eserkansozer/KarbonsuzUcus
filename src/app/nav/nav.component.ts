import { Component, OnInit } from '@angular/core';
import { Router, Event, RouterEvent, NavigationEnd } from '@angular/router';
import { faTree, faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faTree = faTree;
  faPlane = faPlane;
  isHomePage: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((value: NavigationEnd) => {
      if (value.url) {
        this.isHomePage = value.url === '/' || value.url === '/home';
      }
    });
  }

  ngOnInit() {
  }
}
