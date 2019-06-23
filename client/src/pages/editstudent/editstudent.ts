import { Component, ViewChild } from "@angular/core";
import { 
    NavController, 
    ModalController, 
    AlertController, 
    LoadingController, 
    App,
    MenuController,
    ToastController,
    Platform,
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
import { Http, Headers } from '@angular/http';

// Files Images
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;
interface Window {
    resolveLocalFileSystemURL: any;
}
declare var window: Window;

@Component({
  selector: 'editstudent-page',
  templateUrl: './editstudent.html'
})

export class EditstudentPage {

  @ViewChild('fileInput') fileInput;
  public students: any;
  public loader: any;
  studentForm: FormGroup;
  public student: any;
  public studentsList: any;
  public isEditable: Boolean = true;
  public submitAttempt: Boolean = false;
  public counter: Boolean = false;
  public lastImage: any;
  public centers: any;
  public userCenter: any;
  public users: any;
  public matchingStudent: any;
  public locationOptions: Array<Object> = [];
  public isMatching: Boolean = false;

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
    public http: Http
  ) {
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
        
        shoe_size: ['', Validators.compose([Validators.required])]

      });
  }
 
  ionViewDidLoad() {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });

    this.studentService.getStudents().then((data) => {
      this.studentsList = data;
      this.students = data;
      this.storage.get('user').then((user) => {
        this.students = _.filter(this.students, function(o) { 
          return (o.center == user.center); 
        });
        this.students = _.sortBy(this.students, 'createdAt');

        this.storage.get('edit_student').then((id) => {
          this.student = this.students.find((element) => {
            return element._id == id;
          });
          this.studentForm.controls['name'].setValue(this.student.name);
          this.studentForm.controls['email_id'].setValue(this.student.email_id);
          this.studentForm.controls['phone_number'].setValue(this.student.phone_number);
          this.studentForm.controls['gender'].setValue(this.student.gender);
          this.studentForm.controls['dob'].setValue(this.student.dob);
          this.studentForm.controls['parent_name'].setValue(this.student.parent_name);
          this.studentForm.controls['alternate_contact'].setValue(this.student.alternate_contact);
          this.studentForm.controls['locality'].setValue(this.student.locality);
          this.studentForm.controls['study_year'].setValue(this.student.study_year);
          this.studentForm.controls['class_group'].setValue(this.student.class_group);
          this.studentForm.controls['uniform_size'].setValue(this.student.uniform_size);
          this.studentForm.controls['class_type'].setValue(this.student.class_type);
          this.studentForm.controls['shoe_size'].setValue(this.student.shoe_size);
        });

        if(this.student.is_Indented) this.isEditable = !this.student.idCardPrinted;
        else this.isEditable = true;
    
      });
    }, (err) => {
        console.log("not allowed");
    });
  }

  add() {
  	this.navCtrl.setRoot(HomePage);
  }

  // update(student) {
  //   this.storage.set('edit_student', student._id);
  //   this.navCtrl.setRoot(EditstudentPage);
  // }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  onNameChange = () => {
    this.studentForm.value.name = this.studentForm.value.name.toUpperCase();
  }

  onEmailChange = () => {
    this.studentForm.value.email_id = this.studentForm.value.email_id.toLowerCase();
    this.checkMatching();
  }

  onPhoneChange = () => {
    this.checkMatching();
  }

  findDuplicates(data) {
    let result = [];
    data.forEach(function(element, index) {
      // Find if there is a duplicate or not
      if (data.indexOf(element, index + 1) > -1) {
        // Find if the element is already in the result array or not
        if (result.indexOf(element) === -1) {
          result.push(element);
        }
      }
    });
    return result;
  }

  showConfirm(stu) {
    let msg = 'Name: ' + stu.name + '<br/> Email: ' + stu.email_id + "<br/> Phone: " + stu.phone_number + "<br/> Gender: " + stu.gender + "<br/> Parent: " + stu.parent_name + "<br/>Center: " + stu.center + "<br/> Confirm same student?";
    let confirm = this.alertCtrl.create({
      title: 'Similar Enquiry',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.add();
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  checkMatching() {
    var list = [];
    this.isMatching = false;
    this.matchingStudent = null; 
    if(this.studentForm.controls['dob'].value != ''){
        for(var i = 0; i < this.studentsList.length; i++) {
          if(moment(this.studentsList[i].dob).isSame(moment(this.studentForm.controls['dob'].value), 'day') && moment(this.studentsList[i].dob).isSame(moment(this.studentForm.controls['dob'].value), 'month') && moment(this.studentsList[i].dob).isSame(moment(this.studentForm.controls['dob'].value), 'year')) {
            list.push(this.studentsList[i]);            
          }
        }
    }
    if(this.studentForm.controls['email_id'].value != ''){
        for(var i = 0; i < this.studentsList.length; i++) {
          if(this.studentsList[i].email_id == this.studentForm.controls['email_id'].value) {
            list.push(this.studentsList[i]);
          }
        }
    }
    if(this.studentForm.controls['phone_number'].value != ''){
        for(var i = 0; i < this.studentsList.length; i++) {
          if(this.studentsList[i].phone_number == this.studentForm.controls['phone_number'].value) {
            list.push(this.studentsList[i]);
          }
        }
        for(var i = 0; i < this.studentsList.length; i++) {
          if(this.studentsList[i].alternate_contact == this.studentForm.controls['phone_number'].value) {
            list.push(this.studentsList[i]);
          }
        }
    }
    if(this.studentForm.controls['alternate_contact'].value != ''){
        for(var i = 0; i < this.studentsList.length; i++) {
          if(this.studentsList[i].phone_number == this.studentForm.controls['alternate_contact'].value) {
            list.push(this.studentsList[i]);
          }
        }
        for(var i = 0; i < this.studentsList.length; i++) {
          if(this.studentsList[i].alternate_contact == this.studentForm.controls['alternate_contact'].value) {
            list.push(this.studentsList[i]);
          }
        }
    }
    if(list.length > 0) {
      var resu = this.findDuplicates(list);
      if(resu.length > 0 && !this.counter){
        this.isMatching = true;
        this.counter = true;
        this.matchingStudent = resu[0]; 
        this.showConfirm(this.matchingStudent);
      }
    }
  }

  onLocalityChange($event) {
      this.locationOptions = [];
      if($event._value.length > 4) { 
          var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $event._value + 
              "&types=geocode&key=AIzaSyDxiToPCcr2LL1EC_vkzYtBiQO_9kbIfqs";
          this.http.get(url)
              .subscribe(res => {
                let data = res.json();
                this.locationOptions = data.predictions;
              }, (err) => { });
      }
  }

  onLocSelect(description) {
    this.studentForm.controls['locality'].setValue(description);
  }

  save = () => {
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

      this.studentService.editStudent(this.student).then((result) => {
        this.loader.dismiss();
        this.presentToast('student data updated successfully');
        this.add();
      }, (err) => {
        this.loader.dismiss();
        this.presentToast('Error! Please try again.');
      });
    }
  };

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
      this.studentForm.photo = base64Image; 
    });
  }

  getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);
            
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
      this.presentToast(err);
    });
  }

  getPicture() {
    if (Camera['installed']()) {
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
    } else {
      this.fileInput.nativeElement.click();
    }
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