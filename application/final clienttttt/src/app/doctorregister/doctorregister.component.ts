import { Component, OnInit } from '@angular/core';
import { Employee3Service } from '../components/shared/employee3.service';
import { Router } from '@angular/router';
import { AuthService,UserService } from '../services/index';

@Component({
  selector: 'app-doctorregister',
  templateUrl: './doctorregister.component.html',
  styleUrls: ['./doctorregister.component.scss']
})
export class DoctorregisterComponent implements OnInit {
  model: any = {};
  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  currentDate = new Date();
  currentUser: any;
  constructor(private service: Employee3Service,private router: Router, private authService: AuthService,private user:UserService) { }
  

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
  }
  doctoronclick(){
    this.loading = true;
    this.authService.dbody={
      
      aadhar:this.model.aadhar,
      password:this.model.dpassword,
      name : this.model.duserid,
      gender:this.model.gender,
      mobile:this.model.mobile,
      mail:this.model.mail,
      usertype:'doctor',
      todaydate:this.currentDate,
      dob:this.model.dob,
      specialization:this.model.specialization,
      hospital:this.currentUser.userid  
    }
    console.log(this.currentUser.id);
    this.authService.registerd(this.model).subscribe(data => {
      if(data=='true'){
        alert("Enrollment was successful. User can log in to be taken to their portal.");
        this.router.navigate(['/login']);}
     
        else{
          alert("Enrollment was failed, user already exist");
  this.router.navigate(['doctorregister']);
        }
    }, error => {
      this.loading = false;
      console.log(JSON.stringify(error));
      alert("Enrollment failed: " + error['error']['message']);
    });
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.user.clearCurrentUser();
  }


}
