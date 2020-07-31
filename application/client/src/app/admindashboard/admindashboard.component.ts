
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../components/shared/employee.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/index';
import { ApiService, UserService } from './../services/index';
import { NavbarService } from '../components/shared/navbar.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: any;
  order: Object;
  registeredusers:any[];
  success = false;
  allUsers: MatTableDataSource<alluser[]>;
  columnsToDisplay = ['id', 'usertype'];

  constructor(private service: EmployeeService,private  router: Router,private apiService: ApiService,
    private userService: UserService,private authService: AuthService,public nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
    this.currentUser = this.userService.getCurrentUser();
    this.getregisteredusers(0);
  }
  
  getregisteredusers(tab) {
    if(tab==0){
    this.registeredusers  = [];
    this.apiService.getAllUsers().subscribe(allUsers => {
      var userArray = Object.keys(allUsers).map(function (userIndex) {
        let user = allUsers[userIndex];
        // do something with person
        
        return user;
      });
      
         ///alert(userArray['usertype']);
      for (let u of userArray) {
        if (u['id'] != "admin" && u['id'] != "org1Admin" && u['id'] != "org1peer1"){
          this.registeredusers.push(u);
        }
      }
      console.log("List of registered users: ");
      console.log(this.registeredusers);
      this.allUsers=new MatTableDataSource(this.registeredusers);
      //alert(this.doctors);
    }, error => {
      console.log(JSON.stringify(error));
   alert("Problem getting list of users: " + error['error']['message']);
    });
  }
  }
   onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}

export interface alluser {
  id: string;
  usertype: string;
}
