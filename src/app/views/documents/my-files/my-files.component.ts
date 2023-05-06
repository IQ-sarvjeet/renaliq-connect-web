import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent {
  recentDocuments: any = []
  tags: any = [];
  constructor(private httpClient: HttpClient){}
  ngOnInit() {
    this.loadRecentDocuments();
  }
  loadRecentDocuments() {
    this.httpClient.get(`${environment.baseApiUrl}/api/document/recentdocuments`).subscribe({
      next: (response: any) => {
        console.log('response:', response);
        if (response.data) {
          this.recentDocuments = response.data;
        }
      }
    })
    this.httpClient.get(`${environment.baseApiUrl}/api/document/list/tags`).subscribe({
      next: (tagsList: any) => {
        console.log('tagsList:', tagsList);
        if (tagsList.data) {
          this.tags = tagsList.data;
        }
      }
    })
  }
}
