import { Component, Inject, Input,OnInit , ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService, AuthService } from '../services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
//import { AuthService } from '../services/index';
import { NavbarService } from '../components/shared/navbar.service';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-appointements',
  templateUrl: './appointements.component.html',
  styleUrls: ['./appointements.component.scss']
})
export class AppointementsComponent implements OnInit {
  loading = false;
  orders: MatTableDataSource<Order[]>;
  currentUser: any;
  appointments:any[];
  columnsToDisplay = ['patientUniqueId','patientName','patientMobile','patientDob','patientGender','patientMail','doctorId','appontmentDate','duration','status'];
  constructor(public nav: NavbarService,private api: ApiService, private user: UserService, private cd: ChangeDetectorRef, public dialog: MatDialog,private router:Router,private authService:AuthService,private dataservice:DataService) { }

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
        if(u['currentAppointmentState']==5 && this.currentUser.userid==u['doctorId']){
          
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
  accept(patientUniqueId){
    this.dataservice.patientid=patientUniqueId;
    this.api.patientid=patientUniqueId;
    this.api.status='6';
      this.loading = true;
    this.api.acceptappointment().subscribe(data => {
      alert("accepted appointment");
      this.router.navigate(['/daignosis-form']);
    }, error => {
      this.loading = false;
      console.log(JSON.stringify(error));
      alert("accepting appointment getting problem " + error['error']['message']);
    });
    }
    reject(patientUniqueId){
      this.api.patientid=patientUniqueId;
      this.api.status='7';
        this.loading = true;
      this.api.acceptappointment().subscribe(data => {
        alert("rejected appointment");
        this.router.navigate(['/appointments']);
      }, error => {
        this.loading = false;
        console.log(JSON.stringify(error));
        alert("rejecting appointment getting problem " + error['error']['message']);
      });
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
