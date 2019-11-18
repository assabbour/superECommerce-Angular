import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product } from '../model/product.model';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products;
  private title:string;

  constructor(private catService: CatalogueService,
    private route: ActivatedRoute, private router: Router,
    public caddyService:CaddyService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;

        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.title="the products to selected !"
          this.getProducts('/products/search/selectedProducts');
        }
        else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.title="Products of the category" + idCat;
          this.getProducts('/categories/' + idCat + '/products');
        }
        
        else if (p1 == 3) {
          this.title="Promotional products"
          this.getProducts('/products/search/promoProducts !');
        }
        else if (p1 == 4) {
          this.title="Disponibles products !"
          this.getProducts('/products/search/dispoProducts');
        }
        else if (p1 == 5) {
          this.title="the products you have searched for!"
          this.getProducts('/products/search/dispoProducts');
        }
         
      }
    })

    let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.getProducts('/products/search/selectedProducts');
        }

  }

  


  private getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err)
      })
  }


  onProductDetail(p:Product){
    let url = btoa(p._links.product.href)
    this.router.navigateByUrl("product-detail/"+url);

  }



  onDeleteProduct(p){
    
  }



  addProductToCaddy(p:Product){
    this.caddyService.addProductToCaddy(p);
  }



}
