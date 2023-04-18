import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadService } from 'src/app/services/download.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  constructor(private downloadService: DownloadService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService) {}
  ngOnInit() {
    const refId: string | null = this.activatedRoute.snapshot.paramMap.get('refId');
    let fileName: string | null = this.activatedRoute.snapshot.paramMap.get('fileName');
    if(!fileName) {
      fileName = 'download';
    }
    refId && this.downloadFile(refId, fileName);
  }
  private downloadFile(refId: string, fileName: string) {
    this.storeService.setCurrentRoute(null);
    try {
      const url: string = `${environment.baseApiUrl}/api/Export/download/${refId}`;
      this.downloadService.startDownloadingXSLX(this.elementRef, this.renderer, url, fileName);
    } catch(error) {

    } finally {
      setTimeout(() => {
        this.router.navigate(['/summary']);
      }, 1000);
    }
  }
}
