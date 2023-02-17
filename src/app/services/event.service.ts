import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toaster } from '../interfaces/toaster';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private openToaster$: BehaviorSubject<Toaster> = new BehaviorSubject<Toaster>({} as Toaster);
  constructor() { }
  openToaster(value: any) {
    this.openToaster$.next(value);
  }
  toasterSubscription(): Observable<Toaster> {
    return this.openToaster$.asObservable();
  }
}
