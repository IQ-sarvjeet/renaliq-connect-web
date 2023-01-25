import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { RouterModule, Routes } from '@angular/router';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { SharedModule } from 'src/app/components/shared.module';
import { InsightComponent } from './insight/insight.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent,
  },
  {
    path: 'insight',
    component: InsightComponent,
  }
];

@NgModule({
  declarations: [
    PatientComponent,
    PatientHeaderComponent,
    InsightComponent,
    PatientListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class PatientModule { }
