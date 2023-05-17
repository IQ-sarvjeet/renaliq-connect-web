import { Roles } from "../enums/roles";

export interface UserInfo {
    fullName: string;
    roleName?: string;
    userLoginId?: number;
    role: Roles
}