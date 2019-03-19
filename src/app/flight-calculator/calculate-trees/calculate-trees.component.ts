import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/Common/Constants';

@Component({
  selector: 'app-calculate-trees',
  templateUrl: './calculate-trees.component.html',
  styleUrls: ['./calculate-trees.component.css']
})
export class CalculateTreesComponent implements OnInit {
  @Input() emission: number;
  @Output() treesSubmit = new EventEmitter();
  @Output() reset = new EventEmitter();

  treesToDonate: number;
  treesCounted = false;

  faTree = faTree;

  public get treeUnits(): Array<any> {
    if (!this.treesToDonate) {
     return new Array(0);
    }
    return new Array(this.treesToDonate);
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.treesSubmit.emit();
  }

  onReset() {
    this.reset.emit();
  }

  calculateTrees(): number {
    this.treesCounted = false;
    this.treesToDonate = Math.round(this.emission * Constants.TREES_PER_KG_EMISSION) < 1 ?
                          1 : Math.round(this.emission * Constants.TREES_PER_KG_EMISSION) ;
    return this.treesToDonate;
  }

}
