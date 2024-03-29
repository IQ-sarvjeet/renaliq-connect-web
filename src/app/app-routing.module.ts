import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from './auth/authguard.guard';

import { ErrorsComponent } from './views/errors/errors.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { SampleUiComponent } from './views/sample-ui/sample-ui.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { TwoFectorAuthComponent } from './views/two-fector-auth/two-fector-auth.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  //{
  //  path: '',
  //  loadChildren: () =>
  //    import('./views/summary/summary.module').then((m) => m.SummaryModule),
  //},

  {
    path: 'summary',
    loadChildren: () =>
      import('./views/summary/summary.module').then((m) => m.SummaryModule),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./views/patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./views/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'reports/:id',
    loadChildren: () =>
      import('./views/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'admission',
    loadChildren: () =>
      import('./views/admission/admission.module').then(
        (m) => m.AdmissionModule
      ),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('./views/documents/documents.module').then(
        (m) => m.DocumentsModule
      ),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'patient-profile',
    loadChildren: () =>
      import('./views/patient-profile/patient-profile.module').then(
        (m) => m.PatientProfileModule
      ),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'twofectorauth',
    component: TwoFectorAuthComponent,
  },
  {
    path: 'error',
    component: ErrorsComponent,
  },
  {
    path: 'sampleui',
    component: SampleUiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
