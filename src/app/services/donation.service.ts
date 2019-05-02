import { Injectable } from '@angular/core';

declare let dataLayer: any;

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor() { }

  donate(charity: string, treesToDonate: number) {
    let urlBase: string;
    const parameters = `kaynak=karbonsuzucus&adet=${treesToDonate}`;
    switch (charity) {
      case 'tema':
        urlBase = 'https://online.tema.org.tr/web_14966_1/member_panel_company.aspx?support_id=8&';
        break;
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
    window.open(urlBase + parameters);
  }

}

