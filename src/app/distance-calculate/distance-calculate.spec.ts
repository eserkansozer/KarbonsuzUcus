import { HttpClient } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DistanceCalculateComponent } from './distance-calculate.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, defer } from 'rxjs';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('DistanceCalculateComponent', () => {
  // let component: DistanceCalculateComponent;
  // let fixture: ComponentFixture<DistanceCalculateComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ DistanceCalculateComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DistanceCalculateComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  let component: DistanceCalculateComponent;
  class MockActivatedRoute {
    params = new Observable(observer => {
      observer.next(
        {
          departure: 'test-departure',
          arrival: 'test-arrival',
          connection: 'test-connection'
        }
         );
    });
  }
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  httpClientSpy.get.and.returnValue(asyncData(
    [{city: "Istanbul", name: "Istanbul Intl ", country: "Turkey", IATA: "IST", lon: "28.741944", ICAO: "LTFJ", lat: "41.260278", timezone: "3"}]
  ));

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent services
      providers: [
        DistanceCalculateComponent,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: HttpClient, useValue: httpClientSpy },

      ]
  });
    // inject both the component and the dependent services
    component = TestBed.get(DistanceCalculateComponent);
});

  it('should construct from route parameters', () => {
      expect(component).toBeTruthy();
      expect(component.departureCode).toEqual('TEST-DEPARTURE');
      expect(component.arrivalCode).toEqual('TEST-ARRIVAL');
      expect(component.connectionCode).toEqual('TEST-CONNECTION');
      expect(component.connectionEnabled).toBeTruthy();
  });

  it('should get airports list for en locale on ngOnInit',
  () => {
    component.locale = 'en-US';
    component.ngOnInit();
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/airports.json');
    expect(component.airports).toBeDefined();
    //expect(component.PrefillAirportsFromQueryParameters).toHaveBeenCalled();
  }
  );
});
