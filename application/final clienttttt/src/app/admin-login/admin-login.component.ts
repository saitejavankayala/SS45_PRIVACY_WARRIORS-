import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../components/shared/employee.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/index';
import { ApiService, UserService } from './../services/index';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: any;
  order: Object;
  registeredusers:any[];
  success = false;

  constructor(private service: EmployeeService,private  router: Router,private apiService: ApiService,
    private userService: UserService,private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    
  }
  login() {
    console.log("In login ()");
    this.loading = true;

    var user = {
      userid: this.model.userid,
      password: this.model.password,
      usertype: ""
    }

    this.apiService.id = this.model.userid;
    this.apiService.pwd = this.model.password;

    this.apiService.getUser().subscribe(res => {
      user.usertype = res['usertype'];
      this.userService.setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (res['usertype'] == "admin" && this.model.userid==res['id']) {
        this.router.navigate(['/admindashboard']);
      } 
    }, error => {
      console.log(JSON.stringify(error));
      alert("Login failed: "+this.model.userid);
      this.loading = false;
    });
  }
  /**login(){
    if(this.model.userid=="admin"){
      this.router.navigate(['/admindashboard']);
    }
  }*/
  
   onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}


