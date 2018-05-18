import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from "../auth/auth";
import {Storage} from "@ionic/storage";


/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  BASE_URI = "https://obscure-gorge-70391.herokuapp.com";// "http://localhost:8080";

  constructor(public http: Http,public authService:AuthProvider,public storage:Storage) {
    console.log('Hello UserServiceProvider Provider');
   // this.BASE_URI = "http://localhost:5080";
  }

  addAccountInfo(user){

    return new Promise(((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.BASE_URI + '/api/account/update',JSON.stringify(user),{headers:headers}).map(res => res.json())
        .subscribe(res =>{
          resolve(res);
          //console.log(res);
          user = this.storage.get('user');
          console.log(user);
          this.storage.set('user',res);
        },(err) =>
        {
          reject(err);
        })
    }));

  }

}
