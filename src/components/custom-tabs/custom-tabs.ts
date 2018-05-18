import { Component } from '@angular/core';
import {HomePage} from "../../pages/home/home";
import {AddPostPage} from "../../pages/add-post/add-post";
import {PostListPage} from "../../pages/post-list/post-list";
import {AlertController, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {ProfilePage} from "../../pages/profile/profile";
import {UserPostClass} from "../post-page-class";
import {PostsProvider} from "../../providers/posts/posts";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {UserClass} from "../post-page/UserClass";

/**
 * Generated class for the CustomTabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-tabs',
  templateUrl: 'custom-tabs.html'
})
export class CustomTabsComponent {
  tab1Root:PostListPage;
  tab2Root:AddPostPage;
  tab3Root:HomePage;

//  userPosts:UserPostClass[];
  user:UserClass;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postsService: PostsProvider, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController,public storage:Storage) {
    console.log('Hello CustomTabsComponent Component');

    this.storage.get('user').then(result =>{
      this.user = result;
    })
  }

  goToPostList(){
    this.navCtrl.push(PostListPage);
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage,{user:this.user});
  }


  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
