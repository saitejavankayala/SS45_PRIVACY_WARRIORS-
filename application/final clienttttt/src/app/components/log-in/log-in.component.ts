import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../components/shared/employee.service';
import { Router, RouterModule } from '@angular/router';
import { ApiService, UserService } from '../../services/index';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

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
      usertype: ""
    }
    this.apiService.loginbody={
      userid:this.model.userid,
      password : this.model.password,
    }

    this.apiService.id = this.model.userid;
    this.apiService.pwd = this.model.password;

    this.apiService.getUser().subscribe(res => {
      user.usertype = res['usertype'];
      this.userService.setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (res['usertype'] == "patient" && res['usertype']==this.model.usertype && res['id']==user.userid) {
        this.router.navigate(['/patientdashboard']);
      } else if(res['usertype'] == "doctor" && res['usertype']==this.model.usertype && res['id']==user.userid){
        this.router.navigate(['/doctordashboard']);
      } else if(res['usertype'] == "hospital" && res['usertype']==this.model.usertype && res['id']==user.userid){
        this.router.navigate(['/hospitaldashboard']);
      }
      else if(res['usertype'] == "clinician" && res['usertype']==this.model.usertype &&  res['id']==user.userid){
        this.router.navigate(['/cliniciandashboard']);
      }
      else if(res['usertype'] == "researcher" && res['usertype']==this.model.usertype && res['id']==user.userid){
        this.router.navigate(['/researcherdashboard']);
      }
    }, error => {
      console.log(JSON.stringify(error));
      alert("Login failed: "+this.model.userid);
      this.loading = false;
    });
  }
    /**login(){
    if(this.model.usertype=="patient"){
      this.router.navigate(['/patientdashboard']);
    }
    else if(this.model.usertype=="doctor"){
      this.router.navigate(['/doctordashboard']);
    }
    else if(this.model.usertype=="clinician"){
      this.router.navigate(['/cliniciandashboard']);
    }
    else if(this.model.usertype=="researcher"){
      this.router.navigate(['/researcherdashboard']);
    }
  }*/
   onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
