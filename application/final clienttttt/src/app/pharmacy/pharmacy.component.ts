import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService, AuthService } from '../services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
//import { AuthService } from '../services/index';
import { NavbarService } from '../components/shared/navbar.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  loading = false;
  orders: MatTableDataSource<Order[]>;
  currentUser: any;
  pharmacydetals:any[];
  columnsToDisplay = ['aadhar','age','key','name','patientUniqueId','pdf'];
  constructor(public nav: NavbarService,private api: ApiService, private user: UserService,public dialog: MatDialog,private router:Router,private authService:AuthService,private dataservice:DataService) { }

  ngOnInit() {
    this.nav.hide();
    this.currentUser = this.user.getCurrentUser();
    //console.log("currentUser: "+this.currentUser);
    //this.regulator = this.regulator !== undefined;
    //console.log(`Regulator Boolean attribute is ${this.regulator ? '' : 'non-'}present!`);

    // Load up the Orders from backend
    this.getpharmacydetails(0);
  }
  getpharmacydetails(tab) {
    if(tab==0){
    this.pharmacydetals  = [];
    this.api.pharmacyDetails(this.currentUser).subscribe(allUsers => {
      var userArray = Object.keys(allUsers).map(function (userIndex) {
        let user = allUsers[userIndex];
        // do something with person
        
        return user;
      });
      
         ///alert(userArray['usertype']);
      for (let u of userArray) {
        if(!u['pdf']){
          continue
        }else{
          this.pharmacydetals.push(u);
        }
      }
      console.log("List of registered users: ");
      console.log(this.pharmacydetals);
      this.orders=new MatTableDataSource(this.pharmacydetals);
      //alert(this.doctors);
    }, error => {
      console.log(JSON.stringify(error));
   alert("Problem getting details " + error['error']['message']);
    });
  }
  }
  appointment(){
    this.router.navigate(["/new-appointment"]);
  }
}
export interface Order {
aadhar: string;
age:string;
//class: string;
//currentState:string;
key: string;
name: string;
patientUniqueId: string;
pdf: string;
}
