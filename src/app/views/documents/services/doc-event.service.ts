import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocEventService {
  private openAddDocModal$: BehaviorSubject<[boolean,boolean]> = new BehaviorSubject<[boolean,boolean]>([false,false]);
  private refreshList$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  openAddDocModalEvent(openModal: boolean, isGlobal: boolean) {
    this.openAddDocModal$.next([openModal,isGlobal]);
  }

  
  closeAddDocModalEvent() {
    this.openAddDocModal$.next([false,false]);
  }

  refreshListEvent(value: boolean) {
    this.refreshList$.next(value);
  }



  openAddDocModalSubscription(): Observable<[boolean,boolean]> {
    //console.log("Open add momdal lsubscription...");
    return this.openAddDocModal$.asObservable();
  }

  refreshListSubscription(): Observable<boolean> {
    //console.log("Triggering refresh..");
    return this.refreshList$.asObservable();
  }
}
