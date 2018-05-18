import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import {AuthProvider} from "../auth/auth";

@Injectable()
export class TodosProvider {

  BASE_URI = "http://localhost:8080";

  constructor(public http: Http, public authService: AuthProvider) {

  }

  getTodos(){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(this.BASE_URI + '/api/todos', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createTodo(todo){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.BASE_URI + '/api/todos', JSON.stringify(todo), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });
  }
  
  deleteTodo(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete(this.BASE_URI + '/todos/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }

}
