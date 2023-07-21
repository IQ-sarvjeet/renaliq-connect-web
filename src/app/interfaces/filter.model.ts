export interface FilterModel {
    currentPage: number,
    pageSize: number,
    patientFilter: PatientFilterModel,
}

export interface PatientFilterModel {
    searchKey: string,
    stage: Array<string>,
    riskCategory: string,
    careMember: string,
    status: Array<string>,
    assignment?: Date[],
    discharge?: Date[],
    isAssessed?: string,
    SortDirection: string,
    SortBy: string
}