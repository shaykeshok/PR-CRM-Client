import { Customer } from "./Customer.model";

export interface IResponse {
    rc: number;
    desc: string;
    title?: string;
    body?: string;
}

export interface JBIResponse extends IResponse {
    JBI: Customer[];
}
export interface ApiResponse<T> {
    rc: number;
    description: string;
    responseObj: T;
}
