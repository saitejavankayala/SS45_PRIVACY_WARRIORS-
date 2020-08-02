import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';
import { ApiService, UserService } from './../services/index';
@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {
  model: any = {};
  loading = false;
  currentUser: any;
  order: Object;
  doctors:any[];
  success = false;
  registeredusers:any[];
  constructor(private router: Router,private authService: AuthService,private api: ApiService,private user: UserService) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    this.getdoctors();
    this.getregisteredusers(0);
  }
  getregisteredusers(tab) {
    if(tab==0){
    this.registeredusers  = [];
    this.api.getUsers().subscribe(allUsers => {
      var userArray = Object.keys(allUsers).map(function (userIndex) {
        let user = allUsers[userIndex];
        // do something with person
        
        return user;
      });
      
         ///alert(userArray['usertype']);
      for (let u of userArray) {
          this.registeredusers.push(u);
      }
      console.log("List of registered users: ");
      console.log(this.registeredusers);
     
      //alert(this.doctors);
    }, error => {
      console.log(JSON.stringify(error));
   alert("Problem getting list of users: " + error['error']['message']);
    });
  }
  }
  newappointment(){
    this.loading=true;
    this.api.body={
      patient_uniqueId: "patient_uniqueId-" + uuid(),
      name : this.registeredusers[0].patientName,
      gender:this.registeredusers[0].patientGender,
      date:this.registeredusers[0].patientDob,
      mail:this.registeredusers[0].patientMail,
      tel:this.registeredusers[0].patientMobile,
      address:this.model.address,
      appointment_for:this.model.appointment_for,
      doctor:this.model.doctorname,
      date1:this.model.date1,
      duration:this.model.duration,
       aadhar:this.currentUser.userid
      
    }
    this.api.orderProduct().subscribe(api => {
      this.order = api
      console.log(this.order);
      //this.api.queryOrders();
      this.success = true;
      //alert ("Order Created Successfully!")
      this.router.navigate(['/doctor']);
    }, error => {
      this.success = false;
      alert("Problem creating Order: " + error['error']['message'])
    })
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
}
// Generate a random number to create orderId
function uuid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return `${s4()}`
}
