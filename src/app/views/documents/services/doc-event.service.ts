import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocEventService {
  private openAddDocModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  openAddDocModalEvent(value: boolean) {
    this.openAddDocModal$.next(value);
  }
  openAddDocModalSubscription(): Observable<boolean> {
    return this.openAddDocModal$.asObservable();
  }
}
