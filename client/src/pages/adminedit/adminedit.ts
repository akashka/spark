import { Component, ViewChild } from "@angular/core";
import { 
    NavController, 
    ModalController, 
    AlertController, 
    LoadingController, 
    App,
    Platform,
    MenuController,
    ToastController,
    ActionSheetController
} from 'ionic-angular';
import { Students } from '../../providers/students/students';
import { Center } from '../../providers/center/center';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { ConfirmPage } from '../confirm/confirm';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

// Files Images
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

interface Window {
    resolveLocalFileSystemURL: any;
}
declare var windows: Window;

@Component({
  selector: 'adminedit-page',
  templateUrl: './adminedit.html'
})

export class AdmineditPage {
  @ViewChild('fileInput') fileInput;

  public students: any;
  public studentsList: any;
  public isAdmin: Boolean = false;
  public isCenterAdmin: Boolean = false;
  public isCounsellor: Boolean = false;
  myInput: string;
  public loader: any;
  public showListing: Boolean = true;
  public selectedCenter: Boolean = false;
  studentForm: FormGroup;
  public student: any;
  public centers: any;
  public inCenter: any;
  public lastImage: any;

  constructor(
    public navCtrl: NavController, 
    public studentService: Students, 
    public centerService: Center, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public menu: MenuController,
    public loading: LoadingController,
    public storage: Storage,
    public app: App,
    public CallNumber: CallNumber,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
  ) {
      this.storage.get('user').then((user) => {
              if(user.role === "counsellor")  this.isCounsellor = true;
         else if(user.role === "admin")  this.isAdmin = true;
         else if(user.role === "centerAdmin")  this.isCenterAdmin = true;
         else this.isCounsellor = true;
      }); 

      this.studentForm = formBuilder.group({

        name: ['', Validators.compose([Validators.required])],
        
        email_id: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
        
        phone_number: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        
        gender: ['', Validators.compose([Validators.required])],
        
        dob: ['', Validators.compose([Validators.required])],

        parent_name: ['', Validators.compose([Validators.required])],

        alternate_contact: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])],

        locality: ['', Validators.compose([Validators.required])],

        study_year: ['', Validators.compose([Validators.required])],

        class_group: ['', Validators.compose([Validators.required])],

        class_type: ['', Validators.compose([Validators.required])],
        
        uniform_size: ['', Validators.compose([Validators.required])],
        
        shoe_size: ['', Validators.compose([Validators.required])],

