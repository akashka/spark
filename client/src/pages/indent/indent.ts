import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Indentation } from '../../providers/indentation/indentation';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ConfirmPage } from '../confirm/confirm';

import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'indent-page',
  templateUrl: './indent.html'
})

export class IndentPage {

  public students: any;
  public indented_students = [];
  public user_center;
  public confirm_indent: boolean = false;

  public total_amount: number = 0;
  public payment_mode;
  public payment_date = moment();
  public bank_name;
  public transaction_no;
  public cheque_no;
  public email;
  public center_code;
  public students_amount = [];

  constructor(
    public navCtrl: NavController, 
    public studentService: Students, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public centerService: Center,
    public indentationService: Indentation
  ) { }
 
  ionViewDidLoad() {
    this.studentService.getStudents().then((data) => {
      this.students = _.filter(data, function(o) { 
        return (o.status == 'confirmed' && !o.is_Indented); 
      });
      this.storage.get('user').then((user) => {
        this.students = _.filter(this.students, function(o) { 
          return (o.center == user.center); 
        });
        this.students = _.sortBy(this.students, 'enquiry_date');
      });
    }, (err) => {
        console.log("not allowed");
    });

    this.centerService.searchCenter().then((centers) => {
        this.storage.get('user').then((user) => {
            this.email = user.email;
            this.center_code = user.center;
            this.user_center = _.find(centers, ['center_code', user.center]);
        });
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
  	this.indented_students.push(student);
    for(var i = 0; i < this.students.length; i++) {
      if(this.students[i] === student) this.students[i].indented = true;
    }
    this.addAmount(student);
  }

  unindent(student) {
    var s = -1; 
    for(var i = 0; i < this.indented_students.length; i++){
      if(this.indented_students[i] === student) {
        s = i;
        break;
      }
    }
    this.indented_students.splice(s,1);
    for(var i = 0; i < this.students.length; i++) {
      if(this.students[i] === student) delete this.students[i].indented;
    }
    this.subtractAmount(student);
  }

  addAmount(student: any) {
      if(student.class_group === 'Play Group'){
          if(student.class_type === "Annual") this.total_amount += Number(this.user_center.playgroup.annual);
          if(student.class_type === "Mid-term") this.total_amount += Number(this.user_center.playgroup.mid_term);
          if(student.class_type === "Early start") this.total_amount += Number(this.user_center.playgroup.early_start);
      } 
      else if(student.class_group === 'Nursery'){
          if(student.class_type === "Annual") this.total_amount += Number(this.user_center.nursery.annual);
          if(student.class_type === "Mid-term") this.total_amount += Number(this.user_center.nursery.mid_term);
          if(student.class_type === "Early start") this.total_amount += Number(this.user_center.nursery.early_start);
      }
      else if(student.class_group === 'LKG'){
          if(student.class_type === "Annual") this.total_amount += Number(this.user_center.lkg.annual);
          if(student.class_type === "Mid-term") this.total_amount += Number(this.user_center.lkg.mid_term);
          if(student.class_type === "Early start") this.total_amount += Number(this.user_center.lkg.early_start);
      }
      else if(student.class_group === 'UKG'){
          if(student.class_type === "Annual") this.total_amount += Number(this.user_center.ukg.annual);
          if(student.class_type === "Mid-term") this.total_amount += Number(this.user_center.ukg.mid_term);
          if(student.class_type === "Early start") this.total_amount += Number(this.user_center.ukg.early_start);
      }
  }

  subtractAmount(student: any) {
      if(student.class_group === 'Play Group'){
          if(student.class_type === "Annual") this.total_amount -= this.user_center.playgroup.annual;
          if(student.class_type === "Mid-term") this.total_amount -= this.user_center.playgroup.mid_term;
          if(student.class_type === "Early start") this.total_amount -= this.user_center.playgroup.early_start;
      } 
      else if(student.class_group === 'Nursery'){
          if(student.class_type === "Annual") this.total_amount -= this.user_center.nursery.annual;
          if(student.class_type === "Mid-term") this.total_amount -= this.user_center.nursery.mid_term;
          if(student.class_type === "Early start") this.total_amount -= this.user_center.nursery.early_start;
      }
      else if(student.class_group === 'LKG'){
          if(student.class_type === "Annual") this.total_amount -= this.user_center.lkg.annual;
          if(student.class_type === "Mid-term") this.total_amount -= this.user_center.lkg.mid_term;
          if(student.class_type === "Early start") this.total_amount -= this.user_center.lkg.early_start;
      }
      else if(student.class_group === 'UKG'){
          if(student.class_type === "Annual") this.total_amount -= this.user_center.ukg.annual;
          if(student.class_type === "Mid-term") this.total_amount -= this.user_center.ukg.mid_term;
          if(student.class_type === "Early start") this.total_amount -= this.user_center.ukg.early_start;
      }
  }

  findAmount(cg, ct) {
      if(cg === 'Play Group' && ct === 'Annual') return(this.user_center.playgroup.annual);
      else if(cg === 'Play Group' && ct === 'Mid-term') return(this.user_center.playgroup.mid_term);
      else if(cg === 'Play Group' && ct === 'Early start') return(this.user_center.playgroup.early_start);
      else if(cg === 'Nursery' && ct === 'Annual') return(this.user_center.nursery.annual);
      else if(cg === 'Nursery' && ct === 'Mid-term') return(this.user_center.nursery.mid_term);
      else if(cg === 'Nursery' && ct === 'Early start') return(this.user_center.nursery.early_start);
      else if(cg === 'LKG' && ct === 'Annual') return(this.user_center.lkg.annual);
      else if(cg === 'LKG' && ct === 'Mid-term') return(this.user_center.lkg.mid_term);
      else if(cg === 'LKG' && ct === 'Early start') return(this.user_center.lkg.early_start);
      else if(cg === 'UKG' && ct === 'Annual') return(this.user_center.ukg.annual);
      else if(cg === 'UKG' && ct === 'Mid-term') return(this.user_center.ukg.mid_term);
      else if(cg === 'UKG' && ct === 'Early start') return(this.user_center.ukg.early_start);
      else return 0;
  }

  indentStudents() {
    this.confirm_indent = !this.confirm_indent;
  }

  setCash() {
    this.payment_mode = "cash";
  }

  setCheque() {
    this.payment_mode = "cheque";
  }

  setOnline() {
    this.payment_mode = "online";
  }

  confirmIndent() {
    let indentation = {
      total_amount: this.total_amount,
      payment_mode: this.payment_mode,
      payment_date: moment(this.payment_date,"YYYY-MM-DD").toDate(),
      bank_name: this.bank_name,
      transaction_no: this.transaction_no,
      cheque_no: this.cheque_no,
      email: this.email,
      center_code: this.center_code,
      students_amount: []
    };

    for(var is = 0; is < this.indented_students.length; is++) {
        var tempis = {
            student_id: this.indented_students[is].student_id,
            student_key: this.indented_students[is]._id,
            student_name: this.indented_students[is].name,
            phone_number: this.indented_students[is].phone_number,
            gender: this.indented_students[is].gender,
            class_group: this.indented_students[is].class_group,
            class_type: this.indented_students[is].class_type,
            uniform_size: this.indented_students[is].uniform_size,
            shoe_size: this.indented_students[is].shoe_size,
            amount: this.findAmount(this.indented_students[is].class_group, this.indented_students[is].class_type)
        };
        indentation.students_amount.push(tempis);
    }

    this.indentationService.createIndentation(indentation).then((result) => {
      console.log(result);
    }, (err) => {
    });

    for(var is = 0; is < this.indented_students.length; is++) {
      this.indented_students[is].status = "indented";
      this.indented_students[is].is_Indented = true;
      delete this.indented_students[is].indented;

      this.studentService.updateStudent(this.indented_students[is]).then((result) => {
        console.log('student data saved successfully');
      }, (err) => {
        console.log('student data saving failed');
      });
    }
  
  }
 
}