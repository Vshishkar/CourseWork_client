import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AuthProvider} from "../../providers/auth/auth";
import {UserClass} from "../../components/post-page/UserClass";
import {ProfilePage} from "../profile/profile";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  role: string;
  username: string;
  password: string;
  loading:any;
  message_hint:any;

  user:UserClass;


  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {

    this.user = new UserClass();
    this.message_hint = "";

  }

  register(){

    this.showLoader();

    let details = {
      username: this.username,
      password: this.password,
      role: 'user'
    };

    console.log(details);

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(details.username);
      this.user.accountInfo = "";
      this.user.username = details.username;
      this.viewProfile(this.user);
     // this.navCtrl.setRoot(HomePage,);
    }, (err) => {
      this.message_hint = "This user is already exists";
      this.loading.dismiss();
    });

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

}
