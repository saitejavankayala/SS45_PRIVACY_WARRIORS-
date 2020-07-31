import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../components/shared/navbar.service';
@Component({
  selector: 'app-researcherdashboard',
  templateUrl: './researcherdashboard.component.html',
  styleUrls: ['./researcherdashboard.component.scss']
})
export class ResearcherdashboardComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }

}
