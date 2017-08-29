import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'search-page',
  templateUrl: './search.html'
})
export class SearchPage {

  public students: any;

  constructor(
    public navCtrl: NavController, 
    public studentService: Students, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public loadingCtrl: LoadingController
  ) { }
 
  ionViewDidLoad() {
    this.studentService.getStudents().then((data) => {
      this.students = data;
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

  }
 
}