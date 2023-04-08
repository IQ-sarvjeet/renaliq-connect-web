import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../api-client';
import { UserInfo } from '../interfaces/user';
import { CommonConstants } from '../shared/common-constants/common-constants';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _localStorage: LocalStorageService,
    private storeService: StoreService,
    private _accountService: AccountService,
    private route: Router) { }
  isLoggedIn() {
    const userInfo: UserInfo = this.storeService.getUserInfo();
    if(!userInfo || !userInfo.fullName) {
      return false;
    }
    if (this.isUserSessionExpired()) {
      return false;
    }
    return !!this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
  }
  isUserSessionExpired() {
    const expirationTime = this._localStorage.getItem(CommonConstants.EXPIRATION_TIME);
    if (expirationTime) {
      if(new Date().getTime() > new Date(expirationTime).getTime()) {
        return true;
      }
    }
    return false;
  }
  public async logOut() {
    try {
      await this._accountService.apiAccountLogoutPost().toPromise();
    } catch (ex: any) {
      console.log(ex);
    } finally {
      this._localStorage.clearAll();
      this.route.navigate(['/login']);
    }
  }
}
