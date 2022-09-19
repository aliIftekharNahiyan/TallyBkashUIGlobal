import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MyadvanceserviceService {

  constructor() { }

  getMyData(data:any){
    return "Something";
  }
}
