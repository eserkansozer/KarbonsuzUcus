import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';

// tslint:disable-next-line:max-line-length
import { faCloud, faTree, faBriefcase, faUsers, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';
import { Constants } from '../Common/Constants';
import { SelectFlightsComponent } from './select-flights/select-flights.component';


@Component({
  selector: 'app-flight-calculator',
  templateUrl: './flight-calculator.component.html',
  styleUrls: ['./flight-calculator.component.css']
})
export class FlightCalculatorComponent implements OnInit {
  emissionRefresh: EventEmitter<any> = new EventEmitter();
  treesRefresh: EventEmitter<any> = new EventEmitter();

  isBusinessTrip: boolean;
  peopleCount: number;
  emission: number;
  treesToDonate: number;
  userSelection = new Array(10);
  treesToDonateArr: any[];
  activePage: string;

  faCloud = faCloud;
  faTree = faTree;
  faBriefcase = faBriefcase;
  faUsers = faUsers;
  faUser = faUser;
  faPlane = faPlane;

  @ViewChild(SelectFlightsComponent)
  private selectFlightsComponent: SelectFlightsComponent;

  constructor() {
    this.activePage = 'page1';
    this.peopleCount = 1;

    this.emissionRefresh.subscribe(() => {
      this.calculateEmission();
      this.calculateTrees();
    });

    this.treesRefresh.subscribe(() => {
      this.calculateTrees();
    });
  }

  ngOnInit() {

  }

  onTripParameterChange() {
    this.emissionRefresh.emit();
  }

  onDistanceSubmitted() {
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
    this.selectFlightsComponent.fromAirportName = null;
    this.selectFlightsComponent.toAirportName = null;
    this.selectFlightsComponent.selectedFromAirport = null;
    this.selectFlightsComponent.selectedToAirport = null;
    this.peopleCount = 1;
    this.isBusinessTrip = false;
    this.selectFlightsComponent.distanceInKm = null;
    this.selectFlightsComponent.distanceInMiles = null;
    this.emission = null;
    this.activePage = 'page1';
  }

  onRefreshDistance() {
    this.selectFlightsComponent.calculateDistance();
    this.calculateEmission();
    this.calculateTrees();
  }

  private calculateEmission() {
    this.emission = parseFloat((this.selectFlightsComponent.distanceInKm * this.peopleCount
      * Constants.EMISSSION_PER_KM
      * (this.isBusinessTrip ? Constants.BUSINESS_CLASS_FACTOR : 1))
      .toPrecision(4));
  }

  private calculateTrees() {
    this.treesToDonate = Math.ceil(this.emission * Constants.TREES_PER_KG_EMISSION);
    this.treesToDonateArr = new Array(this.treesToDonate);
  }
}
