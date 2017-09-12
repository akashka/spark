import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import {Network, Connection} from 'ionic-native';

declare var cordova:any;

@Injectable()
export class Networks {

  constructor() {
  }

  noConnection() {
    return (Network.connection === 'none');
  }

  private showSettings() {
    if (cordova.plugins.diagnostic.switchToWifiSettings) {
      cordova.plugins.diagnostic.switchToWifiSettings();
    } else {
      cordova.plugins.diagnostic.switchToSettings();
    }
  }

  showNetworkAlert() {
    let networkAlert = AlertController.create({
      title: 'No Internet Connection',
      message: 'Please check your internet connection.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Open Settings',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.showSettings();
            })
          }
        }
      ]
    });
    networkAlert.present();
  }

}