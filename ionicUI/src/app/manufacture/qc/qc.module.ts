import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DatePickerModule } from 'ionic4-date-picker';

import { QcPage } from './qc.page';

const routes: Routes = [
  {
    path: '',
    component: QcPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QcPage]
})
export class QcPageModule {}
