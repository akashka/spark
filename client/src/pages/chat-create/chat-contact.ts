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
import { Networks } from '../../providers/network/network';

@Component({
  selector: 'chat-contact',
  templateUrl: './chat-contact.html'
})

export class ChatContactPage {
  users: any;
  allUsers: any;
  selectedUser: any;
  myInput = '';
  mySelect = '';
  roles = [{
    key: '',
    value: 'All'
  }, {
    key: 'admin',
    value: 'Admin'
  }, {
    key: 'centeradmin',
    value: 'Center Admin'
  }, {
    key: 'counsellor',
    value: 'Counsellor'
  }, {
    key: 'dispatcher',
    value: 'Dispatcher'
  }, {
    key: 'teacher',
    value: 'Teacher'
  }, {
    key: 'parent',
    value: 'Parent'
  }];

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
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.users = params.get('users');
    this.selectedUser = params.get('selectedUser');
    for(let u=0; u<this.users.length; u++) {
      this.users[u].isChecked = this.selectedUser.includes(this.users[u]._id) ?  true: false;
    }
    this.allUsers = this.users;
  }

  search() {
    this.users = [];
    if(this.myInput === '') {
      this.users = this.allUsers;
    } else {
      for(let u=0; u<this.allUsers.length; u++) {
        if (this.allUsers[u].name.toLowerCase().includes(this.myInput.toLowerCase())) {
          this.users.push(this.allUsers[u]);
        }
      }  
    }
  }

  onSelectChange() {
    this.users = [];
    if(this.mySelect === '') {
      this.users = this.allUsers;
    } else {
      for(let u=0; u<this.allUsers.length; u++) {
        if (this.allUsers[u].role.toLowerCase() === this.mySelect.toLowerCase()) {
          this.users.push(this.allUsers[u]);
        }
      }
    }
  }

  dismiss() {
    this.selectedUser = [];
    for (var u=0; u<this.allUsers.length; u++) {
      if (this.allUsers[u].isChecked) {
        this.selectedUser.push(this.allUsers[u]._id);
      }
    }
    this.viewCtrl.dismiss(this.selectedUser);
  }

};