import { Component, OnInit } from '@angular/core';
import { Employee3Service } from '../components/shared/employee3.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';

@Component({
  selector: 'app-clinicianregister',
  templateUrl: './clinicianregister.component.html',
  styleUrls: ['./clinicianregister.component.scss']
})
export class ClinicianregisterComponent implements OnInit {
  model: any = {};
  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  currentDate = new Date();
  constructor(private service: Employee3Service,private router: Router, private authService: AuthService) { }
  

  ngOnInit() {
  }
  doctoronclick(){
    this.loading = true;
    this.authService.cbody={
      aadhar:this.model.cuserid,
      password:this.model.cpassword,
      name : this.model.name,
      gender:this.model.gender,
      mobile:this.model.mobile,
      mail:this.model.mail,
      usertype:'clinician',
      todaydate:this.currentDate,
      dob:this.model.dob
      
    }
    this.authService.registerc(this.model).subscribe(data => {
      if(data=='true'){
        alert("Enrollment was successful. User can log in to be taken to their portal.");
        this.router.navigate(['/login']);}
     
        else{
          alert("Enrollment was failed, user already exist");
  this.router.navigate(['clinicianregister']);
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
  }


}
