import { Component, OnInit } from '@angular/core';
import { Employee1Service } from '../../components/shared/employee1.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  currentDate = new Date();
  //todayString : string = new Date().toDateString();

  constructor(private service: Employee1Service,private router: Router,private authService: AuthService) { }

  ngOnInit() {
  }
  onclick(){
    this.loading = true;
    this.authService.pbody={
      aadhar:this.model.userid,
      name : this.model.name,
      gender:this.model.gender,
      mobile:this.model.mobile,
      mail:this.model.mail,
      usertype:'patient',
      todaydate:this.currentDate,
      dob:this.model.dob,
      password:this.model.password
    }
    this.authService.register(this.model).subscribe(data => {
      // console.log(data['responseType']);
      if(data=='true'){
      alert("Enrollment was successful. User can log in to be taken to their portal.");
      this.router.navigate(['/login']);}
   
      else{
        alert("Enrollment was failed, user already exist");
this.router.navigate(['register']);
      }
       }, error => {
      this.loading = false;
      console.log(JSON.stringify(error));
      //console.log(this.model.userid);
      alert("Enrollment failed: " );
    });
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}