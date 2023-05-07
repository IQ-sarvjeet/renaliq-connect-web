import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentFilterModel, DocumentService, PracticeService } from 'src/app/api-client';

@Component({
  selector: 'app-shared-by-somatus',
  templateUrl: './shared-by-somatus.component.html',
  styleUrls: ['./shared-by-somatus.component.scss']
})
export class SharedBySomatusComponent {
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
      sortDirection: ''
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
  practiceList: any = [];
  folders: any = [];
  constructor(private documentService: DocumentService,
    private practiceService: PracticeService, private route: ActivatedRoute){}

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
  }
  public updateDocument() {
    this.documentService.apiDocumentDocumentPostForm(this.documentDetails).subscribe({
      next: (response: any) => {
      },
      error: (error: any) => {
      }
    })
  }
  public changeFileName($event: any) {
    this.documentDetails.fileName = $event.target.value;
  }
  public changeFolderName($event: any) {
    this.documentDetails.folder = $event.target.value;
  }
  public changeDocScope($event: any) {
    this.documentDetails.isGlobal = $event.target.value === 'true' ? true: false;
  }
  public practiceIdSelection($event: any) {
    const storeId = [];
    this.documentDetails.practiceIds = [];
    for(let i = 0; i < $event.target.options.length; i++) {
      if($event.target.options[i].selected) {
        storeId.push(Number($event.target.options[i].value));
      }
    }
    this.documentDetails.practiceIds = storeId;
  }
  public changeTags($event: any) {
    this.documentDetails.tags = $event.target.value.split(',');
  }
  public changeDescription($event: any) {
    this.documentDetails.description = $event.target.value;
  }
  public selectFolderHandler(folder: any) {
    this.filters.documentFilter = {
      ...this.filters.documentFilter,
      folder: folder
    }
    this.loadList();
  }
  
}
