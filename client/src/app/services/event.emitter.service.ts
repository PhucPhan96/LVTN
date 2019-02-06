import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventEmitterService {

  dataStr = new EventEmitter();

  constructor() { }

  sendEmailProfile(email: String) {
    this.dataStr.emit(email);
  }
}
