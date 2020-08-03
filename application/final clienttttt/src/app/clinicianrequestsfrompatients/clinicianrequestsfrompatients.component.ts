import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api.service';
import { encode, decode } from 'hi-base32';
declare var require: any;
@Component({
  selector: 'app-clinicianrequestsfrompatients',
  templateUrl: './clinicianrequestsfrompatients.component.html',
  styleUrls: ['./clinicianrequestsfrompatients.component.scss']
})
export class ClinicianrequestsfrompatientsComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(private router: Router, private authService: AuthService,public dataservice:DataService,private apiService:ApiService) { }
  private base64textString:String="";
  
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    var base32 = require('hi-base32');
           this.base64textString= base32.encode('String to encode');
           console.log(this.base64textString);
   }
  ngOnInit() {
  }
  submit(){
    this.loading = true;
    this.apiService.body2={
      name : this.model.name,
      age:this.model.gender,
      gender:this.model.date,
      aadhar:this.model.aadhar,   
      pdf:this.base64textString,
      patientUniqueId:this.model.patientUniqueId,
      prescriptionId:"prescription"+uuid()
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
