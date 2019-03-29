import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

@Component({
  selector: 'app-co2-info',
  templateUrl: './co2-info.component.html',
  styleUrls: ['./co2-info.component.css']
})
export class Co2InfoComponent implements OnInit {

  faGithub = faGithub;

  constructor() { }

  ngOnInit() {
  }

}
