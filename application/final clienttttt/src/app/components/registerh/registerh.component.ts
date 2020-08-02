import { Component, OnInit } from '@angular/core';
import { Employee2Service } from '../../components/shared/employee2.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/index';
@Component({
  selector: 'app-registerh',
  templateUrl: './registerh.component.html',
  styleUrls: ['./registerh.component.scss']
})

export class RegisterhComponent implements OnInit {
  model: any = {};
  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  currentDate = new Date();
  constructor(private service: Employee2Service,private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  hospitalonclick(){
    this.loading = true;
    this.authService.hbody={
      name : this.model.hname,
      password:this.model.hpassword,
     
      mobile:this.model.mobile,
      mail:this.model.mail,
      usertype:'hospital',
      todaydate:this.currentDate,
      
    }
    this.authService.registerh(this.model).subscribe(data => {
      if(data=='true'){
        alert("Enrollment was successful. User can log in to be taken to their portal.");
        this.router.navigate(['/login']);}
     
        else{
          alert("Enrollment was failed, user already exist");
  this.router.navigate(['registerh']);
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