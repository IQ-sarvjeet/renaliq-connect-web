import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { SharedBySomatusComponent } from './shared-by-somatus/shared-by-somatus.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedBySomatusVideosComponent } from './shared-by-somatus-videos/shared-by-somatus-videos.component';

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
      }
    ]
  }
];

@NgModule({
  declarations: [
    DocumentsComponent,
    MyFilesComponent,
    SharedBySomatusComponent,
    SharedBySomatusVideosComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DocumentsModule { }
