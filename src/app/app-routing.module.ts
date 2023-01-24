import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/summary/summary.module').then(m => m.SummaryModule)
  },
  {
    path: 'login',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'summary',
    loadChildren: () => import('./views/summary/summary.module').then(m => m.SummaryModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./views/patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./views/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'admission',
    loadChildren: () => import('./views/admission/admission.module').then(m => m.AdmissionModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./views/documents/documents.module').then(m => m.DocumentsModule)
  },
  {
    path: 'patientProfile',
    loadChildren: () => import('./views/patient-profile/patient-profile.module').then(m => m.PatientProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
