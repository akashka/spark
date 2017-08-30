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
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';

// Providers
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';

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
  selector: 'confirm-page',
  templateUrl: './confirm.html'
})
export class ConfirmPage {

  public loading: any;
  confirmForm: FormGroup;
  public submitAttempt: Boolean = false;
  public lastImage: any;
  public centers: any;
  public userCenter: any;
  public users: any;
  public student: any;

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
    public centerService: Center,
    public storage: Storage
  ) { 
      menu.enable(true);

      this.confirmForm = formBuilder.group({

        class_group: ['', Validators.compose([Validators.required])],
        
        student_id: [''],
      
        class_type: ['', Validators.compose([Validators.required])],

        uniform_size: ['', Validators.compose([Validators.required])],

        shoe_size: ['', Validators.compose([Validators.required])],

        photo: ['']

      });

  }
 
  ionViewDidLoad() {
    this.storage.get('confirmed_student').then((student) => {
      this.student = student;
      this.confirmForm.controls['class_group'].setValue(student.class_group);
      this.confirmForm.controls['student_id'].setValue(student.student_id);
      this.confirmForm.controls['photo'].setValue(student.photo);
    });
  }

  confirmStudent = () => {
    this.submitAttempt = true;

    if(this.confirmForm.valid) {
      this.student.class_group = this.confirmForm.value.class_group;
      this.student.status = "confirmed";
      this.student.is_Confirmed = true;
      if(this.student.photo === null) this.student.photo = this.confirmForm.value.photo;
      this.student.class_type = this.confirmForm.value.class_type;
      this.student.uniform_size = this.confirmForm.value.uniform_size;
      this.student.shoe_size = this.confirmForm.value.shoe_size;

      this.studentService.updateStudent(this.student).then((result) => {
        this.presentToast('student data saved successfully');
      }, (err) => {
        this.presentToast('student data saving failed');
      });
    }
  };

  // Photos
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
      this.confirmForm.photo = base64Image; 
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

  goBack() {
    this.navCtrl.setRoot(SearchPage);
  }

};