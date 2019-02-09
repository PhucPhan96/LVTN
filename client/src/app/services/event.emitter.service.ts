import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventEmitterService {

  dataStr = new EventEmitter();
  txtSearchChange = new EventEmitter();
  cmtDel = new EventEmitter();

  constructor() { }

  sendEmailProfile(email: String) {
    this.dataStr.emit(email);
  }

  changeTxtSearch(txtSearch : String){
    this.txtSearchChange.emit(txtSearch);
  }

  deleteCmt(idCmt : String){
    this.cmtDel.emit(idCmt);
  }
}
