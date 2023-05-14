import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { CommonConstants } from '../shared/common-constants/common-constants';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private httpClient: HttpClient,
    private _localStorage: LocalStorageService,
    private eventService: EventService) { }
  startDownloading(elementRef: ElementRef, renderer: Renderer2, url: string, fileName: any) {
    this.downloadPlan(elementRef, renderer, url, fileName);
  }
  downloadPlan(elementRef: ElementRef, renderer: Renderer2, url: string, fileName: any) {
    const token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf',
      // 'Authorization': 'JWT ' + token
    });

    let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
    this.httpClient.get(url, requestOptions).subscribe({
      next: (response: any) => {
        if (response.size === 0) {
          this.eventService.openToaster({
            showToster: true,
            message: `Error in downloading file.`,
            type: 'danger',
          });
          return;
        }
        const blob = new Blob([response], {
          type: 'data:application/pdf;base64',
        });
        this.downloadFile(blob, `${fileName}.pdf`, elementRef, renderer);
      }
    })
  }

  startDownloadingXSLX(elementRef: ElementRef, renderer: Renderer2, url: string, fileName: any) {
    return this.downloadXSLX(elementRef, renderer, url, fileName);
  }

  downloadXSLX(elementRef: ElementRef, renderer: Renderer2, url: string, fileName: any) {
    const promiseReq = new Promise((resolve: any, reject: any) => {
      const token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
      let headerOptions = new HttpHeaders({
        'Content-Type': 'application/json',
      // 'Accept': 'application/xslx',
        // 'Authorization': 'JWT ' + token
      });

      let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
      this.httpClient.get(url, requestOptions).subscribe({
        next: (response: any) => {
          if (response.size === 0) {
            this.eventService.openToaster({
              showToster: true,
              message: `Error in downloading file.`,
              type: 'danger',
            });
            return;
          }
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          this.downloadFile(blob, `${fileName}.xlsx`, elementRef, renderer);
          resolve();
        },
        error: () => {
          reject();
        }
      })
    });
    
    return promiseReq;
  }



  private downloadFile(blob: any, fileName: string, elementRef: ElementRef, renderer: Renderer2): void {
    // IE Browser
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //  window.navigator.msSaveOrOpenBlob(blob, fileName);
    //  return;
    // }
    // Other Browsers
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
