import { Component, OnInit, ViewChild} from '@angular/core';
import { CalculateTreesComponent } from './calculate-trees/calculate-trees.component';
import { CalculateEmissionComponent } from './calculate-emission/calculate-emission.component';
import { SelectFlightsComponent } from './select-flights/select-flights.component';

declare let $: any;

@Component({
  selector: 'app-flight-calculator',
  templateUrl: './flight-calculator.component.html',
  styleUrls: ['./flight-calculator.component.css']
})
export class FlightCalculatorComponent implements OnInit {

  activePage: string;
  distanceInKm: number;
  emission: number;
  treesToDonate: number;

  @ViewChild(SelectFlightsComponent)
  private selectFlightsComponent: SelectFlightsComponent;

  @ViewChild(CalculateEmissionComponent)
  private calculateEmissionComponent: CalculateEmissionComponent;

  @ViewChild(CalculateTreesComponent)
  private calculateTreesComponent: CalculateTreesComponent;

  constructor() {
    this.activePage = 'page1';

    setTimeout(() => {
        if ($('#page1').length > 0) {
          $('html, body').animate({
            scrollTop: ($('#page1').offset().top)
            }, 1000, 'easeInOutExpo');
        }
      }, 1000);
  }

  ngOnInit() {  }

  onDistanceSubmitted() {
    this.emission = this.calculateEmissionComponent.calculateEmission();
    this.activePage = 'page2';
  }

  onEmissionSubmitted() {
    this.treesToDonate = this.calculateTreesComponent.calculateTrees();
    this.activePage = 'page3';
  }

  onTreesSubmitted() {
    this.activePage = 'page4';
  }

  onRefreshDistance() {
    this.distanceInKm = this.selectFlightsComponent.calculateDistance();
  }

  onRefreshEmission() {
    this.emission = this.calculateEmissionComponent.calculateEmission();
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
}
