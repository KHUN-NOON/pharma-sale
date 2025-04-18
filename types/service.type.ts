export type ServiceResponseType<T> = {
    success: boolean,
    message: string | null,
    data: T | null
};

export type GetDataListType<T> = {
    result: T,
    total: number,
    page: number,
    totalPages: number
}

export type PaginatedServiceResponse<T> = ServiceResponseType<GetDataListType<T>>;