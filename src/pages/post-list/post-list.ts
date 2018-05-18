import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {PostsProvider} from "../../providers/posts/posts";
import {UserPostClass} from "../../components/post-page-class";
import {ProfilePage} from "../profile/profile";
import {Storage} from "@ionic/storage";
import {PostViewPage} from "../post-view/post-view";

/**
 * Generated class for the PostListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html',
})
export class PostListPage {


  userPosts:any;
  loading: any;
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public postsService:PostsProvider,public loadingCtrl:LoadingController,public storage:Storage) {

  }

  ionViewDidLoad() {
    this.showLoader();
      this.storage.get('user').then(data =>{
        this.user = data;
      });
      this.postsService.getPosts().then((data) => {
        console.log(data);
        this.userPosts = data;
        this.userPosts.sort(function (a,b) {
          console.log(a.createdAt + " " + b.createdAt);
          return  a.createdAt - b.createdAt;
        });
        this.loading.dismiss();
      }, (err) => {
        console.log("not allowed");
        this.loading.dismiss();
      });


  }

  leaveLike(post){
    console.log(this.user);
    this.postsService.leaveLike(post,this.user).then((data) =>{
      console.log(data);
    })
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Init posts...'
    });

    this.loading.present();
  }

  viewProfile(user){
    this.navCtrl.push(ProfilePage,{user:user});
  }

  /*goToPostView(user){
    this.navCtrl.push(PostViewPage,{post:user});
  }*/

}
