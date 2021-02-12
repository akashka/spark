import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ItemGroup, AlertController, ToastController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

// Pages
import { HomePage } from '../pages/home/home';
import { EnquiryPage } from '../pages/enquiry/enquiry';
import { SearchPage } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CenterPage } from '../pages/center/center';
import { IndentPage } from '../pages/indent/indent';
import { ReportsPage } from '../pages/reports/reports';
import { DispatchPage } from '../pages/dispatch/dispatch';
import { PromotionPage } from '../pages/promotion/promotion';
import { AdmineditPage } from '../pages/adminedit/adminedit';
import { DeletestudentPage } from '../pages/deletestudent/deletestudent';
import { IdcardrequestPage } from '../pages/idcardrequest/idcardrequest';
import { IdcardprintPage } from '../pages/idcardprint/idcardprint';
import { ApproveindentPage } from '../pages/approveindent/approveindent';
import { StudentslistPage } from '../pages/studentslist/studentslist';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { ProfileTab } from '../pages/profile-tab/profile-tab';
import { ClassroomaddPage } from '../pages/classroom-add/classroom-add';
import { StaticPages } from '../pages/staticpages/privacypolicy';

// Services
import { Auth } from '../providers/auth/auth';
import { FcmProvider } from '../providers/fcm';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Network } from '@ionic-native/network';
import { tap } from 'rxjs/operator/map';

declare var cordova: any;
@Component({
  templateUrl: './app.html'
})

export class MyApp {
  rootPage = LoginPage;

  public isAdmin: Boolean = false;
  public isCenterAdmin: Boolean = false;
  public isCounsellor: Boolean = false;
  public isDispatcher: Boolean = false;
  public isTeacher: Boolean = false;
  public isParent: Boolean = false;
  public showMenu: Boolean = false;
  public userCenter: String = "";
  public user: any = {};
  public isReadonlyadmin: Boolean = false;

