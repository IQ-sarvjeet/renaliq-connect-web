import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadService } from 'src/app/services/download.service';
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
    private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    const refId: string | null = this.activatedRoute.snapshot.paramMap.get('refId');
    refId && this.downloadFile(refId);
  }
  private downloadFile(refId: string) {
    try {
      const url: string = `${environment.baseApiUrl}/api/Export/download/${refId}`;
      this.downloadService.startDownloadingXSLX(this.elementRef, this.renderer, url, 'download');
    } catch(error) {

    } finally {
      setTimeout(() => {
        this.router.navigate(['/summary']);
      }, 1000);
    }
  }
}
