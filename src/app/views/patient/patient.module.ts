import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { RouterModule, Routes } from '@angular/router';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { SharedModule } from 'src/app/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    PatientComponent,
    PatientHeaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class PatientModule { }
