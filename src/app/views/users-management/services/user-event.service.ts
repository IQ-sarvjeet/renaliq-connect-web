import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {
  public newUserID$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setNewUserID(id: number){
    this.newUserID$.next(id);
  }

  userIdSubscription(): Observable<number> {
    return this.newUserID$.asObservable();
  }
}
