import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManufacturePage } from './manufacture.page';

const routes: Routes = [
  {
    path: 'manufacture',
    component: ManufacturePage,
    children : [
  { path: 'change-so-status', loadChildren: '../manufacture/change-so-status/change-so-status.module#ChangeSoStatusPageModule' },
  { path: 'create-product', loadChildren: '../manufacture/create-product/create-product.module#CreateProductPageModule' },
  { path: 'grn', loadChildren: '../manufacture/grn/grn.module#GrnPageModule' },
  { path: 'packaging', loadChildren: '../manufacture/packaging/packaging.module#PackagingPageModule' },
  { path: 'po', loadChildren: '../manufacture/po/po.module#PoPageModule' },
  { path: 'qc', loadChildren: '../manufacture/qc/qc.module#QcPageModule' },
  { path: 'so', loadChildren: '../manufacture/so/so.module#SoPageModule' },
  { path: 'view-po', loadChildren: '../manufacture/view-po/view-po.module#ViewPoPageModule' },
  { path: 'view-product', loadChildren: '../manufacture/view-product/view-product.module#ViewProductPageModule' },
  { path: 'view-single-po', loadChildren: '../manufacture/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  { path: 'view-single-product', loadChildren: '../manufacture/view-single-product/view-single-product.module#ViewSingleProductPageModule' },
  { path: 'view-single-so', loadChildren: '../manufacture/view-single-so/view-single-so.module#ViewSingleSoPageModule' }
    ]
  },
  {
    path : '',
    redirectTo:'change-so-status'
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManufacturePage]
})
export class ManufacturePageModule {}
