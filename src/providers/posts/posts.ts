import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import {AuthProvider} from "../auth/auth";
import { Injectable } from '@angular/core';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  BASE_URI; //"http://localhost:8080";


  constructor(public http: Http,public authService:AuthProvider) {
    console.log('Hello PostsProvider Provider');
    this.BASE_URI = //"http://localhost:5080";
      "https://obscure-gorge-70391.herokuapp.com";
  }


  leaveComemnt(post,user){
    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.BASE_URI + '/api/posts/comment/' + user.username,JSON.stringify(post),{headers:headers}).map(res => res.json())
        .subscribe(res =>{
          resolve(res)
        },(err) =>
        {
          reject(err);
        })
    }))
  }


  leaveLike(post,user){
    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.BASE_URI + '/api/posts/likes/' + user.username,JSON.stringify(post),{headers:headers}).map(res => res.json())
        .subscribe(res =>{
          resolve(res)
        },(err) =>
        {
          reject(err);
        })
    }))
  }

  createPost(post){
    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.BASE_URI + '/api/posts',JSON.stringify(post),{headers:headers}).map(res => res.json())
        .subscribe(res =>{
          resolve(res)
        },(err) =>
        {
          reject(err);
        })
    }));
  }

  getPosts(){

    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.BASE_URI + '/api/posts', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    }))
  }

  getPostsByUsername(username){
    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.BASE_URI + '/api/posts/' + username, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    }))
  }

}
