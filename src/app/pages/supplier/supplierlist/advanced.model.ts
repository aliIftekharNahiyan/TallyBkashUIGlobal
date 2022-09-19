// Table data
export interface Table {
    name: string;
    position: string;
    office: string;
    age: number;
    date: string;
    salary: string;
    unit: number;
    enddate: string;
}

export class TableSupplierList{
    Id:number;
    SupplierName:string;
    HisabStartAmount:number;
    MobileNumber:number;
    Address:string;
    CreatedBy:number;
    EntryDate:Date;
    IdMax:number;
    Status:number;
    SubUserId:number;
    SupplierId:string;
    UserId:number;
    TimeStamp:string;
 



}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
