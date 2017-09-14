import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

// Pages
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CenterPage } from '../pages/center/center';
import { IndentPage } from '../pages/indent/indent';
import { ReportsPage } from '../pages/reports/reports';

// Services
import { Auth } from '../providers/auth/auth';

@Component({
  templateUrl: './app.html'
})

export class MyApp {
  rootPage = LoginPage;

  public isAdmin: Boolean = false;
  public isCenterAdmin: Boolean = false;
  public isCounsellor: Boolean = false;

  @ViewChild(Nav) nav: Nav;
 
  constructor(platform: Platform, public storage: Storage, public authService: Auth, ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.storage.get('user').then((user) => {
            if(user.role === "counsellor")  this.isCounsellor = true;
        else if(user.role === "admin")  this.isAdmin = true;
        else if(user.role === "centerAdmin")  this.isCenterAdmin = true;
        else this.isCounsellor = true;
    }); 
  
  }

  go_to_home(){
    this.nav.setRoot(HomePage);  
  }

  go_to_search(){
    this.nav.setRoot(SearchPage);  
  }

  go_to_login(){
    this.authService.logout();
    this.nav.setRoot(LoginPage);  
  }

  go_to_signup(){
    this.nav.setRoot(SignupPage);  
  }

  go_to_center(){
    this.nav.setRoot(CenterPage);  
  }

  go_to_indent(){
    this.nav.setRoot(IndentPage);  
  }

  go_to_reports(){
    this.nav.setRoot(ReportsPage);  
  }

}