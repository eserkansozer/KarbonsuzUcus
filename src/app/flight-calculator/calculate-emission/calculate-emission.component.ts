import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Constants } from 'src/app/Common/Constants';
import { faCloud, faTree, faBriefcase, faUsers, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculate-emission',
  templateUrl: './calculate-emission.component.html',
  styleUrls: ['./calculate-emission.component.css']
})
export class CalculateEmissionComponent implements OnInit {

  @Output() emissionRefresh = new EventEmitter();
  @Output() emissionSubmit = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Input() distanceInKm: number;

  isBusinessTrip: boolean;
  peopleCount: number;
  emission: number;
  userSelection = new Array(10);

  faCloud = faCloud;
  faTree = faTree;
  faBriefcase = faBriefcase;
  faUsers = faUsers;
  faUser = faUser;
  faPlane = faPlane;

  public get emissionUnits(): Array<any> {
    if (!this.emission) {
     return new Array(0);
    }
    return new Array(Math.floor(this.emission / 300));
  }

  constructor() {
    this.peopleCount = 1;
    this.isBusinessTrip = false;
  }

  ngOnInit() {
  }

  onTripParameterChange() {
    this.emissionRefresh.emit();
  }

  onSubmit() {
    this.emissionSubmit.emit();
  }

  onReset() {
    this.reset.emit();
  }

  calculateEmission(): number {
    if (this.distanceInKm) {
    this.emission = parseFloat((this.distanceInKm * this.peopleCount
      * Constants.EMISSSION_PER_KM
      * (this.isBusinessTrip ? Constants.BUSINESS_CLASS_FACTOR : 1))
      .toPrecision(4));
    }
    return this.emission;
  }
}
