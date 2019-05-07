import { Component, OnInit } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.referrer = document.referrer;
    if (document.referrer.includes('egeorman.org.tr')) {
     sessionStorage.referrer = 'egeorman';
    }
  }

}
