import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorPage } from './vendor.page';

const routes: Routes = [
  {
    path: 'vendor',
    component: VendorPage,
    children : [
  { path: 'change-po-status', loadChildren: '../vendor/change-po-status/change-po-status.module#ChangePoStatusPageModule' },
  { path: 'view-po', loadChildren: '../vendor/view-po/view-po.module#ViewPoPageModule' },
  { path: 'view-single-po', loadChildren: '../vendor/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  { path: 'view-single-so', loadChildren: '../vendor/view-single-so/view-single-so.module#ViewSingleSoPageModule' },
      ]
  },
  {
    path : '',
    redirectTo:'/vendor/change-po-status'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorPage]
})
export class VendorPageModule {}
