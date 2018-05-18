import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { HomePage } from '../home/home';
import {SignupPage} from "../signup/signup";
import {UserClass} from "../../components/post-page/UserClass";
import {ProfilePage} from "../profile/profile";
import { Storage } from '@ionic/storage';
import {map} from "rxjs/operator/map";
import {TabsPage} from "../tabs/tabs";
import {AddPostPage} from "../add-post/add-post";


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;
  loading: any;

  user:UserClass;

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController,public storage:Storage) {

    this.user = new UserClass();

  }


  ionViewDidLoad() {

    console.log("load...");

    this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.storage.get('user').then(res =>{
        this.viewProfile(res);
      })
      //this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });

  }

  login(){

    this.showLoader();

    let credentials = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      console.log(this.storage.get('user'));
      this.user.username = credentials.username;
      //this.user.accountInfo = result.accountInfo;
      this.viewProfile(this.user);

     // this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }


  launchSignup(){
    this.navCtrl.push(SignupPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  viewProfile(user:UserClass){
    this.navCtrl.setRoot(TabsPage,{user:user});
  }

  goToAddPost(){
    this.navCtrl.push(AddPostPage);
  }

}
