import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  constructor() {}

  private _patientFilter= new Subject<any>();
  getpatientFilter$ = this._patientFilter.asObservable();

  setPatientFilter(model: any[] | null) {
    this._patientFilter.next(model);
  }
}
