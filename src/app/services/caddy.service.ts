import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { Product } from '../model/product.model';
import { ProductItem } from '../model/product-item.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  currentCaddyName:string="caddy1";

  public caddies:Map<string, Caddy> =new Map()

  constructor() { 
    let caddy = new Caddy(this.currentCaddyName);

    this.caddies.set(this.currentCaddyName,caddy);

  }

  public addProductToCaddy(product:Product):void{
    let caddy = this.caddies.get(this.currentCaddyName);
    let productItem:ProductItem=caddy.items.get(product.id);
    if(productItem){
      productItem.quantity+=product.quantity;
    }else{
      productItem = new ProductItem();
      productItem.price = product.currentPrice;
      productItem.quantity = product.quantity;
      caddy.items.set(product.id, productItem)

    }

  }



  getCurrentCady():Caddy{
    return this.caddies.get(this.currentCaddyName);
  }

  public getTotal():number{
    let total=0;
    this.getCurrentCady().items.values
    let items:IterableIterator<ProductItem>=this.getCurrentCady().items.values();
    for(let pi of items){
      total+=pi.price*pi.quantity;    
    }
    return total;

  }
}
