import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from './../../../app.cofig';

import { Donate } from './../../../models/donate.class';
import { EventService } from './../../../services/event.service';
import { ReportDonate } from './../../../models/reportdonate.class';

@Component({
  selector: 'app-listdonate',
  templateUrl: './listdonate.component.html',
  styleUrls: ['./listdonate.component.css']
})
export class ListdonateComponent implements OnInit {
  reportDonate : ReportDonate[] = Array<ReportDonate>();
  listDonate : Donate[] = Array<Donate>();
  public subscription: Subscription;
  api: String = this.config.API;
  event : String;
  event_name : String;
  // options = {
  //   fieldSeparator: ',',
  //   quoteStrings: '"',
  //   decimalseparator: '.',
  //   showLabels: true,
  //   title: 'KẾT QUẢ KÊU GỌI HỖ TRỢ CHƯƠNG TRÌNH #' + JSON.parse(localStorage.getItem('detailevent')).title,
  //   showTitle: true,
  //   headers: ['STT','Nội dung','Tiền mặt', 'Quà tặng' ],
  //   useBom: false,
  //   removeNewLines: true,
  //   keys: ['stt','content','money','gift' ]
  // };

  // datarp = [];
  constructor(private router: Router, private config: Config, private eventService: EventService) { }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.event_name = JSON.parse(localStorage.getItem('detailevent')).title;
    this.getAllDonateEvent();
    
  }

  getAllDonateEvent(){
    this.subscription = this.eventService.getAllDonateReceived(this.event).subscribe(data =>{
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach((element, index) => {
        this.listDonate.push(element);
        
        // let temp = new ReportDonate();
        // temp.stt = index + 1;
        // if(element.type == 'Hiện vật'){
        //   temp.content = 'Quà tặng ủng hộ';
        //   temp.money = 0;
        //   temp.gift = element.quality + " " + element.unit + " " + element.nameitem;
        // }
        // else{
        //   temp.content = 'Tiền mặt ủng hộ';
        //   temp.gift = "";
        //   temp.money = element.quality;
        // }
        // this.reportDonate.push(temp);
      });
      // this.datarp = JSON.parse(JSON.stringify(this.reportDonate));
      // console.log(this.datarp);
    })
  }

  report(){
    this.router.navigateByUrl('/eventdetail/reportdonate');
  }

}
