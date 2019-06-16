import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.page.html',
  styleUrls: ['./retailer.page.scss'],
})
export class RetailerPage implements OnInit {

  pages = [
    {
      title:'grn',
    url:'/retailer/grn'
    },
      {
      title:'po',
    url:'/retailer/po'
    },
      {
      title:'sales-product',
    url:'/retailer/sales-product'
    },
      {
      title:'so',
    url:'/retailer/so'
    },
      {
      title:'view-po',
    url:'/retailer/view-po'
    },
      {
      title:'view-single-po',
    url:'/retailer/view-single-po'
    },
      {
      title:'view-single-product',
    url:'/retailer/view-single-product'
    },  
    {
      title:'view-single-so',
    url:'/retailer/view-single-so'
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
