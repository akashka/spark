// <reference types="@types/googlemaps" />
import { Component, ViewChild, ElementRef } from '@angular/core';
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
  LoadingController,
  Content
} from 'ionic-angular';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import { ChatListPage } from '../chat-list/chat-list';
import { ChatCreatePage } from '../chat-create/chat-create';
import { Http, Headers } from '@angular/http';
import * as aws from "aws-sdk";

// Providers
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Chats } from '../../providers/chats/chats';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Geolocation } from '@ionic-native/geolocation';
import { ChatInfoPage } from '../chat-info/chat-info';
import { Base64 } from "@ionic-native/base64";
import { NativeAudio } from '@ionic-native/native-audio';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileOpener } from '@ionic-native/file-opener';

import { ChatPhoneContactPage } from './chat-phone-contact';
import { ChatPhoneListPage } from './chat-phone-list';
import { ChatImagePage } from './chat-image';

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
  isSilentMember: Boolean = false;
  isAdmin: Boolean = false;
  emoziToggled: boolean = false;
  phoneContacts: any = [];
  loading: any;
  funcCalled: Boolean = true;

  @ViewChild(Content) content: Content;
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
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public http: Http,
    public camera: Camera,
    public fileChooser: FileChooser,
    public media: MediaPlugin,
    public file: File,
    public contacts: Contacts,
    public sanitizer: DomSanitizer,
    public transfer: FileTransfer,
    public filePath: FilePath,
    public geolocation: Geolocation,
    public base64: Base64,
    public alertController: AlertController,
    public nativeAudio: NativeAudio,
    public androidPermissions: AndroidPermissions,
    public fileOpener: FileOpener
  ) {
  }

  ngOnInit() {
    this.showLoader('Please wait...');
    this.storage.get('user').then((user) => {
      this.user = user;
      this.authService.searchUser().then((result) => {
        this.users = result;
        this.storage.get('chatGroup').then((chat) => {
          this.chat = chat;
          this.isSilentMember = this.chat.silent_members.indexOf(user._id) > -1;
          this.isAdmin = this.chat.admin.indexOf(user._id) > -1;
          this.loading.dismiss();
          this.getChatMessages();
        });
      });
    });
    this.storage.get('phoneContacts').then((phoneContacts) => {
      this.phoneContacts = JSON.parse(phoneContacts);
    });
  }

  callFunction() {
    this.content.scrollToBottom(0);
    this.funcCalled = false;
  }

  getChatMessages() {
    this.chatService.getChatMessages(this.chat._id, this.user._id).then((result) => {
      let resultSorted = _.sortBy(result, 'created');
      for (var a = 0; a < resultSorted.length; a++) {
        const abc = this.messages.filter(x => {
          return x.from === resultSorted[a].from &&
            x.created === resultSorted[a].created &&
            x.type === resultSorted[a].type
        });
        if (!abc.length) {
          this.messages.push(resultSorted[a]);
          this.funcCalled = true;
        }
      }
      setTimeout(() => {
        this.getChatMessages();
      }, 1000);
    });
  }

  sendMessage() {
    if (this.message != '') {
      let temp = this.messages.map(x => Object.assign({}, x));
      temp.push({
        from: this.user._id,
        created: new Date(),
        type: 'text',
        text: this.message,
      });
      this.chatService.updateChatMessages(this.chat._id, temp).then((result) => {
        this.message = '';
        this.funcCalled = true;
      }, (err) => { });
    }
  }

  getUserName(userId) {
    var selectedUser = this.users.find(function (element) {
      return element._id === userId;
    });
    if (selectedUser && selectedUser.name) return selectedUser.name;
    return '';
  }

  goBack() {
    this.storage.remove("chatGroup");
    this.navCtrl.push(ChatListPage);
  }

  information() {
    this.navCtrl.push(ChatInfoPage, {
      isSilentMember: this.isSilentMember,
      isAdmin: this.isAdmin,
      chat: this.chat,
      messages: this.messages,
      users: this.users,
      user: this.user
    });
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

  openGoogleMap(latitude, longitude) {
    latitude = parseFloat(latitude).toFixed(5);
    longitude = parseFloat(longitude).toFixed(5);
    const newUrl = 'http://maps.google.com/maps?q=loc:' + latitude + "," + longitude;
    window.open(newUrl, "_blank");
  }

  async sendLocation() {
    const alert = await this.alertController.create({
      title: 'Share your Location!',
      message: `This will share your current location with the help of map to all the members here.
      Are you sure you want to share your current location?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.geolocation.getCurrentPosition().then(res => {
              let temp = this.messages.map(x => Object.assign({}, x));
              temp.push({
                from: this.user._id,
                created: new Date(),
                type: 'location',
                latitude: res.coords.latitude,
                longitude: res.coords.longitude,
              });
              this.chatService.updateChatMessages(this.chat._id, temp).then((result) => {
                this.funcCalled = true;
              }, (err) => {
                this.presentToast(err);
              });
            }, (err) => {
              this.presentToast(JSON.stringify(err));
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Attachment
  sendAttachment() {
    this.fileChooser.open().then(uri => {
      this.showLoader('Uploading...');
      this.filePath.resolveNativePath(uri).then(resolvedFilePath => {
        let pathurl = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
        let fileurl = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
        this.file.readAsDataURL(pathurl, fileurl).then((res) => {
          let fileExtension = fileurl.split('.').pop();
          var fileName = 'chat_' + this.chat._id + '_' + this.messages.length + '.' + fileExtension;
          this.chatService.uploadToS3(res, fileName, fileExtension).then((result: any) => {
            let temp = this.messages.map(x => Object.assign({}, x));
            temp.push({
              from: this.user._id,
              created: new Date(),
              type: 'document',
              documentPath: result ? (result.Location ? result.Location : fileName) : fileName,
            });
            this.chatService.updateChatMessages(this.chat._id, temp).then((result) => {
              this.loading.dismiss();
              this.funcCalled = true;
            }, (err) => {
              this.presentToast(err);
              this.loading.dismiss();
            });
          }, (err) => {
            this.presentToast(err);
            this.loading.dismiss();
          });
        }).catch(err => {
          this.presentToast(JSON.stringify(err));
          this.loading.dismiss();
        });
      }).catch(err => {
        this.presentToast(JSON.stringify(err));
        this.loading.dismiss();
      });
    }).catch(err => {
      this.presentToast(JSON.stringify(err));
      this.loading.dismiss();
    });
  };

  // Camera
  sendCamera() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then((imageData) => {
      var fileName = 'chat_' + this.chat._id + '_' + this.messages.length + '.jpeg';
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.chatService.uploadToS3(base64Image, fileName, 'jpeg').then((result: any) => {
        let temp = this.messages.map(x => Object.assign({}, x));
        temp.push({
          from: this.user._id,
          created: new Date(),
          type: 'image',
          imagePath: result ? (result.Location ? result.Location : fileName) : fileName,
        });
        this.chatService.updateChatMessages(this.chat._id, temp).then((result) => {
          this.loading.dismiss();
          this.funcCalled = true;
        }, (err) => {
          this.presentToast(err);
          this.loading.dismiss();
        });
      }, (err) => {
        this.presentToast(err);
        this.loading.dismiss();
      });
    }, (err) => {
      this.presentToast(err);
      this.loading.dismiss();
    });
  }

  // Contact
  sendContact() {
    let mmModal = this.modalCtrl.create(ChatPhoneContactPage, {
      users: this.phoneContacts,
      selectedUser: []
    });
    mmModal.onDidDismiss(selectedUser => {
      this.presentToast("selected " + selectedUser.length + " Contacts");
      this.confirmContactList(selectedUser);
    });
    mmModal.present();
  };

  confirmContactList(contactList) {
    if (contactList && contactList.length > 0) {
      let conModal = this.modalCtrl.create(ChatPhoneListPage, {
        users: contactList,
        add: false,
        message: false,
        call: false,
        remove: true,
        confirm: true
      });
      conModal.onDidDismiss(users => {
        this.sendContactList(users);
      });
      conModal.present();
    }
  }

  sendContactList(contactList) {
    if (contactList && contactList.length > 0) {
      let temp = this.messages.map(x => Object.assign({}, x));
      temp.push({
        from: this.user._id,
        created: new Date(),
        type: 'contact',
        contactList: contactList,
      });
      this.chatService.updateChatMessages(this.chat._id, temp).then((result) => {
        this.message = '';
        this.funcCalled = true;
      }, (err) => {
        this.presentToast(JSON.stringify(err));
      });
    }
  }

  // Sound
  public isRecording: Boolean = false;
  public fileToSave: MediaObject;
  public timer: Number = 0;
  public clocker = {
    hours: '00',
    seconds: '00'
  };
  async sendSound() {
    this.isRecording = false;
    const malert = await this.alertController.create({
      title: 'Record Audio',
      message: `
        <div *ngIf="isRecording">
          <div class="_1uzym">
            <button class="_3zwKD" (click)="sstopRecording()">
              <ion-icon name="mic-off" style="color: grey;"></ion-icon>
            </button>
            <h3 style="display:inline-block;position:absolute;color: red; padding: 10px;">{{clocker.hours}} : {{clocker.seconds}}</h3>
          </div>
        </div>
        <div *ngIf="!isRecording">
          <div class="_1uzym">
            <button class="_3zwKD" (click)="startRecording()">
              <ion-icon name="mic" style="color: grey;"></ion-icon>
            </button>
            <h3 style="color: red; padding: 10px;">{{clocker.hours}} : {{clocker.seconds}}</h3>
          </div>
        </div>
      `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.saveAudio();
          }
        }
      ]
    });
    this.fileToSave = this.media.create(
      this.file.dataDirectory
        ? this.file.dataDirectory.replace(/^file:\/\//, '') + 'my_file.mp3'
        : './my_file.mp3'
    );
    this.file.createFile(
      this.file.dataDirectory ? this.file.dataDirectory : './', 'my_file.mp3', true
    ).then(() => {
      malert.present();
    }, (err) => {
      this.presentToast(JSON.stringify(err));
    });
  }

  inter: any;
  startRecording() {
    this.fileToSave.startRecord();
    this.inter = setInterval(function () {
      if (this.isRecording) {
        this.timer++;
        this.clocker = {
          hours: ((this.timer / 60) > 9) ? (this.timer / 60).toString() : ("0" + this.timer / 60),
          seconds: ((this.timer % 60) > 9) ? (this.timer % 60).toString() : ("0" + this.timer % 60)
        };
      }
    }, 100);
    this.isRecording = true;
  }

  stopRecording() {
    this.fileToSave.stopRecord();
    this.isRecording = false;
    this.timer = 0;
    this.clocker = {
      hours: '00',
      seconds: '00'
    };
    clearInterval(this.inter);
  }

  saveAudio() {
    var fileName = 'chat_' + this.chat._id + '_' + this.messages.length + '.mp3';
    this.base64.encodeFile(
      this.file.dataDirectory ? this.file.dataDirectory.replace(/^file:\/\//, '') : './' + 'my_file.mp3'
    ).then((base64: any) => {
      var x = base64.substr(13, base64.length);
      this.chatService.uploadToS3(x, fileName, 'mp3').then((result: any) => {
        let temp = this.messages.map(x => Object.assign({}, x));
        temp.push({
          from: this.user._id,
          created: new Date(),
          type: 'audio',
          audioPath: result ? (result.Location ? result.Location : fileName) : fileName,
        });
        this.chatService.updateChatMessages(this.chat._id, temp).then((result) => {
          this.fileToSave.release();
          this.funcCalled = true;
        }, (err) => {
          this.presentToast(err);
        });
      }, (err) => {
        this.presentToast(err);
      });
    });
  }

  // Displaying Files
  getFileName(resolvedFilePath) {
    let pathurl = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
    let fileurl = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
    let fileExtension = fileurl.split('.').pop();
    return this.chatService.getFileNameFromString[('.' + fileExtension)];
  }

  openDocument(resolvedFilePath) {
    let pathurl = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
    let fileurl = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
    let fileExtension = fileurl.split('.').pop();
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.presentToast(resolvedFilePath + ' - ' + this.file.externalRootDirectory + ' - ' + fileExtension);

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(status => {
      if (status.hasPermission) {
        fileTransfer.download(resolvedFilePath, (this.file.externalRootDirectory + 'olw.' + fileExtension), true).then((entry) => {
          this.fileOpener.open(entry.toURL(), this.chatService.getMimeTypefromString[('.' + fileExtension)])
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        }, (error) => {
          alert(JSON.stringify(error));
        });
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((permiss) => {
          if (permiss.hasPermission) {
            fileTransfer.download(resolvedFilePath, (this.file.externalRootDirectory + 'olw.' + fileExtension), true).then((entry) => {
              this.fileOpener.open(entry.toURL(), this.chatService.getMimeTypefromString[('.' + fileExtension)])
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error opening file', e));
            }, (error) => {
              alert(JSON.stringify(error));
            });
          }
        }, (error) => {
          alert(JSON.stringify(error));
        });
      }
    }, (err) => {
      this.presentToast(JSON.stringify(err));
    });
  }

  // Displaying Images
  openImage(resolvedFilePath) {
    let mmModal = this.modalCtrl.create(ChatImagePage, {
      filePath: resolvedFilePath,
      chatName: this.chat.tempName
    });
    mmModal.present();
  }

  // Dispaying Audio
  audio: MediaObject;
  position: any = 0;
  interva: any;
  playAudio(message) {
    if (this.audio) {
      this.audio.release();
      message.duration = this.audio.getDuration();
    }
    this.position = 0;
    message.playing = true;
    const resolvedFilePath = message.audioPath;
    let pathurl = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
    let fileurl = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
    let fileExtension = fileurl.split('.').pop();
    this.audio = this.media.create(resolvedFilePath);
    if (this.audio) {
      message.duration = this.audio.getDuration();
      this.audio.play();
    }
    this.interva = setInterval(function () {
      let last_position = this.position;
      this.audio.getCurrentPosition().then(position => {
        if (position >= 0 && position < this.duration) {
          if (Math.abs(last_position - position) >= 1) {
            this.audio.seekTo(last_position * 1000);
          } else {
            this.position = position;
          }
        } else if (position >= this.duration) {
          this.stop();
        }
      });
    }, 100);
  }

  stopAudio(message) {
    message.playing = false;
    if (this.audio) {
      this.audio.pause();
      this.audio.release();
    }
    this.position = 0;
    clearInterval(this.interva);
  }

  calculateTimePlayed(param) {
    if (this.audio) {
      let totalTime = this.audio.getDuration();
      this.audio.getCurrentPosition().then((timePlayed) => {
        if (param == 'percentage') return (timePlayed / totalTime % 100) + '%';
        else if (param == 'average') return (timePlayed / totalTime % 100);
        else return (timePlayed + ' / ' + totalTime);
      });
    }
  }

  // View COntact
  openContact(message) {
    let coModal = this.modalCtrl.create(ChatPhoneListPage, {
      users: message.contactList,
      add: true,
      message: true,
      call: true,
      remove: false,
      confirm: false
    });
    coModal.onDidDismiss(users => {
      console.log(users);
    });
    coModal.present();
  }

  showLoader(content) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

}