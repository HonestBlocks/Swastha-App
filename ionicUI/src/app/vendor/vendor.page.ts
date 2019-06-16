import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.page.html',
  styleUrls: ['./vendor.page.scss'],
})
export class VendorPage implements OnInit {

  pages = [
    {
      title:'change-po-status',
      url:'/vendor/change-po-status'
    },
    {
      title:'view-po',
    url:'/vendor/view-po'
    },
    {
      title:'view-single-po',
    url:'/vendor/view-single-po'
    },
    {
      title:'view-single-so',
    url:'/vendor/view-single-so'
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
