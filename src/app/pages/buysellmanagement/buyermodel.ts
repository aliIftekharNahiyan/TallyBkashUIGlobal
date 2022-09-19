export interface BuyerModelResults {
    Id: number;
    BuyerName: string;
   
  }

  export class Info {
        qty: string;
        price: string;
    }

    export class RequestObject {
        Id:string;
        UserId: string;
        SubUserId: string;
        SupplierId: string;
        Total: string;
        Discount: string;
        Cashed: string;
        Remain: string;
        Infos: Info[];
        EntryDate:string;
    }