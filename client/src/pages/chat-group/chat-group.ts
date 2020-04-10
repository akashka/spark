// <reference types="@types/googlemaps" />
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Content } from 'ionic-angular';
import {
  NavController,
  NavParams,
  ModalController,
  AlertController,
  ActionSheetController,
  ToastController,
  Platform,
  App,
  MenuController,
  LoadingController
} from 'ionic-angular';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ChatListPage } from '../chat-list/chat-list';

// Providers
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Chats } from '../../providers/chats/chats';
import { Networks } from '../../providers/network/network';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

declare var google;

@Component({
  selector: 'chat-group-page',
  templateUrl: 'chat-group.html',
})
export class ChatGroupPage {
  messages: any = [];
  users: any = [];
  user: any = {};
  message = '';
  public loader: any;
  chat: any = [];
  isSilentMember: Boolean;
  emoziToggled: boolean = false;

  @ViewChild("scrollElement") content: Content;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    public studentService: Students,
    public chatService: Chats,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public menu: MenuController,
    public centerService: Center,
    public networkService: Networks,
    public storage: Storage,
    public loading: LoadingController,
    public http: Http,
    public camera: Camera,
    public fileChooser: FileChooser,
    public media: Media,
    public file: File
  ) {

  }

  ngOnInit() {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });
    this.storage.get('user').then((user) => {
      this.user = user;
      this.authService.searchUser().then((result) => {
        this.users = result;
        this.storage.get('chatGroup').then((chat) => {
          this.chat = chat;
          if (
            this.chat.silent_members.indexOf(user._id) > -1 ||
            this.chat.members.indexOf(user._id) <= -1
          ) {
            this.isSilentMember = true;
          } else {
            this.isSilentMember = false;
          }
          this.getChatMessages();
        });
      });
    });
  }

  getChatMessages() {
    this.chatService.getChatMessages(this.chat._id, this.user._id).then((result) => {
      this.messages = _.sortBy(result, 'created');
      this.loader.dismiss();
      this.markmap();
      this.getChatMessages();
    });
  }

  sendMessage() {
    if (this.message != '') {
      this.messages.push({
        from: this.user._id,
        created: new Date(),
        type: 'text',
        text: this.message,
      });
      this.chatService.updateChatMessages(this.chat._id, this.messages).then((result) => {
        this.message = '';
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.contentHeight, 0);
      }, (err) => {
      });
    }
  }

  getUserName(userId) {
    var selectedUser = this.users.find(function (element) {
      return element._id === userId;
    });
    if (selectedUser && selectedUser.name) return selectedUser.name;
    return '';
  }

  onMessageChange() {
    console.log('e');
  }

  goBack() {
    this.storage.remove("chatGroup");
    this.navCtrl.setRoot(ChatListPage);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  handleEmoziSelection(event) {
    this.message += event.char;
  }

  getUserProfileImage(userId) {
    var selectedUser = this.users.find(function (element) {
      return element._id === userId;
    });
    if (selectedUser && selectedUser.photo) return selectedUser.photo;
    return 'https://i7.pngguru.com/preview/246/366/335/computer-icons-avatar-user-profile-man-avatars.jpg';
  }

  ngOnDestroy() {
    this.chatService.stopGetChatMessages();
  }

  // Map
  markmap() {
    setTimeout(() => {
      for (var i = 0; i < this.messages.length; i++) {
        if (this.messages[i].type === 'location') {
          if (this.mapElement.nativeElement.innerText === '') {
            let mapCenter = new google.maps.LatLng(
              parseFloat(this.messages[i].latitude).toFixed(5),
              parseFloat(this.messages[i].longitude).toFixed(5)
            );
            let mapOptions = {
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: true,
              center: mapCenter,
              fullscreenControl: false,
              disableDefaultUI: true
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
          }
        }
      }
    }, 100);
  }

  openGoogleMap(latitude, longitude) {
    latitude = parseFloat(latitude).toFixed(5);
    longitude = parseFloat(longitude).toFixed(5);
    const newUrl = 'http://maps.google.com/maps?q=loc:' + latitude + "," + longitude;
    window.open(newUrl, "_blank");
  }

  sendLocation() {
    navigator.geolocation.getCurrentPosition(res => {
      this.messages.push({
        from: this.user._id,
        created: new Date(),
        type: 'location',
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      });
      this.chatService.updateChatMessages(this.chat._id, this.messages).then((result) => {
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.contentHeight, 0);
      }, (err) => {
        this.presentToast(err);
      });
    });
  }

  // Attachment
  sendAttachment() {
    alert('abc');
    this.fileChooser.open().then(uri => {
      alert(uri);
    }).catch(err => this.presentToast(err));
  }

  // Camera
  sendCamera() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      var fileName = 'chat_'+this.chat._id+'_'+this.messages.length+'.jpg';
      var contentType = 'image/jpg';
      this.chatService.uploadToS3(base64Image, fileName, 'base/64', contentType).then((result) => {
        console.log(result);
        this.messages.push({
          from: this.user._id,
          created: new Date(),
          type: 'image',
          imagePath: fileName,
        });
        this.chatService.updateChatMessages(this.chat._id, this.messages).then((result) => {
          let dimensions = this.content.getContentDimensions();
          this.content.scrollTo(0, dimensions.contentHeight, 0);
        }, (err) => {
          this.presentToast(err);
        });
      }, (err) => {
        this.presentToast(err);
      });
    }, (err) => {
      this.presentToast(err);
    });
  }

  // Sound
  public isRecording: Boolean = false;
  public fileToSave;
  sendSound() {
    this.isRecording = true;
    this.fileToSave = this.media.create(
      this.file.tempDirectory
        ? this.file.tempDirectory.replace(/^file:\/\//, '') + 'my_file.m4a'
        : './my_file.m4a'
    );
    this.file.createFile(
      this.file.tempDirectory ? this.file.tempDirectory : './', 'my_file.m4a', true
    ).then(() => {
      this.fileToSave.startRecord();
      if(this.isRecording) window.setTimeout(() => this.fileToSave.stopRecord(), 10000);
      this.saveRecording();
    }, (err) => {
      this.presentToast(err);
    });
  }

  stopRecording() {
    if(this.isRecording) this.fileToSave.stopRecord();
    this.saveRecording();
  }

  saveRecording() {
    this.isRecording = false;
    var fileName = 'chat_'+this.chat._id+'_'+this.messages.length+'.m4a';
      this.chatService.uploadToS3(this.fileToSave, fileName, '', 'audio/m4a').then((result) => {
        console.log(result);
        this.messages.push({
          from: this.user._id,
          created: new Date(),
          type: 'image',
          imagePath: fileName,
        });
        this.chatService.updateChatMessages(this.chat._id, this.messages).then((result) => {
          this.fileToSave.release();
          let dimensions = this.content.getContentDimensions();
          this.content.scrollTo(0, dimensions.contentHeight, 0);
        }, (err) => {
          this.presentToast(err);
        });
      }, (err) => {
        this.presentToast(err);
      });
  }

}