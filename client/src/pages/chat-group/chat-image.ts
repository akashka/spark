import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
  ActionSheetController,
  ToastController,
  Platform,
  App,
  MenuController,
  LoadingController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

// Providers
import { Students } from '../../providers/students/students';
import { Chats } from '../../providers/chats/chats';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Networks } from '../../providers/network/network';
import { EmailComposer } from "ionic-native";

@Component({
  selector: 'chat-image',
  templateUrl: './chat-image.html'
})

export class ChatImagePage {
  filePath: any;
  chatName: any;

  constructor(
    public navCtrl: NavController,
    public studentService: Students,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public chatService: Chats,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public menu: MenuController,
    public centerService: Center,
    public networkService: Networks,
    public storage: Storage,
    public loading: LoadingController,
    public http: Http,
    public params: NavParams,
    public viewCtrl: ViewController,
    public transfer: FileTransfer,
    public file: File,
    public androidPermissions : AndroidPermissions
  ) {
    this.filePath = params.get('filePath');
    this.chatName = params.get('chatName');
  }

  download(resolvedFilePath) {
    let pathurl = this.filePath.substring(0, this.filePath.lastIndexOf('/'));
    let fileurl = this.filePath.substring(this.filePath.lastIndexOf('/') + 1, this.filePath.length);
    let fileExtension = fileurl.split('.').pop();
    const fileTransfer: FileTransferObject = this.transfer.create();

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(status => {
      if (status.hasPermission) {
        fileTransfer.download(resolvedFilePath, (this.file.externalRootDirectory + 'olw.' + fileExtension), true).then((entry) => {
          alert('download complete: ' + entry.toURL());
          this.dismiss();
        }, (error) => {
          alert(JSON.stringify(error));
          this.dismiss();
        });
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((permiss) => {
          if (permiss.hasPermission) {
            fileTransfer.download(resolvedFilePath, (this.file.externalRootDirectory + 'olw.' + fileExtension), true).then((entry) => {
              alert('download complete: ' + entry.toURL());
              this.dismiss();
            }, (error) => {
              alert(JSON.stringify(error));
              this.dismiss();
            });
          } else {
            this.dismiss();
          }
        }, (error) => {
          this.dismiss();
          alert(JSON.stringify(error));
        });
      }
    }, (err) => {
      this.dismiss();
      alert(JSON.stringify(err));
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

};