import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentFilterModel, DocumentService, PracticeService } from 'src/app/api-client';
import { FileTypes } from 'src/app/enums/fileTypes';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

declare var $: any;

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
      fromDate: null,
      toDate: null
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
  deletingDocument: boolean = false;
  practiceList: any = [];
  folders: any = [];
  constructor(private documentService: DocumentService,
    private practiceService: PracticeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private eventService: EventService){}

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
    this.deletingDocument = true;
    this.httpClient.post(`${environment.baseApiUrl}/api/Document/delete/${this.deleteDocument.id}`, {}).subscribe({
      next: (response: any) => {
        console.log('response:', response);
        this.deletingDocument = false;
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

      }
    })
  }
  public viewFile(viewDoc: any) {
    window.open(`${environment.baseApiUrl}/${viewDoc.downloadURL}`, "_blank");
  }
  
}
