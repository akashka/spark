import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
  LoadingController,
  ToastController
} from 'ionic-angular';

import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Indentation } from '../../providers/indentation/indentation';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'approveindent-page',
  templateUrl: './approveindent.html'
})

export class ApproveindentPage {

  public indentations: any = [];
  public allIndentations: any = [];
  public selected_indentation: any;
  public list_of_students: any = [];
  public all_list_of_students: any = [];
  public confirm_dispatch: boolean = false;
  public loader: any;
  public show_button: any = 0;
  public msg: string = "";
  public showModal: boolean = false;
  public this_student: any;
  public myInputIndentation: String = "";
  public myInputStudent: String = "";
  public loading: any;
  public students: any = [];
  public user: any;

  constructor(
    public navCtrl: NavController,
    public studentService: Students,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public centerService: Center,
    public indentationService: Indentation,
    public toastCtrl: ToastController
  ) {
    this.storage.get("user").then(user => {
      this.user = user;
    });
   }

  ionViewDidLoad() {
    this.fetchData();
  }

  fetchData() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });

    this.indentationService.searchIndentation().then((data) => {
      this.indentations = _.filter(data, function (o) {
        return (o.status == 'open' && !o.is_IndentConfirmed);
      });
      this.allIndentations = this.indentations;
    }, (err) => {
      console.log("not allowed");
    });

    this.studentService.getStudents().then((data) => {
      this.students = data;
    }, (err) => {
        console.log("not allowed");
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  confirmIndent(indentation) {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to Confirm this Indentation?',
      message: ('<strong> Indentation No: </strong>  ' + indentation.num + '<br/> <strong> Center: </strong>  ' + 
            indentation.center_code + '<br/> <strong> Amount: </strong>  ' + indentation.total_amount + 
            '<br/> <strong> Date: </strong>  ' + moment(indentation.payment_date).format('DD-MMM-YYYY')),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.confirm(indentation);
          }
        }
      ]
    });
    alert.present();
  }

  confirm(indentation) {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    indentation.is_IndentConfirmed = true;
    this.indentationService.approveIndentation(indentation).then((result) => {
      this.loader.dismiss();
      this.confirmStudents(indentation);
      this.presentToast('Indentation is confirmed successfully to dispatch or print admit card!');
      this.fetchData();
    }, (err) => {
      this.loader.dismiss();
      this.presentToast('Error! Please try again.');
    });
  }

  confirmStudents(indentation) {
    for(var i=0; i<indentation.students_amount.length; i++) {
      var stu = this.students.find((element) => {
        return element.student_id == indentation.students_amount[i].student_id;
      });
      stu.is_IndentConfirmed = true;
      this.studentService.editStudent(stu).then((result) => { }, (err) => { })
    };
  }

  searchIndentation() {
    var result = [];
    for (var i = 0; i < this.allIndentations.length; i++) {
      if (this.allIndentations[i].payment_mode.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else if (this.allIndentations[i].bank_name != undefined && this.allIndentations[i].bank_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else if (this.allIndentations[i].transaction_no != undefined && this.allIndentations[i].transaction_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else if (this.allIndentations[i].email.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else if (this.allIndentations[i].center_code.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else if (this.allIndentations[i].num.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else if (this.allIndentations[i].cheque_no != undefined && this.allIndentations[i].cheque_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else if (this.allIndentations[i].status.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else {
        for (var s = 0; s < this.allIndentations[i].students_amount.length; s++) {
          if (_.includes(this.allIndentations[i].students_amount[s].phone_number, this.myInputIndentation) ||
            this.allIndentations[i].students_amount[s].student_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0 ||
            this.allIndentations[i].students_amount[s].student_id.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
        }
      }
    }
    this.indentations = result;
    if (this.myInputIndentation === "") this.indentations = this.allIndentations;
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      spinner: 'hide',
      content: '<div class="ion-spinner"></div><br><div class="loading">Loading...</div>'
    });
    this.loading.present();
  }

  add() {
  	this.navCtrl.setRoot(HomePage);
  }

}