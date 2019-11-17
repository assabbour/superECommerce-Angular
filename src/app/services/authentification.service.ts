import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private users=[
    {
      username:'admin', password:'1234', roles:['ADMIN', 'USER']
    },
    {
      username:'user', password:'1234', roles:['USER']
    }
  ];
  public isAuthenticated:boolean;
  public userAuthenticated;
  public token;

  constructor() { }

  public login(username:string, password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username == username && u.password==password){
        user=u;
        this.token=btoa(JSON.stringify({username:u.username, roles:u.roles}));
      }

    });
    if(user){
      this.isAuthenticated=true;
      this.userAuthenticated=user;
    }
    else{
      this.userAuthenticated=false;
      this.isAuthenticated=undefined
    }

  }

  public saveAuthenticatedUser(){
    if(this.userAuthenticated){
      localStorage.setItem('authToken', this.token);
    }
  }

  public loadAutenticatedUserFormlocalStorage(){
    let t = localStorage.getItem("authToken")
    if(t){
      let user=JSON.parse(atob(t));
      this.userAuthenticated={username:user.username, roles:user.roles};
      this.isAuthenticated=true;
      this.token=t;
    }
    
  }

  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated=false;
    this.token=undefined;
    this.userAuthenticated=undefined;
  }


}
