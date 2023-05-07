import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/api-client';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent {
  recentDocuments: any = [];
  folders: string[] = [];
  tags: any = [];
  documentDetails: any = {
    description: "",
    downloadURL: "",
    fileExt: "",
    fileName: "",
    fileSize: "",
    fileType: 1,
    folder: "",
    id: 5,
    isDeleted: false,
    isGlobal: false,
    practiceIds: [],
    tags: [],
    title: null
  }
  constructor(private documentService: DocumentService, private router: Router){}
  ngOnInit() {
    this.loadFolders();
    this.loadRecentDocuments();
    this.loadTags();
  }
  private loadTags() {
    this.documentService.apiDocumentListTagsGet().subscribe({
      next: (tagsResponse: any) => {
        if(tagsResponse.data) {
          this.tags = tagsResponse.data;
        }
      },
      error: (error: any) => {

      }
    })
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
  tagSelectHandlar(tag: any) {
    this.router.navigate(
      ['/documents/sharedbysomatus'],
      { queryParams: { tag: tag.tagName } }
    );
  }
  selectFolderHandler(folder: any) {
    this.router.navigate(
      ['/documents/sharedbysomatus'],
      { queryParams: { folder: folder } }
    );
  }
  public openDocumentDetails(details: any) {
    this.documentDetails = details;
  }
}
