import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private userInfo$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({} as UserInfo);
  constructor() { }
  userInfo(value: UserInfo) {
    this.userInfo$.next(value);
  }
  userInfoSubscription(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
