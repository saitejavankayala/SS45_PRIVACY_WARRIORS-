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
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.scss']
})
export class PatientdashboardComponent implements OnInit {
  loading = false;
  currentUser: any;
  appointments:any[];
  doctors:any[];
  pendings:number=0;
  totals:number=0;
  accepteds:number=0;
  rejecteds:number=0;
  specialization:string;
  constructor(public nav: NavbarService,private api: ApiService, private user: UserService, public dialog: MatDialog,private router:Router,private authService:AuthService,private dataservice:DataService) { }
  ngOnInit() {
    this.nav.hide();
    this.currentUser = this.user.getCurrentUser();
    //console.log("currentUser: "+this.currentUser);
    //this.regulator = this.regulator !== undefined;
    //console.log(`Regulator Boolean attribute is ${this.regulator ? '' : 'non-'}present!`);

    // Load up the Orders from backend
    this.getappointmentsdoctor(0);
    this.getdoctors();
  }
  search(){
    if(this.specialization!=""){
     this.doctors=this.doctors.filter(res=>{
       return res.name.toLocaleLowerCase().match(this.specialization.toLocaleLowerCase());
      });
    }
    else if(this.specialization==""){
     this.ngOnInit();
    }
    
  }
  getdoctors() {
    this.doctors  = [];
    this.api.getAllUsers().subscribe(allUsers => {
      var userArray = Object.keys(allUsers).map(function (userIndex) {
        let user = allUsers[userIndex];
        // do something with person
        
        return user;
      });
         ///alert(userArray['usertype']);
      for (let u of userArray) {
        if (u['usertype'] == "doctor") {
          this.doctors.push(u);
        }
      }
      console.log("List of doctors: ");
      console.log(this.doctors);
      //alert(this.doctors);
    }, error => {
      console.log(JSON.stringify(error));
   alert("Problem getting list of users: " + error['error']['message']);
    });
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
        if(this.currentUser.userid==u['userId']){
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
  appointment(){
    this.router.navigate(["/new-appointment"]);
  }

}
