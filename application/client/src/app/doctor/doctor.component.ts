import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService } from '../services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  orders: MatTableDataSource<Order[]>;
  currentUser: any;
  appointments:any[];
  columnsToDisplay = ['patientUniqueId','patientName','patientMobile','patientDob','patientGender','patientMail','doctorId','appontmentDate','duration','status'];
  constructor(private router:Router,private api: ApiService, private user: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    //console.log("currentUser: "+this.currentUser);
    //this.regulator = this.regulator !== undefined;
    //console.log(`Regulator Boolean attribute is ${this.regulator ? '' : 'non-'}present!`);
    console.log(this.currentUser.userid);
    // Load up the Orders from backend
    this.getappointments(0);
  }
  getappointments(tab) {
    if(tab==0){
    this.appointments  = [];
    this.api.queryOrders(this.currentUser).subscribe(allUsers => {
      var userArray = Object.keys(allUsers).map(function (userIndex) {
        let user = allUsers[userIndex];
        // do something with person
        
        return user;
      });
      
         ///alert(userArray['usertype']);
      for (let u of userArray) {
        if(u['currentAppointmentState']==5 && u['userId']==this.currentUser.userid){
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
  Appointment(){
    this.router.navigate(['/new-appointment']);
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