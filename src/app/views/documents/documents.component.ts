import { Component } from '@angular/core';
import { DocumentService } from 'src/app/api-client';
import { Roles } from 'src/app/enums/roles';
import { UserInfo } from 'src/app/interfaces/user';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  userInfo: UserInfo | null = null;
  userRoleTypes = Roles;
  loading: boolean = true;
  constructor(private storeService: StoreService, private documentService: DocumentService){

  }
  ngOnInit() {
    this.userInfo = this.storeService.getUserInfo();
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;  
    })
    this.loading = false;
  }
}
