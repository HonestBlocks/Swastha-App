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
    url:'/change-so-status'
    },
    {
      title:'create-product',
      url:'/create-product'
    },
    {
      title:'grn',
      url:'/grn'
    },
    {
      title:'packaging',
      url:'/packaging'
    },
    {
      title:'Purchase Order',
      url:'/po'
    },
    {
      title:'Quality Check',
      url:'/qc'
    },
    {
      title:'Sales Order',
      url:'/so'
    },
    {
      title:'View-Purchase-Order',
      url:'/view-po'
    },
    {
      title:'view-product',
      url:'/view-product'
    },
    {
      title:'view-single-product',
      url:'/view-single-product'
    },
    {
      title:'view-single-so',
      url:'/view-single-so'
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
