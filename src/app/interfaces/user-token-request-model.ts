export interface UserTokenRequestModel {
    twoFactorCode: string;
    username: string;
    password?: string;
    rememberMe?: boolean;
    client_id?: string;
    client_secret?: string;
    scope?: string;
    grant_type?: string
}