        photo: ['']

      });
  }
 
  ionViewDidLoad() {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });

    this.centerService.searchCenter().then((data) => {
      this.centers = data;
    }, (err) => {
        console.log("not allowed");
    });

    this.studentService.getStudents().then((data) => {
      this.studentsList = data;
      this.students = data;
    }, (err) => {
        console.log("not allowed");
    });
  }

  // Function to search for a student dynamically based on an input
  search() {
    this.selectCenter(this.inCenter);
    var result = [];
    for(var i = 0; i < this.students.length; i++) {
      if (this.students[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) { result.push(this.students[i]); } 
      // else if (_.includes(this.students[i].alternate_contact, this.myInput)) { result.push(this.students[i]); } 
      // else if (this.students[i].class_group.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) { result.push(this.students[i]); } 
      // else if (this.students[i].email_id.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) { result.push(this.students[i]); } 
      // else if (this.students[i].locality.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) { result.push(this.students[i]); } 
      else if (this.students[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) { result.push(this.students[i]); } 
      else if (_.includes(this.students[i].phone_number, this.myInput)) { result.push(this.students[i]); } 
    }
    if(this.myInput != "") this.students = result;
  }
 
  add() {
  	this.navCtrl.setRoot(HomePage);
  }

  callNumber(num) {
      this.CallNumber.callNumber(num, false)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }

  update(student) {
    this.storage.set('confirmed_student', student);
    this.navCtrl.setRoot(ConfirmPage);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  delete(student) {
      let alert = this.alertCtrl.create({
        title: 'Confirm delete',
        message: 'Do you want to delete this student data?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
                student.is_Active = false;
                student.admin_edit = true;
                this.studentService.updateStudent(student).then((result) => {
                  this.presentToast('student deleted successfully');
                  this.goBack();
                }, (err) => {
                  this.loader.dismiss();
                  this.presentToast('Error! Please try again.');
                });
            }
          }
        ]
      });
      alert.present();
  }

  goBack() {
      this.selectedCenter = true;
      this.showListing = true;
      this.myInput = "";      
  }

  edit(student) {
      this.showListing = false;
      this.student = student;
      this.studentForm.controls['name'].setValue(student.name);
      this.studentForm.controls['email_id'].setValue(student.email_id);
      this.studentForm.controls['phone_number'].setValue(student.phone_number);
      this.studentForm.controls['gender'].setValue(student.gender);
      this.studentForm.controls['dob'].setValue(student.dob);
      this.studentForm.controls['parent_name'].setValue(student.parent_name);
      this.studentForm.controls['alternate_contact'].setValue(student.alternate_contact);
      this.studentForm.controls['locality'].setValue(student.locality);
      this.studentForm.controls['study_year'].setValue(student.study_year);
      this.studentForm.controls['class_group'].setValue(student.class_group);
      this.studentForm.controls['uniform_size'].setValue(student.uniform_size);
      this.studentForm.controls['class_type'].setValue(student.class_type);
      this.studentForm.controls['shoe_size'].setValue(student.shoe_size);
      this.studentForm.controls['photo'].setValue(student.photo);
  }

  toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }

  onNameChange = () => {
    this.studentForm.value.name = this.toTitleCase(this.studentForm.value.name);
    this.studentForm.value.name = this.studentForm.value.name.replace(/\./g,' ');
    this.studentForm.controls['name'].setValue(this.studentForm.value.name);
  }

  onEmailChange = () => {
    this.studentForm.value.email_id = this.studentForm.value.email_id.toLowerCase();
    this.studentForm.value.email_id = this.studentForm.value.email_id.replace(/\s/g,'');
    this.studentForm.controls['email_id'].setValue(this.studentForm.value.email_id);
  }

  confirmStudent = () => {
    if(this.studentForm.valid) {
      this.loader.present();
      this.student.name = this.studentForm.value.name;
      this.student.email_id = this.studentForm.value.email_id;
      this.student.phone_number = this.studentForm.value.phone_number;
      this.student.gender = this.studentForm.value.gender;
      this.student.dob = moment(this.studentForm.value.dob,"YYYY-MM-DD").toDate();
      this.student.parent_name = this.studentForm.value.parent_name;
      this.student.alternate_contact = this.studentForm.value.alternate_contact;
      this.student.locality = this.studentForm.value.locality;
      this.student.study_year = this.studentForm.value.study_year;
      this.student.class_group = this.studentForm.value.class_group;
      this.student.uniform_size = this.studentForm.value.uniform_size;
      this.student.class_type = this.studentForm.value.class_type;
      this.student.shoe_size = this.studentForm.value.shoe_size;
      this.student.photo = this.studentForm.value.photo;
      this.student.admin_edit = true;

      this.studentService.updateStudent(this.student).then((result) => {
        this.loader.dismiss();
        this.presentToast('student data saved successfully');
        this.goBack();
      }, (err) => {
        this.loader.dismiss();
        this.presentToast('Error! Please try again.');
      });
    }
  };

  selectCenter(center) {
      this.inCenter = center;
      this.selectedCenter = true;
      this.students = _.filter(this.studentsList, function(o) { 
                          return (o.center == center.center_code); 
      }); 
  }

  reselectCenter() {
      this.selectedCenter = false;    
      this.myInput = "";
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
    windows.resolveLocalFileSystemURL(path, gotFile, fail);
            
    function fail(e) {
          alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
   // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsDataURL(file);
           });
    }
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

  getPicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.camera.getPicture({
              quality: 1,
              destinationType: this.camera.DestinationType.DATA_URL,
              targetWidth: 10,
              targetHeight: 10
            }).then((data) => {
              this.studentForm.patchValue({ 'photo': 'data:image/jpg;base64,' + data });
            }, (err) => {
              alert('Unable to take photo');
            })
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

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.studentForm.patchValue({ 'photo': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
    console.log(this.studentForm.controls['photo'].value);
  }

  getProfileImageStyle() {
    return ('url(' + this.studentForm.controls['photo'].value + ')');
  }

}