import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportEventService {

  public metricID$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setMetricId(metricId: number) {
    this.metricID$.next(metricId);
  }

  metricIdSubscription(): Observable<number> {
    return this.metricID$.asObservable();
  }
}
