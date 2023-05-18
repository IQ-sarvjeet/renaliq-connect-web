import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentFilterModel, DocumentService, PracticeService } from 'src/app/api-client';
import { FileTypes } from 'src/app/enums/fileTypes';
import { DownloadService } from 'src/app/services/download.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

import { StoreService } from 'src/app/services/store.service';
import { UserInfo } from 'src/app/interfaces/user';
import { Roles } from 'src/app/enums/roles';
import { DocEventService } from '../services/doc-event.service';

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
      totalRecords: 0
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
      isGLobal: false
    },
    currentPage: 1,
    pageSize: 10
  }
  filesLoaded: boolean = false;
  loadingFolders: boolean = false;
  loadingTags: boolean = false;
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
  updateErrorMessage: string = '';
  userInfo: UserInfo | null = null;
  userRoleTypes = Roles;

  constructor(private documentService: DocumentService,
    private practiceService: PracticeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private eventService: EventService,
    private downloadService: DownloadService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private storeService: StoreService,
    private docEventService: DocEventService){}

  ngOnInit() {
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;      
    })
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
  public openAddDocumentModal(){
    this.docEventService.openAddDocModalEvent(true);
  }
  private loadFolders() {
    this.loadingFolders = true;
    this.documentService.apiDocumentListFoldersIsGlobalGet(false).subscribe({
      next: (folders: any) => {
        if(folders.data) {
          this.folders = folders.data;
        }
        this.loadingFolders = false;
      },
      error: (error: any) => {
        this.loadingFolders = false;
      }
    })
  }
  private loadTags() {
    this.loadingTags = true;
    this.documentService.apiDocumentListTagsIsGlobalGet(false).subscribe({
      next: (tagsResponse: any) => {
        if(tagsResponse.data) {
          this.tags = tagsResponse.data;
        }
        this.loadingTags = false;
      },
      error: (error: any) => {
        this.loadingTags = false;
      }
    })
  }
  private loadList() {
    this.filesLoaded = false;
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
    $('#documentUpdate').modal('show');
    this.documentRequestInProgress = false;
    this.updateErrorMessage = '';
    this.documentDetails = details;
    this.updateFileForm.patchValue({
      description: details.description,
      folder: details.folder,
      isGlobal: details.isGlobal,
      practiceIds: details.practiceIds,
      tags: details.tags,
      title: details.title
    })
    this.documentService.apiDocumentDocumentsIdGet(details.id).subscribe({
      next: (response: any) => {
        this.documentDetails = response;
        this.updateFileForm.patchValue({
          description: response.description,
          folder: response.folder,
          isGlobal: response.isGlobal,
          practiceIds: response.practiceIds,
          tags: response.tags,
          title: response.title
        })
      },
      error: (error: any) => {
      }
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
    this.eventService.openToaster({
      showToster: true,
      message: `Updating document.`,
      type: 'success',
    });
    this.httpClient.post(`${environment.baseApiUrl}/api/Document/document`, formData1, { headers: { 'Content-Type': 'multipart/form-data' } }).subscribe({
      next: (response: any) => {
        this.documentRequestInProgress = false;
        $('#documentUpdate').modal('hide');
        this.loadList();
      },
      error: (error: any) => {
        this.updateErrorMessage = 'Error in update document.'
      }
    })
  }
  public viewFile(viewDoc: any) {
    this.eventService.openToaster({
      showToster: true,
      message: `Downloading document.`,
      type: 'success',
    });
    const url: string = `${environment.baseApiUrl}/api/Document/download/${viewDoc.id}`;
    if (viewDoc.fileType === FileTypes.Excel || viewDoc.fileType === FileTypes.Doc) {
      this.downloadService.startDownloadingXSLX(this.elementRef, this.renderer, url, viewDoc.fileName);
    } else {
      this.downloadService.downloadMedia(this.elementRef, this.renderer, url, viewDoc.fileName, viewDoc.fileExt);
    }
  }
  
}
