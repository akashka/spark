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
  NavParams,
  ViewController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

// Providers
import { Students } from '../../providers/students/students';
import { Chats } from '../../providers/chats/chats';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { EmailComposer } from "ionic-native";

@Component({
  selector: 'chat-phone-contact',
  templateUrl: './chat-phone-contact.html'
})

export class ChatPhoneContactPage {
  users: any;
  allUsers: any;
  selectedUser: any;
  myInput = '';
  loading: any;

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
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public http: Http,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.showLoader('Getting Contacts...');
  }

  ngOnInit(): void {
    this.users = this.params.get('users');
    this.selectedUser = [];
    this.allUsers = this.users;
    this.loading.dismiss();
  }

  showLoader(content) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

  search() {
    this.users = [];
    if (this.myInput === '') {
      this.users = this.allUsers;
    } else {
      var maxLength = this.allUsers.length;
      for (let u = 0; u < maxLength; u++) {
        if (this.allUsers[u].displayName.toLowerCase().includes(this.myInput.toLowerCase())) {
          this.users.push(this.allUsers[u]);
        }
      }
    }
  }

  dismiss() {
    this.selectedUser = [];
    if (this.allUsers) {
      for (var u = 0; u < this.allUsers.length; u++) {
        if (this.allUsers[u].isChecked) {
          this.selectedUser.push(this.allUsers[u]);
        }
      }
    }
    this.viewCtrl.dismiss(this.selectedUser);
  }

};