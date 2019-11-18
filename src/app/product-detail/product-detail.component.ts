import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public currentproduct:Product;

  constructor(private router:Router, private route:ActivatedRoute,
    private catalService:CatalogueService) { }

  ngOnInit() {

    let url = atob(this.route.snapshot.params.url);
    this.catalService.getProduct(url).subscribe(data=>{
      this.currentproduct =data;
    })
  }

}
