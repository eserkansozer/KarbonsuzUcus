import { AirportModel } from './../Models/AirportModel';
import { Component, OnInit, Inject, LOCALE_ID, EventEmitter } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { HttpClient } from '@angular/common/http';

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
  distance: number;
  distanceIsKm: boolean;
  distanceIsMiles: boolean;
  refresh: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.distanceIsKm = locale !== 'en-US';
    this.distanceIsMiles = locale === 'en-US';
    this.refresh.subscribe(() => {
      this.calculateDistance();
    });
  }

  ngOnInit() {
    this.http.get('assets/airports.json').subscribe(json => {
      this.airports = Array.from(json as Array<any>, a => new AirportModel(a.name, a.city, a.country, a.IATA, a.lon, a.lat));
    });
  }

  onFromSelect(event: TypeaheadMatch): void {
    this.selectedFromAirport = event.item;
    this.refresh.emit();
  }

  onToSelect(event: TypeaheadMatch): void {
    this.selectedToAirport = event.item;
    this.refresh.emit();
  }

  onReturnSelect() {
    this.refresh.emit();
  }

  calculateDistance() {
    if (this.selectedFromAirport && this.selectedToAirport) {
      const p1 = new LatLon(Dms.parseDMS(this.selectedFromAirport.Lat), Dms.parseDMS(this.selectedFromAirport.Lon));
      const p2 = new LatLon(Dms.parseDMS(this.selectedToAirport.Lat), Dms.parseDMS(this.selectedToAirport.Lon));
      this.distance = parseFloat(p1.distanceTo(p2).toPrecision(2)) / 1000;
      if (this.distanceIsMiles) {
        this.distance = this.distance * 0.621371;
      }
      if (this.isReturnTrip) {
        this.distance *= 2;
      }
      this.distance = parseFloat(this.distance.toFixed(0));
    } else {
      this.distance = null;
    }
  }
}
