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
    isAssessed?: boolean,
    SortDirection: string,
    SortBy: string
}