import { Component } from '@angular/core';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
 import { 
      IonicPage, 
      NavController, 
      NavParams, 
      LoadingController,
      App,
      MenuController
  } from 'ionic-angular';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';

//Pages
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ReportsPage } from '../reports/reports';
import { SearchPage } from '../search/search';
import { CenterPage } from '../center/center';

@Component({
  selector: 'signup',
  templateUrl: './signup.html'
})
export class SignupPage {
 
  role: string;
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  center: string;
  active: Boolean = true;
  isPasswordMatching: Boolean = true;
  isExisting: Boolean = false;
  loading;
  centers;
  users;
  _id;
  myInput;
  mySelect;
  btnText: String = "Save";

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public centerService: Center, 
        public authService: Auth, 
        public loadingCtrl: LoadingController,
        public app: App,
        public menu: MenuController,
        public storage: Storage
  ) {
      menu.enable(true);
  }

  ionViewDidLoad() {
    this.getCenters();
    this.getUsers();
  }

  // Function to get list of all the centers
  getCenters() {
    this.centers = [];
    this.centerService.searchCenter().then((result) => {
      this.centers = result;
      this.storage.get('user').then((user) => {
          if(user.role != "admin") {
              this.centers = _.find(this.centers, ['center_code', user.center]);
              this.center = this.centers;
          }
      });
    }, (err) => {
      console.log(err);
    });
  }

  // Function to get list of all the Users
  getUsers() {
    this.users = [];
    this.authService.searchUser().then((result) => {
      this.users = result;
      for(var i = 0; i < this.users.length; i++){
        this.users[i].password = "";
      }
    }, (err) => {
      console.log(err);
    });
  }
 
  save() {
    if(!this.isExisting && this.isPasswordMatching) {
      let details = {
        email: this.email,
        password: this.password,
        role: this.role,
        name: this.name,
        center: this.center,
        active: this.active
      };
      this.authService.createAccount(details).then((result) => {
        console.log(result);
      }, (err) => {
      });
    }
  }

  update() {
    let details = {
      email: this.email,
      password: this.password,
      role: this.role,
      name: this.name,
      center: this.center,
      active: this.active
    };
    this.authService.updateAccount(details).then((result) => {
    }, (err) => { });
  }

  // Function to search for a User dynamically based on an input
  search() {
    var result = [];
    
    for(var i = 0; i < this.users.length; i++) {
      if (_.includes(this.users[i].name, this.myInput)) { result.push(this.users[i]); } 
      else if (_.includes(this.users[i].email, this.myInput)) { result.push(this.users[i]); } 
    }

    if(result && result.length === 1) {
      this.role = result[0].role;
      this.email = result[0].email;
      this.password = result[0].password;
      this.confirm_password = result[0].password;
      this.name = result[0].name;
      this.center = result[0].center;
      this.active = result[0].active;
      this._id = result[0]._id;
      this.btnText = "Update";
    }
    else {
      this.role = "";
      this.email = "";
      this.password = "";
      this.confirm_password = "";
      this.name = "";
      this.center = "";
      this.active = true;
    }
  }

  // Function to search for a User dynamically based on select
  onSelectChange() {
    var result = [];
    
    for(var i = 0; i < this.users.length; i++) {
      if (_.includes(this.users[i].name, this.mySelect)) { result.push(this.users[i]); } 
    }

    if(result && result.length === 1) {
      this.role = result[0].role;
      this.email = result[0].email;
      this.password = result[0].password;
      this.confirm_password = result[0].password;
      this.name = result[0].name;
      this.center = result[0].center;
      this.active = result[0].active;
      this._id = result[0]._id;
      this.btnText = "Update";
    }
    else {
      this.role = "";
      this.email = "";
      this.password = "";
      this.confirm_password = "";
      this.name = "";
      this.center = "";
      this.active = true;
    }
  }

  // Function to check if user exists with same email ID
  checkEmail() {
    this.isExisting = false;
    var result = _.find(this.users, ['email', this.email])
    this.isExisting = (result != null && result != undefined) ? true : false;
  }

  // Function to check if password and confirm password match
  checkPassword() {
    this.isPasswordMatching = false;
    if((this.password == undefined || this.password == null) 
      && (this.confirm_password == undefined || this.confirm_password == null)) {
              this.isPasswordMatching = false;
    } else {
        this.isPasswordMatching = (this.password == this.confirm_password) ? true : false;
    }
  }

  // Function to open Pages
  openSignupPage() {
    this.navCtrl.setRoot(SignupPage);
  }

  openCenterPage() {
    this.navCtrl.setRoot(CenterPage);
  }

  openReportsPage() {
    this.navCtrl.setRoot(ReportsPage);
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
 
}