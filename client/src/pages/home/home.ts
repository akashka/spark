import { Component } from "@angular/core";
import { 
    NavController, 
    ModalController, 
    AlertController, 
    LoadingController,
    ActionSheetController, 
    ToastController, 
    Platform,
    App,
    MenuController
  } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

// Providers
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';

// Pages
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { CenterPage } from '../center/center';
import { ReportsPage } from '../reports/reports';

// Files Images
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})
export class HomePage {

  public loading: any;
  studentForm: FormGroup;
  public submitAttempt: Boolean = false;
  public lastImage: any;

  constructor(
    public navCtrl: NavController, 
    public studentService: Students, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public menu: MenuController,
  ) { 
      menu.enable(true);

      this.studentForm = formBuilder.group({

        name: ['', Validators.compose([Validators.required])],
        
        email_id: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
        
        phone_number: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        
        gender: ['', Validators.compose([Validators.required])],
        
        dob: ['', Validators.compose([Validators.required])],

        parent_name: ['', Validators.compose([Validators.required])],

        alternate_contact: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])],

        locality: ['', Validators.compose([Validators.required])],
        
        center: [''],
        counsellor: [''],
        today_age: [],
        month_date: [],
        month_age: [],
        class_group: [],
        photo: []
      });
  }
 
  ionViewDidLoad() { }
 
  addStudent = () => {
    this.showLoader;
    this.submitAttempt = true;

    if(this.studentForm.valid) {
      this.studentService.createStudent(this.studentForm).then((result) => {
        this.hideLoader();
        this.presentToast('student data saved successfully');
      }, (err) => {
        this.hideLoader;
        this.presentToast('student data saving failed');
      });
    }
  };

  showLoader = () => {
    this.loading = this.loadingCtrl.create({
      content: 'Saving...'
    });
    this.loading.present();
  };

  hideLoader = () => {
    this.loading.dismiss();
  };

  search = () => {
    this.navCtrl.setRoot(SearchPage);
  };

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  onDobChange = (dob) => {
    var now = new Date();
    this.studentForm.value.today_age = this.getAge(dob, now);
    now.setDate(1);
    now.setMonth(5);
    this.studentForm.value.month_age = this.getAge(dob, now);
    this.studentForm.value.month_date = now;
  }

  public getAge = (birthday, tillday) => {
    var today = new Date(
                  tillday.substring(6,10),
                  tillday.substring(0,2)-1,                   
                  tillday.substring(3,5)
                );

    var yearNow = today.getFullYear();
    var monthNow = today.getMonth();
    var dateNow = today.getDate();

    var dob = new Date(
                birthday.substring(6,10),
                birthday.substring(0,2)-1,                   
                birthday.substring(3,5)                  
              );

    var yearDob = dob.getFullYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";

    var yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
      var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      var monthAge = 12 + monthNow -monthDob;
    }

    if (dateNow >= dateDob)
      var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      var dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
          };

    return age;
  }

  calculateClass(birthday) {
    var age = (birthday.years*100)+birthday.months;
    if(age >= 106 && age < 206) return "Play Group"
    else if(age >= 206 && age < 306) return "Nursery"
    else if(age >= 306 && age < 406) return "LKG"
    else if(age >= 406 && age < 506) return "UKG"
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
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
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  takePhoto = () => {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public uploadImage() {
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
    var path = targetPath + filename;

    this.getFileContentAsBase64(path,function(base64Image){
      this.studentForm.photo = base64Image; 
    });
  }

  getFileContentAsBase64(path,callback){
//    window.resolveLocalFileSystemURL(path, gotFile, fail);
//            
//    function fail(e) {
//          alert('Cannot found requested file');
//    }

//    function gotFile(fileEntry) {
//           fileEntry.file(function(file) {
//              var reader = new FileReader();
//              reader.onloadend = function(e) {
//                   var content = this.result;
//                   callback(content);
//              };
//   // The most important point, use the readAsDatURL Method from the file plugin
//              reader.readAsDataURL(file);
//           });
//    }
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
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

};