import { DataApiService } from './data-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';

describe('DataApiService', () => {

let httpClientSpy: { get: jasmine.Spy };
let dataApiService: DataApiService;

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

beforeEach(() => {
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  dataApiService = new DataApiService(httpClientSpy as any);
  dataApiService.url = 'test-url';
});

it('#getAll should return expected results (HttpClient called once)', () => {
  const expectedResults: any[] = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

  httpClientSpy.get.and.returnValue(asyncData(expectedResults));

  dataApiService.getAll().subscribe(
    results => expect(results).toEqual(expectedResults, 'expected results'),
    fail
  );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});

// it('should return an error when the server returns a 404', () => {
//   const errorResponse = new HttpErrorResponse({
//     error: 'test 404 error',
//     status: 404, statusText: 'Not Found'
//   });

//   httpClientSpy.get.and.returnValue(asyncError(errorResponse));

//   dataApiService.getAll().subscribe(
//     results => fail('expected an error, not results'),
//     error  => expect(error.message).toContain('test 404 error')
//   );
// });

});
