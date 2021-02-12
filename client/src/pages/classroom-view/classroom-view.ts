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
import { VideoPlayer } from '@ionic-native/video-player';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

@Component({
  selector: 'classroom-view',
  templateUrl: './classroom-view.html'
})
export class ClassroomviewPage {

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
    public videoPlayer: VideoPlayer,
    public streamingMedia: StreamingMedia
  ) {
    this.loader = this.loading.create({
      content: 'Please wait...',
    });
    this.getClassrooms();
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  getClassrooms() {
    this.classrooms = [];
    this.classroomService.searchClassroom().then((result) => {
      this.storage.get('user').then((user) => {
        this.user = user;
        result = _.filter(result, function (o) {
          return (o.class_group === user.class_group[0] && o.center === user.center);
        });
        this.classrooms = result;
        this.loader.dismiss();
      });
    }, (err) => {
      console.log(err);
      this.loader.dismiss();
    });
  }

  showLoader(content) {
    this.loader = this.loading.create({
      content: content,
    });
    this.loader.present();
  }

  playVideo(classroom) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming' + JSON.stringify(e)) },
      orientation: 'landscape',
    };
    this.streamingMedia.playVideo(classroom.video_src, options);
  }

}