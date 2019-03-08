import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let $: any;

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

    this.slideToContent();
  }

  ngOnInit() {
  }

  onDonate(charity) {
    let urlBase: string;
    const parameters = `kaynak=sifirkarbon&adet=${this.treeCount}`;
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
    window.open(urlBase + parameters);
  }

  private slideToContent() {
    const width = window.innerWidth || document.body.clientWidth;
    if (width < 992) {
      setTimeout(() => {
        if ($('.container').length > 0) {
          $('html, body').animate({
            scrollTop: ($('.container').offset().top)
          }, 500, 'easeInOutExpo');
        }
      }, 1000);
    }
  }

}
