import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMessage, ErrorReachedAttempt } from '../interfaces/error-message';
import { Toaster } from '../interfaces/toaster';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private openToaster$: BehaviorSubject<Toaster> = new BehaviorSubject<Toaster>({} as Toaster);
  private errorMessage$: BehaviorSubject<ErrorMessage> = new BehaviorSubject<ErrorMessage>({} as ErrorMessage);
  private userLoggedInSuccess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private reachedNoOfAttempts$: BehaviorSubject<ErrorReachedAttempt> = new BehaviorSubject<ErrorReachedAttempt>({
    showError: false,
    message: ''
  });
  private dateRangeEvent$: BehaviorSubject<any> = new BehaviorSubject<any>({});
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
  userLoggedInUpdate(value: boolean) {
    this.userLoggedInSuccess$.next(value);
  }
  userLoggedInSubscription(): Observable<boolean> {
    return this.userLoggedInSuccess$.asObservable();
  }
  reachedNoOfAttemptsUpdate(value: ErrorReachedAttempt) {
    this.reachedNoOfAttempts$.next(value);
  }
  reachedNoOfAttemptsSubscription(): Observable<ErrorReachedAttempt> {
    return this.reachedNoOfAttempts$.asObservable();
  }
  dateRangeEventUpdate(value: any) {
    this.dateRangeEvent$.next(value);
  }
  dateRangeEventSubscription(): Observable<any> {
    return this.dateRangeEvent$.asObservable();
  }
}
