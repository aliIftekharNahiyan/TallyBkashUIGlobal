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

export interface Table1{
    Id:number,
    SupplierName:string,
    HisabStartAmount:number,
    MobileNumber:number,
    Address:string,
    CreatedBy:number,
    EntryDate:string,
    IdMax:number,
    Status:number,
    SubUserId:number,
    SupplierId:string,
    UserId:number

}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