  userSubscription;

  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    public storage: Storage,
    public authService: Auth,
    public contacts: Contacts,
    public androidPermissions: AndroidPermissions,
    public batteryStatus: BatteryStatus,
    public alertController: AlertController,
    public network: Network,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public fcm: FcmProvider,
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      // Getting Permissions
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.BATTERY_STATS).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.BATTERY_STATS)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MEDIA_CONTENT_CONTROL).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MEDIA_CONTENT_CONTROL)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_CONTACTS)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.VIBRATE).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.VIBRATE)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_CONTACTS).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_CONTACTS)
      );

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      );

      // fcm
      fcm.getToken();
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
        .subscribe();

      // Storing COntacts
      this.contacts.find(["*"]).then((contacts) => {
        let allContact = contacts.sort(function (a, b) {
          if (a.displayName < b.displayName) { return -1; }
          if (a.displayName > b.displayName) { return 1; }
          return 0;
        });
        var stringContact = JSON.parse(JSON.stringify(allContact));
        for (let u = 0; u < stringContact.length; u++) {
          stringContact[u] = stringContact[u]._objectInstance;
          stringContact[u].isChecked = false;
        };
        var contactList = JSON.stringify(stringContact);
        this.storage.set("phoneContacts", contactList);
      });
    });

    this.userSubscription = Auth.userChanged.subscribe(
      (user) => this.getData(user)
    );

    if (this.batteryStatus) {
      this.batteryStatus.onChange().subscribe(status => {
        console.log(status.level, status.isPlugged);
        if (!status.isPlugged && status.level < 15 && status.level % 5 == 0) {
          this.presentBatteryAlert(status);
        }
      });
    }

    if (this.network) {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.showNetworkAlert().then(() => {
          disconnectSubscription.unsubscribe();
        });
      });
    }

  }


  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentBatteryAlert(status) {
    const alert = await this.alertController.create({
      title: ((status.level == 10 ? 'Low' : 'Critical') + ' Battery Level'),
      message: (
        'Your mobile battery is ' +
        (status.level == 10 ? 'Low' : 'Critical') +
        '. Please connect your phone to charger for uninterrupted service.'
      ),
      buttons: ['OK'],
      enableBackdropDismiss: true,
    });
    await alert.present();
  }

  private showSettings() {
    if (cordova.plugins.diagnostic.switchToWifiSettings) {
      cordova.plugins.diagnostic.switchToWifiSettings();
    } else {
      cordova.plugins.diagnostic.switchToSettings();
    }
  }

  async showNetworkAlert() {
    let networkAlert = this.alertController.create({
      title: 'No Internet Connection',
      message: 'Your Internet connection seems to have lost. Please check your internet connection.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Settings',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.showSettings();
            })
          }
        }
      ],
      enableBackdropDismiss: true,
    });
    networkAlert.present();
  }

  getData(user) {
    if (user) {
      if (user.role === "counsellor") {
        this.isCounsellor = true;
        this.isDispatcher = false;
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isTeacher = false;
        this.isParent = false;
        this.isReadonlyadmin = false;
      }
      else if (user.role === "dispatcher") {
        this.isDispatcher = true;
        this.isCounsellor = false;
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isTeacher = false;
        this.isParent = false;
        this.isReadonlyadmin = false;
      }
      else if (user.role === "readonlyadmin") {
        this.isReadonlyadmin = true;
        this.isDispatcher = false;
        this.isCounsellor = false;
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isTeacher = false;
        this.isParent = false;
      }
      else if (user.role === "admin") {
        this.isAdmin = true;
        this.isCounsellor = false;
        this.isDispatcher = false;
        this.isCenterAdmin = false;
        this.isTeacher = false;
        this.isParent = false;
        this.isReadonlyadmin = false;
      }
      else if (user.role === "centerAdmin") {
        this.isCenterAdmin = true;
        this.isAdmin = false;
        this.isCounsellor = false;
        this.isDispatcher = false;
        this.isTeacher = false;
        this.isParent = false;
        this.isReadonlyadmin = false;
      }
      else if (user.role === "teacher") {
        this.isTeacher = true;
        this.isCenterAdmin = false;
        this.isAdmin = false;
        this.isCounsellor = false;
        this.isDispatcher = false;
        this.isParent = false;
        this.isReadonlyadmin = false;
      }
      else if (user.role === "parent") {
        this.isParent = true;
        this.isCenterAdmin = false;
        this.isAdmin = false;
        this.isCounsellor = false;
        this.isDispatcher = false;
        this.isTeacher = false;
        this.isReadonlyadmin = false;
      }
      else {
        this.isParent = true;
        this.isCenterAdmin = false;
        this.isAdmin = false;
        this.isCounsellor = false;
        this.isDispatcher = false;
        this.isTeacher = false;
        this.isReadonlyadmin = false;
      }
      this.userCenter = user.center;
      this.user = user;
    }
  }

  go_to_home() {
    this.nav.push(HomePage);
  }

  go_to_enquiry() {
    this.nav.push(EnquiryPage);
  }

  go_to_search() {
    this.nav.push(SearchPage);
  }

  go_to_login() {
    this.authService.logout();
    this.nav.setRoot(LoginPage);
  }

  go_to_signup() {
    this.nav.push(SignupPage);
  }

  go_to_center() {
    this.nav.push(CenterPage);
  }

  go_to_indent() {
    this.nav.push(IndentPage);
  }

  go_to_reports() {
    this.nav.push(ReportsPage);
  }

  go_to_dispatch() {
    this.nav.push(DispatchPage);
  }

  go_to_promotion() {
    this.nav.push(PromotionPage);
  }

  go_to_adminedit() {
    this.nav.push(AdmineditPage);
  }

  go_to_deletestudent() {
    this.nav.push(DeletestudentPage);
  }

  go_to_idcardrequest() {
    this.nav.push(IdcardrequestPage);
  }

  go_to_idcardprint() {
    this.nav.push(IdcardprintPage);
  }

  go_to_approveindent() {
    this.nav.push(ApproveindentPage);
  }

  go_to_studentslist() {
    this.nav.push(StudentslistPage);
  }

  go_to_chatList() {
    this.nav.push(ChatListPage);
  }

  go_to_profile_tab() {
    this.nav.push(ProfileTab);
  }

  go_to_add_classroom() {
    this.nav.push(ClassroomaddPage);
  }

  go_to_staticpages() {
    this.nav.push(StaticPages);
  }

}