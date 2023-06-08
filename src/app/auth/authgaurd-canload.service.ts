import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Roles } from '../enums/roles';
import { UserInfo } from '../interfaces/user';
import { StoreService } from '../services/store.service';
@Injectable({
  providedIn: 'root'
})
export class AuthgaurdCanloadService implements CanLoad {
  userInfo: UserInfo = {
    fullName: ' ',
    roleName: '',
    role: Roles.PRACTICE_USER
  };
  constructor(private storageService: StoreService) {
    this.storageService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;      
    })
  }
  canLoad(route: Route): boolean {
    return this.userInfo.role === Roles.SYTEM_ADMIN;
  }
}
