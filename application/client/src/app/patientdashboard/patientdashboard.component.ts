import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../components/shared/navbar.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.scss']
})
export class PatientdashboardComponent implements OnInit {
  constructor(public nav: NavbarService,public router:Router) { }
  ngOnInit() {
    this.nav.hide();
  }
  appointment(){
    this.router.navigate(["/new-appointment"]);
  }

}
