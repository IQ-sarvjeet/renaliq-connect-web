import { Injectable } from '@angular/core';
import { CommonConstants } from '../shared/common-constants/common-constants';
import { LocalStorageService } from '../shared/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _localStorage: LocalStorageService) { }
  isLoggedIn() {
    return !!this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
  }
}
