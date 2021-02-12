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
import { ChatGroupPage } from '../pages/chat-group/chat-group';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { ChatCreatePage } from '../pages/chat-create/chat-create';
import { ChatContactPage } from '../pages/chat-create/chat-contact';
import { ChatInfoPage } from '../pages/chat-info/chat-info';
import { ChatPhoneContactPage } from '../pages/chat-group/chat-phone-contact';
import { ChatImagePage } from '../pages/chat-group/chat-image';
import { ChatPhoneListPage } from '../pages/chat-group/chat-phone-list';
import { ClassroomaddPage } from '../pages/classroom-add/classroom-add';
import { ClassroomviewPage } from '../pages/classroom-view/classroom-view';
import { PrivacyPolicyPage, TermsConditionsPage, FAQPage, ContactUs, StaticPages } from '../pages/staticpages/privacypolicy';

import { HomeTab } from '../pages/home-tab/home-tab';
import { NotificationTab } from '../pages/notification-tab/notification-tab';
import { ProfileTab } from '../pages/profile-tab/profile-tab';

// Providers
import { Students } from '../providers/students/students';
import { Auth } from '../providers/auth/auth';
import { Center } from '../providers/center/center';
import { Indentation } from '../providers/indentation/indentation';
import { Chats } from '../providers/chats/chats';
import { Classroom } from '../providers/classroom/classroom';
import { FcmProvider } from '../providers/fcm';

// Camera
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { MediaPlugin } from '@ionic-native/media';

// Chat
import { EmojiPickerModule } from 'ionic-emoji-picker';
import { Contacts } from '@ionic-native/contacts';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Base64 } from "@ionic-native/base64";
import { NativeAudio } from '@ionic-native/native-audio';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileOpener } from '@ionic-native/file-opener';
import { VideoPlayer } from '@ionic-native/video-player';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Network } from '@ionic-native/network';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { Stepcounter } from '@ionic-native/stepcounter';

import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const config = {

}

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
    ProfileTab,
    ChatGroupPage,
    ChatListPage,
    ChatCreatePage,
    ChatContactPage,
    ChatInfoPage,
    ChatPhoneContactPage,
    ChatImagePage,
    ChatPhoneListPage,
    ClassroomaddPage,
    ClassroomviewPage,
    PrivacyPolicyPage,
    TermsConditionsPage,
    FAQPage,
    ContactUs,
    StaticPages
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule,
    GooglePlaceModule,
    IonicStorageModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp),
    EmojiPickerModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
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
    ProfileTab,
    ChatGroupPage,
    ChatListPage,
    ChatCreatePage,
    ChatContactPage,
    ChatInfoPage,
    ChatPhoneContactPage,
    ChatImagePage,
    ChatPhoneListPage,
    ClassroomaddPage,
    ClassroomviewPage,
    ContactUs,
    StaticPages,
    PrivacyPolicyPage,
    TermsConditionsPage,
    FAQPage
  ],
  providers: [
    IonicStorageModule,
    Students,
    Auth,
    Center,
    Indentation,
    File,
    Transfer,
    Camera,
    FilePath,
    CallNumber,
    Chats,
    Base64,
    Geolocation,
    FileChooser,
    MediaPlugin,
    Contacts,
    FileTransfer,
    NativeAudio,
    AndroidPermissions,
    FileOpener,
    VideoPlayer,
    BatteryStatus,
    Network,
    Classroom,
    StreamingMedia,
    Stepcounter,
    Firebase,
    FcmProvider,
  ]
})
export class AppModule { }