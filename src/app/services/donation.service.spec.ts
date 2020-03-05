import { DonationService } from './donation.service';
import { Observable } from 'rxjs';

describe('DonationService', () => {
  let service: DonationService;

  // beforeEach(() => { service = new DonationService(); });

  it('#donate should call create from a spy DataApiService', () => {
    const dataApiServiceSpy = jasmine.createSpyObj('DataApiService', ['create']);

    dataApiServiceSpy.create.and.returnValue(
      new Observable(observer => {
        observer.next('Donation api call result');
      })
    );

    sessionStorage.referrer = 'test-referrer';

    service = new DonationService(dataApiServiceSpy);

    service.donate('test-charity', 10);

    expect(dataApiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(dataApiServiceSpy.create).toHaveBeenCalledWith({ Charity: 'test-charity', Referrer: 'test-referrer', Trees: 10 });

    // expect(dataApiServiceSpy.create.calls.count())
    // .toBe(1, 'spy method was called once');

    // expect(service.create())
    //   .toBe(stubValue, 'service returned stub value');

    // expect(dataApiServiceSpy.create.calls.mostRecent().returnValue)
    //   .toBe(stubValue);
  });

  // it('#getValue should return real value', () => {
  //   expect(service.donate('test-charity', 10)).toBe('real value');
  // });

  // it('#getObservableValue should return value from observable',
  //   (done: DoneFn) => {
  //   service.getObservableValue().subscribe(value => {
  //     expect(value).toBe('observable value');
  //     done();
  //   });
  // });

  // it('#getPromiseValue should return value from a promise',
  //   (done: DoneFn) => {
  //   service.getPromiseValue().then(value => {
  //     expect(value).toBe('promise value');
  //     done();
  //   });
  // });

  it('#donate should call getByRoute from a spy DataApiService', () => {
    const dataApiServiceSpy = jasmine.createSpyObj('DataApiService', ['getByRoute']);

    const fakeObservable = new Observable();
    dataApiServiceSpy.getByRoute.and.returnValue(fakeObservable);

    service = new DonationService(dataApiServiceSpy);

    const result = service.getTotalDonatedTreeCount();

    expect(dataApiServiceSpy.getByRoute).toHaveBeenCalledTimes(1);
    expect(dataApiServiceSpy.getByRoute).toHaveBeenCalledWith('/trees/count');
    expect(result).toEqual(fakeObservable);
  });
});
