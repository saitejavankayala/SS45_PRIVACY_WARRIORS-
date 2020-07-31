import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';
import { ApiService, UserService } from './../services/index';
@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  model: any = {};
  loading = false;
  currentUser: any;
  order: Object;
  doctors:any[];
  success = false;
  constructor(private router: Router,private authService: AuthService,private api: ApiService,private user: UserService) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    this.getdoctors();
  }
  
  newappointment(){
    this.loading=true;
    this.api.body={
      patient_uniqueId: "patient_uniqueId-" + uuid(),
      name : this.model.name,
      gender:this.model.gender,
      date:this.model.date,
      mail:this.model.mail,
      tel:this.model.tel,
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
