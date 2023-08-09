import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/api-client';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit{
  apiVersion!: string;
  webVersion!: string;
  constructor(private systemService: SystemService){}
  ngOnInit(): void {
    this.webVersion = CommonConstants.WEB_VERSION;
    this.getAPIVersion();
  }
  getAPIVersion(){
    this.systemService.apiVersionGet().subscribe({
      next: (response: any) => {
        if (response.version) {
          this.apiVersion = response.version
        }
      },
      error: (error: any) => {
      }
    });
  }
}
