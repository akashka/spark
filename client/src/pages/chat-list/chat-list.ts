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
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ChatGroupPage } from '../chat-group/chat-group';
import * as moment from 'moment';

// Providers
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Chats } from '../../providers/chats/chats';
import { Networks } from '../../providers/network/network';

import { ChatCreatePage } from '../chat-create/chat-create';

@Component({
  selector: 'chat-list-page',
  templateUrl: './chat-list.html'
})
export class ChatListPage {
  chats: any;
  allChats: any;
  user: any;
  users: any;
  myInput: string;
  public loader: any;
  isAdmin: Boolean = false;

  constructor(
    public navCtrl: NavController,
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
    public http: Http
  ) {
    this.chats = [];
    this.allChats = [];
    this.authService.searchUser().then((result) => {
      this.users = result;
      this.chatService.getChatList().then((result) => {
        result = _.filter(result, function (o) {
          return (o.active);
        });
        this.storage.get('user').then((user) => {
          this.user = user;
          this.isAdmin = this.user.role === 'admin';
          result = _.filter(result, function (o) {
            return (
              (o.members.indexOf(user._id) > -1) ||
              (o.silent_members.indexOf(user._id) > -1) ||
              (o.admin.indexOf(user._id) > -1)
            )
          });
          this.chats = result;
          this.allChats = result;
        });
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }

  refresher(event) {
    this.chatService.getChatList().then((result) => {
      result = _.filter(result, function (o) {
        return (o.active);
      });
      this.storage.get('user').then((user) => {
        this.user = user;
        this.isAdmin = this.user.role === 'admin';
        result = _.filter(result, function (o) {
          return (
            (o.members.indexOf(user._id) > -1) ||
            (o.silent_members.indexOf(user._id) > -1) ||
            (o.admin.indexOf(user._id) > -1)
          )
        });
        this.chats = result;
        this.allChats = result;
        event.target.complete();
      });
    }, (err) => {
      console.log(err);
    });
  }

  search() {
    var result = [];
    for (var i = 0; i < this.allChats.length; i++) {
      this.allChats[i].tempName = this.getChatName(this.allChats[i].name);
      if (this.allChats[i].tempName.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
        result.push(this.allChats[i]);
      }
    }
    this.chats = result;
    if (this.myInput === "") this.chats = this.allChats;
  };

  displayMessages(group) {
    // group.last_login[this.user._id] = new Date();
    // this.chatService.updateChats(group._id, group).then((result) => {
    // }, (err) => {
    // });
    group.tempName = this.getChatName(group.name);
    this.storage.set("chatGroup", group);
    this.navCtrl.setRoot(ChatGroupPage);
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
      if (uuser.name) return uuser.name;
    }
    if (dp && dp.type === 'direct') {
      return dp.src;
    }
    return 'No Name';
  }

  getLastActive(last_login) {
    return (moment(last_login).fromNow());
  }

  createNew() {
    this.navCtrl.setRoot(ChatCreatePage);
  }

};
