import { faTree } from '@fortawesome/free-solid-svg-icons';
import { CalculateEmissionComponent } from './calculate-emission/calculate-emission.component';
import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';

import { Constants } from '../Common/Constants';
import { SelectFlightsComponent } from './select-flights/select-flights.component';


@Component({
  selector: 'app-flight-calculator',
  templateUrl: './flight-calculator.component.html',
  styleUrls: ['./flight-calculator.component.css']
})
export class FlightCalculatorComponent implements OnInit {
  treesRefresh = new EventEmitter();
  treesToDonate: number;
  treesToDonateArr: any[];

  activePage: string;
  distanceInKm: number;
  emission: number;

  faTree = faTree;

  @ViewChild(SelectFlightsComponent)
  private selectFlightsComponent: SelectFlightsComponent;

  @ViewChild(CalculateEmissionComponent)
  private calculateEmissionComponent: CalculateEmissionComponent;

  constructor() {
    this.activePage = 'page1';

    this.treesRefresh.subscribe(() => {
      this.calculateTrees();
    });
  }

  ngOnInit() {  }

  onDistanceSubmitted() {
    this.emission = this.calculateEmissionComponent.calculateEmission();
    this.activePage = 'page2';
  }

  onEmissionSubmitted() {
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
    this.calculateEmissionComponent.peopleCount = 1;
    this.calculateEmissionComponent.isBusinessTrip = false;
    this.selectFlightsComponent.distanceInKm = null;
    this.selectFlightsComponent.distanceInMiles = null;
    this.calculateEmissionComponent.emission = null;
    this.activePage = 'page1';
  }

  onRefreshDistance() {
    this.distanceInKm = this.selectFlightsComponent.calculateDistance();
  }

  onRefreshEmission() {
    this.emission = this.calculateEmissionComponent.calculateEmission();
  }


  private calculateTrees() {
    this.treesToDonate = Math.ceil(this.calculateEmissionComponent.emission * Constants.TREES_PER_KG_EMISSION);
    this.treesToDonateArr = new Array(this.treesToDonate);
  }
}
