import { Component, ViewChild } from "@angular/core";
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
import * as moment from 'moment';
import { Http, Headers } from '@angular/http';

// Providers
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Networks } from '../../providers/network/network';

// Pages
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { CenterPage } from '../center/center';
import { IndentPage } from '../indent/indent';
import { ReportsPage } from '../reports/reports';
import { DispatchPage } from '../dispatch/dispatch';
import { ConfirmPage } from '../confirm/confirm';
import { EnquiryPage } from '../enquiry/enquiry';

import { HomeTab } from '../home-tab/home-tab';
import { NotificationTab } from '../notification-tab/notification-tab';
import { ProfileTab } from '../profile-tab/profile-tab';

@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})
export class HomePage {
  public isAdmin: Boolean = false;
  public isDispatcher: Boolean = false;
  public isCenterAdmin: Boolean = false;
  public isCounsellor: Boolean = false;
  public isTeacher: Boolean = false;
  public isParent: Boolean = false;

  public loader: any;

  constructor(
    public navCtrl: NavController,
    public studentService: Students,
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
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
    }

    this.storage.get('user').then((user) => {
      if (user.role === "counsellor") this.isCounsellor = true;
      else if (user.role === "admin") this.isAdmin = true;
      else if (user.role === "dispatcher") this.isDispatcher = true;
      else if (user.role === "centerAdmin") this.isCenterAdmin = true;
      else if (user.role === "teacher") this.isTeacher = true;
      else if (user.role === "parent") this.isParent = true;
      else this.isParent = true;
    });
  }

  ionViewDidLoad() {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });

  }

  search = () => {
    this.navCtrl.setRoot(SearchPage);
  };

  logOut = () => {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  openSignupPage() {
    this.navCtrl.setRoot(SignupPage);
  }

  openCenterPage() {
    this.navCtrl.setRoot(CenterPage);
  }

  openReportsPage() {
    this.navCtrl.setRoot(ReportsPage);
  }

  openIndentPage() {
    this.navCtrl.setRoot(IndentPage);
  }

  openDispatcherPage() {
    this.navCtrl.setRoot(DispatchPage);
  }

  openEnquiryPage() {
    this.navCtrl.setRoot(EnquiryPage);
  }

  home : any = HomeTab;
  notification : any = NotificationTab;
  profile : any = ProfileTab;

};
