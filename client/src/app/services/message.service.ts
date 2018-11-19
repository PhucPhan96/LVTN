import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { MyResponse } from '../models/my_response.class';
import { Message } from '../models/message.class';
import { Config } from '../app.cofig';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public API: String = this.cofig.API;
  constructor(public http: HttpClient, private cofig: Config) { }

}
