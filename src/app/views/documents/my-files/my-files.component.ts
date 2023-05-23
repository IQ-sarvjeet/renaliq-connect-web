import { Component , ElementRef,Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/api-client';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileTypes } from 'src/app/enums/fileTypes';
import { DownloadService } from 'src/app/services/download.service';
import { UserInfo } from 'src/app/interfaces/user';
import { Roles } from 'src/app/enums/roles';
import { StoreService } from 'src/app/services/store.service';

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
  documentsLoading: boolean = false;
  recentDocumentsLoadingStatus : boolean = false;
  userInfo: UserInfo | null = null;
  userRoleTypes = Roles;
  constructor(private documentService: DocumentService,
    private router: Router,
    private downloadService: DownloadService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private eventService: EventService,
    private storeService: StoreService){}
  ngOnInit() {
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;      
    })
    // this.loadFolders();
    this.loadRecentDocuments();
    // this.loadTags();
    // this.eventService.documentsFilterSubscription().subscribe({
    //   next: (value: any) => {
    //     console.log('router::', this.router.url);
    //     if (this.router.url.indexOf('/documents/recentdocuments') !== -1) {
    //       this.router.navigate(['/documents/sharedbysomatus']);
    //     }
    //   }
    // })
  }
  // private loadTags() {
  //   this.documentService.apiDocumentListTagsIsGlobalGet(false).subscribe({
  //     next: (tagsResponse: any) => {
  //       if(tagsResponse.data) {
  //         this.tags = tagsResponse.data;
  //       }
  //     },
  //     error: (error: any) => {

  //     }
  //   })
  // }
  // private loadFolders() {
  //   this.documentService.apiDocumentListFoldersIsGlobalGet(false).subscribe({
  //     next: (folders: any) => {
  //       if(folders.data) {
  //         this.folders = folders.data;
  //       }
  //     },
  //     error: (error: any) => {

  //     }
  //   })
  // }
  loadRecentDocuments() {
    this.documentsLoading = true;
    this.recentDocumentsLoadingStatus = false;
    this.documentService.apiDocumentRecentdocumentsGet().subscribe({
      next: (response: any) => {
        this.documentsLoading = false;
        if (response.data) {
          this.recentDocuments = response.data;
          this.recentDocumentsLoadingStatus = true;
        }
      },
      error: (error: any) => {
        this.documentsLoading = false;
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

  public viewFile(viewDoc: any) {
    this.eventService.openToaster({
      showToster: true,
      message: `Downloading document.`,
      type: 'success',
    });
    const url: string = `${environment.baseApiUrl}/api/Document/download/${viewDoc.id}`;
    console.log(url);
    if (viewDoc.fileType === FileTypes.Excel || viewDoc.fileType === FileTypes.Doc) {
      this.downloadService.startDownloadingXSLX(this.elementRef, this.renderer, url, viewDoc.fileName);
    } else {
      this.downloadService.downloadMedia(this.elementRef, this.renderer, url, viewDoc.fileName, viewDoc.fileExt);
    }
  }

}
