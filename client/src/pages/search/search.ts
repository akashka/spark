import { Component } from "@angular/core";
import { 
    NavController, 
    ModalController, 
    AlertController, 
    LoadingController, 
    App,
    MenuController 
} from 'ionic-angular';

import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ConfirmPage } from '../confirm/confirm';
import { SignupPage } from '../signup/signup';
import { CenterPage } from '../center/center';
import { IndentPage } from '../indent/indent';
import { ReportsPage } from '../reports/reports';

import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'search-page',
  templateUrl: './search.html'
})
export class SearchPage {

  public students: any;
  public isAdmin: Boolean = false;
  public isCenterAdmin: Boolean = false;
  public isCounsellor: Boolean = false;

  constructor(
    public navCtrl: NavController, 
    public studentService: Students, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public app: App
  ) {
      menu.enable(true);
      this.storage.get('user').then((user) => {
              if(user.role === "counsellor")  this.isCounsellor = true;
         else if(user.role === "admin")  this.isAdmin = true;
         else if(user.role === "centerAdmin")  this.isCenterAdmin = true;
         else this.isCounsellor = true;
      }); 
  }
 
  ionViewDidLoad() {
    this.studentService.getStudents().then((data) => {
      data = _.filter(data, function(o) { 
        return (o.status == 'enquiry' && !o.is_Confirmed); 
      });
      this.storage.get('user').then((user) => {
        data = _.filter(data, function(o) { 
          return (o.center == user.center); 
        });
        this.students = (_.sortBy(data, 'enquiry_date')).reverse();
      });
    }, (err) => {
        console.log("not allowed");
    });
  }
 
  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  add() {
  	this.navCtrl.setRoot(HomePage);
  }

  update(student) {
    this.storage.set('confirmed_student', student);
    this.navCtrl.setRoot(ConfirmPage);
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
 
}