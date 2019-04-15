export class AirportModel {

  constructor(private name: string,
              private city: string,
              private country: string,
              public IATA: string,
              private lon: number,
              private lat: number) {    }

  get Lat() {
    return this.lat;
  }

  get Lon() {
    return this.lon;
  }

  get Country() {
    return this.country;
  }

  get Definition() {
    return `${this.name.trim()} (${this.IATA}), ${this.city}, ${this.country}`;
  }
}
