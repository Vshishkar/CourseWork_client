import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the DropBoxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DropBoxProvider {

  accessToken:any;
  folderHistory:any = [];

  constructor(public http: Http) {
    console.log('Hello DropBoxProvider Provider');
  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  getUserInfo(){

  }

  getFolders(path?){

  }

  goBackFolder(){

  }

}
