import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RetailerPage } from './retailer.page';

const routes: Routes = [
  {
    path: 'retailer',
    component: RetailerPage,
    children : [
  { path: 'grn', loadChildren: '../retailer/grn/grn.module#GrnPageModule' },
  { path: 'po', loadChildren: '../retailer/po/po.module#PoPageModule' },
  { path: 'sales-product', loadChildren: '../retailer/sales-product/sales-product.module#SalesProductPageModule' },
  { path: 'so', loadChildren: '../retailer/so/so.module#SoPageModule' },
  { path: 'view-po', loadChildren: '../retailer/view-po/view-po.module#ViewPoPageModule' },
  { path: 'view-single-po', loadChildren: '../retailer/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  { path: 'view-single-product', loadChildren: '../retailer/view-single-product/view-single-product.module#ViewSingleProductPageModule' },
  { path: 'view-single-so', loadChildren: '../retailer/view-single-so/view-single-so.module#ViewSingleSoPageModule' },
    ]
  },
   {
    path : '',
    redirectTo:'/retailer/grn'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RetailerPage]
})
export class RetailerPageModule {}
