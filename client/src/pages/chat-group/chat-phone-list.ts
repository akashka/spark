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

// Providers
import { Students } from '../../providers/students/students';
import { Chats } from '../../providers/chats/chats';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';

import { CallNumber } from "@ionic-native/call-number";
import { Contacts, Contact, ContactField, ContactName, ContactAddress, ContactOrganization } from '@ionic-native/contacts';

@Component({
  selector: 'chat-phone-list',
  templateUrl: './chat-phone-list.html'
})

export class ChatPhoneListPage {
  users: any;
  add: Boolean = false;
  message: Boolean = false;
  call: Boolean = false;
  remove: Boolean = false;
  confirm: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public studentService: Students,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public chatService: Chats,
    public actionSheetController: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public menu: MenuController,
    public centerService: Center,
    public storage: Storage,
    public loading: LoadingController,
    public http: Http,
    public params: NavParams,
    public viewCtrl: ViewController,
    public callNumber: CallNumber,
    private contacts: Contacts
  ) {
    this.users = params.get('users');
    this.add = params.get('add');
    this.message = params.get('message');
    this.call = params.get('call');
    this.remove = params.get('remove');
    this.confirm = params.get('confirm');
  }

  dismiss(x) {
    if (x === 0) {
      this.users = [];
    }
    this.viewCtrl.dismiss(this.users);
  }

  addContact(user) {
    let contact: Contact = this.contacts.create();

    if (user.displayName !== null && user.displayName !== undefined) {
      contact.displayName = user.displayName;
    }

    if (user.nickname !== null && user.nickname !== undefined) {
      contact.nickname = user.nickname;
    }

    if (user.name !== null && user.name !== undefined) {
      var name = new ContactName();
      name.givenName = user.name.givenName;
      name.familyName = user.name.familyName;
      name.formatted = user.name.formatted;
      name.middleName = user.name.middleName;
      name.honorificPrefix = user.name.honorificPrefix;
      name.honorificSuffix = user.name.honorificSuffix;
      contact.name = name;
    }

    if (user.phoneNumbers !== null && user.phoneNumbers !== undefined) {
      contact.phoneNumbers = [];
      for (var i = 0; i < user.phoneNumbers.length; i++) {
        contact.phoneNumbers[i] = new ContactField(user.phoneNumbers[i].type, user.phoneNumbers[i].value, user.phoneNumbers[i].pref);
      }
    }

    if (user.emails !== null && user.emails !== undefined) {
      contact.emails = [];
      for (var i = 0; i < user.emails.length; i++) {
        contact.emails[i] = new ContactField(user.emails[i].type, user.emails[i].value, user.emails[i].pref);
      }
    }

    if (user.ims !== null && user.ims !== undefined) {
      contact.ims = [];
      for (var i = 0; i < user.ims.length; i++) {
        contact.ims[i] = new ContactField(user.ims[i].type, user.ims[i].value, user.ims[i].pref);
      }
    }

    if (user.photos !== null && user.photos !== undefined) {
      contact.photos = [];
      for (var i = 0; i < user.photos.length; i++) {
        contact.photos[i] = new ContactField(user.photos[i].type, user.photos[i].value, user.photos[i].pref);
      }
    }

    if (user.categories !== null && user.categories !== undefined) {
      contact.categories = [];
      for (var i = 0; i < user.categories.length; i++) {
        contact.categories[i] = new ContactField(user.categories[i].type, user.categories[i].value, user.categories[i].pref);
      }
    }

    if (user.urls !== null && user.urls !== undefined) {
      contact.urls = [];
      for (var i = 0; i < user.urls.length; i++) {
        contact.urls[i] = new ContactField(user.urls[i].type, user.urls[i].value, user.urls[i].pref);
      }
    }

    if (user.addresses !== null && user.addresses !== undefined) {
      contact.addresses = [];
      for (var i = 0; i < user.addresses.length; i++) {
        contact.addresses[i] = new ContactAddress(
          user.addresses[i].pref, user.addresses[i].type, user.addresses[i].formatted, user.addresses[i].streetAddress,
          user.addresses[i].locality, user.addresses[i].region, user.addresses[i].postalCode, user.addresses[i].country);
      }
    }

    if (user.organizations !== null && user.organizations !== undefined) {
      contact.organizations = [];
      for (var i = 0; i < user.organizations.length; i++) {
        contact.organizations[i] = new ContactOrganization(
          user.organizations[i].type, user.organizations[i].name, user.organizations[i].department, user.organizations[i].title, user.organizations[i].pref
        );
      }
    }

    if (user.birthday !== null && user.birthday !== undefined) {
      contact.birthday = user.birthday;
    }

    contact.save().then(
      () => console.log('Contact saved!', contact),
      (error: any) => console.error('Error saving contact.', error)
    );

  }

  messageContact(user) {
    if (user.phoneNumbers && user.phoneNumbers.length > 0 && user.phoneNumbers[0].value !== '') {
      window.open("sms://"+user.phoneNumbers[0].value, "_blank");
    }
  }

  whatsappContact(user) {
    if (user.phoneNumbers && user.phoneNumbers.length > 0 && user.phoneNumbers[0].value !== '') {
      window.open(("https://wa.me/91"+user.phoneNumbers[0].value), "_blank"); 
    }
  }

  emailContact(user) {
    if (user.emails && user.emails.length > 0 && user.emails[0].value !== '') {
      window.open(("mailto://"+user.emails[0].value), "_blank");
    }
  }

  callContact(user) {
    if (user.phoneNumbers && user.phoneNumbers.length > 0 && user.phoneNumbers[0].value !== '') {
      this.callNumber.callNumber(user.phoneNumbers[0].value, false)
        .then(() => console.log("Launched dialer!"))
        .catch(() => console.log("Error launching dialer"));
    }
  }

  removeContact(id) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        this.users.splice(i, 1);
        i--;
      }
    }
  }

  async actions(user) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: "Add Contact",
          icon: "person-add",
          handler: () => {
            this.addContact(user);
          }
        },
        {
          text: "Call",
          icon: "call",
          handler: () => {
            this.callContact(user);
          }
        },
        {
          text: "Whatsapp",
          icon: "logo-whatsapp",
          handler: () => {
            this.whatsappContact(user);
          }
        },
        {
          text: "SMS",
          icon: "text",
          handler: () => {
            this.messageContact(user);
          }
        },
        {
          text: "Email",
          icon: "mail",
          handler: () => {
            this.emailContact(user);
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

};