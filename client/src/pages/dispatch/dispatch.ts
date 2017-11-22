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
  selector: 'dispatch-page',
  templateUrl: './dispatch.html'
})

export class DispatchPage {

  public indentations: any = [];
  public selected_indentation: any;
  public list_of_students: any = [];
  public confirm_dispatch: boolean = false;
  public loader: any;


  constructor(
    public navCtrl: NavController, 
    public studentService: Students, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public loading: LoadingController,
    public storage: Storage,
    public centerService: Center,
    public indentationService: Indentation,
    public toastCtrl: ToastController
  ) { }
 
  ionViewDidLoad() {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });

    this.indentationService.searchIndentation().then((data) => {
      this.indentations = _.filter(data, function(o) { 
        return (o.status != 'closed'); 
      });
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

  selectDispatch(indentation) {
      this.confirm_dispatch = true;
      this.selected_indentation = indentation;
      this.list_of_students = _.filter(this.selected_indentation.students_amount, function(o) { 
        return (!o.is_dispatched); 
      });
  }

  dispatch(student) {
      for(var i = 0; i < this.list_of_students.length; i++) {
          if(this.list_of_students[i].student_id == student.student_id)
            this.list_of_students[i].is_dispatched = true;
      }
      for(var i = 0; i < this.selected_indentation.students_amount.length; i++) {
          if(this.selected_indentation.students_amount[i].student_id == student.student_id)
            this.selected_indentation.students_amount[i].is_dispatched = true;
      }
  }
 
  undispatch(student) {
      for(var i = 0; i < this.list_of_students.length; i++) {
          if(this.list_of_students[i].student_id == student.student_id)
            this.list_of_students[i].is_dispatched = false;
      }
      for(var i = 0; i < this.selected_indentation.students_amount.length; i++) {
          if(this.selected_indentation.students_amount[i].student_id == student.student_id)
            this.selected_indentation.students_amount[i].is_dispatched = false;
      }
  }

  logout() {
  	this.authService.logout();
    this.navCtrl.setRoot(LoginPage);  
  }

  reset() {
    this.navCtrl.setRoot(HomePage);
  }

  confirmIndentStudents() {
    this.loader.present();
    this.indentationService.updateIndentation(this.selected_indentation).then((result) => {
        this.loader.dismiss();
        this.presentToast('Dispatch Data saved successfully');
        this.reset();
    }, (err) => {
        this.loader.dismiss();
        this.presentToast('Error! Please try again.');
    });
  }
 
}