import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-ehr',
  templateUrl: './ehr.component.html',
  styleUrls: ['./ehr.component.scss']
})
export class EhrComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  Appointment(){
    this.router.navigate(['/new-appointment']);
  }

}
