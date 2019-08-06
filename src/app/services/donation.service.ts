import { DataApiService } from './data-api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare let dataLayer: any;

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private donationApiService: DataApiService) {
    donationApiService.url = environment.donationApiServiceUrl;
  }

  donate(charity: string, treesToDonate: number) {
    let urlBase: string;
    const parameters = `kaynak=karbonsuzucus&adet=${treesToDonate}`;
    switch (charity) {
      case 'cekul':
        urlBase = 'https://fonzip.com/cekul/bagis?';
        break;
      case 'egeorman':
        urlBase = 'https://www.egeorman.org.tr/online-bagis-co2.aspx?';
        break;
      case 'docev':
        urlBase = 'http://www.docev.org.tr/fidanbagisi.aspx?';
        break;
    }
    dataLayer.push({ event: 'gtm_donation_button_click', charity, comingFrom : sessionStorage.referrer, trees: treesToDonate });
    this.donationApiService.create({Charity : charity, Referrer: sessionStorage.referrer, Trees : treesToDonate})
    .subscribe(result => console.log(result));
    window.open(urlBase + parameters);
  }

  getTotalDonatedTreeCount() {
    return this.donationApiService.getByRoute('/trees/count');
  }
}

