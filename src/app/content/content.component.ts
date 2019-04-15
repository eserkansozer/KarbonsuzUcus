import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  locale: string;

  constructor(@Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
  }

  ngOnInit() {
  }

}
