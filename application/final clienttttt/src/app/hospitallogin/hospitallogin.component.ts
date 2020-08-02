import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../components/shared/employee.service';
import { Router, RouterModule } from '@angular/router';
import { ApiService, UserService } from '../services/index';
import { AuthService } from '../services/index';

@Component({
  selector: 'app-hospitallogin',
  templateUrl: './hospitallogin.component.html',
  styleUrls: ['./hospitallogin.component.scss']
})
export class HospitalloginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(private service: EmployeeService,private  router: Router,private apiService: ApiService,
    private userService: UserService,private authService: AuthService) { }

  ngOnInit() {
  
  }
  login() {
    console.log("In login ()");
    this.loading = true;

    var user = {
      userid: this.model.userid,
      password: this.model.password,
      usertype: "hospital"
    }
    this.apiService.loginbody={
      userid:this.model.userid,
      password : this.model.password,
      usertype:"hospital"
    }

    this.apiService.id = this.model.userid;
    this.apiService.pwd = this.model.password;

    this.apiService.getUser().subscribe(res => {
      user.usertype = res['usertype'];
      this.userService.setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      if(res['usertype'] == "hospital" && res['id']==user.userid){
        alert(this.model.userid);
        this.router.navigate(['/hospitaldashboard']);
      }
    }, error => {
      console.log(JSON.stringify(error));
      alert("Login failed: "+this.model.userid);
      this.loading = false;
    });
  }
   /** login(){
    else if(user.usertype=="hospital"){
      this.router.navigate(['/hospitaldashboard']);
    }
  }*/
   onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
