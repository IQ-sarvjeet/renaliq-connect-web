import { Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/user';
import { CommonConstants } from '../shared/common-constants/common-constants';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _localStorage: LocalStorageService, private storeService: StoreService) { }
  isLoggedIn() {
    const userInfo: UserInfo = this.storeService.getUserInfo();
    if(!userInfo || !userInfo.fullName) {
      return false;
    }
    return !!this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
  }
}