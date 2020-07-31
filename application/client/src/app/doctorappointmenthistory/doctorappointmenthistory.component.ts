import { Component, Inject, Input,OnInit , ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService, AuthService } from '../services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
//import { AuthService } from '../services/index';
import { NavbarService } from '../components/shared/navbar.service';


@Component({
  selector: 'app-doctorappointmenthistory',
  templateUrl: './doctorappointmenthistory.component.html',
  styleUrls: ['./doctorappointmenthistory.component.scss']
})
export class DoctorAppointmenthistoryComponent implements OnInit {
  loading = false;
  orders: MatTableDataSource<Order[]>;
  currentUser: any;
  appointments:any[];
  columnsToDisplay = ['patientUniqueId','patientName','patientMobile','patientDob','patientGender','patientMail','doctorId','appontmentDate','duration','status'];
  constructor(public nav: NavbarService,private api: ApiService, private user: UserService, private cd: ChangeDetectorRef, public dialog: MatDialog,private router:Router,private authService:AuthService) { }

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
        console.log("hii");
        console.log(u);
        if(u['currentAppointmentState']==5 && u['aadhar']==this.currentUser.userid){
          
          this.appointments.push(u);
        }
        
      }

      console.log("List of registered users: ");
      console.log(this.appointments);
      this.orders=new MatTableDataSource(this.appointments);
      //alert(this.doctors);
    }, error => {
      console.log(JSON.stringify(error));
   alert("Problem getting list of users: " + error['error']['message']);
    });
  }
  }
}
export interface Order {
  patientUniqueId:string;
  patientName:string;
  patientMobile:string;
  patientDob:string;
  patientGender:string;
  patientMail:string;
  doctorId:string;
  appontmentDate:string;
  duration:string;
  status:string;
}
