import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
public isLoading$=new Subject<boolean>()

  constructor() { }
  ShowLoadingSpinner(){
    this.isLoading$.next(true);
  }
  HideLoadingSpinner(){
    this.isLoading$.next(false);
  }
}
