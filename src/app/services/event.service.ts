import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMessage } from '../interfaces/error-message';
import { Toaster } from '../interfaces/toaster';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private openToaster$: BehaviorSubject<Toaster> = new BehaviorSubject<Toaster>({} as Toaster);
  private errorMessage$: BehaviorSubject<ErrorMessage> = new BehaviorSubject<ErrorMessage>({} as ErrorMessage);
  constructor() { }
  openToaster(value: any) {
    this.openToaster$.next(value);
  }
  toasterSubscription(): Observable<Toaster> {
    return this.openToaster$.asObservable();
  }
  errorMessageUpdate(value: ErrorMessage) {
    this.errorMessage$.next(value);
  }
  errorMessageSubscription(): Observable<ErrorMessage> {
    return this.errorMessage$.asObservable();
  }
}
