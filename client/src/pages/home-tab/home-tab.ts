import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  ModalController,
  AlertController,
  ActionSheetController,
  ToastController,
  Platform,
  App,
  MenuController,
  LoadingController
} from 'ionic-angular';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Http, Headers } from '@angular/http';
import { Chart } from 'chart.js';
import Swiper from 'swiper';

// Providers
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { Center } from '../../providers/center/center';
import { Networks } from '../../providers/network/network';
import { Indentation } from '../../providers/indentation/indentation';
import { userInfo } from "os";

interface Window {
  resolveLocalFileSystemURL: any;
}
declare var window: Window;

@Component({
  selector: 'home-tab',
  templateUrl: './home-tab.html'
})

export class HomeTab {

  loading: any;

  user: any = [];
  studentsList: any = [];
  usersList: any = [];
  centersList: any = [];
  indentationList: any = [];

  marketingNumber: Number = 0;
  marketingThisYearNumber: Number = 0;
  conversionNumber: Number = 0;
  studentNumber: Number = 0;
  lastYearStudentNumber: Number = 0;
  pendingIndentationNumber: Number = 0;
  totalIndentations: Number = 0;
  totalOpenIndentations: Number = 0;
  totalIndentationsAmount: Number = 0;
  todayBirthdayStudents: any = [];

  @ViewChild("classStudentsCanvas") classStudentsCanvas: ElementRef;
  @ViewChild("centerStudentsCanvas") centerStudentsCanvas: ElementRef;
  @ViewChild("classTypeStudentsCanvas") classTypeStudentsCanvas: ElementRef;
  classStudents: Chart;
  centerStudents: Chart;
  classTypeStudents: Chart;

