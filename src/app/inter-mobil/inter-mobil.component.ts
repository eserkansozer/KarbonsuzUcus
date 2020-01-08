import { Component, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { AirportModel } from 'src/app/Models/AirportModel';
import { Constants } from 'src/app/Common/Constants';
import { HttpClient } from '@angular/common/http';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { faPlaneDeparture, faPlaneArrival, faExchangeAlt, faEllipsisH, faPlane, faCloud } from '@fortawesome/free-solid-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

declare let LatLon: any; // This variable is created externally elsewhere. This is just declaration for the compiler.
declare let Dms: any; // This variable is created externally elsewhere. This is just declaration for the compiler.
declare let $: any;

@Component({
  selector: 'app-inter-mobil',
  templateUrl: './inter-mobil.component.html',
  styleUrls: ['./inter-mobil.component.css']
})
export class InterMobilComponent implements OnInit {

  distanceInKm: number;
  distanceInMiles: number;
  showDistanceInKm: boolean;
  showDistanceInMiles: boolean;
  airports: AirportModel[];
  fromAirportName: string;
  toAirportName: string;
  connectingAirportName: string;
  selectedFromAirport: AirportModel;
  selectedToAirport: AirportModel;
  selectedConnectingAirport: AirportModel;
  isReturnTrip: boolean;
  locale: string;
  departureCode: string;
  arrivalCode: string;
  connectionCode: string;
  connectionEnabled: boolean;
  totalDistance: number;

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.showDistanceInKm = true;

  }

  ngOnInit() {
    this.http.get('assets/airports-tr.json').subscribe(json => {
      const airportList = json as any;
      this.airports = Array.from(airportList.data.ports as Array<any>,
        a => {
          if (a.type !== 'city') {
            return new AirportModel(a.port.name, a.city.name, a.country.name, a.code, a.coordinate.lon, a.coordinate.lat);
          }
        });

      this.totalDistance = this.calculateTotalDistance();
    });
  }

  public get distanceUnits(): Array<any> {
    if (!this.distanceInMiles) {
     return new Array(0);
    }
    return new Array(Math.ceil(this.distanceInMiles / 1000));
  }

  calculateDistance(): number {

    if (this.selectedFromAirport && this.selectedToAirport) {
      const departurePoint = new LatLon(Dms.parseDMS(this.selectedFromAirport.Lat), Dms.parseDMS(this.selectedFromAirport.Lon));
      const arrivalPoint = new LatLon(Dms.parseDMS(this.selectedToAirport.Lat), Dms.parseDMS(this.selectedToAirport.Lon));
      if (this.connectionEnabled && this.selectedConnectingAirport) {
        const connectionPoint =
          new LatLon(Dms.parseDMS(this.selectedConnectingAirport.Lat), Dms.parseDMS(this.selectedConnectingAirport.Lon));
        this.distanceInKm = (parseFloat(departurePoint.distanceTo(connectionPoint).toPrecision(4)) / 1000)
          +  (parseFloat(connectionPoint.distanceTo(arrivalPoint).toPrecision(4)) / 1000);
      } else {
        this.distanceInKm = parseFloat(departurePoint.distanceTo(arrivalPoint).toPrecision(4)) / 1000;
      }
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

  calculateTotalDistance() {
    const flights = [];

    let totalDistance = 0;

    flights.forEach(flight => {

      let stops = flight.split(' ');

      switch (stops.length) {
        case 2:
        case 3:
          this.isReturnTrip = true;
          this.connectionEnabled = false;
          this.departureCode = stops[0];
          this.arrivalCode = stops[1];
          this.selectedFromAirport = this.airports.find(a => a && a.IATA === this.departureCode);
          this.selectedToAirport = this.airports.find(a => a && a.IATA === this.arrivalCode);
          this.calculateDistance();
          totalDistance += this.distanceInKm;
          break;
        case 4:
          this.isReturnTrip = false;
          this.connectionEnabled = false;
          this.departureCode = stops[0];
          this.arrivalCode = stops[1];
          this.selectedFromAirport = this.airports.find(a => a && a.IATA === this.departureCode);
          this.selectedToAirport = this.airports.find(a => a && a.IATA === this.arrivalCode);
          this.calculateDistance();
          totalDistance += this.distanceInKm;

          this.departureCode = stops[2];
          this.arrivalCode = stops[3];
          this.selectedFromAirport = this.airports.find(a => a && a.IATA === this.departureCode);
          this.selectedToAirport = this.airports.find(a => a && a.IATA === this.arrivalCode);
          this.calculateDistance();
          totalDistance += this.distanceInKm;
          break;
        case 5:
          debugger;
          if (stops[1] === stops[3]) {
            this.isReturnTrip = true;
            this.connectionEnabled = true;
            this.departureCode = stops[0];
            this.connectionCode = stops[1];
            this.arrivalCode = stops[2];
            this.selectedFromAirport = this.airports.find(a => a && a.IATA === this.departureCode);
            this.selectedConnectingAirport = this.airports.find(a => a && a.IATA === this.connectionCode);
            this.selectedToAirport = this.airports.find(a => a && a.IATA === this.arrivalCode);
            this.calculateDistance();
            totalDistance += this.distanceInKm;
          }
          else {
            this.isReturnTrip = false;
            this.connectionEnabled = false;
            this.departureCode = stops[0];
            this.arrivalCode = stops[1];
            this.selectedFromAirport = this.airports.find(a => a && a.IATA === this.departureCode);
            this.selectedToAirport = this.airports.find(a => a && a.IATA === this.arrivalCode);
            this.calculateDistance();
            totalDistance += this.distanceInKm;

            this.isReturnTrip = false;
            this.connectionEnabled = true;
            this.departureCode = stops[2];
            this.connectionCode = stops[3];
            this.arrivalCode = stops[4];
            this.selectedFromAirport = this.airports.find(a => a && a.IATA === this.departureCode);
            this.selectedConnectingAirport = this.airports.find(a => a && a.IATA === this.connectionCode);
            this.selectedToAirport = this.airports.find(a => a && a.IATA === this.arrivalCode);
            this.calculateDistance();
            totalDistance += this.distanceInKm;

          }
          break;

        default:
          debugger;
          break;
      }
    });

    return totalDistance;
  }

}
