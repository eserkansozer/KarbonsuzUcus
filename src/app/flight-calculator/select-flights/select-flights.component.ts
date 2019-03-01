import { Component, OnInit, Inject, LOCALE_ID, isDevMode, EventEmitter, Output } from '@angular/core';
import { AirportModel } from 'src/app/Models/AirportModel';
import { Constants } from 'src/app/Common/Constants';
import { HttpClient } from '@angular/common/http';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { faPlaneDeparture, faPlaneArrival, faExchangeAlt, faEllipsisH, faPlane, faCloud } from '@fortawesome/free-solid-svg-icons';


declare let LatLon: any; // This variable is created externally elsewhere. This is just declaration for the compiler.
declare let Dms: any; // This variable is created externally elsewhere. This is just declaration for the compiler.

@Component({
  selector: 'app-select-flights',
  templateUrl: './select-flights.component.html',
  styleUrls: ['./select-flights.component.css']
})
export class SelectFlightsComponent implements OnInit {
  @Output() distanceRefresh = new EventEmitter();
  @Output() distanceSubmit = new EventEmitter();

  distanceInKm: number;
  distanceInMiles: number;
  showDistanceInKm: boolean;
  showDistanceInMiles: boolean;
  airports: object[];
  fromAirportName: string;
  toAirportName: string;
  selectedFromAirport: AirportModel;
  selectedToAirport: AirportModel;
  isReturnTrip: boolean;
  locale: string;

  faPlaneDeparture = faPlaneDeparture;
  faPlaneArrival = faPlaneArrival;
  faEllipsisH = faEllipsisH;
  faExchangeAlt = faExchangeAlt;
  faPlane = faPlane;
  faCloud = faCloud;

  public get distanceUnits(): Array<any> {
    if (!this.distanceInMiles) {
     return new Array(0);
    }
    return new Array(Math.floor(this.distanceInMiles / 1000));
  }

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    // this.locale = 'tr-TR';
    this.showDistanceInKm = locale !== 'en-US';
    this.showDistanceInMiles = locale === 'en-US';
    this.isReturnTrip = true;

    // if (isDevMode) {
    //   this.selectedFromAirport = new AirportModel('Adnan Menderes Intl ', 'Izmir', 'Turkey', 'ADB', 27.156999588, 38.2924003601);
    //   this.fromAirportName = this.selectedFromAirport.Definition;
    //   this.selectedToAirport =
    //     new AirportModel('London Gatwick ', 'London', 'United Kingdom', 'LGW', -0.19027799367904663, 51.148101806640625);
    //   this.toAirportName = this.selectedToAirport.Definition;
    //   this.calculateDistance();
    // }
  }


  ngOnInit() {
    if (this.locale === 'en-US') {
      this.http.get('assets/airports.json').subscribe(json => {
        this.airports = Array.from(json as Array<any>, a => new AirportModel(a.name, a.city, a.country, a.IATA, a.lon, a.lat));
      });
    } else {
      this.http.get('assets/airports-tr.json').subscribe(json => {

        this.airports = Array.from(json as Array<any>, a => new AirportModel(a.name, a.city, a.country, a.IATA, a.lon, a.lat));

        const airportList = json as any;
        this.airports = Array.from(airportList.data.ports as Array<any>,
          a => new AirportModel(a.port.name, a.city.name, a.country.name, a.code, a.coordinate.lon, a.coordinate.lat));

      });
    }
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

  onSubmit() {
    this.distanceSubmit.emit();
  }

  calculateDistance(): number {
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
    return this.distanceInKm;
  }

}
