import { environment } from 'src/environments/environment';

export interface GridModel{
    items:[],
    pagingModel : PagingModel
}

export interface PagingModel{
    pageSize: number,
    totalRecords:number,
    currentPage: number,
    totalPages: number
}