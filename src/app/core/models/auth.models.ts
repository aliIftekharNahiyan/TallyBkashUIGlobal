export class User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email: string;
    mobileNumber: string;
    shopName:string;
}
export class UserDB {
    Id: number;
    MobileNumber: string;
    Password: string;
    Name?: string;
    Email?: string;
    IsSubUser?: number;
    MainUserId: number;
    CreatedBy: string;
    Status: number;
    
}

export interface Result {
    Id: number;
    MobileNumber: string;
    Password: string;
    Name: string;
    Email: string;
    IsSubUser: number;
    MainUserId: number;
    CreatedBy: string;
    Status: number;
    TimeStamp: Date;
    ShopName: string;
    BusinessTypeId: number;
    ShopAddress?: any;
}

export interface SignUpdata {
    result: Result;
}