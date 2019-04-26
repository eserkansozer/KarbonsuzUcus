import { Component, OnInit, Input } from '@angular/core';
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
  perTreeFeeTema = 10;
  perTreeFeeCekul = 13;
  perTreeFeeEgeOrman = 10;
  perTreeFeeDocev = 10;

  constructor(private route: ActivatedRoute, private donationService: DonationService) {

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
