import { Component } from '@angular/core';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Classroom } from '../../providers/classroom/classroom';
import { Chats } from '../../providers/chats/chats';
import {
  NavController,
  NavParams,
  LoadingController,
  App,
  MenuController,
  ToastController
} from 'ionic-angular';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

@Component({
  selector: 'classroom-add',
  templateUrl: './classroom-add.html'
})
export class ClassroomaddPage {

  centers;
  users;
  user;
  public loader: any;
  classroomForm: FormGroup;
  classrooms;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public centerService: Center,
    public classroomService: Classroom,
    public authService: Auth,
    public chatService: Chats,
    public loading: LoadingController,
    public app: App,
    public menu: MenuController,
    public storage: Storage,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    public file: File,
  ) {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });
    this.classroomForm = formBuilder.group({
      center: ['', Validators.compose([Validators.required])],
      class_group: ['', Validators.compose([Validators.required])],
      video_msg: [''],
      video_src: ['', Validators.compose([Validators.required])],
      image_src: ['', Validators.compose([Validators.required])],
      is_Active: true,
    });
    this.reset();
    this.getCenters();
    this.getClassrooms();
  }

  reset() {
    if (this.user && this.user.role != "admin") {
      this.classroomForm.controls['center'].setValue(this.user.center);
    } else {
      this.classroomForm.controls['center'].setValue('');
    }
    this.classroomForm.controls['class_group'].setValue('');
    this.classroomForm.controls['video_msg'].setValue('');
    this.classroomForm.controls['video_src'].setValue('');
    this.classroomForm.controls['image_src'].setValue('');
    this.classroomForm.controls['is_Active'].setValue('');
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Function to get list of all the centers
  getCenters() {
    this.centers = [];
    this.centerService.searchCenter().then((result) => {
      result = _.filter(result, function (o) {
        return (o.active == true);
      });
      this.centers = result;
      this.storage.get('user').then((user) => {
        this.user = user;
        if (user.role != "admin") {
          this.classroomForm.controls['center'].setValue(user.center);
          this.centers = _.find(this.centers, ['center_code', user.center]);
        }
      });
    }, (err) => {
      console.log(err);
    });
  }

  getClassrooms() {
    this.classrooms = [];
    this.classroomService.searchClassroom().then((result) => {
      this.classrooms = result;
    }, (err) => {
      console.log(err);
    });
  }

  save() {
    this.loader.present();
    if (this.classroomForm.valid) {
      var val = this.classroomForm.value;
      val.created_date = new Date();
      val.created_by = this.user.email;
      this.classroomService.createClassroom(val).then((result) => {
        this.loader.dismiss();
        this.reset();
        this.presentToast('Saved successfully');
      }, (err) => {
        this.loader.dismiss();
        this.presentToast('Error! Please try again.');
      });
    }
  }

  showLoader(content) {
    this.loader = this.loading.create({
      content: content,
    });
    this.loader.present();
  }

  videoFormats = ['afl', 'asf', 'asx', 'avi', 'avs', 'dif', 'dl', 'dv', 'fmf', 'gl', 'isu', 'm1v', 'm2v', 'mjpg',
    'moov', 'mov', 'movie', 'mpe', 'mpeg', 'mpg', 'mv', 'wmv', 'vob', 'xsr', 'xdr', 'vos', 'vivo', 'viv', 'vdo',
    'rv', 'qt', 'qtc', 'mp4', 'h264', 'm4v'];
  addVideo() {
    this.fileChooser.open().then(uri => {
      this.showLoader('Uploading...');
      this.filePath.resolveNativePath(uri).then(resolvedFilePath => {
        let pathurl = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
        let fileurl = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
        this.file.readAsDataURL(pathurl, fileurl).then((res) => {
          let fileExtension = fileurl.split('.').pop();
          if (this.videoFormats.indexOf(fileExtension) > -1) {
            var fileName = 'classroom_0' + this.classrooms.length + '.' + fileExtension;

            // Uploading video
            this.chatService.uploadToS3(res, fileName, fileExtension).then((result: any) => {
              var documentPath = result ? (result.Location ? result.Location : fileName) : fileName;
              this.classroomForm.controls['video_src'].setValue(documentPath);

              // Taking and uploading screenshot
              var imgfileName = 'classroom_0' + this.classrooms.length + '_tn.png';
              this.chatService.generateScreenshotFromVideo(documentPath, imgfileName).then((resultimg: any) => {
                var filePath = resultimg ? (resultimg.Location ? resultimg.Location : fileName) : fileName;
                this.classroomForm.controls['image_src'].setValue(filePath);
                this.loader.dismiss();
              }, (err) => {
                this.presentToast('Err ' + err);
                this.loader.dismiss();
              });
              // Taking and uploading screenshot complete

            }, (err) => {
              this.presentToast('Err ' + err);
              this.loader.dismiss();
            });
            // Uploading video complete

          } else {
            this.loader.dismiss();
            this.presentToast('File Uploaded is not a valid video format');
          }

        }).catch(err => {
          alert('berr ' + JSON.stringify(err, Object.getOwnPropertyNames(err)));
          this.loader.dismiss();
        });
      }).catch(err => {
        this.presentToast(JSON.stringify(err));
        this.loader.dismiss();
      });
    }).catch(err => {
      this.presentToast(JSON.stringify(err));
      this.loader.dismiss();
    });
  }

}