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
import { Classroom } from '../../providers/classroom/classroom';
import { Chats } from '../../providers/chats/chats';
import { Indentation } from '../../providers/indentation/indentation';
import { userInfo } from "os";
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

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
  latestClass: any;

  @ViewChild("classStudentsCanvas") classStudentsCanvas: ElementRef;
  @ViewChild("centerStudentsCanvas") centerStudentsCanvas: ElementRef;
  @ViewChild("classTypeStudentsCanvas") classTypeStudentsCanvas: ElementRef;
  classStudents: Chart;
  centerStudents: Chart;
  classTypeStudents: Chart;

  languageList = [
    'Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujrati', 'Hindi', 'Kannada', 'Kashmiri', 'Konkani', 'Maithili',
    'Malayalam', 'Hindi', 'Manipuri', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Hindi', 'Santali', 'Sindhi', 'Tamil', 'Telugu',
    'Urdu', 'Hindi', 'French', 'Nepali', 'Portuguese', 'Spanish', 'Chinese', 'Hindi'
  ];
  welcomeMessageList = [
    'Namoskar', 'Nomoshkar', 'Gojown Fwi', 'Namaste ji', 'Namaste', 'Namaskar', 'Namaskara', 'Namaskar',
    'Namaskara', 'Pranaam', 'Namaskaram', 'Namaskar', 'Khurumjari', 'Namaskaram', 'Namascara', 'Sat Shri Akaal',
    'Namaste', 'Namaskar', 'Henda Ho', 'Salaam', 'Vanakkam', 'Namaskaram', 'Aadaab', 'Namaskar', 'Bonjour',
    'Namastē', 'Olá', 'Hola', 'Nǐ hǎo', 'Namaskar'
  ];

  rand = Math.round((Math.random() * 29) + 1);
  welcomeMessage = this.welcomeMessageList[this.rand];
  welcomeLanguage = this.languageList[this.rand];

  now: any = new Date();
  start: any = new Date(this.now.getFullYear(), 0, 0);
  day: any = Math.floor((this.now - this.start) / (1000 * 60 * 60 * 24)) - 175;

  messages = [
    "It is impossible for most people to lick their own elbow. (try it!)",
    "A crocodile cannot stick its tongue out.",
    "A shrimp's heart is in its head.",
    "It is physically impossible for pigs to look up into the sky.",
    "The \"sixth sick sheik's sixth sheep's sick\" is believed to be the toughest tongue twister in the English language.",
    "If you sneeze too hard, you could fracture a rib.",
    "Wearing headphones for just an hour could increase the bacteria in your ear by 700 times.",
    "In the course of an average lifetime, while sleeping you might eat around 70 assorted insects and 10 spiders, or more.",
    "Some lipsticks contain fish scales.",
    "Cat urine glows under a black-light.",
    "Like fingerprints, everyone's tongue print is different.",
    "Rubber bands last longer when refrigerated.",
    "There are 293 ways to make change for a dollar.",
    "The average person's left hand does 56% of the typing (when using the proper position of the hands on the keyboard; Hunting and pecking doesn't count!).",
    "A shark is the only known fish that can blink with both eyes.",
    "\"Dreamt\" is the only English word that ends in the letters \"mt\".",
    "Almonds are a member of the peach family.",
    "Maine is the only state that has a one-syllable name.",
    "There are only four words in the English language which end in \"dous\": tremendous, horrendous, stupendous, and hazardous.",
    "Los Angeles' full name is \"El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula\"",
    "A cat has 32 muscles in each ear.",
    "An ostrich's eye is bigger than its brain.",
    "Tigers have striped skin, not just striped fur.",
    "The longest one-syllable words in the English language are \"scraunched\" and \"strengthed.\" Some suggest that \"squirreled\" could be included, but squirrel is intended to be pronounced as two syllables (squir-rel) according to most dictionaries. \"Screeched\" and \"strengths\" are two other long one-syllable words, but they only have 9 letters.",
    "The characters Bert and Ernie on Sesame Street were named after Bert the cop and Ernie the taxi driver in Frank Capra's \"It's a Wonderful Life.\"",
    "In many advertisements, the time displayed on a watch is 10:10.",
    "A dime has 118 ridges around the edge.",
    "The giant squid has the largest eyes in the world.",
    "Most people fall asleep in seven minutes.",
    "\"Stewardesses\" is the longest word that is typed with only the left hand.",
    "You fart on average 14 times a day, and each fart travels from your body at 7 mph.",
    "One of the ingredients needed to make dynamite is peanuts.",
    "The largest living organism in the world is a fungus, it is in Oregon, covering 2,200 acres and is still growing.",
    "Kangaroos can not walk backwards.",
    "Want chocolate smelling poo?  There is a pill for that.",
    "The shortest war in history lasted for only 38 minutes.",
    "Sea Lions have rythmn.  They are the only animal known to be able to clap in beat.",
    "While you sleep you can’t smell anything, even really, really bad or potent smells.",
    "Some tumors can grow hair, teeth, bones, even fingernails.",
    "Your brain uses 10 watts of energy to think, and does not feel pain.",
    "Glass balls can bounce higher than rubber ones.",
    "The smallest country in the world takes up .2 square miles, it is the Vatican City.",
    "Hippopotamus milk is pink.",
    "Your fingernails grow faster when you are cold.",
    "Applesauce was the first food eatten in space by astronauts.",
    "Snails take the longest naps, some lasting as long as three years.",
    "The average person spends two weeks of their life waiting at traffic lights.",
    "Before 1913 parents could mail their kids to Grandma’s – through the postal service.",
    "Don’t like mosquitos?  Get a bat.  They eat 3,000 insects a night.",
    "A typical cough is 60 mph, a sneeze is often faster than 100 mph.",
    "Some fish cough.  Really.",
    "Are you terrified  that a duck is watching you?  Some people are.  That is Anatidaephobia.",
    "Goats have rectangular pupils in their eyes.",
    "There are 31,556,926 seconds in a year.",
    "Cans of diet soda will float in water, regular soda cans will sink.",
    "Birds can not live in space – they need gravity or they can not swallow.",
    "Some perfumes actually have whale poo in them.",
    "Your feet typically produce a pint of sweat every single day.",
    "On Venus, the planet, it rains metal.",
    "Baby koalas are fed poo by their parents after they are born, this helps them digest Eucalyptus leaves later in life.",
    "Of all the oxygen you breathe 20% of it is used by your brain.",
    "You can cut a pie into 8 pieces, with only three cuts.",
    "If a Donkey and a Zebra have a baby, it is called a Zonkey.",
    "Llanfairpwllgwyngyllgogerychwyrndrobwyll llantysiliogogogoch is the hardest to pronounce town – you can visit it in Wales.",
    "A tsunami can travel as fast as a jet plane.",
    "In a room with 23 other people, there is a 50% chance that two of the people in the room will share a birthday.",
    "All babies are born with blue eyes.",
    "When you look at a bright sky and see white dots, you are looking at your blood.  Those are white blood cells.",
    "Your small intestine is the largest internal organ in your body.",
    "Love carrots?  Don’t eat too many or you will turn orange.",
    "Cows can walk up stairs, but not down them.",
    "Tiger shark embryos begin attacking eachother before they are even born, in their mother’s womb.",
    "The surface of Mars is covered in rust, making the planet appear red."
  ];

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
    public indentationService: Indentation,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public http: Http,
    public streamingMedia: StreamingMedia,
    public classroomService: Classroom
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      cssClass: 'custom-class custom-loading',
      spinner: 'bubbles',
    });

    this.storage.get('user').then((user) => {
      this.user = user;

      if (this.user.role == 'admin' || this.user.role == 'centerAdmin' || this.user.role == 'counsellor') {
        this.loading.present();
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
          this.loading.dismiss();
        });
      }

      if (this.user.role == 'teacher' || this.user.role == 'parent') {
        this.loading.present();
        this.classroomService.searchClassroom().then((result) => {
          result = _.filter(result, function (o) {
            return (o.class_group === user.class_group[0] && o.center === user.center);
          });
          result = _.orderBy(result, ['created_date'],['desc']);
          this.latestClass = result[0];

          this.centerService.searchCenter().then((data) => {
            this.centersList = _.filter(data, function (o) {
              return (o.center_code === user.center);
            });
            this.loading.dismiss();
          });
        }, (err) => {
          console.log(err);
          this.loading.dismiss();
        });
      }

    });

  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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

  async presentAlert(title, message) {
    const alert = await this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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


  playVideo(classroom) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming' + JSON.stringify(e)) },
      orientation: 'landscape',
    };
    this.streamingMedia.playVideo(classroom.video_src, options);
  }

}
