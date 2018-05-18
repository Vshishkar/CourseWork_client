import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserPostClass} from "../../components/post-page-class";
import {Storage} from "@ionic/storage";
import {PostsProvider} from "../../providers/posts/posts";

/**
 * Generated class for the PostViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-view',
  templateUrl: 'post-view.html',
})
export class PostViewPage {

  userPost:UserPostClass;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public storage:Storage,public postsService:PostsProvider) {
    this.userPost = this.navParams.get('post');
  }

  ionViewDidLoad() {
    this.storage.get('user').then(data =>{
      this.user = data;
    });
    console.log('ionViewDidLoad PostViewPage');
  }

  /*commentPost(){
    let prompt = this.alertCtrl.create({
      title: 'Add Post',
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
          handler:  comment => {
            if(comment){
              let newComment = {username:this.user.username,context:comment.title};
              this.postsService.leaveComemnt(newComment,this.user).then(res =>
              console.log(res)
              );

            }
          }
        }
      ]
    });
    prompt.present();
  }*/


}
