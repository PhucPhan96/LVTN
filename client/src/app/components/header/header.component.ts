import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  txtSearch : String;
  constructor(private router : Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  returnHome(){
    this.router.navigateByUrl("/home");
  }

  search(){
    this.router.navigateByUrl('/searchresult');
    console.log(this.txtSearch);
    
    localStorage.setItem('txtSearch', this.txtSearch.toString());
    this.txtSearch = "";
  }
}
