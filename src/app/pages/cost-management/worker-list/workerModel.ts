export interface WorkerModelResult {
    Id: number;
    WorkerName: string;
    Nid: number;
    WorkerMobile: string;
    Address: string;
    UserId: number;
    SubUserId: number;
    CreatedBy: number;
    Status: number;
    TimeStamp: Date;
    Active: string;
    Picture: string;
    
}

export interface WorkerModel {
    result: WorkerModelResult;
}