export interface ClinicalPatientMetricFilterModel {
    currentPage: number,
    pageSize: number,
    filter: ClinicalPatientMatrixFilter
}

export interface ClinicalPatientMatrixFilter {
    metricId?: number;
    periodId?: number;
    patientName?: string;
    numerator?: number;
    denominator?: number;
    status?: string;
    stage?: string;
    sortBy?: string;
    sortDirection?: string;
    dateRange?: Array<Date>;
}