import { User } from "./user";

export interface ResponseLogin{
    status: string;
    response_code: number;
    data: User;
    message: string;
}