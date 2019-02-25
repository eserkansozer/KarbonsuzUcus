import { AirportModel } from './../Models/AirportModel';
import { Component, OnInit, Inject, LOCALE_ID, EventEmitter, isDevMode, ViewChild, ElementRef } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:max-line-length
import { faPlaneDeparture, faPlaneArrival, faEllipsisH, faCloud, faTree, faExchangeAlt, faBriefcase, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import { Constants } from '../Common/Constants';

declare let $: any;
declare let LatLon: any; // This variable is created externally elsewhere. This is just declaration for the compiler.
declare let Dms: any; // This variable is created externally elsewhere. This is just declaration for the compiler.

@Component({
  selector: 'app-flight-calculator',
  templateUrl: './flight-calculator.component.html',
  styleUrls: ['./flight-calculator.component.css']
})
export class FlightCalculatorComponent implements OnInit {

  airports: object[];
  fromAirportName: string;
  toAirportName: string;
  selectedFromAirport: AirportModel;
  selectedToAirport: AirportModel;
  isReturnTrip: boolean;
  isBusinessTrip: boolean;
  peopleCount: number;
  distanceInKm: number;
  distanceInMiles: number;
  isDonateDecided: boolean;
  showDistanceInKm: boolean;
  showDistanceInMiles: boolean;
  emission: number;
  treesToDonate: number;
  refresh: EventEmitter<any> = new EventEmitter();
  faPlaneDeparture = faPlaneDeparture;
  faPlaneArrival = faPlaneArrival;
  faEllipsisH = faEllipsisH;
  faCloud = faCloud;
  faTree = faTree;
  faExchangeAlt = faExchangeAlt;
  faBriefcase = faBriefcase;
  faUsers = faUsers;
  faUser = faUser;
  userSelection = new Array(10);
  treesToDonateArr: any[];

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.peopleCount = 1;
    this.showDistanceInKm = locale !== 'en-US';
    this.showDistanceInMiles = locale === 'en-US';

    this.refresh.subscribe(() => {
      this.calculateDistance();
      this.calculateEmission();
      this.calculateTrees();
    });

    // if (isDevMode) {
    //   // tslint:disable-next-line:max-line-length
    //   this.selectedFromAirport = new AirportModel('Adnan Menderes Intl ', 'Izmir', 'Turkey', 'ADB', 27.156999588, 38.2924003601);
    //   this.fromAirportName = this.selectedFromAirport.Definition;
    //   // tslint:disable-next-line:max-line-length
    //   this.selectedToAirport = new AirportModel('London Gatwick ', 'London', 'United Kingdom', 'LGW', -0.19027799367904663, 51.148101806640625);
    //   this.toAirportName = this.selectedToAirport.Definition;
    //   this.onParameterChange();
    // }
  }

  ngOnInit() {
    this.http.get('assets/airports.json').subscribe(json => {
      this.airports = Array.from(json as Array<any>, a => new AirportModel(a.name, a.city, a.country, a.IATA, a.lon, a.lat));
    });
  }

  onFromSelect(event: TypeaheadMatch): void {
    this.selectedFromAirport = event.item;
    this.onParameterChange();
  }

  onToSelect(event: TypeaheadMatch): void {
    this.selectedToAirport = event.item;
    this.onParameterChange();
    $('html, body').animate({
        scrollTop: ($('#page2').offset().top)
      }, 2000);
  }

  onParameterChange() {
    this.refresh.emit();
  }

  calculateDistance() {
    if (this.selectedFromAirport && this.selectedToAirport) {
      const p1 = new LatLon(Dms.parseDMS(this.selectedFromAirport.Lat), Dms.parseDMS(this.selectedFromAirport.Lon));
      const p2 = new LatLon(Dms.parseDMS(this.selectedToAirport.Lat), Dms.parseDMS(this.selectedToAirport.Lon));
      this.distanceInKm = parseFloat(p1.distanceTo(p2).toPrecision(4)) / 1000;
      this.distanceInMiles = this.distanceInKm * Constants.MILES_PER_KM;
      if (this.isReturnTrip) {
        this.distanceInKm *= 2;
        this.distanceInMiles *= 2;
      }
      this.distanceInKm = parseFloat(this.distanceInKm.toPrecision(4));
      this.distanceInMiles = parseFloat(this.distanceInMiles.toPrecision(4));

    } else {
      this.distanceInKm = null;
      this.distanceInMiles = null;
    }
  }

  calculateEmission() {
    this.emission = parseFloat((this.distanceInKm * this.peopleCount
      * Constants.EMISSSION_PER_KM
      * (this.isBusinessTrip ? Constants.BUSINESS_CLASS_FACTOR : 1))
      .toPrecision(4));
  }

  calculateTrees() {
    this.treesToDonate = Math.ceil(this.emission * Constants.TREES_PER_KG_EMISSION);
    this.treesToDonateArr = new Array(this.treesToDonate);
  }

  donate() {
    this.isDonateDecided = true;
    $('html, body').animate({
        scrollTop: ($('#page3').offset().top)
      }, 2000);
  }
}
