import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';
import { Router} from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private categories;
  private currentCategory;

  constructor(private catService: CatalogueService,
    private router:Router,
    private authService: AuthentificationService
    ){

  }
  
  ngOnInit():void{
    this.authService.loadAutenticatedUserFormlocalStorage();
    this.getCategories();
  }

  private getCategories(){
    this.catService.getResource("/categories")
      .subscribe(data => {
        this.categories = data;
      },err=>{
        console.log(err);
      })
  }


  getCatOne(c){
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+1)
  }
  getCatTwo(c){
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+2)
  }

  getCatThree(c){
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+3)
  }

  onSelectedproducts(){
    this.currentCategory=undefined;
    this.router.navigateByUrl('/products/1/0');
  }


  onDispo(){
    this.currentCategory=undefined;
    this.router.navigateByUrl('/products/4/0');
  }

  onPromo(){
    this.currentCategory=undefined;
    this.router.navigateByUrl('/products/3/0');
  }


  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
    

  }

}
