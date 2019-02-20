import { AirportModel } from './../Models/AirportModel';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
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

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.distanceIsKm = locale !== 'en-US';
    this.distanceIsMiles = locale === 'en-US';
  }

  ngOnInit() {
    this.http.get('assets/airports.json').subscribe(json => {
      this.airports = Array.from(json as Array<any>, a => new AirportModel(a.name, a.city, a.country, a.IATA, a.lon, a.lat));
    });
  }

  onFromSelect(event: TypeaheadMatch): void {
    this.selectedFromAirport = event.item;
    if (this.selectedToAirport) {
      this.calculateDistance();
    }
  }

  onToSelect(event: TypeaheadMatch): void {
    this.selectedToAirport = event.item;
    if (this.selectedFromAirport) {
      this.calculateDistance();
    }
  }

  calculateDistance() {
    if (this.selectedFromAirport && this.selectedToAirport) {
      const p1 = new LatLon(Dms.parseDMS(this.selectedFromAirport.Lat), Dms.parseDMS(this.selectedFromAirport.Lon));
      const p2 = new LatLon(Dms.parseDMS(this.selectedToAirport.Lat), Dms.parseDMS(this.selectedToAirport.Lon));
      this.distance = parseFloat(p1.distanceTo(p2).toPrecision(2)) / 1000;
      if (this.isReturnTrip) {
        this.distance *= 2;
      }
      if (this.distanceIsMiles) {
        this.distance = parseFloat((this.distance * 0.621371).toFixed(2));
      }
    } else {
      this.distance = null;
    }
  }
}
