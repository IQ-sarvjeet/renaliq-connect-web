import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { RouterModule, Routes } from '@angular/router';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { SharedModule } from 'src/app/components/shared.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent,
  }
];

@NgModule({
  declarations: [
    PatientComponent,
    PatientHeaderComponent,
    PatientListComponent,
    AddPatientComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PatientModule { }
