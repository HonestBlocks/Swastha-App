import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.page.html',
  styleUrls: ['./distributor.page.scss'],
})
export class DistributorPage implements OnInit {

  pages = [
    {
      title:'change-so-status',
    url:'/distributor/change-so-status'
    },
    {
      title:'grn',
      url:'/distributor/grn'
    },
    {
      title:'packaging',
      url:'/distributor/packaging'
    },
    {
      title:'po',
      url:'/distributor/po'
    },
    {
      title:'so',
      url:'/distributor/so'
    },
    {
      title:'view-po',
      url:'/distributor/view-po'
    },
    {
      title:'view-single-po',
      url:'/distributor/view-single-po'
    },
    {
      title:'view-single-so',
      url:'/distributor/view-single-so'
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
