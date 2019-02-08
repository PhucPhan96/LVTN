import { Component, OnInit } from '@angular/core';
import { Config } from './../../../../app.cofig';

import { EventService } from './../../../../services/event.service';
import { GroupService } from './../../../../services/group.service';
import { SummaryEvent } from './../../../../models/summary_event.class';
import { SummaryEventExported } from './../../../../models/summary_event.class';
import { process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GridComponent } from '@progress/kendo-angular-grid';
import { aggregateBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-summary-event',
  templateUrl: './summary-event.component.html',
  styleUrls: ['./summary-event.component.css']
})
export class SummaryEventComponent implements OnInit {
  listSumEvent: SummaryEvent[] = Array<SummaryEvent>();
  sumEventExported: SummaryEventExported;
  event: String;
  event_name: String;
  api: String = this.config.API;
  totalCollect: number = 0;
  totalSpend: number = 0;
  fundsGroup: number;

  public datarp: any[];

  constructor(private config: Config, private eventService: EventService, private groupService: GroupService) {
    this.allData = this.allData.bind(this);
  }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.event_name = JSON.parse(localStorage.getItem('detailevent')).title;

    this.eventService.getSummaryOfEvent(this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if (res.msg.length == 0) {
        this.sumEventExported = new SummaryEventExported();
      }
      else {
        this.sumEventExported = res.msg[0];
      }
    })
    this.getFundOfGroup();
    this.getTotalDonate();
    this.getTotalSpend();
    setTimeout(() => {
      this.getSummaryMoney();
    }, 500);

    setTimeout(() => {
      this.datarp = JSON.parse(JSON.stringify(this.listSumEvent));
    }, 500);
  }

  getFundOfGroup() {
    this.groupService.getGroupByID(JSON.parse(localStorage.getItem('detailevent')).group).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      var funds = res.msg[0].funds
      let temp = new SummaryEvent();
      temp.stt = 1;
      temp.content = 'Quỹ tiền mặt của nhóm';
      if (this.sumEventExported.constructor.length == 0) {
        temp.total_collect = funds;
      }
      else {
        temp.total_collect = this.sumEventExported.funds_group;
      }
      this.listSumEvent.push(temp);
      this.fundsGroup = res.msg[0].funds;
    })
  }

  getTotalDonate() {
    this.eventService.getAllDonateReceived(this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        if (element.type == 'Tiền mặt') {
          this.totalCollect += element.quality;
        }
      });
      let temp = new SummaryEvent();
      temp.stt = 2;
      temp.content = 'Tiền mặt ủng hộ từ các cá nhân, tập thể';
      if (this.sumEventExported.constructor.length == 0) {
        temp.total_collect = this.totalCollect;
      }
      else {
        temp.total_collect = this.sumEventExported.total_collect;
      }
      this.listSumEvent.push(temp);
    })
  }

  getTotalSpend() {
    this.eventService.getAllSpendingEvent(this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.totalSpend += element.total;
      });
      let temp = new SummaryEvent();
      temp.stt = 3;
      temp.content = 'Tổng chi tiêu cho chương trình';
      if (this.sumEventExported.constructor.length == 0) {
        temp.total_spend = this.totalSpend;
      }
      else {
        temp.total_spend = this.sumEventExported.total_spend;
      }
      this.listSumEvent.push(temp);
    })
  }

  getSummaryMoney() {
    let temp = new SummaryEvent();
    temp.content = 'Số tiền còn lại';
    if (this.sumEventExported.constructor.length == 0) {
      temp.total_collect = this.fundsGroup + (this.totalCollect - this.totalSpend);
    }
    else {
      temp.total_collect = this.sumEventExported.funds_group + (this.sumEventExported.total_collect - this.sumEventExported.total_spend);
    }
    this.listSumEvent.push(temp);
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.listSumEvent, { sort: [{ field: 'stt', dir: 'asc' }] }).data
    };

    return result;
  }

  summary() {
    if (this.sumEventExported.constructor.length == 0) {
      this.sumEventExported.funds_group = this.fundsGroup;
      this.sumEventExported.total_collect = this.totalCollect;
      this.sumEventExported.total_spend = this.totalSpend;
      this.sumEventExported.event = this.event;
      this.eventService.createSummaryEvent(this.sumEventExported).subscribe();
      var updateFunds: Number = this.fundsGroup + (this.totalCollect - this.totalSpend);
      this.groupService.updateFunds(JSON.parse(localStorage.getItem('detailevent')).group, updateFunds).subscribe();
    }
  }
}
