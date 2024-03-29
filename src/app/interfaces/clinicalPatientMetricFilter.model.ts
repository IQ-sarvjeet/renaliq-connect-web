export interface ClinicalPatientMetricFilterModel {
    currentPage: number,
    pageSize: number,
    filter: ClinicalPatientMatrixFilter
}

export interface ClinicalPatientMatrixFilter {
      metricId?: number;
      patientName?: string;
      numerator?: number;
      dateRange?: Array<Date>;
}