import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  pages = [
    {
      title:'add-regulator',
    url:'/admin/add-regulator'
    },
    {
      title:'add-vendor',
      url:'/admin/add-vendor'
    },
    {
      title:'login',
      url:'/admin/login'
    },
    {
      title:'view_regulator',
      url:'/admin/view-regulator'
    },
    {
      title:'view-single-vendor',
      url:'/admin/view-single-vendor'
    },
    {
      title:'view-vendor',
      url:'/admin/view-vendor'
    },

    
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
