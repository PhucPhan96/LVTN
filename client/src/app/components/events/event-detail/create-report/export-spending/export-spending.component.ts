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
  listSpendingEvent: SpendingEvent[] = Array<SpendingEvent>();
  event: String;
  event_name: String;
  api: String = this.config.API;

  public aggregates: any[] = [{ field: 'total', aggregate: 'sum' }];

  public datarp: any[];

  public total: any = aggregateBy(this.listSpendingEvent, this.aggregates);

  public group: any[] = [{
    field: 'group',
    aggregates: this.aggregates
  }];

  constructor(private config: Config, private eventService: EventService) {
    this.allData = this.allData.bind(this);
  }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.event_name = JSON.parse(localStorage.getItem('detailevent')).title;
    this.getAllSpendingEvent();
  }

  getAllSpendingEvent() {
    this.eventService.getAllSpendingEvent(this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      res.msg.forEach((element, index) => {
        let temp = new SpendingEvent();
        temp.stt = index + 1;
        temp.content = element.content;
        temp.quality = element.quality;
        temp.unit_price = element.unit_price;
        temp.total = element.total;
        temp.note = element.note;
        temp.event = element.event;
        temp.group = this.event_name;
        this.listSpendingEvent.push(temp);
      });
      // console.log(this.listSpendingEvent);
      this.datarp = JSON.parse(JSON.stringify(this.listSpendingEvent));
      // console.log(this.datarp);
      
    })
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.listSpendingEvent, { group: this.group, sort: [{ field: 'stt', dir: 'asc' }] }).data,
      group: this.group
    };

    return result;
  }

}
