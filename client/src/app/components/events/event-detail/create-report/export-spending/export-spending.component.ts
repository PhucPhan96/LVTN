import { Component, OnInit } from '@angular/core';
import { Config } from './../../../../../app.cofig';

import { EventService } from './../../../../../services/event.service';
import { SpendingEvent } from './../../../../../models/spendingevent.class';
import { process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GridComponent } from '@progress/kendo-angular-grid';
import { aggregateBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-export-spending',
  templateUrl: './export-spending.component.html',
  styleUrls: ['./export-spending.component.css']
})
export class ExportSpendingComponent implements OnInit {
  listSpendingEvent : SpendingEvent[] = Array<SpendingEvent>();
  event: String;
  api: String = this.config.API;

  public aggregates: any[] = [{ field: 'total', aggregate: 'sum' }];

  public datarp: any[];

  public totalSpending: any = aggregateBy(this.listSpendingEvent, this.aggregates);

  // public group: any[] = [{
  //   field: 'type',
  //   dir: 'desc',
  //   aggregates: this.aggregates
  // }];

  constructor(private config: Config, private eventService : EventService) { }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
  }

  getAllSpendingEvent(){
    this.eventService.getAllSpendingEvent(this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      res.msg.forEach((element, index) => {
        this.listSpendingEvent.push(element);
      });
      console.log(this.listSpendingEvent);
      
    })
  }

}
