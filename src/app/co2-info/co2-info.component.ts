import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

declare let $: any;
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
    if (this.fragment) {
      try {
        setTimeout(() => {
          // document.querySelector('#' + this.fragment).scrollIntoView();
          $('html, body').animate({
            scrollTop: ($('#' + this.fragment).offset().top)
          }, 500, 'easeInOutExpo');
        }, 500);
      } catch (e) { }
    }
  }

}
