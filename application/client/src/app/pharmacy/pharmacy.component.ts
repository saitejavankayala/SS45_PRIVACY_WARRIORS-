import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  Appointment(){
    this.router.navigate(['/new-appointment']);
  }
}
