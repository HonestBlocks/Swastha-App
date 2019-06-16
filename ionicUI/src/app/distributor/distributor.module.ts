import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DistributorPage } from './distributor.page';

const routes: Routes = [
  {
    path: 'distributor',
    component: DistributorPage,
    children: [
  { path: 'change-so-status', loadChildren: '../distributor/change-so-status/change-so-status.module#ChangeSoStatusPageModule' },
  { path: 'grn', loadChildren: '../distributor/grn/grn.module#GrnPageModule' },
  { path: 'packaging', loadChildren: '../distributor/packaging/packaging.module#PackagingPageModule' },
  { path: 'po', loadChildren: '../distributor/po/po.module#PoPageModule' },
  { path: 'so', loadChildren: '../distributor/so/so.module#SoPageModule' },
  { path: 'view-po', loadChildren: '../distributor/view-po/view-po.module#ViewPoPageModule' },
  { path: 'view-single-po', loadChildren: '../distributor/view-single-po/view-single-po.module#ViewSinglePoPageModule' },
  { path: 'view-single-so', loadChildren: '../distributor/view-single-so/view-single-so.module#ViewSingleSoPageModule' },
    ]
  },
  {
    path : '',
    redirectTo:'/distributor/change-so-status'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DistributorPage]
})
export class DistributorPageModule {}
