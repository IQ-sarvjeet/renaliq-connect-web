import { Component , ElementRef,Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/api-client';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileTypes } from 'src/app/enums/fileTypes';
import { DownloadService } from 'src/app/services/download.service';

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
  constructor(private documentService: DocumentService,
    private router: Router,
    private downloadService: DownloadService,
    private elementRef: ElementRef,
    private httpClient: HttpClient,
    private renderer: Renderer2,
    private eventService: EventService){}
  ngOnInit() {
    this.loadFolders();
    this.loadRecentDocuments();
    this.loadTags();
    // this.eventService.documentsFilterSubscription().subscribe({
    //   next: (value: any) => {
    //     console.log('router::', this.router.url);
    //     if (this.router.url.indexOf('/documents/myfiles') !== -1) {
    //       this.router.navigate(['/documents/sharedbysomatus']);
    //     }
    //   }
    // })
  }
  private loadTags() {
    this.documentService.apiDocumentListTagsIsGlobalGet(false).subscribe({
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
    this.documentService.apiDocumentListFoldersIsGlobalGet(false).subscribe({
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

  public viewFile(viewDoc: any) {
    const url: string = `${environment.baseApiUrl}/api/Document/download/${viewDoc.id}`;
    console.log(url);
    if (viewDoc.fileType === FileTypes.Excel || viewDoc.fileType === FileTypes.Doc) {
      this.downloadService.startDownloadingXSLX(this.elementRef, this.renderer, url, viewDoc.fileName);
    } else {
      this.downloadMedia(this.elementRef, this.renderer, url, viewDoc.fileName, viewDoc.fileExt);
    }
  }
  private downloadMedia(elementRef: ElementRef, renderer: Renderer2, url: string, fileName: any, ext: string ) {
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf',
    });

    let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
    this.httpClient.get(url, requestOptions).subscribe({
      next: (response: any) => {
        const blob = new Blob([response], {
          type: 'data:application/pdf;base64',
        });
        this.downloadFile(blob, `${fileName}${ext}`, elementRef, renderer);
      }
    })
  }
  private downloadFile(blob: any, fileName: string, elementRef: ElementRef, renderer: Renderer2): void {
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const link = renderer.createElement('a');
    renderer.setAttribute(link, 'download', fileName);
    renderer.setAttribute(link, 'href', url);
    renderer.setAttribute(link, 'target', '_blank');
    renderer.appendChild(elementRef.nativeElement, link);
    link.click();
    renderer.removeChild(elementRef.nativeElement, link);
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  }

}
