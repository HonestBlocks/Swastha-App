import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-regulator',
  templateUrl: './regulator.page.html',
  styleUrls: ['./regulator.page.scss'],
})
export class RegulatorPage implements OnInit {

  pages = [
    {
      title:'main',
    url:'/regulator/main'
    }
  ];
  selectedPath = '';

  constructor( private router : Router) {
    this.router.events.subscribe((event : RouterEvent) => {
      this.selectedPath = event.url;
    })
   }

  ngOnInit() {
  }

}
