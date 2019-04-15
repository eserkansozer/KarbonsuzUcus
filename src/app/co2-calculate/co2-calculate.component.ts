import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/Common/Constants';
import { faCloud, faTree, faBriefcase, faUsers, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';

declare let $: any;
@Component({
  selector: 'app-co2-calculate',
  templateUrl: './co2-calculate.component.html',
  styleUrls: ['./co2-calculate.component.css']
})
export class Co2CalculateComponent implements OnInit {
  locale: string;
  distanceInKm: number;
  isBusinessTrip: boolean;
  peopleCount: number;
  emission: number;
  userSelection = new Array(10);

  faCloud = faCloud;
  faTree = faTree;
  faBriefcase = faBriefcase;
  faUsers = faUsers;
  faUser = faUser;
  faPlane = faPlane;

  public get emissionUnits(): Array<any> {
    if (!this.emission) {
     return new Array(0);
    }
    return new Array(Math.ceil(this.emission / 300));
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
    this.peopleCount = 1;
    this.isBusinessTrip = false;

    this.route.params.subscribe(params => {
      this.distanceInKm = +params.distance;
    });
   }

  ngOnInit() {
    this.calculateEmission();
  }

  onTripParameterChange() {
    this.calculateEmission();
  }

  calculateEmission(): number {
    this.slideToContent();
    if (this.distanceInKm) {
    this.emission = parseFloat((this.distanceInKm * this.peopleCount
      * Constants.EMISSSION_PER_KM
      * (this.isBusinessTrip ? Constants.BUSINESS_CLASS_FACTOR : 1))
      .toPrecision(4));
    }
    return this.emission;
  }

  private slideToContent() {
    const width = window.innerWidth || document.body.clientWidth;
    if (width < 992) {
    setTimeout(() => {
      if ($('#pageWrapper').length > 0) {
        $('html, body').animate({
          scrollTop: ($('#pageWrapper').offset().top)
        }, 500, 'easeInOutExpo');
      }
    }, 500);
  }
  }
}
