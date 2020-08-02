import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../components/shared/navbar.service';

@Component({
  selector: 'app-cliniciandashboard',
  templateUrl: './cliniciandashboard.component.html',
  styleUrls: ['./cliniciandashboard.component.scss']
})
export class CliniciandashboardComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }

}
