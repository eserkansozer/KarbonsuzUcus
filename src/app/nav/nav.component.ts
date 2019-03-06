import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faTree, faPlane, faBars } from '@fortawesome/free-solid-svg-icons';

declare let $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faTree = faTree;
  faPlane = faPlane;
  faBars = faBars;

  isHomePage: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((value: NavigationEnd) => {
      if (value.url) {
        this.isHomePage = value.url === '/' || value.url === '/home';
        $('.navbar-collapse').collapse('hide');
      }
    });
  }

  ngOnInit() {
  }
}
