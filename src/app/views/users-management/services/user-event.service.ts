import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {
  public newUserID$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private userFilter$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  setNewUserID(id: number){
    this.newUserID$.next(id);
  }
  userIdSubscription(): Observable<number> {
    return this.newUserID$.asObservable();
  }
  userFilterEvent(value: any) {
    this.userFilter$.next(value);
  }
  userFilterSubscription(): Observable<any> {
    return this.userFilter$.asObservable();
  }
}
