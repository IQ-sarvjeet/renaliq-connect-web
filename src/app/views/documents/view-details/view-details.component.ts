import { Component, Input } from '@angular/core';
import { DocumentService } from 'src/app/api-client';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
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
  @Input() set viewDocument(value: any) {
    if(value) {
      this.documentDetails = value;
      this.openDocumentDetails(value);
    }
  }
  constructor(private documentService: DocumentService){}
  public openDocumentDetails(details: any) {
    this.documentService.apiDocumentDocumentsIdGet(details.id).subscribe({
      next: (response: any) => {
        this.documentDetails = response;
      },
      error: (error: any) => {
      }
    })
  }
  public viewFile(viewDoc: any) {
    window.open(viewDoc.downloadURL, "_blank");
  }
}

