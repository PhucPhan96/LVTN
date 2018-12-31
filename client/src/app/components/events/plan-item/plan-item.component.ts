import { Component, OnInit, Input } from '@angular/core';
import { PlanItem } from './../../../models/plan-item.class'

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent implements OnInit {
  @Input() planItem : PlanItem;
  constructor() { }

  ngOnInit() {
  }

}
