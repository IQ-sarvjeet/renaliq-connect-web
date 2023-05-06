import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { SharedBySomatusComponent } from './shared-by-somatus/shared-by-somatus.component';
import { RouterModule, Routes } from '@angular/router';
import { ContractsComponent } from './shared-by-somatus/contracts/contracts.component';
import { ReportsComponent } from './shared-by-somatus/reports/reports.component';
import { VideosComponent } from './shared-by-somatus/videos/videos.component';
import { IntegrationProcessesComponent } from './shared-by-somatus/integration-processes/integration-processes.component';
import { ExportsComponent } from './exports/exports.component';
import { AddFileComponent } from './add-file/add-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
    children: [
      {
        path: 'myFiles',
        component: MyFilesComponent,
      },
      {
        path: 'sharedBySomatus',
        component: SharedBySomatusComponent,
        children: [
          {
            path: 'contracts',
            component: ContractsComponent
          },
          {
            path: 'reports',
            component: ReportsComponent
          },
          {
            path: 'videos',
            component: VideosComponent
          },
          {
            path: 'processes',
            component: IntegrationProcessesComponent
          }
        ]
      },
      {
        path: 'exports',
        component: ExportsComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    DocumentsComponent,
    MyFilesComponent,
    SharedBySomatusComponent,
    ContractsComponent,
    ReportsComponent,
    VideosComponent,
    IntegrationProcessesComponent,
    ExportsComponent,
    AddFileComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DocumentsModule { }
