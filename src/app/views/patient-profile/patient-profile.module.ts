import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientProfileMedicalComponent } from './patient-profile-medical/patient-profile-medical.component';
import { PatientProfileSectionComponent } from './patient-profile-section/patient-profile-section.component';
import { PatientProfileHeaderComponent } from './patient-profile-header/patient-profile-header.component';
import { PatientProfileNavComponent } from './patient-profile-nav/patient-profile-nav.component';
import { TranstionCareComponent } from './transtion-care/transtion-care.component';
import { CareMemberComponent } from './care-member/care-member.component';
import { MedicationComponent } from './medication/medication.component';
import { EngagementTimelineComponent } from './engagement-timeline/engagement-timeline.component';
import { RouterModule, Routes } from '@angular/router';
import { PatientProfileComponent } from './patient-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PatientProfileComponent,
  }
];

@NgModule({
  declarations: [
    PatientProfileComponent,
    PatientProfileMedicalComponent,
    PatientProfileSectionComponent,
    PatientProfileHeaderComponent,
    PatientProfileNavComponent,
    TranstionCareComponent,
    CareMemberComponent,
    MedicationComponent,
    EngagementTimelineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PatientProfileModule { }
