import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController,
  IonicPage,
  Loading, LoadingController,
  NavController,
  NavParams,
  Platform,
  ToastController
} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import {Http} from "@angular/http";
import {Headers} from "@angular/http";
import {storage, initializeApp, default as firebase} from 'firebase'
import {FIREBASE_CONFIG} from "../../app/firebase_config";
import {UserClass} from "../../components/post-page/UserClass";
import {UserPostClass} from "../../components/post-page-class";
import {PostsProvider} from "../../providers/posts/posts";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AddPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova:any;



@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  loading:any;
  currentDir:any;


  options:CameraOptions ={
    quality:100,
    targetHeight:600,
    targetWidth:600,
    destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE,
  };

  user:UserClass;

  constructor(public navCtrl: NavController,private navParams:NavParams, private camera: Camera,
              private transfer: Transfer, private file: File, private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
              public platform: Platform, public loadingCtrl: LoadingController,public http:Http,public storage:Storage
              ,public postsService:PostsProvider,public alertCtrl:AlertController) {

    initializeApp(FIREBASE_CONFIG);
    this.myPhotosRef = firebase.storage().ref('/Photos');
    this.currentDir = this.generateUUID();
  }

  ionViewDidLoad() {
    this.storage.get('user').then(result =>{
      this.user = result;
    })
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.selectPhoto();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
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
              newPost.postPhotoUrl = this.myPhotoURL;
              newPost.user_id = this.user.id;
              post  = newPost ;
              this.showLoader('auth');
              this.postsService.createPost(post).then((result) => {
                this.loading.dismiss();
                // this.userPosts.push(post);
                console.log("post created");
                this.currentDir="";
              }, (err) => {
                this.loading.dismiss();
                this.currentDir="";
                console.log("not allowed");
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showLoader(s){
    this.loading = this.loadingCtrl.create({
      content: s + '...'
    });
    this.loading.present();
  }

  public getImageUrl(){
    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.myPhotosRef.child(this.currentDir +  '/myPhoto.png').getDownloadURL().then(function(url){
        resolve(url);
      });
    }))
  }

  saveImageUrl(){
    this.getImageUrl().then(res => {
      this.myPhotoURL = res;
      console.log(this.myPhotoURL);

    },err =>{

      this.saveImageUrl();
    })
  }

  takePhoto() {
    this.camera.getPicture(this.options).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      alert(error);
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }




  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto() {
    this.showLoader('upload photo');
    this.myPhotosRef.child(this.currentDir).child('myPhoto.png')
        .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
        .then((savedPicture) => {
          this.myPhotoURL = savedPicture.downloadURL;
          this.loading.dismiss();

        }).then(() =>{
      this.saveImageUrl();
    });
  }


  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
