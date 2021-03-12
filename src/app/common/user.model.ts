import { IResponse } from './response.model';

export interface IUser {
    moneln: number;
    email: string;
    compDbName: string;
    mainDbName: string;
    phone: string;
    username: string;
    rashut?: string;

}

export interface IUserResponse extends IResponse {
    user: IUser;
    token?: string;
}
export interface IChangeOrderStatusResponse extends IResponse {

    ans: number;
    ansrem: string;
    nextconf: string;
    icon?: string;

}
export interface IChangeOrderConfResponse extends IResponse {

    ans: number;
    ansrem: string;
    icon?: string;

}
