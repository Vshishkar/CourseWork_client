import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: any;

  constructor(public http: Http,public storage:Storage) {
    //this.BASE_URI = "http://localhost:8080";
   this.BASE_URI = "https://obscure-gorge-70391.herokuapp.com";
  //  this.BASE_URI = "http://localhost:5080";
  }

  BASE_URI:any;


  checkAuthentication(){
    return new Promise((resolve, reject) => {
      //Load token if exists
      this.storage.get('token').then((value) => {
        this.token = value;
        let headers = new Headers();
        headers.append('Authorization', this.token);
        this.http.get(this.BASE_URI + '/api/auth/protected', {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  createAccount(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.BASE_URI + '/api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          this.storage.set('user', data.user);
          resolve(data);
        }, (err) => {
           console.log(err);
          reject(err);
        });

    });

  }

  login(credentials){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(this.BASE_URI + '/api/auth/protected');
      this.http.post(this.BASE_URI + '/api/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          let data = res.json();

          this.token = data.token;
          this.storage.set('token', data.token);
          this.storage.set('user', data.user);
          resolve(data);
          resolve(res.json());
        }, (err) => {
          console.log("error :(");
          console.log(err);
          reject(err);
        });
    });
  }

  logout(){
    this.storage.set('token', '');
  }


}
