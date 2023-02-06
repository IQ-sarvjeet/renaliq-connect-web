import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { RouterModule, Routes } from '@angular/router';
import { DataCardComponent } from './data-card/data-card.component';
import { DescriptionCardComponent } from './description-card/description-card.component';
import { SharedModule } from 'src/app/components/shared.module';
import { CareTeamComponent } from './care-team/care-team.component';
import { LatestUpdatesComponent } from './latest-updates/latest-updates.component';
import { PatientByStageComponent } from './patient-by-stage/patient-by-stage.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent
  }
];

@NgModule({
  declarations: [
    SummaryComponent,
    DataCardComponent,
    DescriptionCardComponent,
    CareTeamComponent,
    LatestUpdatesComponent,
    PatientByStageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class SummaryModule { }
