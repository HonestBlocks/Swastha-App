import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewSinglePoPage } from './view-single-po.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSinglePoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewSinglePoPage]
})
export class ViewSinglePoPageModule {}
