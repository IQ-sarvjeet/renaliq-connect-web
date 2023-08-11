import { NgModule } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';
import { CommonModule } from '@angular/common';
import { AdmissionComponent } from './admission.component';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionHeaderComponent } from './admission-header/admission-header.component';
import { AdmissionsAdmissionByComponent } from './admissions-admission-by/admissions-admission-by.component';
import { AdmissionsGridComponent } from './admissions-grid/admissions-grid.component';
import { SharedModule } from 'src/app/components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdmissionComponent
  }
];

@NgModule({
  declarations: [
    AdmissionComponent,
    AdmissionHeaderComponent,
    AdmissionsAdmissionByComponent,
    AdmissionsGridComponent
  ],
  imports: [
    MbscModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdmissionModule { }
