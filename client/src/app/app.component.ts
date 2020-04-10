import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ItemGroup } from 'ionic-angular';
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
  public isDispatcher: Boolean = false;
  public isTeacher: Boolean = false;
  public isParent: Boolean = false;
  public showMenu: Boolean = false;
  public userCenter: String = "";
  public user: any = {};

  userSubscription;

  @ViewChild(Nav) nav: Nav;
 
  constructor(platform: Platform, public storage: Storage, public authService: Auth) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.userSubscription = Auth.userChanged.subscribe(
      (user) => this.getData(user)
    );

  }

  getData(user) {
        if(user) {
          if(user.role === "counsellor") {
            this.isCounsellor = true;
            this.isDispatcher = false;
            this.isAdmin = false;
            this.isCenterAdmin = false;
            this.isTeacher = false;
            this.isParent = false;
          }
          else if(user.role === "dispatcher") {
            this.isDispatcher = true;
            this.isCounsellor = false;
            this.isAdmin = false;
            this.isCenterAdmin = false;
            this.isTeacher = false;
            this.isParent = false;
          } 
          else if(user.role === "admin") {
            this.isAdmin = true;
            this.isCounsellor = false;
            this.isDispatcher = false;
            this.isCenterAdmin = false;
            this.isTeacher = false;
            this.isParent = false;
          } 
          else if(user.role === "centerAdmin") {
            this.isCenterAdmin = true;
            this.isAdmin = false;
            this.isCounsellor = false;
            this.isDispatcher = false;
            this.isTeacher = false;
            this.isParent = false;
          } else if(user.role === "teacher") {
            this.isTeacher = true;
            this.isCenterAdmin = false;
            this.isAdmin = false;
            this.isCounsellor = false;
            this.isDispatcher = false;
            this.isParent = false;
          } else if(user.role === "parent") {
            this.isParent = true;
            this.isCenterAdmin = false;
            this.isAdmin = false;
            this.isCounsellor = false;
            this.isDispatcher = false;
            this.isTeacher = false;
          } else {
            this.isParent = true;
            this.isCenterAdmin = false;
            this.isAdmin = false;
            this.isCounsellor = false;
            this.isDispatcher = false;
            this.isTeacher = false;
          }
          this.userCenter = user.center;
          this.user = user;
        }
  }

  go_to_home(){
    this.nav.setRoot(HomePage);  
  }

  go_to_enquiry(){
    this.nav.setRoot(EnquiryPage);  
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

  go_to_dispatch(){
    this.nav.setRoot(DispatchPage);  
  }

  go_to_promotion(){
    this.nav.setRoot(PromotionPage);  
  }

  go_to_adminedit(){
    this.nav.setRoot(AdmineditPage);  
  }

  go_to_deletestudent(){
    this.nav.setRoot(DeletestudentPage);  
  }

  go_to_idcardrequest(){
    this.nav.setRoot(IdcardrequestPage);
  }

  go_to_idcardprint(){
    this.nav.setRoot(IdcardprintPage);
  }

  go_to_approveindent(){
    this.nav.setRoot(ApproveindentPage);
  }

  go_to_studentslist() {
    this.nav.setRoot(StudentslistPage);
  }

  go_to_chatList() {
    this.nav.setRoot(ChatListPage);
  }

}