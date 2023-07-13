import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {
  public newUserID$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private userSearchKey$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() { }

  setNewUserID(id: number){
    this.newUserID$.next(id);
  }
  userIdSubscription(): Observable<number> {
    return this.newUserID$.asObservable();
  }
  userSearchEvent(value: any) {
    this.userSearchKey$.next(value);
  }
  userSearchSubscription(): Observable<any> {
    return this.userSearchKey$.asObservable();
  }
}
