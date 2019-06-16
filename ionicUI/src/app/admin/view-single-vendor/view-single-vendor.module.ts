import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewSingleVendorPage } from './view-single-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSingleVendorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewSingleVendorPage]
})
export class ViewSingleVendorPageModule {}
