import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../components/shared/employee.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/index';
import { ApiService, UserService } from './../services/index';
import { NavbarService } from '../components/shared/navbar.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-hospitaldashboard',
  templateUrl: './hospitaldashboard.component.html',
  styleUrls: ['./hospitaldashboard.component.scss']
})
export class HospitaldashboardComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: any;
  success = false;
  alldoctors:number=0;
  allclinicians:number=0;
  constructor(private service: EmployeeService,private  router: Router,private apiService: ApiService,
    private userService: UserService,private authService: AuthService,public nav: NavbarService) { }

    ngOnInit() {
      this.nav.hide();
      this.currentUser = this.userService.getCurrentUser();
      this.getregisteredusers(0);
    }
    
    getregisteredusers(tab) {
      if(tab==0){
      
      this.apiService.getAllUsershosp().subscribe(allUsers => {
        var userArray = Object.keys(allUsers).map(function (userIndex) {
          let user = allUsers[userIndex];
          // do something with person
          
          return user;
        });
        
           ///alert(userArray['usertype']);
        for (let u of userArray) {
          if(this.currentUser.userid==u['hospitalId'] && u['usertype']=='doctor'){
            this.alldoctors=this.alldoctors+1;
          }
          else if(this.currentUser.userid==u['hospitalId'] && u['usertype']=='clinician'){
            this.allclinicians=this.allclinicians+1;
          }
        }
        //console.log("List of registered users: ");
      
        //alert(this.doctors);
      }, error => {
        console.log(JSON.stringify(error));
     alert("Problem getting list of users: " + error['error']['message']);
      });
    }
    }
}
