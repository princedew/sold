export interface itemsQuery {
    search: string;
    page: number;
    limit: number;
}

export interface itemsQueryWithOutSearch {
    search: undefined;
    page: number;
    limit: number;
}