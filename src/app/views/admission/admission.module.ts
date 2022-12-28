import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionComponent } from './admission.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdmissionComponent
  }
];

@NgModule({
  declarations: [
    AdmissionComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AdmissionModule { }
