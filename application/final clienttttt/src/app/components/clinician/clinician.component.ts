import { Component, OnInit } from '@angular/core';
import { Employee1Service } from '../../components/shared/employee1.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-clinician',
  templateUrl: './clinician.component.html',
  styleUrls: ['./clinician.component.scss']
})
export class ClinicianComponent implements OnInit {
  currentDate = new Date();
  model: any = {};
  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  constructor(private service: Employee1Service,private router: Router,private authService: AuthService) { }

  ngOnInit() {
  }
  clinicianonclick(){
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
  this.router.navigate(['registerc']);
        }
    }, error => {
      this.loading = false;
      console.log(JSON.stringify(error));
      //console.log(this.model.userid);
      alert("Enrollment failed: " + error['error']['message']+this.model);
    });
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
