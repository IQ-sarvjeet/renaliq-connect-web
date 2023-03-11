import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private userInformation: UserInfo = {
    fullName: ' ',
    roleName: ''
  };
  private userInfo$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({} as UserInfo);
  constructor() { }
  getUserInfo(): UserInfo {
    return this.userInformation;
  }
  userInfo(value: UserInfo) {
    this.userInformation = value;
    this.userInfo$.next(value);
  }
  userInfoSubscription(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
