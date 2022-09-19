export class DueCollectionModel{
    Id:number;
    UserId:number;   
    SupplierId:number;   
    BuyerId:number;   
    BuyerName:string;
    MobileNumber:string;
    Address:string;
    TotalBaki:number;
    BakiReceived:number;
    RemainBaki:number;   
    EntryDate:Date;  
    Status:number;
  

}

export interface DueCollectionModelResult {
    result: DueCollectionModel;
}
