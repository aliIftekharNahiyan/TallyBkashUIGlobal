export interface BuyerModelResult {
    Id: number;
    BuyerName: string;
    HisabStartAmount: number;
    MobileNumber: string;
    Address: string;
    UserId: number;
    SubUserId: number;
    CreatedBy: number;
    Status: number;
    TimeStamp: Date;
    SupplierId: string;
    IdMax: number;
    EntryDate: string;
}

export interface BuyerModel {
    result: BuyerModelResult;
}