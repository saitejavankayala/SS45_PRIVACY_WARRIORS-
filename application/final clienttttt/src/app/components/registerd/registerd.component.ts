import { Component, OnInit } from '@angular/core';
import { Employee3Service } from '../../components/shared/employee3.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-registerd',
  templateUrl: './registerd.component.html',
  styleUrls: ['./registerd.component.scss']
})

export class RegisterdComponent implements OnInit {
  model: any = {};
  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  currentDate = new Date();
  constructor(private service: Employee3Service,private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  doctoronclick(){
    this.loading = true;
    this.authService.dbody={
      aadhar:this.model.duserid,
      password:this.model.dpassword,
      name : this.model.name,
      gender:this.model.gender,
      mobile:this.model.mobile,
      mail:this.model.mail,
      usertype:'doctor',
      todaydate:this.currentDate,
      dob:this.model.dob
      
    }
    this.authService.registerd(this.model).subscribe(data => {
      if(data=='true'){
        alert("Enrollment was successful. User can log in to be taken to their portal.");
        this.router.navigate(['/login']);}
     
        else{
          alert("Enrollment was failed, user already exist");
  this.router.navigate(['registerd']);
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