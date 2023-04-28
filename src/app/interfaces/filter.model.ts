export interface FilterModel {
    currentPage: number,
    pageSize: number,
    patientFilter: PatientFilterModel,
}

export interface PatientFilterModel {
    searchKey: string,
    stage: string,
    riskCategory: string,
    careMember: string,
    status: string,
    assignment?: Date[],
    discharge?: Date[],
    SortDirection: string,
    SortBy: string
}