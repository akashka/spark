import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from "ion2-calendar";
import { CallNumber } from '@ionic-native/call-number';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

// Pages
import { HomePage } from '../pages/home/home';
import { EnquiryPage } from '../pages/enquiry/enquiry';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SearchPage } from '../pages/search/search';
import { ReportsPage } from '../pages/reports/reports';
import { ConfirmPage } from '../pages/confirm/confirm';
import { IndentPage } from '../pages/indent/indent';
import { CenterPage } from '../pages/center/center';
import { DispatchPage } from '../pages/dispatch/dispatch';
import { PromotionPage } from '../pages/promotion/promotion';
import { AdmineditPage } from '../pages/adminedit/adminedit';
import { DeletestudentPage } from '../pages/deletestudent/deletestudent';
import { ApproveindentPage } from '../pages/approveindent/approveindent';
import { IdcardrequestPage } from '../pages/idcardrequest/idcardrequest';
import { IdcardprintPage } from '../pages/idcardprint/idcardprint';
import { EditstudentPage } from '../pages/editstudent/editstudent';
import { StudentslistPage } from '../pages/studentslist/studentslist';

import { HomeTab } from '../pages/home-tab/home-tab';
import { NotificationTab } from '../pages/notification-tab/notification-tab';
import { ProfileTab } from '../pages/profile-tab/profile-tab';

// Providers
import { Students } from '../providers/students/students';
import { Auth } from '../providers/auth/auth';
import { Center } from '../providers/center/center';
import { Indentation } from '../providers/indentation/indentation';
import { Networks } from '../providers/network/network';

// Camera
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EnquiryPage,
    LoginPage,
    SignupPage,
    SearchPage,
    ReportsPage,
    ConfirmPage,
    IndentPage,
    CenterPage,
    DispatchPage,
    PromotionPage,
    AdmineditPage,
    DeletestudentPage,
    ApproveindentPage,
    IdcardrequestPage,
    IdcardprintPage,
    EditstudentPage,
    StudentslistPage,
    HomeTab,
    NotificationTab,
    ProfileTab
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule,
    GooglePlaceModule,
    IonicStorageModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EnquiryPage,
    LoginPage,
    SignupPage,
    SearchPage,
    ReportsPage,
    ConfirmPage,
    IndentPage,
    CenterPage,
    DispatchPage,
    PromotionPage,
    AdmineditPage,
    DeletestudentPage,
    ApproveindentPage,
    IdcardrequestPage,
    IdcardprintPage,
    EditstudentPage,
    StudentslistPage,
    HomeTab,
    NotificationTab,
    ProfileTab
  ],
  providers: [
    IonicStorageModule,
    Students,
    Auth,
    Center,
    Networks,
    Indentation,
    File,
    Transfer,
    Camera,
    FilePath,
    CallNumber
  ]
})
export class AppModule {}