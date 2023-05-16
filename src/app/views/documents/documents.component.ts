import { Component } from '@angular/core';
import { DocumentService } from 'src/app/api-client';
import { Roles } from 'src/app/enums/roles';
import { UserInfo } from 'src/app/interfaces/user';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  userInfo: UserInfo | null = null;
  userRoleTypes = Roles;
  // private folders: any = [];
  // private tags: any = [];
  constructor(private storeService: StoreService, private documentService: DocumentService){

  }
  ngOnInit() {
    this.userInfo = this.storeService.getUserInfo();
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;      
    })
    // this.loadFolders();
    // this.loadTags();
  }
  // private loadFolders() {
  //   this.documentService.apiDocumentListFoldersGet().subscribe({
  //     next: (folders: any) => {
  //       if(folders.data) {
  //       }
  //     },
  //     error: (error: any) => {

  //     }
  //   })
  // }
  // private loadTags() {
  //   this.documentService.apiDocumentListTagsGet().subscribe({
  //     next: (tagsResponse: any) => {
  //       if(tagsResponse.data) {
  //       }
  //     },
  //     error: (error: any) => {

  //     }
  //   })
  // }
}
