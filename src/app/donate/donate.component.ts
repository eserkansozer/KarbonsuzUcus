import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from '../services/donation.service';

declare let dataLayer: any;
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  treeCount: number;
  totalDonatedTrees: number;
  perTreeFeeTema = 10;
  perTreeFeeCekul = 13;
  perTreeFeeEgeOrman = 10;
  perTreeFeeDocev = 10;
  locale: string;

  constructor(private route: ActivatedRoute, private donationService: DonationService, @Inject(LOCALE_ID) locale: string) {

    this.locale = locale;
    this.route.params.subscribe(params => {
      this.treeCount = +params.trees;
    });

  }

  ngOnInit() {
  }

  onDonate(charity) {
    this.donationService.donate(charity, this.treeCount);
  }
}
