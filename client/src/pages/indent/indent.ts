import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ConfirmPage } from '../confirm/confirm';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'indent-page',
  templateUrl: './indent.html'
})
export class IndentPage {

  public students: any;

  constructor(
    public navCtrl: NavController, 
    public studentService: Students, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) { }
 
  ionViewDidLoad() {
    this.studentService.getStudents().then((data) => {
      _.filter(data, function(o) { 
        return (o.status == 'confirmed' && !o.is_Indented); 
      });
      this.storage.get('user').then((user) => {
        _.filter(data, function(o) { 
          return (o.center == user.center); 
        });
        this.students = _.sortBy(data, 'enquiry_date');
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

  indent(student) {
  	// Function to indent students
  }
 
}