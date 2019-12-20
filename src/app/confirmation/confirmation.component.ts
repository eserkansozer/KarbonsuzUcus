import { DonationService } from './../services/donation.service';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  totalDonatedTrees: number;
  faTree = faTree;
  treeList: any[];
  yourTreeList: any[];
  yourTreeCount: number;
  locale: string;

  constructor(private route: ActivatedRoute, private donationService: DonationService, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
    this.route.params.subscribe(params => {
      this.yourTreeCount = +params.trees;
    });
  }

  ngOnInit() {
    this.donationService.getTotalDonatedTreeCount().subscribe(result => {
      this.totalDonatedTrees = result as number;
      this.treeList = new Array(this.totalDonatedTrees);
      this.yourTreeList = new Array(this.yourTreeCount);
    });
  }

}
