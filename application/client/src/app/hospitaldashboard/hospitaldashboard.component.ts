import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../components/shared/navbar.service';
@Component({
  selector: 'app-hospitaldashboard',
  templateUrl: './hospitaldashboard.component.html',
  styleUrls: ['./hospitaldashboard.component.scss']
})
export class HospitaldashboardComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }

}
