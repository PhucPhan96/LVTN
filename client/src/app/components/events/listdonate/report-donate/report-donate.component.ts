import { Component, OnInit } from '@angular/core';
import { Config } from './../../../../app.cofig';

import { EventService } from './../../../../services/event.service';
import { UserService } from './../../../../services/user.service';
import { ReportDonate } from './../../../../models/reportdonate.class';
import { process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GridComponent } from '@progress/kendo-angular-grid';
import { aggregateBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-report-donate',
  templateUrl: './report-donate.component.html',
  // templateUrl: './report-donate.component.html',
  styleUrls: ['./report-donate.component.css']
})
export class ReportDonateComponent implements OnInit {
  reportDonate: ReportDonate[] = Array<ReportDonate>();
  api: String = this.config.API;
  event: String;
  event_name: String;
  public aggregates: any[] = [{ field: 'money', aggregate: 'sum' }];

  public datarp: any[];

  public total: any = aggregateBy(this.reportDonate, this.aggregates);

  public group: any[] = [{
    field: 'type',
    dir: 'desc',
    aggregates: this.aggregates
  }];
  constructor(private config: Config, private eventService: EventService, private userService: UserService) {
    this.allData = this.allData.bind(this);
  }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.event_name = JSON.parse(localStorage.getItem('detailevent')).title;
    this.getReportDonate();
  }

  getReportDonate() {
    this.eventService.getAllDonateReceived(this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach((element, index) => {
        let temp = new ReportDonate();
        this.userService.getUserByID(element.user).subscribe(data => {
          let user = JSON.parse(JSON.stringify(data));
          temp.user = user.msg[0].firstname + ' ' + user.msg[0].lastname;
        })
        temp.stt = index + 1;
        temp.type = element.type;
        if (element.type == 'Hiện vật') {
          temp.content = 'Quà tặng ủng hộ';
          temp.money = 0;
          temp.gift = element.quality + " " + element.unit + " " + element.nameitem;
        }
        else {
          temp.content = 'Tiền mặt ủng hộ';
          temp.gift = "";
          temp.money = element.quality;
        }
        
        this.reportDonate.push(temp);
      });
      // console.log(JSON.parse(JSON.stringify(this.reportDonate)));
      // this.datarp = JSON.parse(JSON.stringify(this.reportDonate));
      // console.log(this.datarp);
      setTimeout(()=>{
        this.datarp = JSON.parse(JSON.stringify(this.reportDonate));
      },500);
    })
  }
  // exportAsXLSX():void {
  //   this.excelService.exportAsExcelFile(this.datarp, 'Donggop# ' + this.event_name);
  // }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.reportDonate, { group: this.group, sort: [{ field: 'stt', dir: 'asc' }] }).data,
      group: this.group
    };

    return result;
  }

}
