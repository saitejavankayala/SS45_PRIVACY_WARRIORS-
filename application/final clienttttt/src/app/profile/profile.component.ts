import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';
import { ApiService, UserService } from './../services/index';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  registeredusers:any[];
  constructor(private  router: Router,private apiService: ApiService,
    private userService: UserService,private authService: AuthService) { }
    currentUser: any;
  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.getregisteredusers(0);
  }
  getregisteredusers(tab) {
    if(tab==0){
    this.registeredusers  = [];
    this.apiService.getUsers().subscribe(allUsers => {
      var userArray = Object.keys(allUsers).map(function (userIndex) {
        let user = allUsers[userIndex];
        // do something with person
        
        return user;
      });
      console.log(userArray);
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
}
