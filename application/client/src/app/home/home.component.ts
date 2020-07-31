import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
