import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangeSoStatusPage } from './change-so-status.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeSoStatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangeSoStatusPage]
})
export class ChangeSoStatusPageModule {}
