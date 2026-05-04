export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse{
    isSuccessAuth: boolean;
}

export interface UserInfo {
    uid: number;
    lastActivity: Date;
    isAcceptedPersonalData: boolean;
    username: string;
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    organizationCode: string;
    organizationName: string;
    sessionStart: string;
    sessionEnd: string;
}