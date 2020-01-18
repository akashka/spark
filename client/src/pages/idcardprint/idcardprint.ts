import { Component } from "@angular/core";
import { 
      NavController, 
      ModalController, 
      AlertController, 
      LoadingController,
      ToastController,
      ActionSheetController
} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Indentation } from '../../providers/indentation/indentation';
import { HomePage } from '../home/home';

import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'idcardprint-page',
  templateUrl: './idcardprint.html'
})

export class IdcardprintPage {

  public students: any;
  public studentsList: any;
  public myInput: string;
  public loader: any;
  public centers: any;
  public mySelect: string = '';

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
    public toastCtrl: ToastController,
    public CallNumber: CallNumber,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) { }
 
  ionViewDidLoad() {
    this.fetchData();
  };

  fetchData() {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });
    this.centerService.searchCenter().then((result) => {
  		this.centers = result;
  	}, (err) => {
    	console.log(err);
    });
    this.studentService.getStudents().then((data) => {
      this.students = _.filter(data, function(o) { 
        return (o.is_Indented && o.is_IndentConfirmed && o.idCardRequested && !o.idCardPrinted);
      });
      this.students = _.sortBy(this.students, 'indentation_date');
      this.studentsList = _.sortBy(this.students, 'indentation_date');
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

  callNumber(num) {
      this.CallNumber.callNumber(num, false)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }

  print(student) {
    this.presentAlertConfirm(student);
  }

  async presentAlertConfirm(student) {
    const alert = await this.alertController.create({
      title: 'Please confirm the student details are correct? ',
      message: ('<strong> Name: </strong>  ' + student.name + '<br/> <strong> Parent Name: </strong>  ' + 
        student.parent_name + '<br/> <strong> Phone Number: </strong>  ' + student.phone_number + 
        '<br/> <strong> Class: </strong>  ' + student.class_group),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Correct',
          cssClass: 'primary',
          handler: () => {
            this.loader = this.loading.create({
              content: 'Please wait...',
            });        
            student.idCardRequested = true;
            student.idCardPrinted = true;
            this.studentService.editStudent(student).then((result) => {
              window.open(this.studentService.url+'api/misc/idcard/'+student._id, '_blank');
              this.loader.dismiss();
              this.presentToast('Admit card is downloaded!');
              this.fetchData();
            }, (err) => {
              this.loader.dismiss();
              this.presentToast('Error! Please try again.');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Function to search for a student dynamically based on an input
  search() {
    var result = [];
    for(var i = 0; i < this.studentsList.length; i++) {
      if (this.studentsList[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) { result.push(this.studentsList[i]); } 
      // else if (_.includes(this.studentsList[i].alternate_contact, this.myInput)) { result.push(this.studentsList[i]); } 
      // else if (this.studentsList[i].class_group.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) { result.push(this.studentsList[i]); } 
      // else if (this.studentsList[i].email_id.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) { result.push(this.studentsList[i]); } 
      // else if (this.studentsList[i].locality.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) { result.push(this.studentsList[i]); } 
      else if (this.studentsList[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) { result.push(this.studentsList[i]); } 
      else if (_.includes(this.studentsList[i].phone_number, this.myInput)) { result.push(this.studentsList[i]); } 
    }
    this.students = result;
    if(this.myInput === "") this.students = this.studentsList;
  }

  async presentActionSheet(num, email) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: "Call",
          icon: "call",
          handler: () => {
            this.callNumber(num);
          }
        },
        {
          text: "Whatsapp",
          icon: "logo-whatsapp",
          handler: () => {
            window.open(("https://wa.me/91"+num), "_blank"); 
          }
        },
        {
          text: "SMS",
          icon: "text",
          handler: () => {
            window.open("sms://"+num);
          }
        },
        {
          text: "Email",
          icon: "mail",
          handler: () => {
            window.open("mailto://"+email);
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }

  add() {
  	this.navCtrl.setRoot(HomePage);
  }

  onSelectChange() {
    this.myInput = '';
    if(this.mySelect === '') {      
      this.students = this.studentsList;
    } else {
      this.students = [];
      for(var s=0; s<this.studentsList.length; s++) {
        if(this.studentsList[s].center === this.myInput)
          this.students.push(this.studentsList[s]);
      }
    }
  }
 
}