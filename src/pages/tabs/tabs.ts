import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {PostListPage} from "../post-list/post-list";
import {UserPostClass} from "../../components/post-page-class";
import {UserClass} from "../../components/post-page/UserClass";
import {Storage} from "@ionic/storage";
import {PostsProvider} from "../../providers/posts/posts";
import {HomePage} from "../home/home";
import {AddPostPage} from "../add-post/add-post";
import {ImageProvider} from "../../providers/image/image";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {default as firebase, initializeApp} from "firebase";
import {FIREBASE_CONFIG} from "../../app/firebase_config";
import {Headers} from "@angular/http";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit{

  loading:any;
  user:UserClass;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public currentDir:any;

  options:CameraOptions ={
    quality:100,
    targetHeight:600,
    targetWidth:600,
    destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE,
  };


  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public loadingCtrl:LoadingController,public storage:Storage,
              public postsService:PostsProvider,public actionSheetCtrl:ActionSheetController,public camera:Camera) {
    console.log('this is tabs');
    this.storage.get('user').then(result =>{
      console.log("we are on Init");
      this.user = result;
    });
   /* initializeApp(FIREBASE_CONFIG);
    this.myPhotosRef = firebase.storage().ref('/Photos');*/
  }

  tab1Root = PostListPage;
  tab3Root = ProfilePage;
  tab2Root = AddPostPage;

  ngOnInit(): void {

  }


  ionViewDidLoad() {

  }

  createPost(post){
    let newPost:UserPostClass;

    newPost = new UserPostClass();
    newPost.username = this.user.username;
    newPost.description = post.title;
    newPost.location = post.location;
    newPost.likes = [];
    newPost.avatarPhotoUrl = this.user.avatarPhotoUrl;
    newPost.postPhotoUrl = post.url;
    newPost.user_id = this.user.id;
    post  = newPost ;
    this.showLoader();

    this.postsService.createPost(post).then((result) => {
      this.loading.dismiss();
      // this.userPosts.push(post);
      console.log("post created");
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
    });
  }


  addPost(){
    let prompt = this.alertCtrl.create({
      title: 'Add Post',
      message: 'Describe your post below:',
      inputs: [
        {
          name: 'title'
        }
        ,{
          name:'location'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler:  post => {
            if(post){

              let newPost:UserPostClass;

              newPost = new UserPostClass();
              newPost.username = this.user.username;
              newPost.description = post.title;
              newPost.location = post.location;
              newPost.likes = [];
              newPost.avatarPhotoUrl = this.user.avatarPhotoUrl;
              newPost.postPhotoUrl = '../../assets/imgs/cold-daylight-desktop-wallpaper-976917.jpg';
              newPost.user_id = this.user.id;
              post  = newPost ;
              this.showLoader();

              this.postsService.createPost(post).then((result) => {
                this.loading.dismiss();
                // this.userPosts.push(post);
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

}
