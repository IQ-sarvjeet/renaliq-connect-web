import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterModel } from 'src/app/interfaces/filter.model';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  constructor() {}

  private _patientFilter= new Subject<FilterModel>();
  getpatientFilter$ = this._patientFilter.asObservable();

  setPatientFilter(model: FilterModel) {
    this._patientFilter.next(model);
  }
}
