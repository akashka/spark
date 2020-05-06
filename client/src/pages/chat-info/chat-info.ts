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
  LoadingController,
  NavParams
} from 'ionic-angular';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Http } from '@angular/http';

// Providers
import { Students } from '../../providers/students/students';
import { Chats } from '../../providers/chats/chats';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Networks } from '../../providers/network/network';

import { ChatListPage } from '../chat-list/chat-list';
import { ChatContactPage } from '../chat-create/chat-contact';

@Component({
  selector: 'chat-info',
  templateUrl: './chat-info.html'
})

export class ChatInfoPage {
  isSilentMember: any;
  isAdmin: any;
  chat: any;
  messages: any;
  user: any;
  users: any;

  constructor(
    public navCtrl: NavController,
    public studentService: Students,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public chatService: Chats,
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
    public navParams: NavParams
  ) {
    this.isSilentMember = navParams.get("isSilentMember");
    this.isAdmin = navParams.get("isAdmin");
    this.chat = navParams.get("chat");
    this.messages = navParams.get("messages");
    this.users = navParams.get("users");
    this.user = navParams.get("user");
  }

  getChatImage(dps) {
    const dp = dps[this.user._id];
    if (dp && dp.type === 'profile') {
      const uuser = this.users.find(obj => obj._id === dp.src);
      if (uuser.photo) return uuser.photo;
    }
    if (dp && dp.type === 'direct') {
      if (dp.src != '') return dp.src;
    }
    return 'assets/images/NoImageAvailable.png';
  }

  getChatName(dps) {
    const dp = dps[this.user._id];
    if (dp && dp.type === 'profile') {
      const uuser = this.users.find(obj => obj._id === dp.src);
      if (uuser.name) return uuser.name.toUpperCase();
    }
    if (dp && dp.type === 'direct') {
      return dp.src.toUpperCase();
    }
    return 'NO NAME';
  }

  getUserName(user) {
    for(var i=0; i<this.users.length; i++) {
      if(this.users[i]._id === user) {
        return this.users[i].name;
      }
    }
    return '';
  }

  getUserRole(user) {
    for(var i=0; i<this.users.length; i++) {
      if(this.users[i]._id === user) {
        return this.users[i].role;
      }
    }
    return '';
  }

  getTotalMembers() {
    return (this.chat.members.length + this.chat.silent_members.length + this.chat.admin.length);
  }

  close() {
    this.navCtrl.pop();
  }


};