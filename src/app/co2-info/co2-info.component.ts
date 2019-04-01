import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

@Component({
  selector: 'app-co2-info',
  templateUrl: './co2-info.component.html',
  styleUrls: ['./co2-info.component.css']
})
export class Co2InfoComponent implements OnInit, AfterViewInit {

  fragment: string;
  faGithub = faGithub;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {this.fragment = fragment; });
  }

  ngAfterViewInit() {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) {}
  }

}
