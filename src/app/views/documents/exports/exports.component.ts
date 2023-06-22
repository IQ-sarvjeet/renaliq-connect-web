import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ExportService } from 'src/app/api-client';
import { ExportListFilterModel } from 'src/app/api-client/model/exportListFilterModel';
import { Roles } from 'src/app/enums/roles';
import { Status } from 'src/app/enums/status';

import { UserInfo } from 'src/app/interfaces/user';
import { DownloadService } from 'src/app/services/download.service';
import { EventService } from 'src/app/services/event.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ExportsComponent {
  documentsLoading: boolean = false;
  exportsLoadingStatus: boolean = false;
  userInfo: UserInfo | null = null;
  userRoleTypes = Roles;
  status = Status;
  loadingFolders: boolean = true;
  filesLoaded: boolean = false;
  recentExports: any = {
    data: [],
    pagingModel: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 0
    }
  };
  filters: ExportListFilterModel = {
    type: 1,
    currentPage: 1,
    pageSize: 10
  };
  constructor(private exportService: ExportService,
    private downloadService: DownloadService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private eventService: EventService,
    private storeService: StoreService) { }
  ngOnInit() {
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;
    })
    this.loadExportDocuments();
  }
  loadExportDocuments() {
    this.filesLoaded = false;
    this.documentsLoading = true;
    this.exportsLoadingStatus = false;
    this.exportService.apiExportListPost(this.filters).subscribe({
      next: (response: any) => {
        this.documentsLoading = false;
        if (response.data) {
          this.recentExports = response;
          this.filesLoaded = true;
          this.loadingFolders = false;
          this.exportsLoadingStatus = true;
        }
      },
      error: (error: any) => {``
        this.filesLoaded = true;
        this.loadingFolders = false;
        this.documentsLoading = false;
      }
    })
  }
  public selectFolderHandler(type: any) {
    this.filters = {
      ...this.filters,
      type: type
    }
    this.loadExportDocuments();
  }
  public viewFile(viewDoc: any) {
    this.eventService.openToaster({
      showToster: true,
      message: `Downloading document.`,
      type: 'success',
    });
    const url: string = `${environment.baseApiUrl}/api/Document/download/${viewDoc.id}`;
    this.downloadService.startDownloadingXSLX(this.elementRef, this.renderer, url, viewDoc.name);
  }
  public gotoPage(page: number): void {
    this.filters.currentPage = page;
    this.loadExportDocuments();
  }
}
