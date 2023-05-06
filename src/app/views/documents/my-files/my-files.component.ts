import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DocumentService } from 'src/app/api-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent {
  recentDocuments: any = [];
  folders: string[] = [];
  constructor(private documentService: DocumentService){}
  ngOnInit() {
    this.loadFolders();
    this.loadRecentDocuments();
  }
  private loadFolders() {
    this.documentService.apiDocumentListFoldersGet().subscribe({
      next: (folders: any) => {
        if(folders.data) {
          this.folders = folders.data;
        }
      },
      error: (error: any) => {

      }
    })
  }
  loadRecentDocuments() {
    this.documentService.apiDocumentRecentdocumentsGet().subscribe({
      next: (response: any) => {
        if (response.data) {
          this.recentDocuments = response.data;
        }
      },
      error: (error: any) => {

      }
    })
  }
}
