import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../app/components/shared/navbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  today: Date = new Date();
  
  constructor( public nav: NavbarService ) {}
  
  ngOnInit() {
    this.nav.show();
    
  }
}
