import { Component } from '@angular/core';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Students } from '../../providers/students/students';
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
import { HomePage } from '../home/home';

@Component({
    selector: 'privacypolicy',
    templateUrl: './privacypolicy.html'
})

export class PrivacyPolicyPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public centerService: Center,
        public studentService: Students,
        public authService: Auth,
        public loading: LoadingController,
        public app: App,
        public menu: MenuController,
        public storage: Storage,
        public toastCtrl: ToastController,
    ) { }
}

@Component({
    selector: 'termsconditions',
    templateUrl: './termsconditions.html'
})

export class TermsConditionsPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public centerService: Center,
        public studentService: Students,
        public authService: Auth,
        public loading: LoadingController,
        public app: App,
        public menu: MenuController,
        public storage: Storage,
        public toastCtrl: ToastController,
    ) { }
}

@Component({
    selector: 'faq',
    templateUrl: './faq.html'
})

export class FAQPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public centerService: Center,
        public studentService: Students,
        public authService: Auth,
        public loading: LoadingController,
        public app: App,
        public menu: MenuController,
        public storage: Storage,
        public toastCtrl: ToastController,
    ) { }
}

@Component({
    selector: 'contactus',
    templateUrl: './contactus.html'
})

export class ContactUs {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public centerService: Center,
        public studentService: Students,
        public authService: Auth,
        public loading: LoadingController,
        public app: App,
        public menu: MenuController,
        public storage: Storage,
        public toastCtrl: ToastController,
    ) { }
}

@Component({
    selector: 'staticpages',
    templateUrl: './staticpages.html'
})

export class StaticPages {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public centerService: Center,
        public studentService: Students,
        public authService: Auth,
        public loading: LoadingController,
        public app: App,
        public menu: MenuController,
        public storage: Storage,
        public toastCtrl: ToastController,
    ) { }

    goToContactUs() {
        this.navCtrl.push(ContactUs);
    }

    goToFAQ() {
        this.navCtrl.push(FAQPage);
    }

    goToTermsConditions() {
        this.navCtrl.push(TermsConditionsPage);
    }

    goToPrivacyPolicy() {
        this.navCtrl.push(PrivacyPolicyPage);
    }

}

