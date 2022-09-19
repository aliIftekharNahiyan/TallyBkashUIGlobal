export interface SupplierModelResult {
    Id: number;
    SupplierName: string;
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

export interface SupplierModel {
    result: SupplierModelResult;
}