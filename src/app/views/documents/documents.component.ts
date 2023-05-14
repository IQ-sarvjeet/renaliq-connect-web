import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/api-client';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {

  constructor(private documentService: DocumentService){

  }
  ngOnInit() {
    // this.loadFolders();
    // this.loadTags();
  }
  private loadFolders() {
    this.documentService.apiDocumentListFoldersGet().subscribe({
      next: (folders: any) => {
        if(folders.data) {
        }
      },
      error: (error: any) => {

      }
    })
  }
  private loadTags() {
    this.documentService.apiDocumentListTagsGet().subscribe({
      next: (tagsResponse: any) => {
        if(tagsResponse.data) {
        }
      },
      error: (error: any) => {

      }
    })
  }
}
