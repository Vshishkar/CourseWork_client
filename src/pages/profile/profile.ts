import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {UserClass} from "../../components/post-page/UserClass";
import {UserPostClass} from "../../components/post-page-class";
import {AuthProvider} from "../../providers/auth/auth";
import {PostsProvider} from "../../providers/posts/posts";
import {PostListPage} from "../post-list/post-list";
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PostViewPage} from "../post-view/post-view";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage{

  user:UserClass;

  userPosts:any;

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postsService: PostsProvider, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController,public storage:Storage,public userService:UserServiceProvider) {
      this.user = new UserClass();
  }

  ionViewDidLoad() {
    this.showLoader();
        this.storage.get('user').then(result => {
          this.user = this.navParams.get('user');
          if(this.user.username == result.username) {
            this.user = result;
            }
            console.log(this.user);
            this.postsService.getPostsByUsername(this.user.username).then((data) => {
              this.userPosts = data;
              console.log(this.userPosts);
              this.loading.dismiss();
            }, (err) => {
              console.log("not allowed");
              this.loading.dismiss();
            });
        })
  }

  /*ngOnInit(): void {
    this.user = this.navParams.get('user');
    console.log(this.user);
  }*/

  showPost(post:UserPostClass){
    this.navCtrl.push(PostViewPage,{post:post});
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Init posts...'
    });

    this.loading.present();
  }


  logout(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  updateAccount(){
    let prompt = this.alertCtrl.create({
      title: 'Add account info',
      message: 'Describe your post below:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler:  user => {
            if(user){
              let accountInfo = user.title;
              this.user.accountInfo = accountInfo;
              this.showLoader();
              this.userService.addAccountInfo(this.user).then((result) => {
                this.loading.dismiss();
                this.storage.set('user',this.user);
                console.log("post created");
              }, (err) => {
                this.loading.dismiss();
                console.log("not allowed");
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }


}
