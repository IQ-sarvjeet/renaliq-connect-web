import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClinicalPatientMetricFilterModel } from 'src/app/interfaces/clinicalPatientMetricFilter.model';
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

  private _clinicalPatientMatrixFilter= new Subject<ClinicalPatientMetricFilterModel>();
  getClinicalPatientMatrixFilter$ = this._clinicalPatientMatrixFilter.asObservable();

  setClinicalPatientMatrixFilter(model: ClinicalPatientMetricFilterModel) {
    this._clinicalPatientMatrixFilter.next(model);
  }
}
