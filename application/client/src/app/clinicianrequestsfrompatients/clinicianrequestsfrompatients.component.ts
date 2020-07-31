import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api.service ';

@Component({
  selector: 'app-clinicianrequestsfrompatients',
  templateUrl: './clinicianrequestsfrompatients.component.html',
  styleUrls: ['./clinicianrequestsfrompatients.component.scss']
})
export class ClinicianrequestsfrompatientsComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(private router: Router, private authService: AuthService,public dataservice:DataService,private apiService:ApiService) { }

  ngOnInit() {
  }
  submit(){
    this.loading = true;
    this.apiService.body1={
      prescriptionId:this.model.prescriptionId+ uuid(),
      name : this.model.name,
      age:this.model.gender,
      gender:this.model.date,
      mobile:this.model.mail,
      diagnosis:this.model.tel
      
    }
    this.apiService.reportdata().subscribe(data => {
      alert("details submitted successfully");
      //this.router.navigate(['/login']);
    }, error => {
      this.loading = false;
      console.log(JSON.stringify(error));
      alert("Enrollment failed: " + error['error']['message']);
    });
  }

}
function uuid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return `${s4()}`
}