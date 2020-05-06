import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
  ActionSheetController,
  ToastController,
  Platform,
  App,
  MenuController,
  LoadingController
} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Http } from '@angular/http';
import { v4 as uuid } from 'uuid';
import { ChatContactPage } from './chat-contact';
import { Camera, CameraOptions } from '@ionic-native/camera';

// Providers
import { Students } from '../../providers/students/students';
import { Chats } from '../../providers/chats/chats';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Networks } from '../../providers/network/network';

import { ChatListPage } from '../chat-list/chat-list';

@Component({
  selector: 'chat-create',
  templateUrl: './chat-create.html'
})

export class ChatCreatePage {
  chatForm: FormGroup;
  public submitAttempt: Boolean = false;
  public loader: any;
  user: any;
  users: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public studentService: Students,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public chatService: Chats,
    public formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public menu: MenuController,
    public centerService: Center,
    public networkService: Networks,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public http: Http,
    public camera: Camera
  ) {

    this.chatForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      active: true,
      dp: '',
      members: [[]],
      silent_members: [[]],
      admin: [[]],
    });

    this.storage.get('user').then((user) => {
      this.user = user;
    });

    this.authService.searchUser().then((result) => {
      this.users = result;
    }, (err) => {
      console.log(err);
    });
  }

  resetStudent() {
    this.chatForm.controls['name'].setValue('');
    this.chatForm.controls['active'].setValue(true);
    this.chatForm.controls['dp'].setValue('');
    this.chatForm.controls['members'].setValue([]);
    this.chatForm.controls['silent_members'].setValue([]);
    this.chatForm.controls['admin'].setValue([]);
  }

  makeChatForm(val) {
    const chatFormData = {
      group_id: uuid(),
      dp: {},
      name: {},
      members: val.members,
      silent_members: val.silent_members,
      admin: [this.user._id],
      last_login: {},
      active: val.active,
      messages: []
    };
    for (var m = 0; m < val.members.length; m++) {
      var mem = val.members[m];
      chatFormData.dp[mem] = {
        type: 'direct',
        src: val.dp
      };
      chatFormData.name[mem] = {
        type: 'direct',
        src: val.name
      };
    }
    for (var m = 0; m < val.silent_members.length; m++) {
      var mem = val.silent_members[m];
      chatFormData.dp[mem] = {
        type: 'direct',
        src: val.dp
      };
      chatFormData.name[mem] = {
        type: 'direct',
        src: val.name
      };
    }
    chatFormData.dp[this.user._id] = {
      type: 'direct',
      src: val.dp
    };
    chatFormData.name[this.user._id] = {
      type: 'direct',
      src: val.name
    };
    return chatFormData;
  }

  addChat = () => {
    this.submitAttempt = true;
    if (this.chatForm.valid && this.chatForm.value.members.length > 0) {
      const chatFormData = this.makeChatForm(this.chatForm.value);
      this.chatService.createChat(chatFormData).then((result) => {
        this.presentToast('Chat created successfully');
        this.search();
      }, (err) => {
        this.presentToast('Failed! Please try again.');
      });
    }
  };

  search = () => {
    this.navCtrl.setRoot(ChatListPage);
  };

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  displayContactModal() {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === this.user._id) {
        this.users.splice(i, 1);
      }
    }
    let mModal = this.modalCtrl.create(ChatContactPage, {
      users: this.users,
      selectedUser: [...this.chatForm.value.members, ...this.chatForm.value.silent_members, ...this.chatForm.value.admin]
    });
    mModal.onDidDismiss(selectedUser => {
      for (var s = 0; s < selectedUser.length; s++) {
        if (
          !this.chatForm.value.members.includes(selectedUser[s]) &&
          !this.chatForm.value.silent_members.includes(selectedUser[s]) &&
          !this.chatForm.value.admin.includes(selectedUser[s])
        ) {
          var mem = this.chatForm.value.members;
          mem.push(selectedUser[s]);
          this.chatForm.controls['members'].setValue(mem);
        }
      }
    });
    mModal.present();
  }

  getUserName(user) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === user) {
        return this.users[i].name;
      }
    }
    return '';
  }

  changeActiveToDeactive(user) {
    var mem = this.chatForm.value.silent_members;
    mem.push(user);
    this.chatForm.controls['silent_members'].setValue(mem);
    var memb = this.chatForm.value.members;
    for (var m = 0; m < memb.length; m++) {
      if (memb[m] === user) memb.splice(m, 1);
    }
    this.chatForm.controls['members'].setValue(memb);
  }

  changeDeactiveToActive(user) {
    var mem = this.chatForm.value.members;
    mem.push(user);
    this.chatForm.controls['members'].setValue(mem);
    var memb = this.chatForm.value.silent_members;
    for (var m = 0; m < memb.length; m++) {
      if (memb[m] === user) memb.splice(m, 1);
    }
    this.chatForm.controls['silent_members'].setValue(memb);
  }

  editActive(user) {
    var memb = this.chatForm.value.members;
    for (var m = 0; m < memb.length; m++) {
      if (memb[m] === user) memb.splice(m, 1);
    }
    this.chatForm.controls['members'].setValue(memb);
  }

  editSilent(user) {
    var memb = this.chatForm.value.silent_members;
    for (var m = 0; m < memb.length; m++) {
      if (memb[m] === user) memb.splice(m, 1);
    }
    this.chatForm.controls['silent_members'].setValue(memb);
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.showLoader('LOADING IMAGE...');
      var fileName = 'chat_dp_' + new Date() + '_' + imageData.substr(imageData.length - 3) + '.jpeg';
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.chatService.uploadToS3(base64Image, fileName, 'jpeg').then((result: any) => {
        this.chatForm.controls['dp'].setValue(result.Location);
        this.loading.dismiss();
      }, (err) => { 
        this.presentToast(JSON.stringify(err));
        this.loading.dismiss();
      });
    }, (err) => {
      console.log(err);
    });
  }

  async getPicture() {
    const actionSheet = await this.actionSheetCtrl.create({
      title: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  showLoader(content) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

};