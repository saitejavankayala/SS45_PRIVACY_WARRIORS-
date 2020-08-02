import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  model: any = {};
  loading = false;
  constructor(private router: Router,private authService: AuthService){}
  login(){
    this.loading = true;
    this.authService.register(this.model).subscribe(data => {
  
        alert("Enrollment was successful. User can log in to be taken to their portal.");
    }, error => {
      this.loading = false;
      console.log(JSON.stringify(error));
      //console.log(this.model.userid);
      alert("Enrollment failed: " + error['error']['message']);
    });
  }
  slides = [
    {
      url: 'assets/2.jpg'
    },
    {
      url: 'assets/3.jpeg'
    },
    {
      url: 'assets/4.jpg'
    },
    {
      url: 'assets/5.jpeg'
    },
    {
      url: 'assets/6.jpg'
    },
    {
      url: 'assets/7.jpeg'
    },
    {
      url: 'assets/8.jpg'
    },
    {
      url: 'assets/9.jpeg'
    }
  ]
}
