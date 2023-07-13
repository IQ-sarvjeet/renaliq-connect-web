import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeListComponent } from './practice-list/practice-list.component';
import { PracticeHeaderComponent } from './practice-header/practice-header.component';
import { PracticeDetailsComponent } from './practice-details/practice-details.component';
import { RouterModule, Routes } from '@angular/router';
import { PracticeManagementComponent } from './practice-management.component';

const routes: Routes = [
  {
    path: '',
    component: PracticeManagementComponent,
    children: [
      {
        path: 'practiceList',
        component: PracticeListComponent,
      },
      {
        path: 'practiceDetails',
        component: PracticeDetailsComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    PracticeManagementComponent,
    PracticeListComponent,
    PracticeHeaderComponent,
    PracticeDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PracticeManagementModule { }
