import { Component, OnInit } from '@angular/core';
import { faTree } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.css']
})
export class ForestComponent implements OnInit {

  faTree = faTree;
  yourTreeList = new Array(Math.floor((Math.random() * 100)));
  treeList = new Array(Math.floor((Math.random() * 1000)));

  constructor() {

  }

  ngOnInit() {
  }

}
