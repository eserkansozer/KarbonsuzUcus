import { Component, OnInit} from '@angular/core';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/Common/Constants';
import { ActivatedRoute } from '@angular/router';

declare let $: any;
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

  public get treeUnits(): Array<any> {
    if (!this.treesToDonate) {
     return new Array(0);
    }
    return new Array(this.treesToDonate);
  }

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.emission = params.carbon ? params.carbon : null;
    });
   }

  ngOnInit() {
    this.slideToContent();
    this.calculateTrees();
  }

  calculateTrees() {
    this.treesCounted = false;
    this.treesToDonate = Math.round(this.emission * Constants.TREES_PER_KG_EMISSION) < 1 ?
                          1 : Math.round(this.emission * Constants.TREES_PER_KG_EMISSION) ;
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
