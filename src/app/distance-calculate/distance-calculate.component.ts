import { Component, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { AirportModel } from 'src/app/Models/AirportModel';
import { Constants } from 'src/app/Common/Constants';
import { HttpClient } from '@angular/common/http';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { faPlaneDeparture, faPlaneArrival, faExchangeAlt, faEllipsisH, faPlane, faCloud } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';


declare let LatLon: any; // This variable is created externally elsewhere. This is just declaration for the compiler.
declare let Dms: any; // This variable is created externally elsewhere. This is just declaration for the compiler.
declare let $: any;

@Component({
  selector: 'app-distance-calculate',
  templateUrl: './distance-calculate.component.html',
  styleUrls: ['./distance-calculate.component.css']
})
export class DistanceCalculateComponent implements OnInit {

  distanceInKm: number;
  distanceInMiles: number;
  showDistanceInKm: boolean;
  showDistanceInMiles: boolean;
  airports: AirportModel[];
  fromAirportName: string;
  toAirportName: string;
  selectedFromAirport: AirportModel;
  selectedToAirport: AirportModel;
  isReturnTrip: boolean;
  locale: string;
  departureCode: string;
  arrivalCode: string;

  faPlaneDeparture = faPlaneDeparture;
  faPlaneArrival = faPlaneArrival;
  faEllipsisH = faEllipsisH;
  faExchangeAlt = faExchangeAlt;
  faPlane = faPlane;
  faCloud = faCloud;

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
    this.showDistanceInKm = locale === 'tr';
    this.showDistanceInMiles = locale === 'en-US';
    this.isReturnTrip = true;

    this.route.params.subscribe(params => {
      this.departureCode = params.departure ? params.departure.toUpperCase() : null;
      this.arrivalCode = params.arrival ? params.arrival.toUpperCase() : null;
    });
   }

  ngOnInit() {
    if (this.locale === 'en-US') {
      this.http.get('assets/airports.json').subscribe(json => {
        this.airports = Array.from(json as Array<any>, a => new AirportModel(a.name, a.city, a.country, a.IATA, a.lon, a.lat));
        if (this.departureCode && this.arrivalCode) {
          this.PrefillAirportsFromQueryParameters();
        }
      });
    } else if (this.locale === 'tr') {
      this.http.get('assets/airports-tr.json').subscribe(json => {
        const airportList = json as any;
        this.airports = Array.from(airportList.data.ports as Array<any>,
          a => {
            if (a.type !== 'city') {
              return new AirportModel(a.port.name, a.city.name, a.country.name, a.code, a.coordinate.lon, a.coordinate.lat);
            }
          });
        if (this.departureCode && this.arrivalCode) {
            this.PrefillAirportsFromQueryParameters();
          }
      });
    }
  }

  public get distanceUnits(): Array<any> {
    if (!this.distanceInMiles) {
     return new Array(0);
    }
    return new Array(Math.ceil(this.distanceInMiles / 1000));
  }

  onFromSelect(event: TypeaheadMatch): void {
    this.selectedFromAirport = event.item;
    this.calculateDistance();
  }

  onToSelect(event: TypeaheadMatch): void {
    this.selectedToAirport = event.item;
    this.calculateDistance();
  }

  calculateDistance(): number {
    this.slideToContent();

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

  private PrefillAirportsFromQueryParameters() {
    this.selectedFromAirport = this.airports.find(a => a && a.IATA === this.departureCode);
    this.fromAirportName = this.selectedFromAirport.Definition;
    this.selectedToAirport = this.airports.find(a => a && a.IATA === this.arrivalCode);
    this.toAirportName = this.selectedToAirport.Definition;
    this.calculateDistance();
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
