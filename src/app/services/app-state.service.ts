import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  //la ou je vais mettre les donnee du state
  public productState:any = {
    products :[],
  keyword:"",
  totalPages:0,
  pageSize:3,
  currentPage:1,
    totalProducts:0,
    status:"",
    errorMessage:""
  }

  constructor() { }
  public setProductState(state:any):void{
    this.productState={...this.productState,...state}
  }
}
