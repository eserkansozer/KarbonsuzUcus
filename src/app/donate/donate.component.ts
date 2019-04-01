import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let dataLayer: any;
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  treeCount: number;
  perTreeFeeTema = 10;
  perTreeFeeCekul = 13;
  perTreeFeeEgeOrman = 10;
  perTreeFeeDocev = 10;

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.treeCount = +params.trees;
    });

  }

  ngOnInit() {
  }

  onDonate(charity) {
    let urlBase: string;
    const parameters = `kaynak=karbonsuzucus&adet=${this.treeCount}`;
    switch (charity) {
      case 'tema':
        urlBase = 'https://online.tema.org.tr/web_14966_1/member_panel_company.aspx?support_id=8&';
        break;
      case 'cekul':
        urlBase = 'https://fonzip.com/cekul/bagis?';
        break;
      case 'egeorman':
        urlBase = 'https://www.egeorman.org.tr/online-bagis2.aspx?';
        break;
      case 'docev':
        urlBase = 'http://www.docev.org.tr/fidanbagisi.aspx?';
        break;
    }
    dataLayer.push({ 'event': 'gtm_donation_button_click', 'charity' : charity, 'trees' : this.treeCount });
    window.open(urlBase + parameters);
  }
}
