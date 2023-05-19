import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocEventService {
  private openAddDocModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private refreshList$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  openAddDocModalEvent(value: boolean) {
    this.openAddDocModal$.next(value);
  }

  
  closeAddDocModalEvent() {
    this.openAddDocModal$.next(false);
  }

  refreshListEvent(value: boolean) {
    this.refreshList$.next(value);
  }



  openAddDocModalSubscription(): Observable<boolean> {
    console.log("Open add momdal lsubscription...");
    return this.openAddDocModal$.asObservable();
  }

  refreshListSubscription(): Observable<boolean> {
    console.log("Triggering refresh..");
    return this.refreshList$.asObservable();
  }
}
