export interface ClinicalPatientMetricFilterModel {
    currentPage: number,
    pageSize: number,
    patientFilter: ClinicalPatientMatrixFilter
}

export interface ClinicalPatientMatrixFilter {
      patientName: string,
      metricId?: number,
      numerator?: number |null,
      dateRange?: Date[]
}