import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTree, faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faTree = faTree;
  faPlane = faPlane;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onHomeClick() {
    this.router.navigate(['home']);
  }
}
