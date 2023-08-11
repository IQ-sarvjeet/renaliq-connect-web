import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  private notificationEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private documentsFilter$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private openModal$: BehaviorSubject<[boolean,boolean]> = new BehaviorSubject<[boolean,boolean]>([false,false]);
  private admissionFilters$: BehaviorSubject<any> = new BehaviorSubject<any>({});
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
  notificationEventUpdate(value: any) {
    this.notificationEvent$.next(value);
  }
  notificationEventSubscription(): Observable<any> {
    return this.notificationEvent$.asObservable();
  }
  documentsFilterEvent(value: any) {
    this.documentsFilter$.next(value);
  }
  documentsFilterSubscription(): Observable<any> {
    return this.documentsFilter$.asObservable();
  }
  openModalEvent(openModal: boolean, isGlobal: boolean) {
    this.openModal$.next([openModal,isGlobal]);
  }
  openModalSubscription(): Observable<[boolean,boolean]> {
    return this.openModal$.asObservable();
  }
  closeModalEvent() {
    this.openModal$.next([false, false]);
  }
  admissionFilterSubscription(): Observable<any> {
    return this.admissionFilters$.asObservable();
  }
  admissionFilterSet(value: any) {
    this.admissionFilters$.next(value);
  }
}
