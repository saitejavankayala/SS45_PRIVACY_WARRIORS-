import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService, AuthService } from '../services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
//import { AuthService } from '../services/index';
import { NavbarService } from '../components/shared/navbar.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.scss']
})
export class DoctordashboardComponent implements OnInit {
  loading = false;
  currentUser: any;
  appointments:any[];
  pendings:number=0;
  totals:number=0;
  accepteds:number=0;
  rejecteds:number=0;
  constructor(public nav: NavbarService,private api: ApiService, private user: UserService, public dialog: MatDialog,private router:Router,private authService:AuthService,private dataservice:DataService) { }
  ngOnInit() {
    this.nav.hide();
    this.currentUser = this.user.getCurrentUser();
    //console.log("currentUser: "+this.currentUser);
    //this.regulator = this.regulator !== undefined;
    //console.log(`Regulator Boolean attribute is ${this.regulator ? '' : 'non-'}present!`);

    // Load up the Orders from backend
    this.getappointmentsdoctor(0);
  }
  getappointmentsdoctor(tab) {
    if(tab==0){
    this.appointments  = [];
    this.api.queryOrdersdoctors(this.currentUser).subscribe(allUsers => {
      var userArray = Object.keys(allUsers).map(function (userIndex) {
        let user = allUsers[userIndex];
        // do something with person
        
        return user;
      });
      
         ///alert(userArray['usertype']);
      for (let u of userArray) {
        if(this.currentUser.userid==u['doctorId']){
          if(u['currentAppointmentState']=='5'){
            this.pendings=this.pendings+1;
            this.totals=this.totals+1;
          }
          else if(u['currentAppointmentState']=='6'){
            this.accepteds=this.accepteds+1;
            this.totals=this.totals+1;
          }
          else if(u['currentAppointmentState']=='7'){
            this.rejecteds=this.rejecteds+1;
            this.totals=this.totals+1;
          }
        }
        
      }
      //alert(this.doctors);
    }, error => {
      console.log(JSON.stringify(error));
   alert("Problem getting list of appointments of patient: " + error['error']['message']);
    });
  }
  }

}
