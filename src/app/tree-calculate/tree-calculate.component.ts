import { Component, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/Common/Constants';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from '../services/donation.service';

declare let $: any;
declare let dataLayer: any;

@Component({
  selector: 'app-tree-calculate',
  templateUrl: './tree-calculate.component.html',
  styleUrls: ['./tree-calculate.component.css']
})
export class TreeCalculateComponent implements OnInit {
  faTree = faTree;

  emission: number;
  treesToDonate: number;
  treesCounted = false;
  referrer: string;
  locale: string;

  public get treeUnits(): Array<any> {
    if (!this.treesToDonate) {
     return new Array(0);
    }
    return new Array(this.treesToDonate);
  }

  constructor(private route: ActivatedRoute, private donationService: DonationService, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
    this.route.params.subscribe(params => {
      this.emission = params.carbon ? params.carbon : null;
    });
   }

  ngOnInit() {
    this.slideToContent();
    this.calculateTrees();
    this.referrer = sessionStorage.referrer;
  }

  calculateTrees() {
    this.treesCounted = false;
    this.treesToDonate = Math.round(this.emission * Constants.TREES_PER_KG_EMISSION) < 1 ?
                          1 : Math.round(this.emission * Constants.TREES_PER_KG_EMISSION) ;
  }

  onDonate(charity) {
    this.donationService.donate(charity, this.treesToDonate);
  }

  private slideToContent() {
    const width = window.innerWidth || document.body.clientWidth;
    if (width < 992) {
    setTimeout(() => {
      if ($('#pageWrapper').length > 0) {
        $('html, body').animate({
          scrollTop: ($('#pageWrapper').offset().top)
        }, 500, 'easeInOutExpo');
      }
    }, 500);
  }
  }

}
