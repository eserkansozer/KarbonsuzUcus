import { AirportModel } from './../Models/AirportModel';
import { Component, OnInit, Inject, LOCALE_ID, EventEmitter, isDevMode} from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:max-line-length
import { faPlaneDeparture, faPlaneArrival, faEllipsisH, faCloud, faTree, faExchangeAlt, faBriefcase, faUsers, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';
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
  showDistanceInKm: boolean;
  showDistanceInMiles: boolean;
  emission: number;
  treesToDonate: number;
  distanceRefresh: EventEmitter<any> = new EventEmitter();
  emissionRefresh: EventEmitter<any> = new EventEmitter();
  treesRefresh: EventEmitter<any> = new EventEmitter();
  faPlaneDeparture = faPlaneDeparture;
  faPlaneArrival = faPlaneArrival;
  faEllipsisH = faEllipsisH;
  faCloud = faCloud;
  faTree = faTree;
  faExchangeAlt = faExchangeAlt;
  faBriefcase = faBriefcase;
  faUsers = faUsers;
  faUser = faUser;
  faPlane = faPlane;
  userSelection = new Array(10);
  treesToDonateArr: any[];
  activePage: string;

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.activePage = 'page1';
    this.peopleCount = 1;
    this.isReturnTrip = true;
    this.showDistanceInKm = locale !== 'en-US';
    this.showDistanceInMiles = locale === 'en-US';

    this.distanceRefresh.subscribe(() => {
      this.calculateDistance();
      this.calculateEmission();
      this.calculateTrees();
    });

    this.emissionRefresh.subscribe(() => {
      this.calculateEmission();
      this.calculateTrees();
    });

    this.treesRefresh.subscribe(() => {
      this.calculateTrees();
    });

    if (isDevMode) {
      // tslint:disable-next-line:max-line-length
      this.selectedFromAirport = new AirportModel('Adnan Menderes Intl ', 'Izmir', 'Turkey', 'ADB', 27.156999588, 38.2924003601);
      this.fromAirportName = this.selectedFromAirport.Definition;
      this.selectedToAirport =
      new AirportModel('London Gatwick ', 'London', 'United Kingdom', 'LGW', -0.19027799367904663, 51.148101806640625);
      this.toAirportName = this.selectedToAirport.Definition;
      this.onDistanceParameterChange();
    }
  }

  ngOnInit() {
    this.http.get('assets/airports.json').subscribe(json => {
      this.airports = Array.from(json as Array<any>, a => new AirportModel(a.name, a.city, a.country, a.IATA, a.lon, a.lat));
    });
  }

  onFromSelect(event: TypeaheadMatch): void {
    this.selectedFromAirport = event.item;
    this.onDistanceParameterChange();
  }

  onToSelect(event: TypeaheadMatch): void {
    this.selectedToAirport = event.item;
    this.onDistanceParameterChange();
  }

  onDistanceParameterChange() {
    this.distanceRefresh.emit();
  }

  onTripParameterChange() {
    this.emissionRefresh.emit();
  }

  onCalculationDecided() {
    this.emissionRefresh.emit();
    this.activePage = 'page2';
  }

  onTreesDecided() {
    this.treesRefresh.emit();
    this.activePage = 'page3';
  }

  onDonationDecided() {
    this.activePage = 'page4';
  }

  onReset() {
    this.fromAirportName = null;
    this.toAirportName = null;
    this.selectedFromAirport = null;
    this.selectedToAirport = null;
    this.peopleCount = 1;
    this.isBusinessTrip = false;
    this.distanceInKm = null;
    this.distanceInMiles = null;
    this.emission = null;
    this.activePage = 'page1';
  }

  private calculateDistance() {
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

  private calculateEmission() {
    this.emission = parseFloat((this.distanceInKm * this.peopleCount
      * Constants.EMISSSION_PER_KM
      * (this.isBusinessTrip ? Constants.BUSINESS_CLASS_FACTOR : 1))
      .toPrecision(4));
  }

  private calculateTrees() {
    this.treesToDonate = Math.ceil(this.emission * Constants.TREES_PER_KG_EMISSION);
    this.treesToDonateArr = new Array(this.treesToDonate);
  }
}
