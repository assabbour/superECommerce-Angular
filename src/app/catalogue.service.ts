import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

 public host:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  public getResource(url){
    return this.http.get(this.host+url);
  }


  public getProduct(url):Observable<Product>{
    return this.http.get<Product>(url);
  }



}
