import { Component, OnInit } from '@angular/core';
import { Employee1Service } from '../../components/shared/employee1.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.scss']
})
export class ResearcherComponent implements OnInit {

  model: any = {};
  loading = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  constructor(private service: Employee1Service,private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  researcheronclick(){
    this.loading = true;
    this.authService.registerr(this.model).subscribe(data => {
      alert("Enrollment was successful. User can log in to be taken to their portal.");
      this.router.navigate(['/login']);
    }, error => {
      this.loading = false;
      console.log(JSON.stringify(error));
      //console.log(this.model.userid);
      alert("Enrollment failed: " + error['error']['message']);
    });
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
}
