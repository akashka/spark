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
  public allIndentations: any = [];
  public selected_indentation: any;
  public list_of_students: any = [];
  public all_list_of_students: any = [];
  public confirm_dispatch: boolean = false;
  public loader: any;
  public show_button: any = 0;
  public msg: string = "";
  public showModal: boolean = false;
  public this_student : any;
  public myInputIndentation: String = "";
  public myInputStudent: String = "";
  public loading: any;

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
  ) { }
 
  ionViewDidLoad() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });

    this.indentationService.searchIndentation().then((data) => {
      this.indentations = _.filter(data, function(o) { 
        return (o.status != 'closed');
      });
      this.allIndentations = this.indentations;
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
      this.all_list_of_students = this.list_of_students;
  }

  dispatch(student) {
      this.show_button++;
      for(var i = 0; i < this.list_of_students.length; i++) {
          if(this.list_of_students[i].student_id == student.student_id) {
            this.list_of_students[i].is_dispatched = true;
            this.list_of_students[i].is_partial = false;
          }
      }
      for(var i = 0; i < this.selected_indentation.students_amount.length; i++) {
          if(this.selected_indentation.students_amount[i].student_id == student.student_id) {
            this.selected_indentation.students_amount[i].is_dispatched = true;
            this.selected_indentation.students_amount[i].is_partial = false;
          }
      }
  }

  partialDispatch(student){
      this.show_button++;
      for(var i = 0; i < this.list_of_students.length; i++) {
          if(this.list_of_students[i].student_id == student.student_id) {
            this.list_of_students[i].is_dispatched = true;
            this.list_of_students[i].is_partial = true;
          }
      }
      for(var i = 0; i < this.selected_indentation.students_amount.length; i++) {
          if(this.selected_indentation.students_amount[i].student_id == student.student_id) {
            this.selected_indentation.students_amount[i].is_dispatched = true;
            this.selected_indentation.students_amount[i].is_partial = true;
          }
      }
  }

  undispatch(student) {
      this.show_button--;
      for(var i = 0; i < this.list_of_students.length; i++) {
          if(this.list_of_students[i].student_id == student.student_id){
            this.list_of_students[i].is_dispatched = false;
            this.list_of_students[i].is_partial = true;
            if(this.list_of_students[i].remarks != undefined && this.list_of_students[i].remarks.length > 0)
                this.list_of_students[i].remarks.pop();
                this.list_of_students[i].is_partial = false;   
          }
      }
      for(var i = 0; i < this.selected_indentation.students_amount.length; i++) {
          if(this.selected_indentation.students_amount[i].student_id == student.student_id){
            this.selected_indentation.students_amount[i].is_dispatched = false;
            this.selected_indentation.students_amount[i].is_partial = true;
            if(this.selected_indentation.students_amount[i].remarks != undefined && this.selected_indentation.students_amount[i].remarks.length > 0)
                this.selected_indentation.students_amount[i].remarks.pop();
                this.selected_indentation.students_amount[i].is_partial = false;   
          }
      }
  }

  logout() {
  	this.authService.logout();
    this.navCtrl.setRoot(LoginPage);  
  }

  reset() {
    this.navCtrl.push(HomePage);
  }

  confirmIndentStudents() {
    this.loader.present();
    for(var i = 0; i < this.selected_indentation.students_amount.length; i++) {
        if(this.selected_indentation.students_amount[i].is_partial == true)
          this.selected_indentation.students_amount[i].is_dispatched = false;
    }
    this.indentationService.updateIndentation(this.selected_indentation).then((result) => {
        this.loader.dismiss();
        this.presentToast('Dispatch Data saved successfully');
        this.reset();
    }, (err) => {
        this.loader.dismiss();
        this.presentToast('Error! Please try again.');
    });
  }

  findClass(ind) {
    var is_partial = false;
    for(var i = 0; i < ind.students_amount.length; i++) {
      if(ind.students_amount[i].is_partial) is_partial = true;
    }
    if(is_partial) return "partial-dispatch";
    return "complete-dispatch";
  }

  partial(student) {
    this.this_student = student;
    let alert = this.alertCtrl.create({
      title: 'Remarks',
      inputs: [
        {
          name: 'msg',
          placeholder: 'Remarks'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
              this.this_student = null;
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(this.this_student.remarks != undefined && this.this_student.remarks.length > 0)
                this.this_student.remarks.push(data.msg);
            else
                this.this_student.remarks = [data.msg];
                this.partialDispatch(this.this_student);
          }
        }
      ]
    });
    alert.present();
  }

  searchIndentation() {
    var result = [];
    for(var i = 0; i < this.allIndentations.length; i++) {
      if (this.allIndentations[i].payment_mode.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); } 
      else if (this.allIndentations[i].bank_name != undefined && this.allIndentations[i].bank_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); } 
      else if (this.allIndentations[i].transaction_no != undefined && this.allIndentations[i].transaction_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); } 
      else if (this.allIndentations[i].email.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); } 
      else if (this.allIndentations[i].center_code.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); } 
      else if (this.allIndentations[i].num.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); } 
      else if (this.allIndentations[i].cheque_no != undefined && this.allIndentations[i].cheque_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); } 
      else if (this.allIndentations[i].status.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) { result.push(this.allIndentations[i]); }
      else {
        for(var s=0; s<this.allIndentations[i].students_amount.length; s++) {
          if (_.includes(this.allIndentations[i].students_amount[s].phone_number, this.myInputIndentation) ||
              this.allIndentations[i].students_amount[s].student_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0 ||
              this.allIndentations[i].students_amount[s].student_id.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) 
                    { result.push(this.allIndentations[i]); }
        }
      } 
    }
    this.indentations = result;
    if(this.myInputIndentation === "") this.indentations = this.allIndentations;
  }

  searchStudent() {
    var result = [];
    for(var i = 0; i < this.all_list_of_students.length; i++) {
      // if (this.all_list_of_students[i].class_type.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) { result.push(this.all_list_of_students[i]); } 
      // else if (this.all_list_of_students[i].class_group.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) { result.push(this.all_list_of_students[i]); } 
      // else if (this.all_list_of_students[i].gender.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) { result.push(this.all_list_of_students[i]); } 
      if (this.all_list_of_students[i].student_name.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) == 0) { result.push(this.all_list_of_students[i]); } 
      else if (_.includes(this.all_list_of_students[i].phone_number, this.myInputStudent)) { result.push(this.all_list_of_students[i]); } 
      else if (this.all_list_of_students[i].student_id.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) { result.push(this.all_list_of_students[i]); } 
    }
    this.list_of_students = result;
    if(this.myInputStudent === "") this.list_of_students = this.all_list_of_students;
  }

  showLoader() {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            spinner: 'hide',
            content: '<div class="ion-spinner"></div><br><div class="loading">Loading...</div>'
        });
        this.loading.present();
  }
 
}