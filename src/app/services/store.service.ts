import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Roles } from '../enums/roles';
import { UserInfo } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private userInformation: UserInfo = {
    fullName: ' ',
    roleName: '',
    role: Roles.VIEW
  };
  private currentRoute: string | null = null;
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
  setCurrentRoute(value: string | null) {
    this.currentRoute = value;
  }
  getCurrentRoute() {
    return this.currentRoute;
  }
}
