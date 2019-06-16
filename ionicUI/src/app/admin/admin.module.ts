import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPage,
    children:[
    { path: 'add-regulator', loadChildren: '../admin/add-regulator/add-regulator.module#AddRegulatorPageModule' },
    { path: 'add-vendor', loadChildren: '../admin/add-vendor/add-vendor.module#AddVendorPageModule' },
    { path: 'login', loadChildren: '../admin/login/login.module#LoginPageModule' },
    { path: 'view-regulator', loadChildren: '../admin/view-regulator/view-regulator.module#ViewRegulatorPageModule' },
    { path: 'view-single-vendor', loadChildren: '../admin/view-single-vendor/view-single-vendor.module#ViewSingleVendorPageModule' },
    { path: 'view-vendor', loadChildren: '../admin/view-vendor/view-vendor.module#ViewVendorPageModule' },
    ]
  },
  {
    path : '',
    redirectTo:'/admin/login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
