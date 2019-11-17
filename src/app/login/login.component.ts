import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthentificationService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  onLogin(dataForm: any){
    this.authservice.login(dataForm.username, dataForm.password)
    if(this.authservice.isAuthenticated){
      this.authservice.saveAuthenticatedUser();
      this.router.navigateByUrl('/')
    }
  }

}
