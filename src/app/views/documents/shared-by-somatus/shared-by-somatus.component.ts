import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentFilterModel, DocumentService, PracticeService } from 'src/app/api-client';
import { FileTypes } from 'src/app/enums/fileTypes';
import { DownloadService } from 'src/app/services/download.service';
import { EventService } from 'src/app/services/event.service';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';

declare var $: any;
const todayDate = new Date();
const datePrior90 = new Date(new Date().setDate(todayDate.getDate() - 90));

@Component({
  selector: 'app-shared-by-somatus',
  templateUrl: './shared-by-somatus.component.html',
  styleUrls: ['./shared-by-somatus.component.scss']
})
export class SharedBySomatusComponent {
  updateFileForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    folder: [''],
    isGlobal: [false],
    practiceIds: [[]],
    tags: [''],
    description: ['', Validators.required]
  })
  fileTypes = FileTypes
  tags: any = [];
  documents: any = {
    data: [],
    pagingModel: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 3
    }
  };
  filters: DocumentFilterModel = {
    documentFilter: { 
      searchKey: '',
      folder: '',
      tag: '',
      sortBy: '',
      sortDirection: '',
      fromDate: datePrior90,
      toDate: todayDate,
      isGLobal: false
    },
    currentPage: 1,
    pageSize: 10
  }
  filesLoaded: boolean = false;
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
  deleteDocument: any = {};
  documentRequestInProgress: boolean = false;
  practiceList: any = [];
  folders: any = [];
  constructor(private documentService: DocumentService,
    private practiceService: PracticeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private eventService: EventService,
    private downloadService: DownloadService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _localStorage: LocalStorageService){}

  ngOnInit() {
    this.loadTags();
    this.loadFolders();
    // this.loadList();
    this.practiceService.apiPracticeListGet().subscribe({
      next: (response: any) => {
        this.practiceList = response;
      },
      error: (error: any) => {
      }
    })
    this.route.queryParams.subscribe({
      next: (params: any) => {
        if(params.folder) {
          this.filters.documentFilter = {
            ...this.filters.documentFilter,
            folder: params.folder
          }
        }
        if(params.tag) {
          this.filters.documentFilter = {
            ...this.filters.documentFilter,
            tag: params.tag
          }
        }
        this.loadList();
      }
    })
    this.eventService.documentsFilterSubscription().subscribe({
      next: (value: any) => {
        console.log('filter value:', value);
        if(!value.fromDate) return;
        this.filters.documentFilter = {
          ...this.filters.documentFilter,
          ...value
        }
        this.loadList();
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
  private loadList() {
    this.documentService.apiDocumentListPost(this.filters).subscribe({
      next: (response: any) => {
        this.documents = response;
        this.filesLoaded = true;
      },
      error: (error: any) => {
        this.filesLoaded = true;
      }
    })
  }
  public searchHandler($event: any) {
    this.filters.documentFilter = {
      ...this.filters.documentFilter,
      searchKey: $event.target.value
    }
    this.loadList();
  }
  public tagSelectHandlar(tag: string) {
    this.filters.documentFilter = {
      ...this.filters.documentFilter,
      tag: tag
    }
    this.loadList();
  }
  public gotoPage(page: number): void {
    this.filters.currentPage = page;
    this.loadList();
  }
  public openDocumentDetails(details: any) {
    this.documentDetails = details;
  }
  
  public openUpdateDialog(details: any) {
    this.documentDetails = details;
    this.updateFileForm.patchValue({
      description: details.description,
      folder: details.folder,
      isGlobal: details.isGlobal,
      practiceIds: details.practiceIds,
      tags: details.tags,
      title: details.title
    })
  }
  public openDeleteDialog(details: any) {
    this.deleteDocument = details;
  }
  public deleteDocumentRequest(): void {
    if (!this.deleteDocument.id) return;
    this.documentRequestInProgress = true;
    this.httpClient.post(`${environment.baseApiUrl}/api/Document/delete/${this.deleteDocument.id}`, {}).subscribe({
      next: (response: any) => {
        console.log('response:', response);
        this.documentRequestInProgress = false;
        $('#modalDelete').modal('hide');
        this.loadList();
      }
    })

  }
  public selectFolderHandler(folder: any) {
    this.filters.documentFilter = {
      ...this.filters.documentFilter,
      folder: folder
    }
    this.loadList();
  }
  submitUpdateDocument(){
    this.documentRequestInProgress = true;
    console.log('Form value:', this.updateFileForm.value);
    // const updatedData = {
    //   // ...this.documentDetails,
    // }
    const formData1 = new FormData();
    formData1.append('Id', this.documentDetails.id);
    formData1.append('Description', this.updateFileForm.value.description);
    formData1.append('Title', this.updateFileForm.value.title);
    formData1.append('Folder', this.updateFileForm.value.folder);
    formData1.append('IsGlobal', this.updateFileForm.value.isGlobal);
    formData1.append('FileName', this.documentDetails.fileName);
    formData1.append('DownloadURL', this.documentDetails.downloadURL);
    formData1.append('IsDeleted', this.documentDetails.isDeleted);
    this.documentDetails.practiceIds.forEach((item: any) => {
      formData1.append('PracticeIds', item);
    })
    this.documentDetails.tags.forEach((item: any) => {
      formData1.append('Tags', item);
    })
    this.httpClient.post(`${environment.baseApiUrl}/api/Document/document`, formData1, { headers: { 'Content-Type': 'multipart/form-data' } }).subscribe({
      next: (response: any) => {
        this.documentRequestInProgress = false;
        $('#documentUpdate').modal('hide');
        this.loadList();
      },
      error: (error: any) => {
        this.documentRequestInProgress = false;
      }
    })
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
    const token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
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
