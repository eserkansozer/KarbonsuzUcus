import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataApiService {

  url: string;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  getByParameters(parameters: Array<{key: string, value: string}>) {
    let httpParams  =  new HttpParams();
    parameters.forEach(parameter => {
      httpParams = httpParams.append(parameter.key, parameter.value);
    });

    return this.http.get(this.url, {params: httpParams});
  }

  getByRoute(route: string) {
    return this.http.get(this.url + route);
  }

  create(resource) {
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers };
    return this.http.post(this.url, JSON.stringify(resource), options);
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id);
  }
}
