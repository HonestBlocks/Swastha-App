import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.page.html',
  styleUrls: ['./manufacture.page.scss'],
})
export class ManufacturePage implements OnInit {
  pages = [
    {
      title:'change-so-status',
    url:'/manufacture/change-so-status'
    },
    {
      title:'create-product',
      url:'/manufacture/create-product'
    },
    {
      title:'grn',
      url:'/manufacture/grn'
    },
    {
      title:'packaging',
      url:'/manufacture/packaging'
    },
    {
      title:'Purchase Order',
      url:'/manufacture/po'
    },
    {
      title:'Quality Check',
      url:'/manufacture/qc'
    },
    {
      title:'so',
      url:'/manufacture/so'
    },
    {
      title:'View-Purchase-Order',
      url:'/manufacture/view-po'
    },
    {
      title:'view-product',
      url:'/manufacture/view-product'
    },
    {
      title:'view-single-product',
      url:'/manufacture/view-single-product'
    },
    {
      title:'view-single-so',
      url:'/manufacture/view-single-so'
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
