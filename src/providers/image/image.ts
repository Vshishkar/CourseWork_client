import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {FIREBASE_CONFIG} from "../../app/firebase_config";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ActionSheetController, LoadingController, NavController, Platform, ToastController} from "ionic-angular";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {Transfer} from "@ionic-native/transfer";
import {default as firebase, initializeApp} from "firebase";

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  options:CameraOptions ={
    quality:100,
    targetHeight:600,
    targetWidth:600,
    destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE,
  };


  constructor( private camera: Camera,
              private transfer: Transfer, private file: File, private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
              public platform: Platform, public loadingCtrl: LoadingController,public http:Http) {
    initializeApp(FIREBASE_CONFIG);
    this.myPhotosRef = firebase.storage().ref('/Photos');
  }


  public getImageUrl(post_id){
    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.myPhotosRef.child(post_id + '/myPhoto.png').getDownloadURL().then(function(url){
        resolve(url);
      });
    }))
  }

  public uploadPhoto(post_id) {
    return new Promise(((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.myPhotosRef.child('photo1').child('myPhoto.png')
        .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
        .then((savedPicture) => {
          //this.myPhotoURL = savedPicture.downloadURL;
          alert(savedPicture);
          resolve(savedPicture);
        });
    }))
  }

}