  constructor(
    public navCtrl: NavController,
    public studentService: Students,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public menu: MenuController,
    public centerService: Center,
    public networkService: Networks,
    public indentationService: Indentation,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public http: Http
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      cssClass: 'custom-class custom-loading',
      spinner: 'bubbles',
    });
    this.loading.present();

    this.storage.get('user').then((user) => {
      this.user = user;
    });

    this.studentService.getAllStudents().then((data) => {
      this.studentsList = data;

      this.authService.searchUser().then((data) => {
        this.usersList = data;

        this.centerService.searchCenter().then((data) => {
          this.centersList = data;

          this.indentationService.searchIndentation().then((data) => {
            this.indentationList = data;

            this.loading.dismiss();
            this.massageData();
          });

        });

      });

    }, (err) => {
      console.log("not allowed");
    });

  }


  massageData() {
    if (this.user.role == 'admin') {
      this.getAdminMarketing();
      this.getAdminConversion();
      this.getAdminCurrentStudents();
      this.getAdminLastYearStudents();
      this.getAdminPendingIndentations();
      this.getAdminStudentsClasswise();
      this.getAdminStudentsCenterwise();
      this.getAdminIndentations();
      this.getAdminStudentsClassTypewise();
      this.getAdminTodayBirthday();
    } else if (this.user.role == 'centerAdmin') {
      this.getCenterAdminMarketing();
      this.getCenterAdminConversion();
      this.getCenterAdminCurrentStudents();
      this.getCenterAdminLastYearStudents();
      this.getCenterAdminPendingIndentations();
      this.getCenterAdminStudentsClasswise();
      this.getCenterAdminIndentations();
      this.getCenterAdminStudentsClassTypewise();
      this.getCenterAdminTodayBirthday();
    } else if (this.user.role == 'counsellor') {
      this.getCounsellorMarketing();
      this.getCounsellorConversion();
      this.getCenterAdminCurrentStudents();
      this.getCenterAdminLastYearStudents();
      this.getCenterAdminPendingIndentations();
      this.getCenterAdminStudentsClasswise();
      this.getCounsellorIndentations();
      this.getCenterAdminStudentsClassTypewise();
      this.getCenterAdminTodayBirthday();
    } else if (this.user.role == 'dispatcher') {
      this.getAdminIndentations();
    } else if (this.user.role == 'teacher') {

    } else if (this.user.role == 'parent') {

    }

    // Swiper settings
    var mySwiper = new Swiper('.swiper-container', {
      cssMode: true,
      loop: true,
      slidesPerView: 3,
      speed: 3,
      autoplay: true,
      on: {
        init: function () {
          console.log('swiper initialized');
        },
      },
    });
    mySwiper.on('slideChange', function () {
      console.log('slide changed');
    });
    mySwiper.init();
    mySwiper.autoplay.start();
  }



  // Admin
  getAdminMarketing() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active
    });
    this.marketingNumber = filterLength.length;
    this.marketingThisYearNumber = filterLength.filter(student => {
      return student.study_year == study_year
    }).length;
  }

  getAdminConversion() {
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.status != 'enquiry'
    });
    this.conversionNumber = filterLength.length;
  }

  getAdminCurrentStudents() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year
    });
    this.studentNumber = filterLength.length;
  }

  getAdminLastYearStudents() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    current_year--;
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return student.status != 'enquiry' && student.study_year == study_year
    });
    this.lastYearStudentNumber = filterLength.length;
  }

  getAdminPendingIndentations() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.status == 'confirmed' && student.study_year == study_year
    });
    this.pendingIndentationNumber = filterLength.length;
  }

  getAdminStudentsClasswise() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year
    });
    const play = filterLength.filter(student => {
      return student.class_group == 'Play Group'
    });
    const nursery = filterLength.filter(student => {
      return student.class_group == 'Nursery'
    });
    const lkg = filterLength.filter(student => {
      return student.class_group == 'LKG'
    });
    const ukg = filterLength.filter(student => {
      return student.class_group == 'UKG'
    });
    this.plotClassStudents(play.length, nursery.length, lkg.length, ukg.length);
  }

  getAdminStudentsCenterwise() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    let data = [];
    let labels = [];
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year
    });
    for (var c = 0; c < this.centersList.length; c++) {
      const result = filterLength.filter(student => {
        return student.center == this.centersList[c].center_code
      });
      if (result.length > 0) {
        data.push(result.length);
        labels.push(this.centersList[c].center_code);
      }
    }
    this.plotCenterStudents(labels, data);
  }

  getAdminIndentations() {
    this.totalIndentations = this.indentationList.length;
    this.totalOpenIndentations = this.indentationList.filter(ind => {
      return ind.status != 'closed'
    }).length;
    this.totalIndentationsAmount = this.sumOf(this.indentationList, 'total_amount');
  }

  getAdminTodayBirthday() {
    this.todayBirthdayStudents = this.studentsList.filter(stu => {
      return this.datecompare(stu.dob) && stu.is_Active && !stu.deleted && stu.is_Indented
    });
  }

  getAdminStudentsClassTypewise() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year
    });
    const annual = filterLength.filter(student => {
      return student.class_type == 'Annual'
    });
    const mid = filterLength.filter(student => {
      return student.class_type == 'Mid-term'
    });
    const early = filterLength.filter(student => {
      return student.class_type == 'Early start'
    });
    this.plotClasswiseStudents(annual.length, mid.length, early.length);
  }



  // Center Admin
  getCenterAdminMarketing() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.center == this.user.center
    });
    this.marketingNumber = filterLength.length;
    this.marketingThisYearNumber = filterLength.filter(student => {
      return student.study_year == study_year
    }).length;
  }

  getCenterAdminConversion() {
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.center == this.user.center && student.status != 'enquiry'
    });
    this.conversionNumber = filterLength.length;
  }

  getCenterAdminCurrentStudents() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.center == this.user.center && student.status != 'enquiry' && student.study_year == study_year
    });
    this.studentNumber = filterLength.length;
  }

  getCenterAdminLastYearStudents() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    current_year--;
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return student.status != 'enquiry' && student.study_year == study_year && student.center == this.user.center
    });
    this.lastYearStudentNumber = filterLength.length;
  }

  getCenterAdminPendingIndentations() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.center == this.user.center && student.status == 'confirmed' && student.study_year == study_year
    });
    this.pendingIndentationNumber = filterLength.length;
  }

  getCenterAdminStudentsClasswise() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.center == this.user.center && student.status != 'enquiry' && student.study_year == study_year
    });
    const play = filterLength.filter(student => {
      return student.class_group == 'Play Group'
    });
    const nursery = filterLength.filter(student => {
      return student.class_group == 'Nursery'
    });
    const lkg = filterLength.filter(student => {
      return student.class_group == 'LKG'
    });
    const ukg = filterLength.filter(student => {
      return student.class_group == 'UKG'
    });
    this.plotClassStudents(play.length, nursery.length, lkg.length, ukg.length);
  }

  getCenterAdminIndentations() {
    const indList = this.indentationList.filter(ind => {
      return ind.center_code == this.user.center
    })
    this.totalIndentations = indList.length;
    this.totalOpenIndentations = indList.filter(ind => {
      return ind.status != 'closed'
    }).length;
    this.totalIndentationsAmount = this.sumOf(indList, 'total_amount');
  }

  getCenterAdminTodayBirthday() {
    this.todayBirthdayStudents = this.studentsList.filter(stu => {
      return this.datecompare(stu.dob) && stu.is_Active && !stu.deleted && stu.is_Indented && stu.center == this.user.center
    });
  }

  getCenterAdminStudentsClassTypewise() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year && student.center == this.user.center
    });
    const annual = filterLength.filter(student => {
      return student.class_type == 'Annual'
    });
    const mid = filterLength.filter(student => {
      return student.class_type == 'Mid-term'
    });
    const early = filterLength.filter(student => {
      return student.class_type == 'Early start'
    });
    this.plotClasswiseStudents(annual.length, mid.length, early.length);
  }



  // Counsellor
  getCounsellorMarketing() {
    let current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
    if (new Date().getMonth() < 3) current_year--;
    const study_year = '20' + current_year + '-' + (current_year + 1);
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.counsellor == this.user.email
    });
    this.marketingNumber = filterLength.length;
    this.marketingThisYearNumber = filterLength.filter(student => {
      return student.study_year == study_year
    }).length;
  }

  getCounsellorConversion() {
    const filterLength = this.studentsList.filter(student => {
      return !student.deleted && student.is_Active && student.counsellor == this.user.email && student.status != 'enquiry'
    });
    this.conversionNumber = filterLength.length;
  }

  getCounsellorIndentations() {
    const indList = this.indentationList.filter(ind => {
      return ind.email == this.user.email
    })
    this.totalIndentations = indList.length;
    this.totalOpenIndentations = indList.filter(ind => {
      return ind.status != 'closed'
    }).length;
    this.totalIndentationsAmount = this.sumOf(indList, 'total_amount');
  }



  // Dispatcher



  // Graphs
  plotClassStudents(play, nursery, lkg, ukg) {
    this.classStudents = new Chart(this.classStudentsCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Playgroup", "Nursery", "LKG", "UKG"],
        datasets: [
          {
            label: "# of Students",
            data: [play, nursery, lkg, ukg],
            fillOpacity: 0,
            backgroundColor: ['#003f5c', '#58508d', '#ef5675', '#ffa600'],
            hoverBackgroundColor: ['#003f5c', '#58508d', '#ef5675', '#ffa600'],
          }
        ]
      },
    });
  }

  plotCenterStudents(labels, data) {
    this.centerStudents = new Chart(this.centerStudentsCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# of Students",
            data: data,
            fillOpacity: 0,
            backgroundColor: 'blue',
            hoverBackgroundColor: 'blue',
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  plotClasswiseStudents(annual, midterm, early) {
    this.classTypeStudents = new Chart(this.classTypeStudentsCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Annual", "Mid-Term", "Early Start"],
        datasets: [
          {
            label: "# of Students",
            data: [annual, midterm, early],
            fillOpacity: 0,
            backgroundColor: ['#003f5c', '#58508d', '#ef5675', '#ffa600'],
            hoverBackgroundColor: ['#003f5c', '#58508d', '#ef5675', '#ffa600'],
          }
        ]
      },
    });
  }



  // Common
  checkClass(a, b) {
    const val = a / b * 100;
    if (val <= 33.33) return 'low-class';
    if (val >= 66.66) return 'high-class';
    if (val > 33.33 && val < 66.66) return 'medium-class';
    return 'no-class';
  }

  sumOf = function (items, prop) {
    return items.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  };

  datecompare = function (date1) {
    if (date1 == undefined) return false;
    var day1 = moment(date1).format('D');
    var mon1 = moment(date1).format('M');
    var date2 = new Date();
    var day2 = moment(date2).format('D');
    var mon2 = moment(date2).format('M');
    if (day1 === day2 && mon1 == mon2) return true;
    else return false;
  }

}
