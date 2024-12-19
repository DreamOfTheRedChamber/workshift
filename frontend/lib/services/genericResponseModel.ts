export type GenericResponseModel<T> = {
    message: string,
    succeed: boolean,
    messageDetail: string,
    data: T,
};