webpackJsonp([1],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CenterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_center_center__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CenterPage = (function () {
    function CenterPage(navCtrl, centerService, loading, app, menu, modalCtrl, alertCtrl, actionSheetCtrl, toastCtrl, platform) {
        this.navCtrl = navCtrl;
        this.centerService = centerService;
        this.loading = loading;
        this.app = app;
        this.menu = menu;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.active = true;
        this.cash = false;
        this.btnText = "Save";
        this.playgroup = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
        this.nursery = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
        this.lkg = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
        this.ukg = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
    }
    CenterPage.prototype.ionViewDidLoad = function () {
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.getCenters();
    };
    // Function to save new center
    CenterPage.prototype.save = function () {
        var _this = this;
        this.loader.present();
        var center = {
            center_name: this.center_name,
            center_code: this.center_code,
            center_phoneno: this.center_phoneno,
            center_email: this.center_email,
            center_address: this.center_address,
            active: this.active,
            cash: this.cash,
            playgroup: this.playgroup,
            nursery: this.nursery,
            lkg: this.lkg,
            ukg: this.ukg
        };
        this.centerService.createCenter(center).then(function (result) {
            _this.reset();
            _this.getCenters();
            _this.loader.dismiss();
            _this.presentToast('Center data saved successfully');
        }, function (err) {
            _this.loader.dismiss();
            _this.presentToast('Error! Please try again.');
        });
    };
    // Function to update existing center
    CenterPage.prototype.update = function () {
        var _this = this;
        this.loader.present();
        var center = {
            center_name: this.center_name,
            center_code: this.center_code,
            center_phoneno: this.center_phoneno,
            center_email: this.center_email,
            center_address: this.center_address,
            active: this.active,
            cash: this.cash,
            playgroup: this.playgroup,
            nursery: this.nursery,
            lkg: this.lkg,
            ukg: this.ukg,
            _id: this.center_id
        };
        this.centerService.updateCenter(center).then(function (result) {
            _this.reset();
            _this.getCenters();
            _this.loader.dismiss();
            _this.mySelect = null;
            _this.presentToast('Center data saved successfully');
        }, function (err) {
            _this.loader.dismiss();
            _this.presentToast('Error! Please try again.');
        });
    };
    CenterPage.prototype.reset = function () {
        this.center_name = "";
        this.center_code = "";
        this.center_phoneno = "";
        this.center_email = "";
        this.center_address = "";
        this.active = true;
        this.cash = false;
        this.btnText = "Save";
        this.myInput = "";
        this.center_id = "";
        this.playgroup = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
        this.nursery = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
        this.lkg = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
        this.ukg = {
            annual: 0,
            mid_term: 0,
            early_start: 0
        };
    };
    CenterPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Function to get list of all the centers
    CenterPage.prototype.getCenters = function () {
        var _this = this;
        this.centers = [];
        this.centerService.searchCenter().then(function (result) {
            _this.centers = result;
        }, function (err) {
            console.log(err);
        });
    };
    // Function to make email small letters on change
    CenterPage.prototype.onEmailChange = function () {
        this.center_email = this.center_email.toLowerCase();
    };
    // Function to search for a center dynamically based on an input
    CenterPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.centers.length; i++) {
            if (this.centers[i].center_name.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) {
                result.push(this.centers[i]);
            }
            else if (this.centers[i].center_code.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) {
                result.push(this.centers[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_2_lodash__["includes"](this.centers[i].center_phoneno, this.myInput)) {
                result.push(this.centers[i]);
            }
            else if (this.centers[i].center_email.toUpperCase().indexOf(this.myInput.toUpperCase()) >= 0) {
                result.push(this.centers[i]);
            }
        }
        if (result && result.length === 1) {
            this.center_name = result[0].center_name;
            this.center_code = result[0].center_code;
            this.center_phoneno = result[0].center_phoneno;
            this.center_email = result[0].center_email;
            this.center_address = result[0].center_address;
            this.active = result[0].active;
            this.cash = result[0].cash;
            this.playgroup = result[0].playgroup;
            this.nursery = result[0].nursery;
            this.lkg = result[0].lkg;
            this.ukg = result[0].ukg;
            this.center_id = result[0]._id;
            this.btnText = "Update";
        }
        else {
            this.center_name = "";
            this.center_code = "";
            this.center_phoneno = "";
            this.center_email = "";
            this.center_address = "";
            this.active = true;
            this.cash = false;
            this.center_id = "";
            this.playgroup = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
            this.nursery = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
            this.lkg = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
            this.ukg = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
        }
    };
    CenterPage.prototype.onSelectChange = function () {
        var result = [];
        for (var i = 0; i < this.centers.length; i++) {
            if (this.centers[i].center_name == this.mySelect)
                result.push(this.centers[i]);
        }
        if (result && result.length === 1) {
            this.center_name = result[0].center_name;
            this.center_code = result[0].center_code;
            this.center_phoneno = result[0].center_phoneno;
            this.center_email = result[0].center_email;
            this.center_address = result[0].center_address;
            this.active = result[0].active;
            this.cash = result[0].cash;
            this.center_id = result[0]._id;
            this.playgroup = result[0].playgroup;
            this.nursery = result[0].nursery;
            this.lkg = result[0].lkg;
            this.ukg = result[0].ukg;
            this.btnText = "Update";
        }
        else {
            this.center_name = "";
            this.center_code = "";
            this.center_phoneno = "";
            this.center_email = "";
            this.center_address = "";
            this.active = true;
            this.cash = false;
            this.center_id = "";
            this.playgroup = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
            this.nursery = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
            this.lkg = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
            this.ukg = {
                annual: 0,
                mid_term: 0,
                early_start: 0
            };
        }
    };
    // Function to generate unique center code
    CenterPage.prototype.generateCode = function () {
        var fields = this.center_name.split(' ');
        var str = "";
        if (fields.length > 1) {
            var temp1 = fields[0];
            var temp2 = fields[1];
            if (temp1.length > 0)
                str += temp1[0];
            if (temp1.length > 1) {
                str += temp1[1];
                if (temp2.length > 0) {
                    str += temp2[0];
                }
                else if (temp.length > 2)
                    str += temp[2];
            }
            else if (temp2.length > 2) {
                str += temp2[0];
                str += temp2[1];
            }
        }
        else {
            var temp = fields[0];
            if (temp.length > 0)
                str += temp[0];
            if (temp.length > 1)
                str += temp[1];
            if (temp.length > 2)
                str += temp[2];
        }
        this.center_code = str.toUpperCase();
    };
    CenterPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    return CenterPage;
}());
CenterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'center-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/center/center.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <ion-buttons left>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  	<!-- <ion-buttons start>\n		  <button ion-button icon-only (click)="openHomePage()"><ion-icon name="close"></ion-icon></button>\n  	</ion-buttons> -->\n    <ion-title>Centers</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="search-row">\n      	<ion-searchbar\n      		  [(ngModel)]="myInput"\n      		  (animated)="true"\n      		  (placeholder)="Search"\n      		  (ionInput)="search()">\n      	</ion-searchbar>\n        <ion-select interface="popover" [(ngModel)]="mySelect" (ionChange)="onSelectChange()" class="search-ic">\n          <ion-option *ngFor="let center of centers" [value]="center.center_name">{{center.center_name}}</ion-option>\n        </ion-select>\n    </div>\n\n    <ion-row class="account-form">\n        <ion-col>\n            <ion-list inset>\n \n                <ion-item>\n                    <ion-label><ion-icon name="paper-plane"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="center_name" (ionChange)="generateCode()" placeholder="Center Name" required type="string"></ion-input>\n                </ion-item>\n \n                <ion-item>\n                    <h3> Center Code: {{ center_code }} </h3>\n                </ion-item>\n \n               <ion-item>\n                    <ion-label><ion-icon name="call"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="center_phoneno" placeholder="Center Phone No" required type="string"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label><ion-icon name="mail"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="center_email" placeholder="Center E-Mail" (ionChange)="onEmailChange()" required type="string"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label><ion-icon name="locate"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="center_address" placeholder="Center Address" required type="string"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label>Active</ion-label>\n                  <ion-toggle [(ngModel)]="active" checked="true" class="toggle-large"></ion-toggle>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label>Cash</ion-label>\n                  <ion-toggle [(ngModel)]="cash" checked="false" class="toggle-large"></ion-toggle>\n                </ion-item>\n\n\n                <h4> Playgroup</h4>\n\n                <ion-item>\n                  <ion-label color="primary">Annual</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="playgroup.annual" required></ion-input>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label color="primary">Mid-term</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="playgroup.mid_term" required></ion-input>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label color="primary">Early start</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="playgroup.early_start" required></ion-input>\n                </ion-item>\n\n\n                <h4> Nursery</h4>\n\n                <ion-item>\n                  <ion-label color="primary">Annual</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="nursery.annual" required></ion-input>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label color="primary">Mid-term</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="nursery.mid_term" required></ion-input>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label color="primary">Early start</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="nursery.early_start" required></ion-input>\n                </ion-item>\n\n\n                <h4> LKG</h4>\n\n                <ion-item>\n                  <ion-label color="primary">Annual</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="lkg.annual" required></ion-input>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label color="primary">Mid-term</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="lkg.mid_term" required></ion-input>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label color="primary">Early start</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="lkg.early_start" required></ion-input>\n                </ion-item>\n\n\n                <h4> UKG</h4>\n\n                <ion-item>\n                  <ion-label color="primary">Annual</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="ukg.annual" required></ion-input>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label color="primary">Mid-term</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="ukg.mid_term" required></ion-input>\n                </ion-item>\n\n                <ion-item style="margin-bottom: 100px;">\n                  <ion-label color="primary">Early start</ion-label>\n                  <ion-input type="number" placeholder="Enter Number" [(ngModel)]="ukg.early_start" required></ion-input>\n                </ion-item>\n\n            </ion-list>\n \n        </ion-col>\n    </ion-row>\n \n</ion-content>\n\n<ion-footer>\n  <div class="gm_drawer_footer_wrapper"> \n    <button ion-button (click)="save()" *ngIf="btnText == \'Save\'" class="continue-button">{{ btnText }}</button>\n    <button ion-button (click)="update()" *ngIf="btnText != \'Save\'" class="continue-button">{{ btnText }}</button>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/center/center.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
], CenterPage);

//# sourceMappingURL=center.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__editstudent_editstudent__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var IndentPage = (function () {
    function IndentPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loading, storage, centerService, indentationService, toastCtrl, CallNumber, actionSheetController) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loading = loading;
        this.storage = storage;
        this.centerService = centerService;
        this.indentationService = indentationService;
        this.toastCtrl = toastCtrl;
        this.CallNumber = CallNumber;
        this.actionSheetController = actionSheetController;
        this.indented_students = [];
        this.confirm_indent = false;
        this.isCash = false;
        this.total_amount = 0;
        this.payment_date = __WEBPACK_IMPORTED_MODULE_11_moment__().format("YYYY-MM-DD");
        this.students_amount = [];
        this.today_date = __WEBPACK_IMPORTED_MODULE_11_moment__().format("YYYY-MM-DD");
    }
    IndentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.studentService.getStudents().then(function (data) {
            _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](data, function (o) {
                return (o.status == 'confirmed' && !o.is_Indented);
            });
            _this.storage.get('user').then(function (user) {
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](_this.students, function (o) {
                    return (o.center == user.center);
                });
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["sortBy"](_this.students, 'enquiry_date');
                _this.studentsList = __WEBPACK_IMPORTED_MODULE_9_lodash__["sortBy"](_this.students, 'enquiry_date');
            });
        }, function (err) {
            console.log("not allowed");
        });
        this.centerService.searchCenter().then(function (centers) {
            _this.storage.get('user').then(function (user) {
                _this.email = user.email;
                _this.center_code = user.center;
                _this.user_center = __WEBPACK_IMPORTED_MODULE_9_lodash__["find"](centers, ['center_code', user.center]);
                _this.isCash = _this.user_center.cash;
            });
        });
    };
    IndentPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    IndentPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
    };
    IndentPage.prototype.edit = function (student) {
        this.storage.set('edit_student', student._id);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__editstudent_editstudent__["a" /* EditstudentPage */]);
    };
    IndentPage.prototype.indent = function (student) {
        console.log(this.today_date);
        this.indented_students.push(student);
        for (var i = 0; i < this.students.length; i++) {
            if (this.students[i] === student)
                this.students[i].indented = true;
        }
        this.addAmount(student);
    };
    IndentPage.prototype.unindent = function (student) {
        var s = -1;
        for (var i = 0; i < this.indented_students.length; i++) {
            if (this.indented_students[i] === student) {
                s = i;
                break;
            }
        }
        this.indented_students.splice(s, 1);
        for (var k = 0; k < this.students.length; k++) {
            if (this.students[k] === student)
                delete this.students[k].indented;
        }
        this.subtractAmount(student);
    };
    IndentPage.prototype.addAmount = function (student) {
        if (student.class_group === 'Play Group') {
            if (student.class_type === "Annual")
                this.total_amount += Number(this.user_center.playgroup.annual);
            if (student.class_type === "Mid-term")
                this.total_amount += Number(this.user_center.playgroup.mid_term);
            if (student.class_type === "Early start")
                this.total_amount += Number(this.user_center.playgroup.early_start);
        }
        else if (student.class_group === 'Nursery') {
            if (student.class_type === "Annual")
                this.total_amount += Number(this.user_center.nursery.annual);
            if (student.class_type === "Mid-term")
                this.total_amount += Number(this.user_center.nursery.mid_term);
            if (student.class_type === "Early start")
                this.total_amount += Number(this.user_center.nursery.early_start);
        }
        else if (student.class_group === 'LKG') {
            if (student.class_type === "Annual")
                this.total_amount += Number(this.user_center.lkg.annual);
            if (student.class_type === "Mid-term")
                this.total_amount += Number(this.user_center.lkg.mid_term);
            if (student.class_type === "Early start")
                this.total_amount += Number(this.user_center.lkg.early_start);
        }
        else if (student.class_group === 'UKG') {
            if (student.class_type === "Annual")
                this.total_amount += Number(this.user_center.ukg.annual);
            if (student.class_type === "Mid-term")
                this.total_amount += Number(this.user_center.ukg.mid_term);
            if (student.class_type === "Early start")
                this.total_amount += Number(this.user_center.ukg.early_start);
        }
    };
    IndentPage.prototype.subtractAmount = function (student) {
        if (student.class_group === 'Play Group') {
            if (student.class_type === "Annual")
                this.total_amount -= this.user_center.playgroup.annual;
            if (student.class_type === "Mid-term")
                this.total_amount -= this.user_center.playgroup.mid_term;
            if (student.class_type === "Early start")
                this.total_amount -= this.user_center.playgroup.early_start;
        }
        else if (student.class_group === 'Nursery') {
            if (student.class_type === "Annual")
                this.total_amount -= this.user_center.nursery.annual;
            if (student.class_type === "Mid-term")
                this.total_amount -= this.user_center.nursery.mid_term;
            if (student.class_type === "Early start")
                this.total_amount -= this.user_center.nursery.early_start;
        }
        else if (student.class_group === 'LKG') {
            if (student.class_type === "Annual")
                this.total_amount -= this.user_center.lkg.annual;
            if (student.class_type === "Mid-term")
                this.total_amount -= this.user_center.lkg.mid_term;
            if (student.class_type === "Early start")
                this.total_amount -= this.user_center.lkg.early_start;
        }
        else if (student.class_group === 'UKG') {
            if (student.class_type === "Annual")
                this.total_amount -= this.user_center.ukg.annual;
            if (student.class_type === "Mid-term")
                this.total_amount -= this.user_center.ukg.mid_term;
            if (student.class_type === "Early start")
                this.total_amount -= this.user_center.ukg.early_start;
        }
    };
    IndentPage.prototype.findAmount = function (cg, ct) {
        if (cg === 'Play Group' && ct === 'Annual')
            return (this.user_center.playgroup.annual);
        else if (cg === 'Play Group' && ct === 'Mid-term')
            return (this.user_center.playgroup.mid_term);
        else if (cg === 'Play Group' && ct === 'Early start')
            return (this.user_center.playgroup.early_start);
        else if (cg === 'Nursery' && ct === 'Annual')
            return (this.user_center.nursery.annual);
        else if (cg === 'Nursery' && ct === 'Mid-term')
            return (this.user_center.nursery.mid_term);
        else if (cg === 'Nursery' && ct === 'Early start')
            return (this.user_center.nursery.early_start);
        else if (cg === 'LKG' && ct === 'Annual')
            return (this.user_center.lkg.annual);
        else if (cg === 'LKG' && ct === 'Mid-term')
            return (this.user_center.lkg.mid_term);
        else if (cg === 'LKG' && ct === 'Early start')
            return (this.user_center.lkg.early_start);
        else if (cg === 'UKG' && ct === 'Annual')
            return (this.user_center.ukg.annual);
        else if (cg === 'UKG' && ct === 'Mid-term')
            return (this.user_center.ukg.mid_term);
        else if (cg === 'UKG' && ct === 'Early start')
            return (this.user_center.ukg.early_start);
        else
            return 0;
    };
    IndentPage.prototype.indentStudents = function () {
        this.confirm_indent = !this.confirm_indent;
        this.setCheque();
    };
    IndentPage.prototype.setCash = function () {
        this.payment_mode = "cash";
    };
    IndentPage.prototype.setCheque = function () {
        this.payment_mode = "cheque";
    };
    IndentPage.prototype.setOnline = function () {
        this.payment_mode = "online";
    };
    IndentPage.prototype.reset = function () {
        var _this = this;
        this.indented_students = [];
        this.confirm_indent = false;
        this.total_amount = 0;
        this.payment_mode = "";
        this.payment_date = __WEBPACK_IMPORTED_MODULE_11_moment__().format("YYYY-MM-DD");
        this.bank_name = "";
        this.transaction_no = "";
        this.cheque_no = "";
        this.students_amount = [];
        this.studentService.getStudents().then(function (data) {
            _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](data, function (o) {
                return (o.status == 'confirmed' && !o.is_Indented);
            });
            _this.storage.get('user').then(function (user) {
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](_this.students, function (o) {
                    return (o.center == user.center);
                });
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["sortBy"](_this.students, 'enquiry_date');
            });
        }, function (err) {
            console.log("not allowed");
        });
    };
    IndentPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    // Function to search for a student dynamically based on an input
    IndentPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.studentsList.length; i++) {
            if (this.studentsList[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (this.studentsList[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_9_lodash__["includes"](this.studentsList[i].phone_number, this.myInput)) {
                result.push(this.studentsList[i]);
            }
        }
        this.students = result;
        if (this.myInput === "")
            this.students = this.studentsList;
    };
    IndentPage.prototype.confirmIndent = function () {
        var _this = this;
        this.loader.present();
        var indentation = {
            total_amount: this.total_amount,
            payment_mode: this.payment_mode,
            payment_date: __WEBPACK_IMPORTED_MODULE_11_moment__(this.payment_date, "YYYY-MM-DD").toDate(),
            bank_name: this.bank_name,
            transaction_no: this.transaction_no,
            cheque_no: this.cheque_no,
            email: this.email,
            center_code: this.center_code,
            students_amount: []
        };
        for (var is = 0; is < this.indented_students.length; is++) {
            var tempis = {
                student_id: this.indented_students[is].student_id,
                student_key: this.indented_students[is]._id,
                student_name: this.indented_students[is].name,
                phone_number: this.indented_students[is].phone_number,
                gender: this.indented_students[is].gender,
                class_group: this.indented_students[is].class_group,
                class_type: this.indented_students[is].class_type,
                uniform_size: this.indented_students[is].uniform_size,
                shoe_size: this.indented_students[is].shoe_size,
                amount: this.findAmount(this.indented_students[is].class_group, this.indented_students[is].class_type),
                is_dispatched: false
            };
            indentation.students_amount.push(tempis);
        }
        this.indentationService.createIndentation(indentation).then(function (result) {
            _this.loader.dismiss();
            _this.reset();
            _this.presentToast('Indentation successfull');
        }, function (err) {
            _this.loader.dismiss();
            _this.presentToast('Error! Please try again.');
        });
        for (var ik = 0; ik < this.indented_students.length; ik++) {
            this.indented_students[ik].status = "indented";
            this.indented_students[ik].is_Indented = true;
            this.indented_students[ik].admin_edit = false;
            delete this.indented_students[ik].indented;
            this.studentService.updateStudent(this.indented_students[ik]).then(function (result) {
                console.log('student data saved successfully');
            }, function (err) {
                console.log('student data saving failed');
            });
        }
    };
    IndentPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return IndentPage;
}());
IndentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'indent-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/indent/indent.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    INDENTATION\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="close"></ion-icon></button>\n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n \n<ion-content>\n\n  <div class="search-row search-full" *ngIf="!confirm_indent">\n      <ion-searchbar\n          [(ngModel)]="myInput"\n          (animated)="true"\n          (placeholder)="Search"\n          (ionInput)="search()"\n      ></ion-searchbar>\n  </div>\n\n  <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="!confirm_indent && students && !students.length" />\n  <h1 *ngIf="!confirm_indent && students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n  <ion-list *ngIf="!confirm_indent && students && students.length" style="margin-bottom: 50px;">\n \n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile indent_results" style="height:100%;">\n     \n        <button ion-item>\n          <div class="col_left indent_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student indent_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student indent_student"/></div>\n            <br/>\n            <h2 *ngIf="student.study_year != \'2020-21\'" style="color: red;"> You cannot indent this, admission is not for 2020-21 </h2>\n          </div>\n          <div class="col_right indent_right">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <h2>{{student.class_group}}</h2>\n            <h2><ion-icon name="clock"></ion-icon> {{student.confirmation_date | date: \'dd/MMM/yyyy\'}} </h2>\n            <h2><ion-icon name="book"></ion-icon> {{student.study_year}} </h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right" *ngIf="student.study_year == \'2020-21\'">\n          <button ion-button color="info" (click)="edit(student)">\n            <ion-icon name="create"></ion-icon>\n            Edit\n          </button>\n          <button ion-button color="secondary" (click)="indent(student)" *ngIf="!student.indented">\n            <ion-icon name="redo"></ion-icon>\n            Indent\n          </button>\n          <button ion-button color="danger" (click)="unindent(student)" *ngIf="student.indented">\n            <ion-icon name="undo"></ion-icon>\n            UnIndent\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n    </ion-item-sliding>\n\n  </ion-list>\n\n  <ion-list *ngIf="confirm_indent" style="margin-bottom: 50px;">\n\n    <div class="button-bar" *ngIf="isCash">\n        <a class="button button-positive button-indent" (click)="setCash()">Cash</a>\n        <a class="button button-positive button-indent" (click)="setCheque()">Cheque</a>\n        <a class="button button-positive button-indent" (click)="setOnline()">Online</a>\n    </div>\n\n    <div class="button-bar" *ngIf="!isCash">\n        <a class="button button-positive button-half" (click)="setCheque()">Cheque</a>\n        <a class="button button-positive button-half" (click)="setOnline()">Online</a>\n    </div>\n\n    <ion-list inset>\n\n        <ion-item>\n            <h3> Amount: {{ total_amount }} </h3>\n        </ion-item>\n\n        <ion-item>\n            <ion-label><ion-icon name="calendar"></ion-icon></ion-label>\n            <ion-datetime [(ngModel)]="payment_date" placeholder="Date of Payment" required displayFormat="DD/MMM/YYYY" ></ion-datetime>\n        </ion-item>\n \n        <ion-item *ngIf="payment_mode != \'cash\'">\n            <ion-label><ion-icon name="home"></ion-icon></ion-label>\n            <ion-input [(ngModel)]="bank_name" placeholder="Name of the bank" type="string"></ion-input>\n        </ion-item>\n\n        <ion-item *ngIf="payment_mode == \'online\'">\n            <ion-label><ion-icon name="card"></ion-icon></ion-label>\n            <ion-input [(ngModel)]="transaction_no" placeholder="Transaction No." type="string"></ion-input>\n        </ion-item>\n\n        <ion-item *ngIf="payment_mode == \'cheque\'">\n            <ion-label><ion-icon name="card"></ion-icon></ion-label>\n            <ion-input [(ngModel)]="cheque_no" placeholder="Cheque No." type="string"></ion-input>\n        </ion-item>\n\n    </ion-list>\n    \n  </ion-list>\n\n</ion-content>\n\n<ion-footer>\n    <div class="gm_drawer_footer_wrapper" *ngIf="!confirm_indent && students && students.length">\n      <div class="amt_button">\n        <p class="total_left"> \n            <em> &#8377; {{ total_amount }} </em>\n            <br/>\n            <span *ngIf="indented_students && indented_students.length"> {{ indented_students.length }} Students </span>\n        </p>\n      </div>\n      <button (click)="indentStudents()" [disabled]="!indented_students || !indented_students.length" ion-button class="btn-success">Indent</button>\n    </div>\n\n    <div class="gm_drawer_footer_wrapper" *ngIf="confirm_indent">\n      <button (click)="indentStudents()" ion-button class="btn-danger">Go Back</button>\n      <button (click)="confirmIndent()" ion-button class="btn-success">Confirm</button>\n    </div>\n</ion-footer>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/indent/indent.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__["a" /* Indentation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], IndentPage);

//# sourceMappingURL=indent.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditstudentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_path__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












// Files Images



var EditstudentPage = (function () {
    function EditstudentPage(navCtrl, studentService, centerService, modalCtrl, alertCtrl, authService, menu, loading, storage, app, CallNumber, toastCtrl, formBuilder, actionSheetController, camera, file, filePath, actionSheetCtrl, platform, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.centerService = centerService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.menu = menu;
        this.loading = loading;
        this.storage = storage;
        this.app = app;
        this.CallNumber = CallNumber;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.http = http;
        this.isEditable = true;
        this.submitAttempt = false;
        this.counter = false;
        this.locationOptions = [];
        this.isMatching = false;
        this.onNameChange = function () {
            _this.studentForm.value.name = _this.toTitleCase(_this.studentForm.value.name);
            _this.studentForm.value.name = _this.studentForm.value.name.replace(/\./g, ' ');
            _this.studentForm.controls['name'].setValue(_this.studentForm.value.name);
        };
        this.onEmailChange = function () {
            _this.studentForm.value.email_id = _this.studentForm.value.email_id.toLowerCase();
            _this.studentForm.value.email_id = _this.studentForm.value.email_id.replace(/\s/g, '');
            _this.studentForm.controls['email_id'].setValue(_this.studentForm.value.email_id);
            _this.checkMatching();
        };
        this.onPhoneChange = function () {
            _this.checkMatching();
        };
        this.save = function () {
            if (_this.studentForm.valid) {
                _this.loader.present();
                _this.student.name = _this.studentForm.value.name;
                _this.student.email_id = _this.studentForm.value.email_id;
                _this.student.phone_number = _this.studentForm.value.phone_number;
                _this.student.gender = _this.studentForm.value.gender;
                _this.student.dob = __WEBPACK_IMPORTED_MODULE_10_moment__(_this.studentForm.value.dob, "YYYY-MM-DD").toDate();
                _this.student.parent_name = _this.studentForm.value.parent_name;
                _this.student.alternate_contact = _this.studentForm.value.alternate_contact;
                _this.student.locality = _this.studentForm.value.locality;
                _this.student.study_year = _this.studentForm.value.study_year;
                _this.student.class_group = _this.studentForm.value.class_group;
                _this.student.uniform_size = _this.studentForm.value.uniform_size;
                _this.student.class_type = _this.studentForm.value.class_type;
                _this.student.shoe_size = _this.studentForm.value.shoe_size;
                _this.student.photo = _this.studentForm.value.photo;
                _this.studentService.editStudent(_this.student).then(function (result) {
                    _this.loader.dismiss();
                    _this.presentToast('student data updated successfully');
                    _this.add();
                }, function (err) {
                    _this.loader.dismiss();
                    _this.presentToast('Error! Please try again.');
                });
            }
        };
        this.takePhoto = function () {
            var actionSheet = _this.actionSheetCtrl.create({
                title: 'Select Image Source',
                buttons: [
                    {
                        text: 'Load from Library',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            actionSheet.present();
        };
        this.studentForm = formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            email_id: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            phone_number: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            gender: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            dob: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            parent_name: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            alternate_contact: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
            locality: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            study_year: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            class_group: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            class_type: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            uniform_size: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            shoe_size: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* Validators */].required])],
            photo: [''],
        });
    }
    EditstudentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.studentService.getStudents().then(function (data) {
            _this.studentsList = data;
            _this.students = data;
            _this.storage.get('user').then(function (user) {
                _this.students = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](_this.students, function (o) {
                    return (o.center == user.center);
                });
                _this.students = __WEBPACK_IMPORTED_MODULE_6_lodash__["sortBy"](_this.students, 'createdAt');
                _this.storage.get('edit_student').then(function (id) {
                    _this.student = _this.students.find(function (element) {
                        return element._id == id;
                    });
                    _this.studentForm.controls['name'].setValue(_this.student.name);
                    _this.studentForm.controls['email_id'].setValue(_this.student.email_id);
                    _this.studentForm.controls['phone_number'].setValue(_this.student.phone_number);
                    _this.studentForm.controls['gender'].setValue(_this.student.gender);
                    _this.studentForm.controls['dob'].setValue(_this.student.dob);
                    _this.studentForm.controls['parent_name'].setValue(_this.student.parent_name);
                    _this.studentForm.controls['alternate_contact'].setValue(_this.student.alternate_contact);
                    _this.studentForm.controls['locality'].setValue(_this.student.locality);
                    _this.studentForm.controls['study_year'].setValue(_this.student.study_year);
                    _this.studentForm.controls['class_group'].setValue(_this.student.class_group);
                    _this.studentForm.controls['uniform_size'].setValue(_this.student.uniform_size);
                    _this.studentForm.controls['class_type'].setValue(_this.student.class_type);
                    _this.studentForm.controls['shoe_size'].setValue(_this.student.shoe_size);
                });
                if (_this.student.is_Indented)
                    _this.isEditable = !_this.student.idCardPrinted;
                else
                    _this.isEditable = true;
            });
        }, function (err) {
            console.log("not allowed");
        });
    };
    EditstudentPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    // update(student) {
    //   this.storage.set('edit_student', student._id);
    //   this.navCtrl.setRoot(EditstudentPage);
    // }
    EditstudentPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    EditstudentPage.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    EditstudentPage.prototype.findDuplicates = function (data) {
        var result = [];
        data.forEach(function (element, index) {
            // Find if there is a duplicate or not
            if (data.indexOf(element, index + 1) > -1) {
                // Find if the element is already in the result array or not
                if (result.indexOf(element) === -1) {
                    result.push(element);
                }
            }
        });
        return result;
    };
    EditstudentPage.prototype.showConfirm = function (stu) {
        var _this = this;
        var msg = 'Name: ' + stu.name + '<br/> Email: ' + stu.email_id + "<br/> Phone: " + stu.phone_number + "<br/> Gender: " + stu.gender + "<br/> Parent: " + stu.parent_name + "<br/>Center: " + stu.center + "<br/> Confirm same student?";
        var confirm = this.alertCtrl.create({
            title: 'Similar Enquiry',
            message: msg,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        _this.add();
                    }
                },
                {
                    text: 'Continue',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    EditstudentPage.prototype.checkMatching = function () {
        var list = [];
        this.isMatching = false;
        this.matchingStudent = null;
        if (this.studentForm.controls['dob'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (__WEBPACK_IMPORTED_MODULE_10_moment__(this.studentsList[i].dob).isSame(__WEBPACK_IMPORTED_MODULE_10_moment__(this.studentForm.controls['dob'].value), 'day') && __WEBPACK_IMPORTED_MODULE_10_moment__(this.studentsList[i].dob).isSame(__WEBPACK_IMPORTED_MODULE_10_moment__(this.studentForm.controls['dob'].value), 'month') && __WEBPACK_IMPORTED_MODULE_10_moment__(this.studentsList[i].dob).isSame(__WEBPACK_IMPORTED_MODULE_10_moment__(this.studentForm.controls['dob'].value), 'year')) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (this.studentForm.controls['email_id'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].email_id == this.studentForm.controls['email_id'].value) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (this.studentForm.controls['phone_number'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].phone_number == this.studentForm.controls['phone_number'].value) {
                    list.push(this.studentsList[i]);
                }
            }
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].alternate_contact == this.studentForm.controls['phone_number'].value) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (this.studentForm.controls['alternate_contact'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].phone_number == this.studentForm.controls['alternate_contact'].value) {
                    list.push(this.studentsList[i]);
                }
            }
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].alternate_contact == this.studentForm.controls['alternate_contact'].value) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (list.length > 0) {
            var resu = this.findDuplicates(list);
            if (resu.length > 0 && !this.counter) {
                this.isMatching = true;
                this.counter = true;
                this.matchingStudent = resu[0];
                this.showConfirm(this.matchingStudent);
            }
        }
    };
    EditstudentPage.prototype.onLocalityChange = function ($event) {
        var _this = this;
        this.locationOptions = [];
        if ($event._value.length > 4) {
            var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $event._value +
                "&types=geocode&key=AIzaSyDxiToPCcr2LL1EC_vkzYtBiQO_9kbIfqs";
            this.http.get(url)
                .subscribe(function (res) {
                var data = res.json();
                _this.locationOptions = data.predictions;
            }, function (err) { });
        }
    };
    EditstudentPage.prototype.onLocSelect = function (description) {
        this.studentForm.controls['locality'].setValue(description);
    };
    EditstudentPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    EditstudentPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    // Always get the accurate path to your apps folder
    EditstudentPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    EditstudentPage.prototype.uploadImage = function () {
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var path = targetPath + filename;
        this.getFileContentAsBase64(path, function (base64Image) {
            this.studentForm.photo = base64Image;
        });
    };
    EditstudentPage.prototype.getFileContentAsBase64 = function (path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            alert('Cannot found requested file');
        }
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    };
    EditstudentPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast(err);
        });
    };
    EditstudentPage.prototype.getPicture = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.fileInput.nativeElement.click();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.camera.getPicture({
                            quality: 1,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            targetWidth: 10,
                            targetHeight: 10
                        }).then(function (data) {
                            _this.studentForm.patchValue({ 'photo': 'data:image/jpg;base64,' + data });
                        }, function (err) {
                            alert('Unable to take photo');
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    EditstudentPage.prototype.processWebImage = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var imageData = readerEvent.target.result;
            _this.studentForm.patchValue({ 'photo': imageData });
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(this.studentForm.controls['photo'].value);
    };
    EditstudentPage.prototype.getProfileImageStyle = function () {
        return ('url(' + this.studentForm.controls['photo'].value + ')');
    };
    return EditstudentPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
    __metadata("design:type", Object)
], EditstudentPage.prototype, "fileInput", void 0);
EditstudentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'editstudent-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/editstudent/editstudent.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    EDIT STUDENT\n  </ion-title>\n  <ion-buttons end>\n    <!-- <button ion-button icon-only (click)="add()"><ion-icon name="close"></ion-icon></button> -->\n  </ion-buttons>\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list no-lines>\n\n      <form [formGroup]="studentForm">\n \n        <!-- Name of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Name*</ion-label>\n            <ion-input type="text" formControlName="name" [disabled]="!isEditable" (ionChange)="onNameChange()"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.name.valid  && (studentForm.controls.name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n\n        <!-- Gender of the student -->\n        <ion-list radio-group formControlName="gender">\n          <ion-list-header> <ion-icon name="transgender"></ion-icon> Gender* </ion-list-header>\n          <ion-item>\n            <ion-label>Male</ion-label>\n            <ion-radio value="Male" [disabled]="!isEditable"></ion-radio>\n          </ion-item>\n          <ion-item>\n            <ion-label>Female</ion-label>\n            <ion-radio value="Female" [disabled]="!isEditable"></ion-radio>\n          </ion-item>\n        </ion-list>\n        <p class="errorMessage" *ngIf="!studentForm.controls.gender.valid  && (studentForm.controls.gender.dirty || submitAttempt)">\n          Please select Gender\n        </p>\n\n        <!-- DOB of the student -->\n        <ion-item>\n          <ion-label floating><ion-icon name="clock"></ion-icon> DOB*</ion-label>\n          <ion-datetime displayFormat="DD/MMM/YYYY" (ionChange)="onDobChange()" pickerFormat="DD MMM YYYY" formControlName="dob" [disabled]="!isEditable"></ion-datetime>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.dob.valid  && (studentForm.controls.dob.dirty || submitAttempt)">\n          Please select valid date\n        </p>\n\n        <!-- Name of the Parent -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Parent Name*</ion-label>\n            <ion-input type="text" formControlName="parent_name" [disabled]="!isEditable"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.parent_name.valid  && (studentForm.controls.parent_name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n \n        <!-- Phone no of the Parent  -->\n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Phone No*</ion-label>\n            <ion-input type="text" (ionChange)="onPhoneChange()"formControlName="phone_number"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.phone_number.valid  && (studentForm.controls.phone_number.dirty || submitAttempt)">\n          Please enter a valid Phone No.\n        </p>\n\n        <!-- Alternate Contact of the Parent  -->\n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Alternate Contact</ion-label>\n            <ion-input type="text" (ionChange)="onPhoneChange()" formControlName="alternate_contact"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.alternate_contact.valid  && (studentForm.controls.alternate_contact.dirty || submitAttempt)">\n          Please enter a valid alternate No.\n        </p>\n\n        <ion-item>\n            <ion-label floating><ion-icon name="mail"></ion-icon> E-mail*</ion-label>\n            <ion-input type="text" (ionChange)="onEmailChange()" formControlName="email_id"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.email_id.valid  && (studentForm.controls.email_id.dirty || submitAttempt)">\n          Please enter a valid E-mail Id\n        </p>\n\n        <!-- Study Year of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="bookmarks"></ion-icon> Study Year*</ion-label>\n            <ion-select formControlName="study_year" interface="popover" (ionChange)="onYearChange()" disabled>\n              <ion-option value="2018-19">May 2018 - April 2019</ion-option>\n              <ion-option value="2019-20">May 2019 - April 2020</ion-option>\n              <ion-option value="2020-21">May 2020 - April 2021</ion-option>\n              <ion-option value="2021-22">May 2021 - April 2022</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.study_year.valid  && (studentForm.controls.study_year.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- Class of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="office"></ion-icon> Class*</ion-label>\n            <ion-select formControlName="class_group" interface="popover" disabled>\n              <ion-option value="Play Group">Play Group</ion-option>\n              <ion-option value="Nursery">Nursery</ion-option>\n              <ion-option value="LKG">LKG</ion-option>\n              <ion-option value="UKG">UKG</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.class_group.valid  && (studentForm.controls.class_group.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- class_type of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="office"></ion-icon> Type*</ion-label>\n            <ion-select formControlName="class_type" interface="popover" disabled>\n              <ion-option value="Annual">Annual</ion-option>\n              <ion-option value="Mid-term">Mid-term</ion-option>\n              <ion-option value="Early start">Early start</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.class_type.valid  && (studentForm.controls.class_type.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- uniform_size of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="clothes"></ion-icon> Uniform Size*</ion-label>\n            <ion-select formControlName="uniform_size" interface="popover" [disabled]="!isEditable">\n              <ion-option value="">NA</ion-option>\n              <ion-option value="18">18</ion-option>\n              <ion-option value="20">20</ion-option>\n              <ion-option value="22">22</ion-option>\n              <ion-option value="24">24</ion-option>\n              <ion-option value="26">26</ion-option>\n              <ion-option value="28">28</ion-option>\n              <ion-option value="30">30</ion-option>\n              <ion-option value="32">32</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.uniform_size.valid  && (studentForm.controls.uniform_size.dirty || submitAttempt)">\n          Please select Uniform Size\n        </p>\n\n        <!-- shoe_size of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="shoe"></ion-icon> Shoe Size*</ion-label>\n            <ion-select formControlName="shoe_size" interface="popover" [disabled]="!isEditable">\n              <ion-option value="">NA</ion-option>\n              <ion-option value="6">6</ion-option>\n              <ion-option value="7">7</ion-option>\n              <ion-option value="8">8</ion-option>\n              <ion-option value="9">9</ion-option>\n              <ion-option value="10">10</ion-option>\n              <ion-option value="11">11</ion-option>\n              <ion-option value="12">12</ion-option>\n              <ion-option value="13">13</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.shoe_size.valid  && (studentForm.controls.shoe_size.dirty || submitAttempt)">\n          Please select Shoe Size\n        </p>\n\n        <ion-item>\n            <ion-label floating><ion-icon name="locate"></ion-icon> Locality*</ion-label>\n            <ion-input type="text" formControlName="locality" (ionChange)="onLocalityChange($event)"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.locality.valid  && (studentForm.controls.locality.dirty || submitAttempt)">\n          Please enter a valid locality\n        </p>\n\n        <ion-list>\n          <ion-item *ngFor="let loc of locationOptions" (click)="onLocSelect(loc.description)">\n            <ion-label>{{loc.description}}</ion-label>\n          </ion-item>\n        </ion-list>\n\n        <ion-toolbar color="primary" class="upload_button">\n          <ion-buttons>\n            <button ion-button icon-left (click)="getPicture()">\n              <ion-icon name="camera"></ion-icon>\n              <p *ngIf="student && student.photo == \'\'">Select Image</p>\n              <p *ngIf="student && student.photo != \'\'">Change Image</p>\n            </button>\n            <input type="file" #fileInput name="files[]" style="visibility: hidden; height: 0px"  (change)="processWebImage($event)" />\n          </ion-buttons>\n        </ion-toolbar>\n\n      </form>\n \n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <div class="gm_drawer_footer_wrapper">\n    <button (click)="save()" ion-button class="btn-success" style="width:100%;">Submit</button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/editstudent/editstudent.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_3__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_9__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_path__["a" /* FilePath */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* Http */]])
], EditstudentPage);

//# sourceMappingURL=editstudent.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ion2_calendar_dist__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_transfer__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_email_composer__ = __webpack_require__(884);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ReportsPage = (function () {
    function ReportsPage(navParams, navCtrl, studentService, centerService, modalCtrl, alertCtrl, authService, loadingCtrl, storage, calendarCtrl, transfer, file, emailComposer, toastCtrl) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.centerService = centerService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.calendarCtrl = calendarCtrl;
        this.transfer = transfer;
        this.file = file;
        this.emailComposer = emailComposer;
        this.toastCtrl = toastCtrl;
        this.fileTransfer = this.transfer.create();
        this.buttonStyleToday = "button-option";
        this.buttonStyleWeek = "button-option";
        this.buttonStyleMonth = "button-option";
        this.buttonStyleRange = "button-option";
        this.showFilters = false;
        this.loop = false;
        this.btn_enq = "";
        this.btn_astv = "";
        this.btn_indt = "";
        this.btn_all = "";
    }
    ReportsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        this.studentService.getStudents().then(function (data) {
            _this.storage.get('user').then(function (user) {
                if (user.role != "admin") {
                    data = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](data, function (o) {
                        return (o.center == user.center);
                    });
                }
                else {
                    _this.showFilters = true;
                }
                _this.students = (__WEBPACK_IMPORTED_MODULE_6_lodash__["sortBy"](data, 'enquiry_date')).reverse();
                _this.centers = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniq"](__WEBPACK_IMPORTED_MODULE_6_lodash__["map"](_this.students, 'center'));
                _this.users = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniq"](__WEBPACK_IMPORTED_MODULE_6_lodash__["map"](_this.students, 'counsellor'));
            });
            _this.setAll();
        }, function (err) {
            console.log("not allowed");
        });
        this.centerService.searchCenter().then(function (data) {
            _this.centerList = data;
        }, function (err) {
            console.log("not allowed");
        });
    };
    ReportsPage.prototype.search = function (startDate, endDate) {
        this.loop = false;
        this.startDate = startDate;
        this.endDate = endDate;
        if (this.searchType === 'enquiry') {
            this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.students, function (o) {
                return (__WEBPACK_IMPORTED_MODULE_8_moment__(o.enquiry_date) >= startDate && __WEBPACK_IMPORTED_MODULE_8_moment__(o.enquiry_date) <= endDate);
            });
            this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.reports, function (o) {
                return (!o.is_Confirmed);
            });
        }
        else if (this.searchType === 'confirmed') {
            this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.students, function (o) {
                return (o.is_Confirmed && __WEBPACK_IMPORTED_MODULE_8_moment__(o.confirmation_date) >= startDate && __WEBPACK_IMPORTED_MODULE_8_moment__(o.confirmation_date) <= endDate);
            });
            this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.reports, function (o) {
                return (o.is_Confirmed && !o.is_Indented);
            });
        }
        else if (this.searchType === 'indented') {
            this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.students, function (o) {
                return (o.is_Indented && __WEBPACK_IMPORTED_MODULE_8_moment__(o.indentation_date) >= startDate && __WEBPACK_IMPORTED_MODULE_8_moment__(o.indentation_date) <= endDate);
            });
        }
        else {
            this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.students, function (o) {
                return ((__WEBPACK_IMPORTED_MODULE_8_moment__(o.enquiryDate) >= startDate && __WEBPACK_IMPORTED_MODULE_8_moment__(o.enquiryDate) <= endDate) || (o.is_Confirmed && __WEBPACK_IMPORTED_MODULE_8_moment__(o.confirmation_date) >= startDate && __WEBPACK_IMPORTED_MODULE_8_moment__(o.confirmation_date) <= endDate) || (o.is_Indented && __WEBPACK_IMPORTED_MODULE_8_moment__(o.indentation_date) >= startDate && __WEBPACK_IMPORTED_MODULE_8_moment__(o.indentation_date) <= endDate));
            });
        }
    };
    ReportsPage.prototype.searchCenter = function () {
        if (!this.loop) {
            this.allStudents = this.reports;
            this.loop = true;
        }
        var selectedCenter = this.selectedCenter;
        this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.allStudents, function (o) {
            return (o.center == selectedCenter);
        });
    };
    ReportsPage.prototype.searchUser = function () {
        if (!this.loop) {
            this.allStudents = this.reports;
            this.loop = true;
        }
        var selectedUser = this.selectedUser;
        this.reports = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](this.allStudents, function (o) {
            return (o.counsellor == selectedUser);
        });
    };
    ReportsPage.prototype.clearFilter = function () {
        if (!this.loop) {
            this.allStudents = this.reports;
            this.loop = true;
        }
        this.reports = this.allStudents;
        this.selectedUser = null;
        this.selectedCenter = null;
    };
    ReportsPage.prototype.searchFilter = function () {
        if (this.selectedCenter)
            this.searchCenter();
        if (this.selectedUser)
            this.searchUser();
    };
    ReportsPage.prototype.searchToday = function () {
        this.buttonStyleToday = "button-active";
        this.buttonStyleWeek = "button-option";
        this.buttonStyleMonth = "button-option";
        this.buttonStyleRange = "button-option";
        this.searchByDates = "today";
        var startDate = __WEBPACK_IMPORTED_MODULE_8_moment__().subtract(1, 'day');
        var endDate = __WEBPACK_IMPORTED_MODULE_8_moment__();
        this.search(startDate, endDate);
    };
    ReportsPage.prototype.searchWeek = function () {
        this.buttonStyleToday = "button-option";
        this.buttonStyleWeek = "button-active";
        this.buttonStyleMonth = "button-option";
        this.buttonStyleRange = "button-option";
        this.searchByDates = "week";
        var startDate = __WEBPACK_IMPORTED_MODULE_8_moment__().subtract(7, 'day');
        var endDate = __WEBPACK_IMPORTED_MODULE_8_moment__();
        this.search(startDate, endDate);
    };
    ReportsPage.prototype.searchMonth = function () {
        this.buttonStyleToday = "button-option";
        this.buttonStyleWeek = "button-option";
        this.buttonStyleMonth = "button-active";
        this.buttonStyleRange = "button-option";
        this.searchByDates = "month";
        var startDate = __WEBPACK_IMPORTED_MODULE_8_moment__().subtract(30, 'day');
        var endDate = __WEBPACK_IMPORTED_MODULE_8_moment__();
        this.search(startDate, endDate);
    };
    ReportsPage.prototype.searchDates = function (res) {
        this.buttonStyleToday = "button-option";
        this.buttonStyleWeek = "button-option";
        this.buttonStyleMonth = "button-option";
        this.buttonStyleRange = "button-active";
        this.searchByDates = "dates";
        var startDate = __WEBPACK_IMPORTED_MODULE_8_moment__(res.from);
        var endDate = __WEBPACK_IMPORTED_MODULE_8_moment__(res.to);
        this.search(startDate, endDate);
    };
    ReportsPage.prototype.setEnquiry = function () {
        this.searchType = "enquiry";
        this.btn_enq = "button-optioni";
        this.btn_astv = "";
        this.btn_indt = "";
        this.btn_all = "";
        this.searchOnChange();
    };
    ReportsPage.prototype.setConfirmed = function () {
        this.searchType = "confirmed";
        this.btn_enq = "";
        this.btn_astv = "button-optioni";
        this.btn_indt = "";
        this.btn_all = "";
        this.searchOnChange();
    };
    ReportsPage.prototype.setIndented = function () {
        this.searchType = "indented";
        this.btn_enq = "";
        this.btn_astv = "";
        this.btn_indt = "button-optioni";
        this.btn_all = "";
        this.searchOnChange();
    };
    ReportsPage.prototype.setAll = function () {
        this.searchType = "";
        this.btn_enq = "";
        this.btn_astv = "";
        this.btn_indt = "";
        this.btn_all = "button-optioni";
        this.searchOnChange();
    };
    ReportsPage.prototype.searchOnChange = function () {
        this.loop = false;
        if (this.searchByDates === "dates") {
            var res = {
                from: this.startDate,
                to: this.endDate
            };
            this.searchDates(res);
        }
        else if (this.searchByDates === "month")
            this.searchMonth();
        else if (this.searchByDates === "week")
            this.searchWeek();
        else
            this.searchToday();
    };
    //Function to covert object to csv format
    ReportsPage.prototype.convertToCSV = function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '')
                    line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    };
    ReportsPage.prototype.downloadReport = function () {
        var rep = [];
        for (var r = 0; r < this.reports.length; r++) {
            rep[r] = this.reports[r];
            Object.keys(rep[r]).forEach(function (key, index) {
                if (rep[r][key] instanceof Date) {
                    rep[r][key] = __WEBPACK_IMPORTED_MODULE_8_moment__(rep[r][key]).add(1, 'days').format('DD-MMM-YYYY');
                }
            });
        }
        var url = this.convertToCSV(rep);
        this.fileTransfer.download(url, this.file.dataDirectory + 'reports.csv').then(function (entry) {
            console.log('download complete: ' + entry.toURL());
        }, function (error) {
            console.log(error);
        });
    };
    ReportsPage.prototype.convertJsonToHtml = function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : new Array(objArray);
        var keys = Object.keys(array[0]);
        var str = '<table>';
        str += '<tbody>';
        for (var i = 0; i < array.length; i++) {
            str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
            for (var index in keys) {
                var objValue = array[i][keys[index]];
                // Support for Nested Tables
                if (typeof objValue === 'object' && objValue !== null) {
                    if (Array.isArray(objValue)) {
                        str += '<td>';
                        for (var aindex in objValue) {
                            str += this.convertJsonToHtml(objValue[aindex]);
                        }
                        str += '</td>';
                    }
                    else {
                        str += '<td>' + this.convertJsonToHtml(objValue) + '</td>';
                    }
                }
                else {
                    str += '<td>' + objValue + '</td>';
                }
            }
            str += '</tr>';
        }
        str += '</tbody>';
        str += '</table>';
        console.log(str);
        return str;
    };
    ReportsPage.prototype.mailReport = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.studentService.sendReportsMail(user.email).then(function (data) {
                _this.presentToast('Successfully mailed to your id');
            }, function (err) {
                _this.presentToast('Error while sending mail');
            });
            if (user.role == "admin") {
                _this.studentService.sendIndentationReport(user.email).then(function (data) { }, function (err) { });
            }
        });
    };
    ReportsPage.prototype.dateRange = function () {
        var _this = this;
        this.calendarCtrl.openCalendar({
            isRadio: false,
            from: new Date(2017, 1 - 1, 1),
            to: new Date(),
            weekdaysTitle: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            defaultDate: new Date()
        })
            .then(function (res) {
            _this.searchDates(res);
        })
            .catch(function () { });
    };
    ReportsPage.prototype.close = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    ReportsPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ReportsPage.prototype.findCenter = function (cen) {
        for (var i = 0; i < this.centerList.length; i++) {
            if (this.centerList[i].center_code == cen)
                return this.centerList[i].center_name;
        }
    };
    ReportsPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            spinner: 'hide',
            content: '<div class="ion-spinner"></div><br><div class="loading">Loading...</div>'
        });
        this.loading.present();
    };
    return ReportsPage;
}());
ReportsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-reports',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/reports/reports.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    Reports\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>\n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n \n<ion-content>\n\n	  <div class="button-bar">\n        <a class="button {{buttonStyleToday}}" (click)="searchToday()">Day</a>\n        <a class="button {{buttonStyleWeek}}" (click)="searchWeek()">Week</a>\n        <a class="button {{buttonStyleMonth}}" (click)="searchMonth()">Month</a>\n        <a class="button {{buttonStyleRange}}" (click)="dateRange()">Dates</a>\n    </div>\n\n    <div class="button-bar">\n        <a class="button button-energized {{btn_enq}}" (click)="setEnquiry()">Enq.</a>\n        <a class="button button-assertive {{btn_astv}}" (click)="setConfirmed()">Conf.</a>\n        <a class="button button-positive {{btn_indt}}" (click)="setIndented()">Ind.</a>\n        <a class="button button-simple {{btn_all}}" (click)="setAll()">All</a>\n    </div>\n\n    <div class="filters" *ngIf="showFilters">\n        <ion-select interface="popover" placeholder="Select Center" [(ngModel)]="selectedCenter" class="search-ic search-user">\n          <ion-option *ngFor="let center of centers" [value]="center">{{center}}</ion-option>\n        </ion-select>\n\n        <ion-select interface="popover" placeholder="Select User" [(ngModel)]="selectedUser" class="search-ic search-user">\n          <ion-option *ngFor="let user of users" [value]="user">{{user}}</ion-option>\n        </ion-select>\n\n        <button (click)="searchFilter()" ion-button class="btn-info clear-btn" style="width:21%">Search</button>\n        <button (click)="clearFilter()" ion-button class="btn-danger clear-btn" style="width:16%; margin-right: 1%;">clear</button>\n    </div>\n\n  <ion-list>\n \n    <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="reports && !reports.length" />\n    <h1 *ngIf="reports && !reports.length" class="no_record"> NO RECORDS FOUND </h1>\n\n    <p *ngIf="reports && reports.length" class="result-number"> {{reports.length}} {{searchType}} results found for {{startDate | date: \'dd/MMM/yyyy\'}} - {{endDate | date: \'dd/MMM/yyyy\'}}</p>\n\n  	<table class="rwd-table">\n  	  <tr>\n  	    <th>Center</th>\n  	    <th>Name</th>\n  	    <th>Parent</th>\n  	    <th>Phone</th>\n  	    <th>DOB</th>\n  	    <th>Email</th>\n  	    <th>Gender</th>\n        <th>Class</th>\n  	    <th>Year</th>\n  	  </tr>\n  	  <tr *ngFor="let report of reports" class="{{report.status}}">\n  	    <td data-th="Center">{{findCenter(report.center)}}</td>\n  	    <td data-th="Name">{{report.name}}</td>\n  	    <td data-th="Parent">{{report.parent_name}}</td>\n  	    <td data-th="Phone">{{report.phone_number}}</td>\n  	    <td data-th="DOB">{{report.dob | date: \'dd/MMM/yyyy\'}}</td>\n  	    <td data-th="Email">{{report.email_id}}</td>\n  	    <td data-th="Gender">{{report.gender}}</td>\n        <td data-th="Year">{{report.study_year}}</td>\n  	  </tr>\n  	</table>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n    <div class="gm_drawer_footer_wrapper">\n      <button (click)="downloadReport()" ion-button class="btn-info">Download</button>\n      <button (click)="mailReport()" ion-button class="btn-info">Send Mail</button>\n    </div>\n</ion-footer>\n'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/reports/reports.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_10__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_transfer__["b" /* TransferObject */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_email_composer__["a" /* EmailComposer */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_3__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_9_ion2_calendar_dist__["a" /* CalendarController */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_transfer__["a" /* Transfer */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_email_composer__["a" /* EmailComposer */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
], ReportsPage);

//# sourceMappingURL=reports.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DispatchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_indentation_indentation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var DispatchPage = (function () {
    function DispatchPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loadingCtrl, storage, centerService, indentationService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.centerService = centerService;
        this.indentationService = indentationService;
        this.toastCtrl = toastCtrl;
        this.indentations = [];
        this.allIndentations = [];
        this.list_of_students = [];
        this.all_list_of_students = [];
        this.confirm_dispatch = false;
        this.show_button = 0;
        this.msg = "";
        this.showModal = false;
        this.myInputIndentation = "";
        this.myInputStudent = "";
    }
    DispatchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        this.indentationService.searchIndentation().then(function (data) {
            _this.indentations = __WEBPACK_IMPORTED_MODULE_8_lodash__["filter"](data, function (o) {
                return (o.status != 'closed');
            });
            _this.allIndentations = _this.indentations;
        }, function (err) {
            console.log("not allowed");
        });
    };
    DispatchPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    DispatchPage.prototype.selectDispatch = function (indentation) {
        this.confirm_dispatch = true;
        this.selected_indentation = indentation;
        this.list_of_students = __WEBPACK_IMPORTED_MODULE_8_lodash__["filter"](this.selected_indentation.students_amount, function (o) {
            return (!o.is_dispatched);
        });
        this.all_list_of_students = this.list_of_students;
    };
    DispatchPage.prototype.dispatch = function (student) {
        this.show_button++;
        for (var i = 0; i < this.list_of_students.length; i++) {
            if (this.list_of_students[i].student_id == student.student_id) {
                this.list_of_students[i].is_dispatched = true;
                this.list_of_students[i].is_partial = false;
            }
        }
        for (var i = 0; i < this.selected_indentation.students_amount.length; i++) {
            if (this.selected_indentation.students_amount[i].student_id == student.student_id) {
                this.selected_indentation.students_amount[i].is_dispatched = true;
                this.selected_indentation.students_amount[i].is_partial = false;
            }
        }
    };
    DispatchPage.prototype.partialDispatch = function (student) {
        this.show_button++;
        for (var i = 0; i < this.list_of_students.length; i++) {
            if (this.list_of_students[i].student_id == student.student_id) {
                this.list_of_students[i].is_dispatched = true;
                this.list_of_students[i].is_partial = true;
            }
        }
        for (var i = 0; i < this.selected_indentation.students_amount.length; i++) {
            if (this.selected_indentation.students_amount[i].student_id == student.student_id) {
                this.selected_indentation.students_amount[i].is_dispatched = true;
                this.selected_indentation.students_amount[i].is_partial = true;
            }
        }
    };
    DispatchPage.prototype.undispatch = function (student) {
        this.show_button--;
        for (var i = 0; i < this.list_of_students.length; i++) {
            if (this.list_of_students[i].student_id == student.student_id) {
                this.list_of_students[i].is_dispatched = false;
                this.list_of_students[i].is_partial = true;
                if (this.list_of_students[i].remarks != undefined && this.list_of_students[i].remarks.length > 0)
                    this.list_of_students[i].remarks.pop();
                this.list_of_students[i].is_partial = false;
            }
        }
        for (var i = 0; i < this.selected_indentation.students_amount.length; i++) {
            if (this.selected_indentation.students_amount[i].student_id == student.student_id) {
                this.selected_indentation.students_amount[i].is_dispatched = false;
                this.selected_indentation.students_amount[i].is_partial = true;
                if (this.selected_indentation.students_amount[i].remarks != undefined && this.selected_indentation.students_amount[i].remarks.length > 0)
                    this.selected_indentation.students_amount[i].remarks.pop();
                this.selected_indentation.students_amount[i].is_partial = false;
            }
        }
    };
    DispatchPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
    };
    DispatchPage.prototype.reset = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
    };
    DispatchPage.prototype.confirmIndentStudents = function () {
        var _this = this;
        this.loader.present();
        for (var i = 0; i < this.selected_indentation.students_amount.length; i++) {
            if (this.selected_indentation.students_amount[i].is_partial == true)
                this.selected_indentation.students_amount[i].is_dispatched = false;
        }
        this.indentationService.updateIndentation(this.selected_indentation).then(function (result) {
            _this.loader.dismiss();
            _this.presentToast('Dispatch Data saved successfully');
            _this.reset();
        }, function (err) {
            _this.loader.dismiss();
            _this.presentToast('Error! Please try again.');
        });
    };
    DispatchPage.prototype.findClass = function (ind) {
        var is_partial = false;
        for (var i = 0; i < ind.students_amount.length; i++) {
            if (ind.students_amount[i].is_partial)
                is_partial = true;
        }
        if (is_partial)
            return "partial-dispatch";
        return "complete-dispatch";
    };
    DispatchPage.prototype.partial = function (student) {
        var _this = this;
        this.this_student = student;
        var alert = this.alertCtrl.create({
            title: 'Remarks',
            inputs: [
                {
                    name: 'msg',
                    placeholder: 'Remarks'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        _this.this_student = null;
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        if (_this.this_student.remarks != undefined && _this.this_student.remarks.length > 0)
                            _this.this_student.remarks.push(data.msg);
                        else
                            _this.this_student.remarks = [data.msg];
                        _this.partialDispatch(_this.this_student);
                    }
                }
            ]
        });
        alert.present();
    };
    DispatchPage.prototype.searchIndentation = function () {
        var result = [];
        for (var i = 0; i < this.allIndentations.length; i++) {
            if (this.allIndentations[i].payment_mode.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].bank_name != undefined && this.allIndentations[i].bank_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].transaction_no != undefined && this.allIndentations[i].transaction_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].email.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].center_code.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].num.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].cheque_no != undefined && this.allIndentations[i].cheque_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].status.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else {
                for (var s = 0; s < this.allIndentations[i].students_amount.length; s++) {
                    if (__WEBPACK_IMPORTED_MODULE_8_lodash__["includes"](this.allIndentations[i].students_amount[s].phone_number, this.myInputIndentation) ||
                        this.allIndentations[i].students_amount[s].student_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0 ||
                        this.allIndentations[i].students_amount[s].student_id.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                        result.push(this.allIndentations[i]);
                    }
                }
            }
        }
        this.indentations = result;
        if (this.myInputIndentation === "")
            this.indentations = this.allIndentations;
    };
    DispatchPage.prototype.searchStudent = function () {
        var result = [];
        for (var i = 0; i < this.all_list_of_students.length; i++) {
            // if (this.all_list_of_students[i].class_type.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) { result.push(this.all_list_of_students[i]); } 
            // else if (this.all_list_of_students[i].class_group.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) { result.push(this.all_list_of_students[i]); } 
            // else if (this.all_list_of_students[i].gender.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) { result.push(this.all_list_of_students[i]); } 
            if (this.all_list_of_students[i].student_name.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) == 0) {
                result.push(this.all_list_of_students[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_8_lodash__["includes"](this.all_list_of_students[i].phone_number, this.myInputStudent)) {
                result.push(this.all_list_of_students[i]);
            }
            else if (this.all_list_of_students[i].student_id.toUpperCase().indexOf(this.myInputStudent.toUpperCase()) >= 0) {
                result.push(this.all_list_of_students[i]);
            }
        }
        this.list_of_students = result;
        if (this.myInputStudent === "")
            this.list_of_students = this.all_list_of_students;
    };
    DispatchPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            spinner: 'hide',
            content: '<div class="ion-spinner"></div><br><div class="loading">Loading...</div>'
        });
        this.loading.present();
    };
    return DispatchPage;
}());
DispatchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dispatch-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/dispatch/dispatch.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <ion-buttons left>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Dispatch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="!indentations.length" />\n  <h1 *ngIf="!indentations.length" class="no_record"> NO RECORDS FOUND </h1>\n\n  <div *ngIf="!showModal">\n\n    <ion-list *ngIf="!confirm_dispatch && indentations.length">\n\n      <div class="search-row search-full">\n        <ion-searchbar [(ngModel)]="myInputIndentation" (animated)="true" (placeholder)="Search"\n          (ionInput)="searchIndentation()"></ion-searchbar>\n      </div>\n\n      <ion-item-sliding *ngFor="let indentation of indentations"\n        class="results_list_mobile indent_results {{findClass(indentation)}}" style="height: 100%">\n\n        <button ion-item>\n          <div>\n            <h1>{{indentation.num}} ({{indentation.center_code}}) &nbsp; - &nbsp;\n              <i> {{indentation.students_amount.length}} Student(s) </i>\n            </h1>\n            <h2>Amount - {{indentation.total_amount}} </h2>\n            <h2>Payment Mode - {{indentation.payment_mode}} </h2>\n            <h2> Payment Date - {{indentation.payment_date | date: \'dd/MMM/yyyy\'}} </h2>\n            <h2> Bank - {{indentation.bank_name}} </h2>\n            <h2>Transacton No - {{indentation.transaction_no}} </h2>\n            <h2>Cheque No - {{indentation.cheque_no}}</h2>\n          </div>\n        </button>\n\n        <ion-item-options side="right">\n          <button ion-button color="info" (click)="selectDispatch(indentation)">\n            <ion-icon name="redo"></ion-icon>\n            Dispatch\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n\n    </ion-list>\n\n    <ion-list *ngIf="confirm_dispatch" style="margin-bottom: 50px;">\n\n      <div class="search-row search-full">\n        <ion-searchbar [(ngModel)]="myInputStudent" (animated)="true" (placeholder)="Search"\n          (ionInput)="searchStudent()"></ion-searchbar>\n      </div>\n\n      <ion-item-sliding *ngFor="let student of list_of_students" class="results_list_mobile indent_results"\n        style="height: 100%">\n\n        <button ion-item>\n          <div class="">\n            <h1> {{student.student_name}} </h1>\n            <h2> Phone No: {{student.phone_number}} </h2>\n            <h2> Gender: {{student.gender}} </h2>\n            <h2> Type: {{student.class_type}} </h2>\n            <h2> Group: {{student.class_group}} </h2>\n            <h2> Shoe: {{student.shoe_size}} </h2>\n            <h2> Uniform: {{student.uniform_size}} </h2>\n          </div>\n        </button>\n\n        <ion-item-options side="right">\n          <button ion-button color="secondary" (click)="partial(student)" *ngIf="!student.is_dispatched">\n            <ion-icon name="redo"></ion-icon>\n            Partial\n          </button>\n          <button ion-button color="info" (click)="dispatch(student)" *ngIf="!student.is_dispatched">\n            <ion-icon name="redo"></ion-icon>\n            Dispatch\n          </button>\n          <button ion-button color="danger" (click)="undispatch(student)" *ngIf="student.is_dispatched">\n            <ion-icon name="undo"></ion-icon>\n            Undispatch\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n\n    </ion-list>\n  </div>\n</ion-content>\n\n<ion-footer>\n  <div class="gm_drawer_footer_wrapper">\n    <button (click)="reset()" ion-button class="btn-danger">Cancel</button>\n    <button (click)="confirmIndentStudents()" ion-button class="btn-success"\n      [disabled]="show_button <= 0">Dispatch</button>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/dispatch/dispatch.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_5__providers_indentation_indentation__["a" /* Indentation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
], DispatchPage);

//# sourceMappingURL=dispatch.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Auth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Auth = Auth_1 = (function () {
    function Auth(http, storage) {
        this.http = http;
        this.storage = storage;
        // url = "https://spark-olw.herokuapp.com/";
        this.url = "http://localhost:8080/";
    }
    Auth.prototype.checkAuthentication = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Load token if exists
            _this.storage.get('token').then(function (value) {
                _this.token = value;
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Authorization', _this.token);
                _this.storage.get('user').then(function (user) {
                    Auth_1.userChanged.next(user);
                });
                _this.http.get(_this.url + 'api/auth/protected', { headers: headers })
                    .subscribe(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    Auth.prototype.createAccount = function (details) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/auth/register', JSON.stringify(details), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                _this.token = data.token;
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Auth.prototype.updateAccount = function (details) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/auth/update', JSON.stringify(details), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                _this.token = data.token;
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Auth.prototype.login = function (credentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/auth/login', JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                _this.token = data.token;
                if (data.user) {
                    _this.storage.set('token', data.token);
                    _this.storage.set('user', data.user).then(function (res) {
                        Auth_1.userChanged.next(data.user);
                    });
                }
                resolve(data);
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    Auth.prototype.forgotPassword = function (credentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/auth/forgotPassword', JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Auth.prototype.searchUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            _this.http.get(_this.url + 'api/auth', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Auth.prototype.logout = function () {
        this.storage.set('token', '');
        this.storage.set('user', {});
        Auth_1.userChanged.next(true);
    };
    Auth.prototype.deleteAccount = function (details) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/auth/delete', JSON.stringify(details), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                _this.token = data.token;
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    return Auth;
}());
Auth.userChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
Auth = Auth_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], Auth);

var Auth_1;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_group_chat_group__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_chats_chats__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_network_network__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// Providers





var ChatListPage = (function () {
    function ChatListPage(navCtrl, studentService, chatService, modalCtrl, alertCtrl, authService, actionSheetCtrl, toastCtrl, platform, app, menu, centerService, networkService, storage, loading, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.chatService = chatService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.centerService = centerService;
        this.networkService = networkService;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.chats = [];
        this.allChats = [];
        this.authService.searchUser().then(function (result) {
            _this.users = result;
            _this.chatService.getChatList().then(function (result) {
                result = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](result, function (o) {
                    return (o.active);
                });
                _this.storage.get('user').then(function (user) {
                    _this.user = user;
                    result = __WEBPACK_IMPORTED_MODULE_2_lodash__["filter"](result, function (o) {
                        return ((o.members.indexOf(user._id) > -1) ||
                            (o.silent_members.indexOf(user._id) > -1));
                    });
                    _this.chats = result;
                    _this.allChats = result;
                });
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    }
    ChatListPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.allChats.length; i++) {
            this.allChats[i].tempName = this.getChatName(this.allChats[i].name);
            if (this.allChats[i].tempName.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.allChats[i]);
            }
        }
        this.chats = result;
        if (this.myInput === "")
            this.chats = this.allChats;
    };
    ;
    ChatListPage.prototype.displayMessages = function (group) {
        // group.last_login[this.user._id] = new Date();
        // this.chatService.updateChats(group._id, group).then((result) => {
        // }, (err) => {
        // });
        group.tempName = this.getChatName(group.name);
        this.storage.set("chatGroup", group);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__chat_group_chat_group__["a" /* ChatGroupPage */]);
    };
    ChatListPage.prototype.getChatImage = function (dps) {
        var dp = dps[this.user._id];
        if (dp && dp.type === 'profile') {
            var uuser = this.users.find(function (obj) { return obj._id === dp.src; });
            if (uuser.photo)
                return uuser.photo;
        }
        if (dp && dp.type === 'direct') {
            return dp.src;
        }
        return 'assets/images/NoImageAvailable.png';
    };
    ChatListPage.prototype.getChatName = function (dps) {
        var dp = dps[this.user._id];
        if (dp && dp.type === 'profile') {
            var uuser = this.users.find(function (obj) { return obj._id === dp.src; });
            if (uuser.name)
                return uuser.name;
        }
        if (dp && dp.type === 'direct') {
            return dp.src;
        }
        return 'No Name';
    };
    ChatListPage.prototype.getLastActive = function (last_login) {
        return (__WEBPACK_IMPORTED_MODULE_6_moment__(last_login).fromNow());
    };
    return ChatListPage;
}());
ChatListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chat-list-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/chat-list/chat-list.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons left>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      CHAT\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <div class="search-row search-full">\n      <ion-searchbar [(ngModel)]="myInput" (animated)="true" (placeholder)="Search" (ionInput)="search()">\n      </ion-searchbar>\n    </div>\n\n    <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="chats && !chats.length" />\n    <h1 *ngIf="chats && !chats.length" class="no_record"> NO RECORDS FOUND </h1>\n\n    <ion-item *ngFor="let chat of chats" (click)="displayMessages(chat)" class="chat-list" style="border-radius: 0 !important;">\n\n      <!-- <button ion-item> -->\n        <div class="col_left">\n          <div ><img src={{getChatImage(chat.dp)}} class="bg_student" /></div>\n        </div>\n        <div class="col_right">\n          <h1>{{getChatName(chat.name)}}</h1>\n          <h2> {{chat.members.length}} Members</h2>\n          <h3>Last Active  \n            <span *ngIf="chat.last_login && chat.last_login[user._id]">{{getLastActive(chat.last_login[user._id])}}</span>\n            <span *ngIf="!chat.last_login || !chat.last_login[user._id]">Not Available</span>\n          </h3>\n        </div>\n      <!-- </button> -->\n    </ion-item>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/chat-list/chat-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_10__providers_chats_chats__["a" /* Chats */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_9__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_11__providers_network_network__["a" /* Networks */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
], ChatListPage);

;
//# sourceMappingURL=chat-list.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Chats = (function () {
    function Chats(http, authService, storage) {
        this.http = http;
        this.authService = authService;
        this.storage = storage;
        // url = "https://spark-olw.herokuapp.com/";
        this.url = "http://localhost:8080/";
    }
    // Function to get list of al the Chats List
    Chats.prototype.getChatList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.get(_this.url + 'api/chats/list', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Function to get list of al the Chats messages
    Chats.prototype.getChatMessages = function (chatId, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.httpSubscription = _this.http.get(_this.url + 'api/chats/messages/' + chatId + '/' + userId, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data.messages);
            }, function (err) {
                reject(err);
            });
        });
    };
    Chats.prototype.stopGetChatMessages = function () {
        this.httpSubscription.unsubscribe();
    };
    Chats.prototype.updateChatMessages = function (chatId, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put(_this.url + 'api/chats/messages/' + chatId, message, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Chats.prototype.updateChats = function (chatId, chat) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put(_this.url + 'api/chats/' + chatId, chat, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Chats.prototype.uploadToS3 = function (file, file_name, contentEncoding, contentType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                file: file,
                file_name: file_name,
                contentEncoding: contentEncoding,
                contentType: contentType
            };
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.post(_this.url + 'api/uploadToS3', body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ;
    return Chats;
}());
Chats = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], Chats);

//# sourceMappingURL=chats.js.map

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Students; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Students = (function () {
    function Students(http, authService, storage) {
        this.http = http;
        this.authService = authService;
        this.storage = storage;
        // url = "https://spark-olw.herokuapp.com/";
        this.url = "http://localhost:8080/";
    }
    Students.prototype.getStudents = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.get(_this.url + 'api/students', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Students.prototype.getInactiveStudents = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.get(_this.url + 'api/students/inactiveStudents', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Students.prototype.getAllStudents = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.get(_this.url + 'api/students/allStudents', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Students.prototype.createStudent = function (student) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('user').then(function (user) {
                student.center = user.center;
                student.counsellor = user.email;
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', _this.authService.token);
                _this.http.post(_this.url + 'api/students', JSON.stringify(student), { headers: headers })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    Students.prototype.updateStudent = function (student) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('user').then(function (user) {
                if (student.center != user.center && !student.admin_edit) {
                    // student.student_id = user.center + student.student_id.slice(3);
                    student.center = user.center;
                    student.counsellor = user.email;
                }
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', _this.authService.token);
                _this.http.put(_this.url + 'api/students/' + student._id, student, { headers: headers })
                    .subscribe(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    Students.prototype.editStudent = function (student) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('user').then(function (user) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', _this.authService.token);
                _this.http.put(_this.url + 'api/students/editStudent/' + student._id, student, { headers: headers })
                    .subscribe(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    Students.prototype.sendReportsMail = function (email_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put(_this.url + 'api/students/sendReportsMail/' + email_id, { email_id: email_id }, { headers: headers })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Students.prototype.sendIndentationReport = function (email_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put(_this.url + 'api/students/sendIndentationReport/' + email_id, { email_id: email_id }, { headers: headers })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return Students;
}());
Students = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], Students);

//# sourceMappingURL=students.js.map

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 175;

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Center; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Center = (function () {
    function Center(http, authService, storage) {
        this.http = http;
        this.authService = authService;
        this.storage = storage;
        // url = "https://spark-olw.herokuapp.com/";
        this.url = "http://localhost:8080/";
    }
    // Function to get list of al the centers
    Center.prototype.searchCenter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.get(_this.url + 'api/centers', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Center.prototype.createCenter = function (center) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', _this.authService.token);
            _this.http.post(_this.url + 'api/centers', JSON.stringify(center), { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Center.prototype.updateCenter = function (center) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put(_this.url + 'api/centers/' + center._id, center, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return Center;
}());
Center = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], Center);

//# sourceMappingURL=center.js.map

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/reports/reports.module": [
		930,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 218;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_network_network__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__search_search__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__signup_signup__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__center_center__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__indent_indent__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__reports_reports__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dispatch_dispatch__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__enquiry_enquiry__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__home_tab_home_tab__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__notification_tab_notification_tab__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__profile_tab_profile_tab__ = __webpack_require__(549);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Providers




// Pages











var HomePage = (function () {
    function HomePage(navCtrl, studentService, modalCtrl, alertCtrl, authService, actionSheetCtrl, toastCtrl, platform, app, menu, centerService, networkService, storage, loading, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.centerService = centerService;
        this.networkService = networkService;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.isAdmin = false;
        this.isDispatcher = false;
        this.isCenterAdmin = false;
        this.isCounsellor = false;
        this.isTeacher = false;
        this.isParent = false;
        this.search = function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__search_search__["a" /* SearchPage */]);
        };
        this.logOut = function () {
            _this.authService.logout();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
        };
        this.home = __WEBPACK_IMPORTED_MODULE_16__home_tab_home_tab__["a" /* HomeTab */];
        this.notification = __WEBPACK_IMPORTED_MODULE_17__notification_tab_notification_tab__["a" /* NotificationTab */];
        this.profile = __WEBPACK_IMPORTED_MODULE_18__profile_tab_profile_tab__["a" /* ProfileTab */];
        if (this.networkService.noConnection()) {
            this.networkService.showNetworkAlert();
        }
        this.storage.get('user').then(function (user) {
            if (user.role === "counsellor")
                _this.isCounsellor = true;
            else if (user.role === "admin")
                _this.isAdmin = true;
            else if (user.role === "dispatcher")
                _this.isDispatcher = true;
            else if (user.role === "centerAdmin")
                _this.isCenterAdmin = true;
            else if (user.role === "teacher")
                _this.isTeacher = true;
            else if (user.role === "parent")
                _this.isParent = true;
            else
                _this.isParent = true;
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
    };
    HomePage.prototype.openSignupPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__signup_signup__["a" /* SignupPage */]);
    };
    HomePage.prototype.openCenterPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__center_center__["a" /* CenterPage */]);
    };
    HomePage.prototype.openReportsPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__reports_reports__["a" /* ReportsPage */]);
    };
    HomePage.prototype.openIndentPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__indent_indent__["a" /* IndentPage */]);
    };
    HomePage.prototype.openDispatcherPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_14__dispatch_dispatch__["a" /* DispatchPage */]);
    };
    HomePage.prototype.openEnquiryPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_15__enquiry_enquiry__["a" /* EnquiryPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'home-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons left>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      OUR LITTLE WONDERZ\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="home-page">\n  <ion-tabs>\n    <ion-tab tabIcon="home" tabTitle="Home" [root]="home"></ion-tab>\n    <ion-tab tabIcon="notifications" tabTitle="Notification" [root]="notification"></ion-tab>\n    <ion-tab tabIcon="settings" tabTitle="Profile" [root]="profile"></ion-tab>\n  </ion-tabs>\n</ion-content>\n'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_6__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_7__providers_network_network__["a" /* Networks */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], HomePage);

;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Networks; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(258);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Networks = (function () {
    function Networks(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    Networks.prototype.noConnection = function () {
        return (__WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Network */].type === 'none');
    };
    Networks.prototype.showSettings = function () {
        if (cordova.plugins.diagnostic.switchToWifiSettings) {
            cordova.plugins.diagnostic.switchToWifiSettings();
        }
        else {
            cordova.plugins.diagnostic.switchToSettings();
        }
    };
    Networks.prototype.showNetworkAlert = function () {
        var _this = this;
        var networkAlert = this.alertCtrl.create({
            title: 'No Internet Connection',
            message: 'Please check your internet connection.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { }
                },
                {
                    text: 'Open Settings',
                    handler: function () {
                        networkAlert.dismiss().then(function () {
                            _this.showSettings();
                        });
                    }
                }
            ]
        });
        networkAlert.present();
    };
    return Networks;
}());
Networks = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], Networks);

//# sourceMappingURL=network.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Indentation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Indentation = (function () {
    function Indentation(http, authService, storage) {
        this.http = http;
        this.authService = authService;
        this.storage = storage;
        // url = "https://spark-olw.herokuapp.com/";
        this.url = "http://localhost:8080/";
    }
    // Function to get list of al the Indentations
    Indentation.prototype.searchIndentation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.get(_this.url + 'api/indentations', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Indentation.prototype.createIndentation = function (indentation) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', _this.authService.token);
            _this.http.post(_this.url + 'api/indentations', JSON.stringify(indentation), { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Indentation.prototype.updateIndentation = function (indentation) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put(_this.url + 'api/indentations/' + indentation._id, indentation, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Indentation.prototype.approveIndentation = function (indentation) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put(_this.url + 'api/indentations/approve/' + indentation._id, indentation, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return Indentation;
}());
Indentation = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], Indentation);

//# sourceMappingURL=indentation.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeTab; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chart_js__ = __webpack_require__(885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_swiper__ = __webpack_require__(886);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_network_network__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_indentation_indentation__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// Providers





var HomeTab = (function () {
    function HomeTab(navCtrl, studentService, modalCtrl, alertCtrl, authService, actionSheetCtrl, toastCtrl, platform, app, menu, centerService, networkService, indentationService, storage, loadingCtrl, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.centerService = centerService;
        this.networkService = networkService;
        this.indentationService = indentationService;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.user = [];
        this.studentsList = [];
        this.usersList = [];
        this.centersList = [];
        this.indentationList = [];
        this.marketingNumber = 0;
        this.marketingThisYearNumber = 0;
        this.conversionNumber = 0;
        this.studentNumber = 0;
        this.lastYearStudentNumber = 0;
        this.pendingIndentationNumber = 0;
        this.totalIndentations = 0;
        this.totalOpenIndentations = 0;
        this.totalIndentationsAmount = 0;
        this.todayBirthdayStudents = [];
        this.sumOf = function (items, prop) {
            return items.reduce(function (a, b) {
                return a + b[prop];
            }, 0);
        };
        this.datecompare = function (date1) {
            if (date1 == undefined)
                return false;
            var day1 = __WEBPACK_IMPORTED_MODULE_3_moment__(date1).format('D');
            var mon1 = __WEBPACK_IMPORTED_MODULE_3_moment__(date1).format('M');
            var date2 = new Date();
            var day2 = __WEBPACK_IMPORTED_MODULE_3_moment__(date2).format('D');
            var mon2 = __WEBPACK_IMPORTED_MODULE_3_moment__(date2).format('M');
            if (day1 === day2 && mon1 == mon2)
                return true;
            else
                return false;
        };
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            cssClass: 'custom-class custom-loading',
            spinner: 'bubbles',
        });
        this.loading.present();
        this.storage.get('user').then(function (user) {
            _this.user = user;
        });
        this.studentService.getAllStudents().then(function (data) {
            _this.studentsList = data;
            _this.authService.searchUser().then(function (data) {
                _this.usersList = data;
                _this.centerService.searchCenter().then(function (data) {
                    _this.centersList = data;
                    _this.indentationService.searchIndentation().then(function (data) {
                        _this.indentationList = data;
                        _this.loading.dismiss();
                        _this.massageData();
                    });
                });
            });
        }, function (err) {
            console.log("not allowed");
        });
    }
    HomeTab.prototype.massageData = function () {
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
        }
        else if (this.user.role == 'centerAdmin') {
            this.getCenterAdminMarketing();
            this.getCenterAdminConversion();
            this.getCenterAdminCurrentStudents();
            this.getCenterAdminLastYearStudents();
            this.getCenterAdminPendingIndentations();
            this.getCenterAdminStudentsClasswise();
            this.getCenterAdminIndentations();
            this.getCenterAdminStudentsClassTypewise();
            this.getCenterAdminTodayBirthday();
        }
        else if (this.user.role == 'counsellor') {
            this.getCounsellorMarketing();
            this.getCounsellorConversion();
            this.getCenterAdminCurrentStudents();
            this.getCenterAdminLastYearStudents();
            this.getCenterAdminPendingIndentations();
            this.getCenterAdminStudentsClasswise();
            this.getCounsellorIndentations();
            this.getCenterAdminStudentsClassTypewise();
            this.getCenterAdminTodayBirthday();
        }
        else if (this.user.role == 'dispatcher') {
            this.getAdminIndentations();
        }
        else if (this.user.role == 'teacher') {
        }
        else if (this.user.role == 'parent') {
        }
        // Swiper settings
        var mySwiper = new __WEBPACK_IMPORTED_MODULE_6_swiper__["a" /* default */]('.swiper-container', {
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
    };
    // Admin
    HomeTab.prototype.getAdminMarketing = function () {
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active;
        });
        this.marketingNumber = filterLength.length;
        this.marketingThisYearNumber = filterLength.filter(function (student) {
            return student.study_year == study_year;
        }).length;
    };
    HomeTab.prototype.getAdminConversion = function () {
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.status != 'enquiry';
        });
        this.conversionNumber = filterLength.length;
    };
    HomeTab.prototype.getAdminCurrentStudents = function () {
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year;
        });
        this.studentNumber = filterLength.length;
    };
    HomeTab.prototype.getAdminLastYearStudents = function () {
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        current_year--;
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return student.status != 'enquiry' && student.study_year == study_year;
        });
        this.lastYearStudentNumber = filterLength.length;
    };
    HomeTab.prototype.getAdminPendingIndentations = function () {
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.status == 'confirmed' && student.study_year == study_year;
        });
        this.pendingIndentationNumber = filterLength.length;
    };
    HomeTab.prototype.getAdminStudentsClasswise = function () {
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year;
        });
        var play = filterLength.filter(function (student) {
            return student.class_group == 'Play Group';
        });
        var nursery = filterLength.filter(function (student) {
            return student.class_group == 'Nursery';
        });
        var lkg = filterLength.filter(function (student) {
            return student.class_group == 'LKG';
        });
        var ukg = filterLength.filter(function (student) {
            return student.class_group == 'UKG';
        });
        this.plotClassStudents(play.length, nursery.length, lkg.length, ukg.length);
    };
    HomeTab.prototype.getAdminStudentsCenterwise = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        var data = [];
        var labels = [];
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year;
        });
        for (var c = 0; c < this.centersList.length; c++) {
            var result = filterLength.filter(function (student) {
                return student.center == _this.centersList[c].center_code;
            });
            if (result.length > 0) {
                data.push(result.length);
                labels.push(this.centersList[c].center_code);
            }
        }
        this.plotCenterStudents(labels, data);
    };
    HomeTab.prototype.getAdminIndentations = function () {
        this.totalIndentations = this.indentationList.length;
        this.totalOpenIndentations = this.indentationList.filter(function (ind) {
            return ind.status != 'closed';
        }).length;
        this.totalIndentationsAmount = this.sumOf(this.indentationList, 'total_amount');
    };
    HomeTab.prototype.getAdminTodayBirthday = function () {
        var _this = this;
        this.todayBirthdayStudents = this.studentsList.filter(function (stu) {
            return _this.datecompare(stu.dob) && stu.is_Active && !stu.deleted && stu.is_Indented;
        });
    };
    HomeTab.prototype.getAdminStudentsClassTypewise = function () {
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year;
        });
        var annual = filterLength.filter(function (student) {
            return student.class_type == 'Annual';
        });
        var mid = filterLength.filter(function (student) {
            return student.class_type == 'Mid-term';
        });
        var early = filterLength.filter(function (student) {
            return student.class_type == 'Early start';
        });
        this.plotClasswiseStudents(annual.length, mid.length, early.length);
    };
    // Center Admin
    HomeTab.prototype.getCenterAdminMarketing = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.center == _this.user.center;
        });
        this.marketingNumber = filterLength.length;
        this.marketingThisYearNumber = filterLength.filter(function (student) {
            return student.study_year == study_year;
        }).length;
    };
    HomeTab.prototype.getCenterAdminConversion = function () {
        var _this = this;
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.center == _this.user.center && student.status != 'enquiry';
        });
        this.conversionNumber = filterLength.length;
    };
    HomeTab.prototype.getCenterAdminCurrentStudents = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.center == _this.user.center && student.status != 'enquiry' && student.study_year == study_year;
        });
        this.studentNumber = filterLength.length;
    };
    HomeTab.prototype.getCenterAdminLastYearStudents = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        current_year--;
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return student.status != 'enquiry' && student.study_year == study_year && student.center == _this.user.center;
        });
        this.lastYearStudentNumber = filterLength.length;
    };
    HomeTab.prototype.getCenterAdminPendingIndentations = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.center == _this.user.center && student.status == 'confirmed' && student.study_year == study_year;
        });
        this.pendingIndentationNumber = filterLength.length;
    };
    HomeTab.prototype.getCenterAdminStudentsClasswise = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.center == _this.user.center && student.status != 'enquiry' && student.study_year == study_year;
        });
        var play = filterLength.filter(function (student) {
            return student.class_group == 'Play Group';
        });
        var nursery = filterLength.filter(function (student) {
            return student.class_group == 'Nursery';
        });
        var lkg = filterLength.filter(function (student) {
            return student.class_group == 'LKG';
        });
        var ukg = filterLength.filter(function (student) {
            return student.class_group == 'UKG';
        });
        this.plotClassStudents(play.length, nursery.length, lkg.length, ukg.length);
    };
    HomeTab.prototype.getCenterAdminIndentations = function () {
        var _this = this;
        var indList = this.indentationList.filter(function (ind) {
            return ind.center_code == _this.user.center;
        });
        this.totalIndentations = indList.length;
        this.totalOpenIndentations = indList.filter(function (ind) {
            return ind.status != 'closed';
        }).length;
        this.totalIndentationsAmount = this.sumOf(indList, 'total_amount');
    };
    HomeTab.prototype.getCenterAdminTodayBirthday = function () {
        var _this = this;
        this.todayBirthdayStudents = this.studentsList.filter(function (stu) {
            return _this.datecompare(stu.dob) && stu.is_Active && !stu.deleted && stu.is_Indented && stu.center == _this.user.center;
        });
    };
    HomeTab.prototype.getCenterAdminStudentsClassTypewise = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.status != 'enquiry' && student.study_year == study_year && student.center == _this.user.center;
        });
        var annual = filterLength.filter(function (student) {
            return student.class_type == 'Annual';
        });
        var mid = filterLength.filter(function (student) {
            return student.class_type == 'Mid-term';
        });
        var early = filterLength.filter(function (student) {
            return student.class_type == 'Early start';
        });
        this.plotClasswiseStudents(annual.length, mid.length, early.length);
    };
    // Counsellor
    HomeTab.prototype.getCounsellorMarketing = function () {
        var _this = this;
        var current_year = parseInt(new Date().getFullYear().toString().substr(2, 2));
        if (new Date().getMonth() < 3)
            current_year--;
        var study_year = '20' + current_year + '-' + (current_year + 1);
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.counsellor == _this.user.email;
        });
        this.marketingNumber = filterLength.length;
        this.marketingThisYearNumber = filterLength.filter(function (student) {
            return student.study_year == study_year;
        }).length;
    };
    HomeTab.prototype.getCounsellorConversion = function () {
        var _this = this;
        var filterLength = this.studentsList.filter(function (student) {
            return !student.deleted && student.is_Active && student.counsellor == _this.user.email && student.status != 'enquiry';
        });
        this.conversionNumber = filterLength.length;
    };
    HomeTab.prototype.getCounsellorIndentations = function () {
        var _this = this;
        var indList = this.indentationList.filter(function (ind) {
            return ind.email == _this.user.email;
        });
        this.totalIndentations = indList.length;
        this.totalOpenIndentations = indList.filter(function (ind) {
            return ind.status != 'closed';
        }).length;
        this.totalIndentationsAmount = this.sumOf(indList, 'total_amount');
    };
    // Dispatcher
    // Graphs
    HomeTab.prototype.plotClassStudents = function (play, nursery, lkg, ukg) {
        this.classStudents = new __WEBPACK_IMPORTED_MODULE_5_chart_js__["Chart"](this.classStudentsCanvas.nativeElement, {
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
    };
    HomeTab.prototype.plotCenterStudents = function (labels, data) {
        this.centerStudents = new __WEBPACK_IMPORTED_MODULE_5_chart_js__["Chart"](this.centerStudentsCanvas.nativeElement, {
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
    };
    HomeTab.prototype.plotClasswiseStudents = function (annual, midterm, early) {
        this.classTypeStudents = new __WEBPACK_IMPORTED_MODULE_5_chart_js__["Chart"](this.classTypeStudentsCanvas.nativeElement, {
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
    };
    // Common
    HomeTab.prototype.checkClass = function (a, b) {
        var val = a / b * 100;
        if (val <= 33.33)
            return 'low-class';
        if (val >= 66.66)
            return 'high-class';
        if (val > 33.33 && val < 66.66)
            return 'medium-class';
        return 'no-class';
    };
    return HomeTab;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("classStudentsCanvas"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], HomeTab.prototype, "classStudentsCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("centerStudentsCanvas"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], HomeTab.prototype, "centerStudentsCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("classTypeStudentsCanvas"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], HomeTab.prototype, "classTypeStudentsCanvas", void 0);
HomeTab = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'home-tab',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/home-tab/home-tab.html"*/'<ion-content style="background:#9e9e9e1a;">\n    <div class="fixed-content">\n\n        <ion-row *ngIf="user.role == \'admin\' || user.role == \'centerAdmin\' || user.role == \'counsellor\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>MARKETING</b>\n                    </ion-card-content>\n                    <ion-card-header>\n                        <ion-card-title> {{marketingNumber}} </ion-card-title>\n                        <span class="high-class">{{marketingThisYearNumber}} this year</span>\n                    </ion-card-header>\n                </ion-card>\n            </ion-col>\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>CONVERSION</b>\n                    </ion-card-content>\n                    <ion-card-header>\n                        <ion-card-title> {{conversionNumber}} </ion-card-title>\n                        <span [class]="checkClass(conversionNumber, marketingNumber)">+\n                            {{conversionNumber / marketingNumber * 100 | number : \'1.0-0\'}}% of target</span>\n                    </ion-card-header>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="user.role == \'admin\' || user.role == \'centerAdmin\' || user.role == \'counsellor\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>STUDENTS</b>\n                    </ion-card-content>\n                    <ion-card-header>\n                        <ion-card-title> {{studentNumber}} </ion-card-title>\n                        <span [class]="checkClass(lastYearStudentNumber, studentNumber)">+\n                            {{lastYearStudentNumber / studentNumber * 100 | number : \'1.0-0\'}}% from last\n                            year</span>\n                    </ion-card-header>\n                </ion-card>\n            </ion-col>\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>PENDING INDENTATIONS</b>\n                    </ion-card-content>\n                    <ion-card-header>\n                        <ion-card-title> {{pendingIndentationNumber}} </ion-card-title>\n                    </ion-card-header>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="user.role == \'admin\' || user.role == \'centerAdmin\' || user.role == \'counsellor\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>STUDENTS IN CLASSES</b>\n                    </ion-card-content>\n                    <canvas #classStudentsCanvas></canvas>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="user.role == \'admin\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>STUDENTS IN CENTERS</b>\n                    </ion-card-content>\n                    <canvas #centerStudentsCanvas></canvas>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="user.role == \'admin\' || user.role == \'centerAdmin\' || user.role == \'counsellor\' || user.role == \'dispatcher\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>TOTAL INDENTATIONS</b>\n                    </ion-card-content>\n                    <ion-card-header>\n                        <ion-card-title> {{totalIndentations}} </ion-card-title>\n                    </ion-card-header>\n                </ion-card>\n            </ion-col>\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>OPEN INDENTATIONS</b>\n                    </ion-card-content>\n                    <ion-card-header>\n                        <ion-card-title> {{totalOpenIndentations}} </ion-card-title>\n                    </ion-card-header>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="user.role == \'admin\' || user.role == \'centerAdmin\' || user.role == \'counsellor\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>SALES</b>\n                    </ion-card-content>\n                    <ion-card-header>\n                        <ion-card-title> &#8377; {{totalIndentationsAmount | number:\'.2\'}} </ion-card-title>\n                    </ion-card-header>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="user.role == \'admin\' || user.role == \'centerAdmin\' || user.role == \'counsellor\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>ADMISSION TYPE BREAKUP</b>\n                    </ion-card-content>\n                    <canvas #classTypeStudentsCanvas></canvas>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf="user.role == \'admin\' || user.role == \'centerAdmin\' || user.role == \'counsellor\'">\n            <ion-col>\n                <ion-card>\n                    <ion-card-content>\n                        <b>BIRTHDAY TODAY</b>\n                    </ion-card-content>\n                    <ion-card-content>\n                        <div class="swiper-container">\n                            <div class="swiper-wrapper">\n                                <div class="swiper-slide" *ngFor="let student of todayBirthdayStudents">\n                                    <img class="profile-photo" *ngIf="student.photo" src={{student.photo}} />\n                                    <img class="profile-photo" *ngIf="!student.photo" src="assets/images/avatar.png" />\n                                    <h6>{{student.name}}</h6>\n                                    <p>{{student.center}}</p>\n                                </div>\n                            </div>\n                        </div>\n                    </ion-card-content>\n                    <ion-card-content *ngIf="todayBirthdayStudents.length <= 0">\n                        <h5>No Birthday Found Today!</h5>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n\n    </div>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/home-tab/home-tab.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_9__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_10__providers_network_network__["a" /* Networks */],
        __WEBPACK_IMPORTED_MODULE_11__providers_indentation_indentation__["a" /* Indentation */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
], HomeTab);

//# sourceMappingURL=home-tab.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationTab; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_network_network__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Providers




var NotificationTab = (function () {
    function NotificationTab(navCtrl, studentService, modalCtrl, alertCtrl, authService, actionSheetCtrl, toastCtrl, platform, app, menu, centerService, networkService, storage, loading, http) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.centerService = centerService;
        this.networkService = networkService;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
    }
    return NotificationTab;
}());
NotificationTab = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'notification-tab',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/notification-tab/notification-tab.html"*/''/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/notification-tab/notification-tab.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_6__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_7__providers_network_network__["a" /* Networks */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], NotificationTab);

//# sourceMappingURL=notification-tab.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileTab; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProfileTab = (function () {
    function ProfileTab(navCtrl, viewCtrl, formBuilder, camera, user, toastCtrl, loadingCtrl, storage, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.http = http;
        this.locationOptions = [];
        this.isDisabled = true;
        this.caption_name = "EDIT";
        this.storage.get("user").then(function (value) {
            console.log(value);
            _this.profileDetails = value;
            _this.form = formBuilder.group({
                _id: [_this.profileDetails._id, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
                name: [_this.profileDetails.name, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
                email: [_this.profileDetails.email, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
                password: [_this.profileDetails.password, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
                role: [_this.profileDetails.role, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
                dob: [_this.profileDetails.dob],
                gender: [_this.profileDetails.gender],
                phone_no: [_this.profileDetails.phone_no, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
                whatsapp_no: [_this.profileDetails.whatsapp_no, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
                photo: [_this.profileDetails.photo],
                active: [_this.profileDetails.active, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
                center: [_this.profileDetails.center, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
                class_group: [_this.profileDetails.class_group],
                address: [_this.profileDetails.address],
            });
        });
    }
    ;
    ProfileTab.prototype.changedSmtng = function () {
        this.caption_name = "SAVE";
    };
    ProfileTab.prototype.editProfile = function () {
        var _this = this;
        if (this.caption_name == "EDIT") {
            this.isDisabled = false;
            this.caption_name = "CANCEL";
        }
        else if (this.caption_name == "SAVE") {
            var loading_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loading_1.present();
            this.form.value.dob = new Date(this.form.value.dob);
            this.user.updateAccount(this.form.value).then(function (resp) {
                _this.viewCtrl.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "You have successfully updated your details .",
                    duration: 2000,
                    position: "top"
                });
                loading_1.dismiss();
                toast.present();
                _this.caption_name = "EDIT";
                _this.isDisabled = true;
            }, function (err) {
                var toast = _this.toastCtrl.create({
                    message: "Error in adding the User. Please try again.",
                    duration: 3000,
                    position: 'top'
                });
                loading_1.dismiss();
                toast.present();
            });
        }
        else if (this.caption_name == "CANCEL") {
            this.isDisabled = true;
            this.caption_name = "EDIT";
        }
    };
    ProfileTab.prototype.ionViewDidLoad = function () { };
    ProfileTab.prototype.getPicture = function () {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]["installed"]()) {
            this.camera.getPicture({
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 96,
                targetHeight: 96
            }).then(function (data) {
                _this.form.patchValue({ photo: "data:image/jpg;base64," + data });
            }, function (err) {
                alert("Unable to take photo");
            });
        }
        else {
            this.fileInput.nativeElement.click();
        }
    };
    ProfileTab.prototype.getProfileImageStyle = function () {
        return "url(" + this.form.controls["photo"].value + ")";
    };
    ProfileTab.prototype.onLocalityChange = function ($event) {
        var _this = this;
        this.locationOptions = [];
        if ($event._value.length > 4) {
            var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $event._value +
                "&types=geocode&key=AIzaSyDxiToPCcr2LL1EC_vkzYtBiQO_9kbIfqs";
            this.http.get(url)
                .subscribe(function (res) {
                var data = res.json();
                _this.locationOptions = data.predictions;
            }, function (err) { });
        }
    };
    ProfileTab.prototype.onLocSelect = function (description) {
        this.form.controls['address'].setValue(description);
        this.locationOptions = [];
    };
    return ProfileTab;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("fileInput"),
    __metadata("design:type", Object)
], ProfileTab.prototype, "fileInput", void 0);
ProfileTab = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "profile-tab",template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/profile-tab/profile-tab.html"*/'<ion-content>\n  <div class="fixed-content">\n\n    <form *ngIf="form" [formGroup]="form" (ngSubmit)="saveProfile()">\n      \n      <ion-list>\n\n        <ion-item>\n          <ion-label floating class="label_here">Name</ion-label>\n          <ion-input class="inputFields" type="text" formControlName="name" (keyup)="changedSmtng()" disabled="{{isDisabled}}"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating class="label_here">Phone No</ion-label>\n          <ion-input class="inputFields" type="number" formControlName="phone_no" (keyup)="changedSmtng()" disabled="{{isDisabled}}"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating class="label_here">Whatsapp No</ion-label>\n          <ion-input class="inputFields" type="number" formControlName="whatsapp_no" (keyup)="changedSmtng()" disabled="{{isDisabled}}"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating class="label_here">Date Of Birth</ion-label>\n          <ion-datetime class="inputFields" displayFormat="DD/MMM/YYYY" formControlName="dob" (ionChange)="changedSmtng()" disabled="{{isDisabled}}"></ion-datetime>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label floating>Gender</ion-label>\n          <ion-select class="inputFields" formControlName="gender" (ionChange)="changedSmtng()" disabled="{{isDisabled}}">\n            <ion-option value="female">Female</ion-option>\n            <ion-option value="male">Male</ion-option>\n          </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label floating>Address</ion-label>\n            <ion-input class="inputFields" type="text" formControlName="address" (ionChange)="onLocalityChange($event);changedSmtng()" disabled="{{isDisabled}}"></ion-input>\n        </ion-item>\n\n        <ion-list>\n          <ion-item *ngFor="let loc of locationOptions" (click)="onLocSelect(loc.description);changedSmtng()">\n            <ion-label>{{loc.description}}</ion-label>\n          </ion-item>\n        </ion-list>\n\n      </ion-list>\n\n    </form>\n  </div>\n</ion-content>\n \n<ion-footer no-border>\n  <ion-toolbar transparent>\n    <button ion-button full (click)="editProfile()" class="editSaveToggleBtn">\n      EDIT\n    </button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/profile-tab/profile-tab.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */]])
], ProfileTab);

//# sourceMappingURL=profile-tab.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromotionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enquiry_enquiry__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confirm_confirm__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var PromotionPage = (function () {
    function PromotionPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, menu, loading, storage, app, CallNumber, actionSheetController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.menu = menu;
        this.loading = loading;
        this.storage = storage;
        this.app = app;
        this.CallNumber = CallNumber;
        this.actionSheetController = actionSheetController;
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isCounsellor = false;
        this.storage.get('user').then(function (user) {
            if (user.role === "counsellor")
                _this.isCounsellor = true;
            else if (user.role === "admin")
                _this.isAdmin = true;
            else if (user.role === "centerAdmin")
                _this.isCenterAdmin = true;
            else
                _this.isCounsellor = true;
        });
    }
    PromotionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.studentService.getStudents().then(function (data) {
            data = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](data, function (o) {
                return (o.status == 'indented' && o.is_Indented && o.study_year == '2019-20');
            });
            _this.storage.get('user').then(function (user) {
                data = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](data, function (o) {
                    return (o.center == user.center);
                });
                _this.students = __WEBPACK_IMPORTED_MODULE_6_lodash__["sortBy"](data, 'name');
                _this.studentsList = __WEBPACK_IMPORTED_MODULE_6_lodash__["sortBy"](data, 'name');
            });
        }, function (err) {
            console.log("not allowed");
        });
    };
    // Function to search for a student dynamically based on an input
    PromotionPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.studentsList.length; i++) {
            if (this.studentsList[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (this.studentsList[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_6_lodash__["includes"](this.studentsList[i].phone_number, this.myInput)) {
                result.push(this.studentsList[i]);
            }
        }
        this.students = result;
        if (this.myInput === "")
            this.students = this.studentsList;
    };
    PromotionPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__enquiry_enquiry__["a" /* EnquiryPage */]);
    };
    PromotionPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    PromotionPage.prototype.showMessage = function (student) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Details Missing',
            inputs: [
                {
                    name: 'parent_name',
                    placeholder: 'Parent Name'
                },
                {
                    name: 'locality',
                    placeholder: 'Locality'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        _this.storage.set('confirmed_student', student);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__confirm_confirm__["a" /* ConfirmPage */]);
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        student.parent_name = data.parent_name;
                        student.locality = data.locality;
                        _this.storage.set('confirmed_student', student);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__confirm_confirm__["a" /* ConfirmPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    PromotionPage.prototype.update = function (student) {
        student.is_Indented = false;
        student.is_Confirmed = false;
        student.is_Delivered = false;
        student.confirmation_date = null;
        student.indentation_date = null;
        student.delivery_date = null;
        if (student.class_group === 'UKG') {
            student.class_group = 'UKG';
        }
        if (student.class_group === 'LKG') {
            student.class_group = 'UKG';
        }
        if (student.class_group === 'Nursery') {
            student.class_group = 'LKG';
        }
        if (student.class_group === 'Play Group') {
            student.class_group = 'Nursery';
        }
        if (student.study_year === '2020-21') {
            student.study_year = '2021-22';
        }
        if (student.study_year === '2019-20') {
            student.study_year = '2020-21';
        }
        if (student.study_year === '2018-19') {
            student.study_year = '2019-20';
        }
        this.storage.set('confirmed_student', student);
        if (student.parent_name == "")
            this.showMessage(student);
        else
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__confirm_confirm__["a" /* ConfirmPage */]);
    };
    PromotionPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PromotionPage;
}());
PromotionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'promotion-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/promotion/promotion.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    PROMOTION\n  </ion-title>\n  <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="add-circle"></ion-icon></button>\n  </ion-buttons>\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <div class="search-row search-full">\n        <ion-searchbar\n            [(ngModel)]="myInput"\n            (animated)="true"\n            (placeholder)="Search"\n            (ionInput)="search()"\n        ></ion-searchbar>\n    </div>\n \n    <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="students && !students.length" />\n    <h1 *ngIf="students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile">\n     \n        <button ion-item>\n          <div class="col_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student"/></div>\n          </div>\n          <div class="col_right">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="mail"></ion-icon> {{student.email_id}}\n            </a>\n            <br/>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="call"></ion-icon> {{student.phone_number}} \n            </a>\n            <!-- <h2><ion-icon name="call"></ion-icon> {{student.alternate_contact}}</h2> -->\n            <h2><ion-icon name="locate"></ion-icon> {{student.locality}}</h2>\n            <h2><ion-icon name="clock"></ion-icon> {{student.dob | date: \'dd/MMM/yyyy\'}} </h2>\n            <h2>{{student.class_group}} ({{student.study_year}})</h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right" *ngIf="student.class_group != \'UKG\'">\n          <button ion-button color="info" (click)="update(student)">\n            <ion-icon name="redo"></ion-icon>\n            Confirm\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n    </ion-item-sliding>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/promotion/promotion.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], PromotionPage);

//# sourceMappingURL=promotion.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdmineditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__confirm_confirm__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_call_number__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_path__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












// Files Images



var AdmineditPage = (function () {
    function AdmineditPage(navCtrl, studentService, centerService, modalCtrl, alertCtrl, authService, menu, loading, storage, app, CallNumber, toastCtrl, formBuilder, actionSheetController, camera, file, filePath, actionSheetCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.centerService = centerService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.menu = menu;
        this.loading = loading;
        this.storage = storage;
        this.app = app;
        this.CallNumber = CallNumber;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isCounsellor = false;
        this.showListing = true;
        this.selectedCenter = false;
        this.onNameChange = function () {
            _this.studentForm.value.name = _this.toTitleCase(_this.studentForm.value.name);
            _this.studentForm.value.name = _this.studentForm.value.name.replace(/\./g, ' ');
            _this.studentForm.controls['name'].setValue(_this.studentForm.value.name);
        };
        this.onEmailChange = function () {
            _this.studentForm.value.email_id = _this.studentForm.value.email_id.toLowerCase();
            _this.studentForm.value.email_id = _this.studentForm.value.email_id.replace(/\s/g, '');
            _this.studentForm.controls['email_id'].setValue(_this.studentForm.value.email_id);
        };
        this.confirmStudent = function () {
            if (_this.studentForm.valid) {
                _this.loader.present();
                _this.student.name = _this.studentForm.value.name;
                _this.student.email_id = _this.studentForm.value.email_id;
                _this.student.phone_number = _this.studentForm.value.phone_number;
                _this.student.gender = _this.studentForm.value.gender;
                _this.student.dob = __WEBPACK_IMPORTED_MODULE_11_moment__(_this.studentForm.value.dob, "YYYY-MM-DD").toDate();
                _this.student.parent_name = _this.studentForm.value.parent_name;
                _this.student.alternate_contact = _this.studentForm.value.alternate_contact;
                _this.student.locality = _this.studentForm.value.locality;
                _this.student.study_year = _this.studentForm.value.study_year;
                _this.student.class_group = _this.studentForm.value.class_group;
                _this.student.uniform_size = _this.studentForm.value.uniform_size;
                _this.student.class_type = _this.studentForm.value.class_type;
                _this.student.shoe_size = _this.studentForm.value.shoe_size;
                _this.student.photo = _this.studentForm.value.photo;
                _this.student.admin_edit = true;
                _this.studentService.updateStudent(_this.student).then(function (result) {
                    _this.loader.dismiss();
                    _this.presentToast('student data saved successfully');
                    _this.goBack();
                }, function (err) {
                    _this.loader.dismiss();
                    _this.presentToast('Error! Please try again.');
                });
            }
        };
        this.takePhoto = function () {
            var actionSheet = _this.actionSheetCtrl.create({
                title: 'Select Image Source',
                buttons: [
                    {
                        text: 'Load from Library',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            actionSheet.present();
        };
        this.storage.get('user').then(function (user) {
            if (user.role === "counsellor")
                _this.isCounsellor = true;
            else if (user.role === "admin")
                _this.isAdmin = true;
            else if (user.role === "centerAdmin")
                _this.isCenterAdmin = true;
            else
                _this.isCounsellor = true;
        });
        this.studentForm = formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            email_id: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            phone_number: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            gender: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            dob: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            parent_name: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            alternate_contact: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
            locality: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            study_year: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            class_group: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            class_type: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            uniform_size: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            shoe_size: ['', __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* Validators */].required])],
            photo: ['']
        });
    }
    AdmineditPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.centerService.searchCenter().then(function (data) {
            _this.centers = data;
        }, function (err) {
            console.log("not allowed");
        });
        this.studentService.getStudents().then(function (data) {
            _this.studentsList = data;
            _this.students = data;
        }, function (err) {
            console.log("not allowed");
        });
    };
    // Function to search for a student dynamically based on an input
    AdmineditPage.prototype.search = function () {
        this.selectCenter(this.inCenter);
        var result = [];
        for (var i = 0; i < this.students.length; i++) {
            if (this.students[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.students[i]);
            }
            else if (this.students[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.students[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_7_lodash__["includes"](this.students[i].phone_number, this.myInput)) {
                result.push(this.students[i]);
            }
        }
        if (this.myInput != "")
            this.students = result;
    };
    AdmineditPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    AdmineditPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    AdmineditPage.prototype.update = function (student) {
        this.storage.set('confirmed_student', student);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__confirm_confirm__["a" /* ConfirmPage */]);
    };
    AdmineditPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    AdmineditPage.prototype.delete = function (student) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this student data?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        student.is_Active = false;
                        student.admin_edit = true;
                        _this.studentService.updateStudent(student).then(function (result) {
                            _this.presentToast('student deleted successfully');
                            _this.goBack();
                        }, function (err) {
                            _this.loader.dismiss();
                            _this.presentToast('Error! Please try again.');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    AdmineditPage.prototype.goBack = function () {
        this.selectedCenter = true;
        this.showListing = true;
        this.myInput = "";
    };
    AdmineditPage.prototype.edit = function (student) {
        this.showListing = false;
        this.student = student;
        this.studentForm.controls['name'].setValue(student.name);
        this.studentForm.controls['email_id'].setValue(student.email_id);
        this.studentForm.controls['phone_number'].setValue(student.phone_number);
        this.studentForm.controls['gender'].setValue(student.gender);
        this.studentForm.controls['dob'].setValue(student.dob);
        this.studentForm.controls['parent_name'].setValue(student.parent_name);
        this.studentForm.controls['alternate_contact'].setValue(student.alternate_contact);
        this.studentForm.controls['locality'].setValue(student.locality);
        this.studentForm.controls['study_year'].setValue(student.study_year);
        this.studentForm.controls['class_group'].setValue(student.class_group);
        this.studentForm.controls['uniform_size'].setValue(student.uniform_size);
        this.studentForm.controls['class_type'].setValue(student.class_type);
        this.studentForm.controls['shoe_size'].setValue(student.shoe_size);
        this.studentForm.controls['photo'].setValue(student.photo);
    };
    AdmineditPage.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    AdmineditPage.prototype.selectCenter = function (center) {
        this.inCenter = center;
        this.selectedCenter = true;
        this.students = __WEBPACK_IMPORTED_MODULE_7_lodash__["filter"](this.studentsList, function (o) {
            return (o.center == center.center_code);
        });
    };
    AdmineditPage.prototype.reselectCenter = function () {
        this.selectedCenter = false;
        this.myInput = "";
    };
    AdmineditPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Photos
    AdmineditPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    AdmineditPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    // Always get the accurate path to your apps folder
    AdmineditPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    AdmineditPage.prototype.uploadImage = function () {
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var path = targetPath + filename;
        this.getFileContentAsBase64(path, function (base64Image) {
            this.confirmForm.photo = base64Image;
        });
    };
    AdmineditPage.prototype.getFileContentAsBase64 = function (path, callback) {
        windows.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            alert('Cannot found requested file');
        }
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    };
    AdmineditPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    AdmineditPage.prototype.getPicture = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.fileInput.nativeElement.click();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.camera.getPicture({
                            quality: 1,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            targetWidth: 10,
                            targetHeight: 10
                        }).then(function (data) {
                            _this.studentForm.patchValue({ 'photo': 'data:image/jpg;base64,' + data });
                        }, function (err) {
                            alert('Unable to take photo');
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    AdmineditPage.prototype.processWebImage = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var imageData = readerEvent.target.result;
            _this.studentForm.patchValue({ 'photo': imageData });
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(this.studentForm.controls['photo'].value);
    };
    AdmineditPage.prototype.getProfileImageStyle = function () {
        return ('url(' + this.studentForm.controls['photo'].value + ')');
    };
    return AdmineditPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
    __metadata("design:type", Object)
], AdmineditPage.prototype, "fileInput", void 0);
AdmineditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'adminedit-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/adminedit/adminedit.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    EDIT (ADMIN)\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="add-circle"></ion-icon></button>\n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list *ngIf="showListing && selectedCenter">\n\n    <div class="search-row search-full">\n        <ion-searchbar\n            [(ngModel)]="myInput"\n            (animated)="true"\n            (placeholder)="Search"\n            (ionInput)="search()"\n        ></ion-searchbar>\n    </div>\n \n    <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="students && !students.length" />\n    <h1 *ngIf="students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile">\n     \n        <button ion-item>\n          <div class="col_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student"/></div>\n          </div>\n          <div class="col_right">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="mail"></ion-icon> {{student.email_id}}\n            </a>\n            <br>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="call"></ion-icon> {{student.phone_number}} \n            </a>\n            <!-- <h2><ion-icon name="call"></ion-icon> {{student.alternate_contact}}</h2> -->\n            <h2><ion-icon name="locate"></ion-icon> {{student.locality}}</h2>\n            <h2><ion-icon name="clock"></ion-icon> {{student.dob | date: \'dd/MMM/yyyy\'}} </h2>\n            <h2>{{student.class_group}} ({{student.study_year}})</h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right">\n          <button ion-button color="warning" (click)="edit(student)">\n            <ion-icon name="create"></ion-icon>\n            Edit\n          </button>\n          <button ion-button color="danger" (click)="delete(student)">\n            <ion-icon name="trash"></ion-icon>\n            Delete\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n\n  <ion-list *ngIf="showListing && !selectedCenter" style="margin-bottom:50px;">\n        \n    <ion-item *ngFor="let center of centers" class="results_list_mobile" (click)="selectCenter(center)">\n            <h1>{{center.center_name}}</h1>\n            <h4>{{center.center_address}}</h4>\n    </ion-item>\n\n  </ion-list>\n\n\n  <ion-list no-lines *ngIf="!showListing">\n\n      <form [formGroup]="studentForm">\n \n        <!-- Name of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Name*</ion-label>\n            <ion-input type="text" formControlName="name" (ionChange)="onNameChange()"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.name.valid  && (studentForm.controls.name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n\n        <!-- Gender of the student -->\n        <ion-list radio-group formControlName="gender">\n          <ion-list-header> <ion-icon name="transgender"></ion-icon> Gender* </ion-list-header>\n          <ion-item>\n            <ion-label>Male</ion-label>\n            <ion-radio value="Male"></ion-radio>\n          </ion-item>\n          <ion-item>\n            <ion-label>Female</ion-label>\n            <ion-radio value="Female"></ion-radio>\n          </ion-item>\n        </ion-list>\n        <p class="errorMessage" *ngIf="!studentForm.controls.gender.valid  && (studentForm.controls.gender.dirty || submitAttempt)">\n          Please select Gender\n        </p>\n\n        <!-- DOB of the student -->\n        <ion-item>\n          <ion-label floating><ion-icon name="clock"></ion-icon> DOB*</ion-label>\n          <ion-datetime displayFormat="DD/MMM/YYYY" (ionChange)="onDobChange()" pickerFormat="DD MMM YYYY" formControlName="dob"></ion-datetime>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.dob.valid  && (studentForm.controls.dob.dirty || submitAttempt)">\n          Please select valid date\n        </p>\n\n        <!-- Name of the Parent -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Parent Name*</ion-label>\n            <ion-input type="text" formControlName="parent_name"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.parent_name.valid  && (studentForm.controls.parent_name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n\n        <!-- Email Id of the Parent  -->\n        <ion-item>\n          <ion-label floating><ion-icon name="mail"></ion-icon> E-mail*</ion-label>\n          <ion-input type="text" (ionChange)="onEmailChange()" formControlName="email_id"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.email_id.valid  && (studentForm.controls.email_id.dirty || submitAttempt)">\n          Please enter a valid E-mail Id\n        </p>\n \n        <!-- Phone no of the Parent  -->\n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Phone No*</ion-label>\n            <ion-input type="text" (ionChange)="onPhoneChange()"formControlName="phone_number"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.phone_number.valid  && (studentForm.controls.phone_number.dirty || submitAttempt)">\n          Please enter a valid Phone No.\n        </p>\n\n        <!-- Alternate Contact of the Parent  -->\n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Alternate Contact</ion-label>\n            <ion-input type="text" (ionChange)="onPhoneChange()" formControlName="alternate_contact"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.alternate_contact.valid  && (studentForm.controls.alternate_contact.dirty || submitAttempt)">\n          Please enter a valid alternate No.\n        </p>\n\n        <!-- Locality of the Parent  -->\n        <ion-item>\n            <ion-label floating><ion-icon name="locate"></ion-icon> Locality*</ion-label>\n            <ion-input type="text" formControlName="locality"></ion-input>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.locality.valid  && (studentForm.controls.locality.dirty || submitAttempt)">\n          Please enter a valid locality\n        </p>\n \n        <!-- Study Year of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="bookmarks"></ion-icon> Study Year*</ion-label>\n            <ion-select formControlName="study_year" interface="popover" (ionChange)="onYearChange()">\n              <ion-option value="2018-19">May 2018 - April 2019</ion-option>\n              <ion-option value="2019-20">May 2019 - April 2020</ion-option>\n              <ion-option value="2020-21">May 2020 - April 2021</ion-option>\n              <ion-option value="2021-22">May 2021 - April 2022</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.study_year.valid  && (studentForm.controls.study_year.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- Class of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="office"></ion-icon> Class*</ion-label>\n            <ion-select formControlName="class_group" interface="popover">\n              <ion-option value="Play Group">Play Group</ion-option>\n              <ion-option value="Nursery">Nursery</ion-option>\n              <ion-option value="LKG">LKG</ion-option>\n              <ion-option value="UKG">UKG</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.class_group.valid  && (studentForm.controls.class_group.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- class_type of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="office"></ion-icon> Type*</ion-label>\n            <ion-select formControlName="class_type" interface="popover">\n              <ion-option value="Annual">Annual</ion-option>\n              <ion-option value="Mid-term">Mid-term</ion-option>\n              <ion-option value="Early start">Early start</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.class_type.valid  && (studentForm.controls.class_type.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- uniform_size of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="clothes"></ion-icon> Uniform Size*</ion-label>\n            <ion-select formControlName="uniform_size" interface="popover">\n              <ion-option value="">NA</ion-option>\n              <ion-option value="18">18</ion-option>\n              <ion-option value="20">20</ion-option>\n              <ion-option value="22">22</ion-option>\n              <ion-option value="24">24</ion-option>\n              <ion-option value="26">26</ion-option>\n              <ion-option value="28">28</ion-option>\n              <ion-option value="30">30</ion-option>\n              <ion-option value="32">32</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.uniform_size.valid  && (studentForm.controls.uniform_size.dirty || submitAttempt)">\n          Please select Uniform Size\n        </p>\n\n        <!-- shoe_size of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="shoe"></ion-icon> Shoe Size*</ion-label>\n            <ion-select formControlName="shoe_size" interface="popover">\n              <ion-option value="">NA</ion-option>\n              <ion-option value="6">6</ion-option>\n              <ion-option value="7">7</ion-option>\n              <ion-option value="8">8</ion-option>\n              <ion-option value="9">9</ion-option>\n              <ion-option value="10">10</ion-option>\n              <ion-option value="11">11</ion-option>\n              <ion-option value="12">12</ion-option>\n              <ion-option value="13">13</ion-option>\n            </ion-select>\n        </ion-item>\n        <p class="errorMessage" *ngIf="!studentForm.controls.shoe_size.valid  && (studentForm.controls.shoe_size.dirty || submitAttempt)">\n          Please select Shoe Size\n        </p>\n\n        <br><br><br><br>\n\n        <ion-toolbar color="primary" class="upload_button">\n          <ion-buttons>\n            <button ion-button icon-left (click)="getPicture()">\n              <ion-icon name="camera"></ion-icon>\n              <p *ngIf="studentForm.controls.photo.value == \'\'">Select Image</p>\n              <p *ngIf="studentForm.controls.photo.value != \'\'">Change Image</p>\n            </button>\n            <input type="file" #fileInput name="files[]" style="visibility: hidden; height: 0px"  (change)="processWebImage($event)" />\n          </ion-buttons>\n        </ion-toolbar>\n\n      </form>\n \n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <div class="gm_drawer_footer_wrapper" *ngIf="!showListing">\n    <button (click)="goBack()" ion-button class="btn-danger">Cancel</button>\n    <button (click)="confirmStudent()" ion-button class="btn-success">Submit</button>\n  </div>\n\n  <div class="gm_drawer_footer_wrapper" *ngIf="showListing && selectedCenter">\n    <button (click)="reselectCenter()" ion-button class="btn-danger" style="width:100%;">Cancel</button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/adminedit/adminedit.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_3__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_path__["a" /* FilePath */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
], AdmineditPage);

//# sourceMappingURL=adminedit.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeletestudentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var DeletestudentPage = (function () {
    function DeletestudentPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, menu, loading, storage, app, CallNumber, toastCtrl, actionSheetController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.menu = menu;
        this.loading = loading;
        this.storage = storage;
        this.app = app;
        this.CallNumber = CallNumber;
        this.toastCtrl = toastCtrl;
        this.actionSheetController = actionSheetController;
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isCounsellor = false;
        this.storage.get('user').then(function (user) {
            if (user.role === "counsellor")
                _this.isCounsellor = true;
            else if (user.role === "admin")
                _this.isAdmin = true;
            else if (user.role === "centerAdmin")
                _this.isCenterAdmin = true;
            else
                _this.isCounsellor = true;
        });
    }
    DeletestudentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.studentService.getInactiveStudents().then(function (data) {
            _this.studentsList = data;
            _this.students = data;
        }, function (err) {
            console.log("not allowed");
        });
    };
    // Function to search for a student dynamically based on an input
    DeletestudentPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.studentsList.length; i++) {
            if (this.studentsList[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (this.studentsList[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_4_lodash__["includes"](this.studentsList[i].phone_number, this.myInput)) {
                result.push(this.studentsList[i]);
            }
        }
        this.students = result;
        if (this.myInput === "")
            this.students = this.studentsList;
    };
    DeletestudentPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    DeletestudentPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    DeletestudentPage.prototype.delete = function (student) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Restore',
            message: 'Do you want to restore this student data?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        student.is_Active = true;
                        student.admin_edit = true;
                        _this.studentService.updateStudent(student).then(function (result) {
                            _this.presentToast('student data restored successfully');
                            _this.studentService.getInactiveStudents().then(function (data) {
                                _this.studentsList = data;
                                _this.students = data;
                                _this.myInput = "";
                            }, function (err) {
                                console.log("not allowed");
                            });
                        }, function (err) {
                            _this.loader.dismiss();
                            _this.presentToast('Error! Please try again.');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    DeletestudentPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DeletestudentPage;
}());
DeletestudentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'deletestudent-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/deletestudent/deletestudent.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    DELETED STUDENTS (ADMIN)\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="add-circle"></ion-icon></button>\n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <div class="search-row search-full">\n        <ion-searchbar\n            [(ngModel)]="myInput"\n            (animated)="true"\n            (placeholder)="Search"\n            (ionInput)="search()"\n        ></ion-searchbar>\n    </div>\n \n    <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="students && !students.length" />\n    <h1 *ngIf="students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile">\n     \n        <button ion-item>\n          <div class="col_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student"/></div>\n          </div>\n          <div class="col_right">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="mail"></ion-icon> {{student.email_id}}\n            </a>\n            <br>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="call"></ion-icon> {{student.phone_number}} \n            </a>\n            <!-- <h2><ion-icon name="call"></ion-icon> {{student.alternate_contact}}</h2> -->\n            <h2><ion-icon name="locate"></ion-icon> {{student.locality}}</h2>\n            <h2><ion-icon name="clock"></ion-icon> {{student.dob | date: \'dd/MMM/yyyy\'}} </h2>\n            <h2>{{student.class_group}} ({{student.study_year}})</h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right">\n          <button ion-button color="danger" (click)="delete(student)">\n            <ion-icon name="trash"></ion-icon>\n            Restore\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/deletestudent/deletestudent.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], DeletestudentPage);

//# sourceMappingURL=deletestudent.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdcardrequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__editstudent_editstudent__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











var IdcardrequestPage = (function () {
    function IdcardrequestPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loading, storage, centerService, indentationService, toastCtrl, CallNumber, actionSheetController, alertController) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loading = loading;
        this.storage = storage;
        this.centerService = centerService;
        this.indentationService = indentationService;
        this.toastCtrl = toastCtrl;
        this.CallNumber = CallNumber;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.classes = ['Play Group', 'Nursery', 'LKG', 'UKG'];
        this.mySelect = '';
    }
    IdcardrequestPage.prototype.ionViewDidLoad = function () {
        this.fetchData();
    };
    ;
    IdcardrequestPage.prototype.fetchData = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.studentService.getStudents().then(function (data) {
            _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](data, function (o) {
                return (o.is_Indented && o.is_IndentConfirmed && !o.idCardRequested);
            });
            _this.storage.get('user').then(function (user) {
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](_this.students, function (o) {
                    return (o.center == user.center);
                });
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["sortBy"](_this.students, 'indentation_date');
                _this.studentsList = __WEBPACK_IMPORTED_MODULE_9_lodash__["sortBy"](_this.students, 'indentation_date');
            });
        }, function (err) {
            console.log("not allowed");
        });
    };
    IdcardrequestPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    IdcardrequestPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    IdcardrequestPage.prototype.print = function (student) {
        this.presentAlertConfirm(student);
    };
    IdcardrequestPage.prototype.presentAlertConfirm = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            title: 'Please confirm the student details are correct? ',
                            message: ('<strong> Name: </strong>  ' + student.name + '<br/> <strong> Parent Name: </strong>  ' +
                                student.parent_name + '<br/> <strong> Phone Number: </strong>  ' + student.phone_number +
                                '<br/> <strong> Class: </strong>  ' + student.class_group),
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Correct',
                                    cssClass: 'primary',
                                    handler: function () {
                                        _this.loader = _this.loading.create({
                                            content: 'Please wait...',
                                        });
                                        student.idCardRequested = true;
                                        student.idCardPrinted = false;
                                        _this.studentService.editStudent(student).then(function (result) {
                                            _this.loader.dismiss();
                                            _this.presentToast('Admit card is getting ready, we will send you soon!');
                                            _this.fetchData();
                                        }, function (err) {
                                            _this.loader.dismiss();
                                            _this.presentToast('Error! Please try again.');
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IdcardrequestPage.prototype.edit = function (student) {
        this.storage.set('edit_student', student._id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__editstudent_editstudent__["a" /* EditstudentPage */]);
    };
    // Function to search for a student dynamically based on an input
    IdcardrequestPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.studentsList.length; i++) {
            if (this.studentsList[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (this.studentsList[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_9_lodash__["includes"](this.studentsList[i].phone_number, this.myInput)) {
                result.push(this.studentsList[i]);
            }
        }
        this.students = result;
        if (this.myInput === "")
            this.students = this.studentsList;
    };
    IdcardrequestPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IdcardrequestPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
    };
    IdcardrequestPage.prototype.onSelectChange = function () {
        this.myInput = '';
        if (this.mySelect === '') {
            this.students = this.studentsList;
        }
        else {
            this.students = [];
            for (var s = 0; s < this.studentsList.length; s++) {
                if (this.studentsList[s].class_group === this.mySelect)
                    this.students.push(this.studentsList[s]);
            }
        }
    };
    return IdcardrequestPage;
}());
IdcardrequestPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'idcardrequest-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/idcardrequest/idcardrequest.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    ID CARD REQUEST\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="close"></ion-icon></button>\n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="search-row">\n    <ion-searchbar\n      [(ngModel)]="myInput"\n      (animated)="true"\n      (placeholder)="Search"\n      (ionInput)="search()"\n    ></ion-searchbar>\n    <ion-select interface="popover" [(ngModel)]="mySelect" (ionChange)="onSelectChange()" class="search-ic">\n      <ion-option *ngFor="let class of classes" [value]="class">{{class}}</ion-option>\n    </ion-select> \n  </div>\n\n  <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="!students" />\n  <h1 *ngIf="students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n  <ion-list *ngIf="students && students.length">\n \n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile indent_results" style="height:100%;">\n     \n        <button ion-item>\n          <div class="col_left indent_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student indent_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student indent_student"/></div>\n            <br/>\n            <h2 *ngIf="!student.photo" style="color: red;"> \n              Please upload student image for printing Hall Ticket\n            </h2>\n          </div>\n          <div class="col_right indent_right">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <h2><ion-icon name="phone"></ion-icon> {{student.phone_number}} </h2>\n            <h2>{{student.class_group}}</h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right">\n          <button ion-button color="primary" (click)="edit(student)">\n            <ion-icon name="redo"></ion-icon>\n            Edit\n          </button>\n          <button ion-button color="secondary" (click)="print(student)" *ngIf="student.photo">\n            <ion-icon name="undo"></ion-icon>\n            Request ID Card\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n    </ion-item-sliding>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/idcardrequest/idcardrequest.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__["a" /* Indentation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], IdcardrequestPage);

//# sourceMappingURL=idcardrequest.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdcardprintPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var IdcardprintPage = (function () {
    function IdcardprintPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loading, storage, centerService, indentationService, toastCtrl, CallNumber, actionSheetController, alertController) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loading = loading;
        this.storage = storage;
        this.centerService = centerService;
        this.indentationService = indentationService;
        this.toastCtrl = toastCtrl;
        this.CallNumber = CallNumber;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.mySelect = '';
    }
    IdcardprintPage.prototype.ionViewDidLoad = function () {
        this.fetchData();
    };
    ;
    IdcardprintPage.prototype.fetchData = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.centerService.searchCenter().then(function (result) {
            _this.centers = result;
        }, function (err) {
            console.log(err);
        });
        this.studentService.getStudents().then(function (data) {
            _this.students = __WEBPACK_IMPORTED_MODULE_8_lodash__["filter"](data, function (o) {
                return (o.is_Indented && o.is_IndentConfirmed && o.idCardRequested && !o.idCardPrinted);
            });
            _this.students = __WEBPACK_IMPORTED_MODULE_8_lodash__["sortBy"](_this.students, 'indentation_date');
            _this.studentsList = __WEBPACK_IMPORTED_MODULE_8_lodash__["sortBy"](_this.students, 'indentation_date');
        }, function (err) {
            console.log("not allowed");
        });
    };
    IdcardprintPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    IdcardprintPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    IdcardprintPage.prototype.print = function (student) {
        this.presentAlertConfirm(student);
    };
    IdcardprintPage.prototype.presentAlertConfirm = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            title: 'Please confirm the student details are correct? ',
                            message: ('<strong> Name: </strong>  ' + student.name + '<br/> <strong> Parent Name: </strong>  ' +
                                student.parent_name + '<br/> <strong> Phone Number: </strong>  ' + student.phone_number +
                                '<br/> <strong> Class: </strong>  ' + student.class_group),
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Correct',
                                    cssClass: 'primary',
                                    handler: function () {
                                        _this.loader = _this.loading.create({
                                            content: 'Please wait...',
                                        });
                                        student.idCardRequested = true;
                                        student.idCardPrinted = true;
                                        _this.studentService.editStudent(student).then(function (result) {
                                            window.open(_this.studentService.url + 'api/misc/idcard/' + student._id, '_blank');
                                            _this.loader.dismiss();
                                            _this.presentToast('Admit card is downloaded!');
                                            _this.fetchData();
                                        }, function (err) {
                                            _this.loader.dismiss();
                                            _this.presentToast('Error! Please try again.');
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Function to search for a student dynamically based on an input
    IdcardprintPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.studentsList.length; i++) {
            if (this.studentsList[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (this.studentsList[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_8_lodash__["includes"](this.studentsList[i].phone_number, this.myInput)) {
                result.push(this.studentsList[i]);
            }
        }
        this.students = result;
        if (this.myInput === "")
            this.students = this.studentsList;
    };
    IdcardprintPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IdcardprintPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
    };
    IdcardprintPage.prototype.onSelectChange = function () {
        this.myInput = '';
        if (this.mySelect === '') {
            this.students = this.studentsList;
        }
        else {
            this.students = [];
            for (var s = 0; s < this.studentsList.length; s++) {
                if (this.studentsList[s].center === this.myInput)
                    this.students.push(this.studentsList[s]);
            }
        }
    };
    return IdcardprintPage;
}());
IdcardprintPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'idcardprint-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/idcardprint/idcardprint.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    PRINT ID CARD\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="close"></ion-icon></button>\n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="search-row">\n    <ion-searchbar\n        [(ngModel)]="myInput"\n        (animated)="true"\n        (placeholder)="Search"\n        (ionInput)="search()">\n    </ion-searchbar>\n    <ion-select interface="popover" [(ngModel)]="mySelect" (ionChange)="onSelectChange()" class="search-ic">\n      <ion-option *ngFor="let center of centers" [value]="center.center_code">{{center.center_name}}</ion-option>\n    </ion-select>\n  </div>\n\n  <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="!students" />\n  <h1 *ngIf="students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n  <ion-list *ngIf="students && students.length">\n \n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile indent_results" style="height: 100%;">\n     \n        <button ion-item>\n          <div class="col_left indent_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student indent_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student indent_student"/></div>\n            <br/>\n          </div>\n          <div class="col_right indent_right">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <h2><ion-icon name="phone"></ion-icon> {{student.phone_number}} </h2>\n            <h2>{{student.class_group}}</h2>\n            <h2>{{student.center}}</h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right">\n          <button ion-button color="info" (click)="print(student)">\n            <ion-icon name="redo"></ion-icon>\n            Download ID Card\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n    </ion-item-sliding>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/idcardprint/idcardprint.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__["a" /* Indentation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], IdcardprintPage);

//# sourceMappingURL=idcardprint.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApproveindentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_indentation_indentation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ApproveindentPage = (function () {
    function ApproveindentPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loadingCtrl, storage, centerService, indentationService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.centerService = centerService;
        this.indentationService = indentationService;
        this.toastCtrl = toastCtrl;
        this.indentations = [];
        this.allIndentations = [];
        this.list_of_students = [];
        this.all_list_of_students = [];
        this.confirm_dispatch = false;
        this.show_button = 0;
        this.msg = "";
        this.showModal = false;
        this.myInputIndentation = "";
        this.myInputStudent = "";
        this.students = [];
        this.centers = [];
        this.myInput = '';
        this.mySelect = '';
    }
    ApproveindentPage.prototype.ionViewDidLoad = function () {
        this.fetchData();
    };
    ApproveindentPage.prototype.fetchData = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        this.indentationService.searchIndentation().then(function (data) {
            _this.indentations = __WEBPACK_IMPORTED_MODULE_7_lodash__["filter"](data, function (o) {
                return (!o.is_IndentConfirmed);
            });
            _this.allIndentations = _this.indentations;
        }, function (err) {
            console.log("not allowed");
        });
        this.centerService.searchCenter().then(function (result) {
            _this.centers = result;
        }, function (err) {
            console.log(err);
        });
        this.studentService.getStudents().then(function (data) {
            _this.students = data;
        }, function (err) {
            console.log("not allowed");
        });
    };
    ApproveindentPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ApproveindentPage.prototype.confirmIndent = function (indentation) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure you want to Confirm this Indentation?',
            message: ('<strong> Indentation No: </strong>  ' + indentation.num + '<br/> <strong> Center: </strong>  ' +
                indentation.center_code + '<br/> <strong> Amount: </strong>  ' + indentation.total_amount +
                '<br/> <strong> Date: </strong>  ' + __WEBPACK_IMPORTED_MODULE_9_moment__(indentation.payment_date).format('DD-MMM-YYYY')),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: function (blah) {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Confirm',
                    handler: function () {
                        _this.confirm(indentation);
                    }
                }
            ]
        });
        alert.present();
    };
    ApproveindentPage.prototype.confirm = function (indentation) {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        indentation.is_IndentConfirmed = true;
        this.indentationService.approveIndentation(indentation).then(function (result) {
            _this.loader.dismiss();
            _this.confirmStudents(indentation);
            _this.presentToast('Indentation is confirmed successfully to dispatch or print admit card!');
            _this.fetchData();
        }, function (err) {
            _this.loader.dismiss();
            _this.presentToast('Error! Please try again.');
        });
    };
    ApproveindentPage.prototype.confirmStudents = function (indentation) {
        for (var i = 0; i < indentation.students_amount.length; i++) {
            var stu = this.students.find(function (element) {
                return element.student_id == indentation.students_amount[i].student_id;
            });
            stu.is_IndentConfirmed = true;
            this.studentService.editStudent(stu).then(function (result) { }, function (err) { });
        }
        ;
    };
    ApproveindentPage.prototype.searchIndentation = function () {
        var result = [];
        for (var i = 0; i < this.allIndentations.length; i++) {
            if (this.allIndentations[i].payment_mode.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].bank_name != undefined && this.allIndentations[i].bank_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].transaction_no != undefined && this.allIndentations[i].transaction_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].email.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].center_code.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].num.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].cheque_no != undefined && this.allIndentations[i].cheque_no.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else if (this.allIndentations[i].status.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                result.push(this.allIndentations[i]);
            }
            else {
                for (var s = 0; s < this.allIndentations[i].students_amount.length; s++) {
                    if (__WEBPACK_IMPORTED_MODULE_7_lodash__["includes"](this.allIndentations[i].students_amount[s].phone_number, this.myInputIndentation) ||
                        this.allIndentations[i].students_amount[s].student_name.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0 ||
                        this.allIndentations[i].students_amount[s].student_id.toUpperCase().indexOf(this.myInputIndentation.toUpperCase()) >= 0) {
                        result.push(this.allIndentations[i]);
                    }
                }
            }
        }
        this.indentations = result;
        if (this.myInputIndentation === "")
            this.indentations = this.allIndentations;
    };
    ApproveindentPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            spinner: 'hide',
            content: '<div class="ion-spinner"></div><br><div class="loading">Loading...</div>'
        });
        this.loading.present();
    };
    ApproveindentPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
    };
    ApproveindentPage.prototype.onSelectChange = function () {
        this.myInput = '';
        if (this.mySelect === '') {
            this.indentations = this.allIndentations;
        }
        else {
            this.indentations = [];
            for (var s = 0; s < this.allIndentations.length; s++) {
                if (this.allIndentations[s].center_code === this.mySelect)
                    this.indentations.push(this.allIndentations[s]);
            }
        }
    };
    return ApproveindentPage;
}());
ApproveindentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'approveindent-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/approveindent/approveindent.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    APPROVE INDENTATIONS\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="close"></ion-icon></button>    \n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n \n<ion-content>\n\n  <div class="search-row">\n    <ion-searchbar\n      [(ngModel)]="myInputIndentation"\n      (animated)="true"\n      (placeholder)="Search"\n      (ionInput)="searchIndentation()"\n    ></ion-searchbar> \n    <ion-select interface="popover" [(ngModel)]="mySelect" (ionChange)="onSelectChange()" class="search-ic">\n      <ion-option *ngFor="let center of centers" [value]="center.center_code">{{center.center_name}}</ion-option>\n    </ion-select>    \n  </div>\n\n  <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="!indentations.length" />\n  <h1 *ngIf="!indentations.length" class="no_record"> NO RECORDS FOUND </h1>\n\n  <div>\n\n    <ion-list *ngIf="indentations.length">\n\n      <ion-item-sliding *ngFor="let indentation of indentations" class="results_list_mobile indent_results" style="height: 100%">\n       \n          <button ion-item>\n            <div>\n              <h1>{{indentation.num}} ({{indentation.center_code}}) &nbsp; - &nbsp; \n                    <i> {{indentation.students_amount.length}} Student(s) </i>\n              </h1>\n              <h2>Amount - {{indentation.total_amount}} </h2>\n              <h2>Payment Mode - {{indentation.payment_mode}} </h2>\n              <h2>Payment Date - {{indentation.payment_date | date: \'dd/MMM/yyyy\'}} </h2>\n              <h2>Bank - {{indentation.bank_name}} </h2>\n              <h2>Transacton No - {{indentation.transaction_no}} </h2>\n              <h2>Cheque No - {{indentation.cheque_no}}</h2>\n            </div>\n          </button>\n       \n          <ion-item-options side="right">\n            <button ion-button color="info" (click)="confirmIndent(indentation)">\n              <ion-icon name="redo"></ion-icon>\n              Approve\n            </button>\n          </ion-item-options>\n      </ion-item-sliding>\n\n    </ion-list>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/approveindent/approveindent.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_5__providers_indentation_indentation__["a" /* Indentation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
], ApproveindentPage);

//# sourceMappingURL=approveindent.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentslistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__editstudent_editstudent__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











var StudentslistPage = (function () {
    function StudentslistPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loading, storage, centerService, indentationService, toastCtrl, CallNumber, actionSheetController, alertController) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loading = loading;
        this.storage = storage;
        this.centerService = centerService;
        this.indentationService = indentationService;
        this.toastCtrl = toastCtrl;
        this.CallNumber = CallNumber;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.classes = ['Play Group', 'Nursery', 'LKG', 'UKG'];
        this.mySelect = '';
    }
    StudentslistPage.prototype.ionViewDidLoad = function () {
        this.fetchData();
    };
    ;
    StudentslistPage.prototype.fetchData = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.studentService.getStudents().then(function (data) {
            _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](data, function (o) {
                return (o.is_Indented);
            });
            _this.storage.get('user').then(function (user) {
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["filter"](_this.students, function (o) {
                    return (o.center == user.center);
                });
                _this.students = __WEBPACK_IMPORTED_MODULE_9_lodash__["sortBy"](_this.students, 'name');
                _this.studentsList = __WEBPACK_IMPORTED_MODULE_9_lodash__["sortBy"](_this.students, 'name');
            });
        }, function (err) {
            console.log("not allowed");
        });
    };
    StudentslistPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    StudentslistPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    StudentslistPage.prototype.edit = function (student) {
        this.storage.set('edit_student', student._id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__editstudent_editstudent__["a" /* EditstudentPage */]);
    };
    // Function to search for a student dynamically based on an input
    StudentslistPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.studentsList.length; i++) {
            if (this.studentsList[i].name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (this.studentsList[i].parent_name.toUpperCase().indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_9_lodash__["includes"](this.studentsList[i].phone_number, this.myInput)) {
                result.push(this.studentsList[i]);
            }
        }
        this.students = result;
        if (this.myInput === "")
            this.students = this.studentsList;
    };
    StudentslistPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentslistPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
    };
    StudentslistPage.prototype.onSelectChange = function () {
        this.myInput = '';
        if (this.mySelect === '') {
            this.students = this.studentsList;
        }
        else {
            this.students = [];
            for (var s = 0; s < this.studentsList.length; s++) {
                if (this.studentsList[s].class_group === this.mySelect)
                    this.students.push(this.studentsList[s]);
            }
        }
    };
    return StudentslistPage;
}());
StudentslistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'studentslist-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/studentslist/studentslist.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    Admitted Students\n  </ion-title>\n  <!-- <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="close"></ion-icon></button>\n  </ion-buttons> -->\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="search-row">\n    <ion-searchbar\n      [(ngModel)]="myInput"\n      (animated)="true"\n      (placeholder)="Search"\n      (ionInput)="search()"\n    ></ion-searchbar>\n    <ion-select interface="popover" [(ngModel)]="mySelect" (ionChange)="onSelectChange()" class="search-ic">\n      <ion-option *ngFor="let class of classes" [value]="class">{{class}}</ion-option>\n    </ion-select> \n  </div>\n\n  <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="!students" />\n  <h1 *ngIf="students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n  <ion-list *ngIf="students && students.length">\n \n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile indent_results" style="height:100%;">\n     \n        <button ion-item>\n          <div class="col_left indent_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student indent_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student indent_student"/></div>\n          </div>\n          <div class="col_right auto_height">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <h2><ion-icon name="phone"></ion-icon> {{student.phone_number}} </h2>\n            <h2>{{student.class_group}}</h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right">\n          <button ion-button color="primary" (click)="edit(student)">\n            <ion-icon name="redo"></ion-icon>\n            Edit\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n    </ion-item-sliding>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/studentslist/studentslist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_6__providers_indentation_indentation__["a" /* Indentation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], StudentslistPage);

//# sourceMappingURL=studentslist.js.map

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_list_chat_list__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_chats_chats__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_network_network__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_chooser_ngx__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_media__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// <reference types="@types/googlemaps" />







// Providers









var ChatGroupPage = (function () {
    function ChatGroupPage(navCtrl, navParams, studentService, chatService, modalCtrl, alertCtrl, authService, actionSheetCtrl, toastCtrl, platform, app, menu, centerService, networkService, storage, loading, http, camera, fileChooser, media, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.studentService = studentService;
        this.chatService = chatService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.centerService = centerService;
        this.networkService = networkService;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.camera = camera;
        this.fileChooser = fileChooser;
        this.media = media;
        this.file = file;
        this.messages = [];
        this.users = [];
        this.user = {};
        this.message = '';
        this.chat = [];
        this.emoziToggled = false;
        // Sound
        this.isRecording = false;
    }
    ChatGroupPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.authService.searchUser().then(function (result) {
                _this.users = result;
                _this.storage.get('chatGroup').then(function (chat) {
                    _this.chat = chat;
                    if (_this.chat.silent_members.indexOf(user._id) > -1 ||
                        _this.chat.members.indexOf(user._id) <= -1) {
                        _this.isSilentMember = true;
                    }
                    else {
                        _this.isSilentMember = false;
                    }
                    _this.getChatMessages();
                });
            });
        });
    };
    ChatGroupPage.prototype.getChatMessages = function () {
        var _this = this;
        this.chatService.getChatMessages(this.chat._id, this.user._id).then(function (result) {
            _this.messages = __WEBPACK_IMPORTED_MODULE_2_lodash__["sortBy"](result, 'created');
            _this.loader.dismiss();
            _this.markmap();
            _this.getChatMessages();
        });
    };
    ChatGroupPage.prototype.sendMessage = function () {
        var _this = this;
        if (this.message != '') {
            this.messages.push({
                from: this.user._id,
                created: new Date(),
                type: 'text',
                text: this.message,
            });
            this.chatService.updateChatMessages(this.chat._id, this.messages).then(function (result) {
                _this.message = '';
                var dimensions = _this.content.getContentDimensions();
                _this.content.scrollTo(0, dimensions.contentHeight, 0);
            }, function (err) {
            });
        }
    };
    ChatGroupPage.prototype.getUserName = function (userId) {
        var selectedUser = this.users.find(function (element) {
            return element._id === userId;
        });
        if (selectedUser && selectedUser.name)
            return selectedUser.name;
        return '';
    };
    ChatGroupPage.prototype.onMessageChange = function () {
        console.log('e');
    };
    ChatGroupPage.prototype.goBack = function () {
        this.storage.remove("chatGroup");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__chat_list_chat_list__["a" /* ChatListPage */]);
    };
    ChatGroupPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ChatGroupPage.prototype.handleEmoziSelection = function (event) {
        this.message += event.char;
    };
    ChatGroupPage.prototype.getUserProfileImage = function (userId) {
        var selectedUser = this.users.find(function (element) {
            return element._id === userId;
        });
        if (selectedUser && selectedUser.photo)
            return selectedUser.photo;
        return 'https://i7.pngguru.com/preview/246/366/335/computer-icons-avatar-user-profile-man-avatars.jpg';
    };
    ChatGroupPage.prototype.ngOnDestroy = function () {
        this.chatService.stopGetChatMessages();
    };
    // Map
    ChatGroupPage.prototype.markmap = function () {
        var _this = this;
        setTimeout(function () {
            for (var i = 0; i < _this.messages.length; i++) {
                if (_this.messages[i].type === 'location') {
                    if (_this.mapElement.nativeElement.innerText === '') {
                        var mapCenter = new google.maps.LatLng(parseFloat(_this.messages[i].latitude).toFixed(5), parseFloat(_this.messages[i].longitude).toFixed(5));
                        var mapOptions = {
                            zoom: 13,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: true,
                            center: mapCenter,
                            fullscreenControl: false,
                            disableDefaultUI: true
                        };
                        _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                    }
                }
            }
        }, 100);
    };
    ChatGroupPage.prototype.openGoogleMap = function (latitude, longitude) {
        latitude = parseFloat(latitude).toFixed(5);
        longitude = parseFloat(longitude).toFixed(5);
        var newUrl = 'http://maps.google.com/maps?q=loc:' + latitude + "," + longitude;
        window.open(newUrl, "_blank");
    };
    ChatGroupPage.prototype.sendLocation = function () {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (res) {
            _this.messages.push({
                from: _this.user._id,
                created: new Date(),
                type: 'location',
                latitude: res.coords.latitude,
                longitude: res.coords.longitude,
            });
            _this.chatService.updateChatMessages(_this.chat._id, _this.messages).then(function (result) {
                var dimensions = _this.content.getContentDimensions();
                _this.content.scrollTo(0, dimensions.contentHeight, 0);
            }, function (err) {
                console.log(err);
            });
        });
    };
    // Attachment
    ChatGroupPage.prototype.sendAttachment = function () {
        alert('abc');
        this.fileChooser.open().then(function (uri) {
            alert(uri);
        }).catch(function (e) { return console.log(e); });
    };
    // Camera
    ChatGroupPage.prototype.sendCamera = function () {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var fileName = 'chat_' + _this.chat._id + '_' + _this.messages.length + '.jpg';
            var contentType = 'image/jpg';
            _this.chatService.uploadToS3(base64Image, fileName, 'base/64', contentType).then(function (result) {
                console.log(result);
                _this.messages.push({
                    from: _this.user._id,
                    created: new Date(),
                    type: 'image',
                    imagePath: fileName,
                });
                _this.chatService.updateChatMessages(_this.chat._id, _this.messages).then(function (result) {
                    var dimensions = _this.content.getContentDimensions();
                    _this.content.scrollTo(0, dimensions.contentHeight, 0);
                }, function (err) {
                    _this.presentToast(err);
                });
            }, function (err) {
                _this.presentToast(err);
            });
        }, function (err) {
            _this.presentToast(err);
        });
    };
    ChatGroupPage.prototype.sendSound = function () {
        var _this = this;
        this.isRecording = true;
        this.fileToSave = this.media.create(this.file.tempDirectory
            ? this.file.tempDirectory.replace(/^file:\/\//, '') + 'my_file.m4a'
            : './my_file.m4a');
        this.file.createFile(this.file.tempDirectory ? this.file.tempDirectory : './', 'my_file.m4a', true).then(function () {
            _this.fileToSave.startRecord();
            if (_this.isRecording)
                window.setTimeout(function () { return _this.fileToSave.stopRecord(); }, 10000);
            _this.saveRecording();
        }, function (err) {
            _this.presentToast(err);
        });
    };
    ChatGroupPage.prototype.stopRecording = function () {
        if (this.isRecording)
            this.fileToSave.stopRecord();
        this.saveRecording();
    };
    ChatGroupPage.prototype.saveRecording = function () {
        var _this = this;
        this.isRecording = false;
        var fileName = 'chat_' + this.chat._id + '_' + this.messages.length + '.m4a';
        this.chatService.uploadToS3(this.fileToSave, fileName, '', 'audio/m4a').then(function (result) {
            console.log(result);
            _this.messages.push({
                from: _this.user._id,
                created: new Date(),
                type: 'image',
                imagePath: fileName,
            });
            _this.chatService.updateChatMessages(_this.chat._id, _this.messages).then(function (result) {
                _this.fileToSave.release();
                var dimensions = _this.content.getContentDimensions();
                _this.content.scrollTo(0, dimensions.contentHeight, 0);
            }, function (err) {
                _this.presentToast(err);
            });
        }, function (err) {
            _this.presentToast(err);
        });
    };
    return ChatGroupPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("scrollElement"),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]) === "function" && _a || Object)
], ChatGroupPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], ChatGroupPage.prototype, "mapElement", void 0);
ChatGroupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chat-group-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/chat-group/chat-group.html"*/'  <ion-header>\n    <ion-navbar color="primary">\n      <ion-buttons left>\n        <button ion-button icon-only (click)="goBack()">\n          <ion-icon name="arrow-back"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-title>\n        {{chat.tempName}}\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content #scrollElement id="scrollElement">\n      <!-- <div #map id="map" style="height: 150px; width: 75em;"></div> -->\n    <div class="message-wrap">\n      <div *ngFor="let message of messages" class="message" [class.left]="message.from !== user._id"\n        [class.right]="message.from === user._id">\n        <img class="user-img" [src]="getUserProfileImage(message.from)" alt="">\n        <div class="msg-detail">\n          <div class="msg-info">\n            <p>\n              {{ getUserName(message.from) }}&nbsp;&nbsp;&nbsp;{{message.created | date:\'MMM dd, yyyy, hh:MM\'}}</p>\n          </div>\n          <div class="msg-content">\n            <span class="triangle"></span>\n            <p class="line-breaker" *ngIf="message.type === \'text\'">{{message.text}}</p>\n            <div *ngIf="message.type === \'location\'" (click)="openGoogleMap(message.latitude, message.longitude)">\n              <div #map id="map" style="height: 150px; width: 18em; position: relative; overflow: hidden; padding: 0; margin: -0.56em; margin-left: -5.6em;"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n\n\n  <ion-footer no-border *ngIf="!isSilentMember">\n    <div class="input-wrap">\n      <ion-fab bottom left edge auto-close-on-click-outside #fab>\n        <button ion-fab mini><ion-icon name="add"></ion-icon></button>\n        <ion-fab-list side="right">\n          <button ion-fab (click)="emoziToggled = !emoziToggled" \n              [(emojiPickerIf)]="emoziToggled" [emojiPickerDirection]="\'top\'"\n              (emojiPickerSelect)="handleEmoziSelection($event); emoziToggled = !emoziToggled; fab.close();">\n            <ion-icon name="md-happy"></ion-icon>\n          </button>\n          <button ion-fab (click)="sendAttachment()"><ion-icon name="attach"></ion-icon></button>\n          <button ion-fab (click)="sendCamera()"><ion-icon name="camera"></ion-icon></button>\n          <button ion-fab (press)="sendSound()" (touchend)="stopRecording()"><ion-icon name="mic"></ion-icon></button>\n          <button ion-fab (click)="sendLocation()"><ion-icon name="locate"></ion-icon></button>\n        </ion-fab-list>\n      </ion-fab>\n      <textarea placeholder="Enter Message Here" rows="2" [(ngModel)]="message" (ionChange)="onMessageChange()"\n        style="min-height: auto;"></textarea>\n      <button ion-button clear icon-only item-right (click)="sendMessage()" \n            style="margin-right: -0.9em;" [class.button-disabled]="message === \'\'">\n        <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n      </button>\n    </div>\n  </ion-footer>\n\n  <ion-footer no-border *ngIf="isSilentMember">\n    <h3 style="background: red;color: white; font-weight: bold; margin: 0; padding: 0; text-align: center;">\n      You are not authorized to send message here\n    </h3>\n  </ion-footer>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/chat-group/chat-group.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__providers_students_students__["a" /* Students */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_students_students__["a" /* Students */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__providers_chats_chats__["a" /* Chats */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__providers_chats_chats__["a" /* Chats */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* Auth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* Auth */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_8__providers_center_center__["a" /* Center */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__providers_center_center__["a" /* Center */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_10__providers_network_network__["a" /* Networks */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__providers_network_network__["a" /* Networks */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_chooser_ngx__["a" /* FileChooser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_chooser_ngx__["a" /* FileChooser */]) === "function" && _w || Object, typeof (_x = typeof __WEBPACK_IMPORTED_MODULE_13__ionic_native_media__["a" /* Media */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__ionic_native_media__["a" /* Media */]) === "function" && _x || Object, typeof (_y = typeof __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */]) === "function" && _y || Object])
], ChatGroupPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
//# sourceMappingURL=chat-group.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(572);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(888);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ion2_calendar__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_google_places_autocomplete__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_google_places_autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ngx_google_places_autocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_enquiry_enquiry__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_search_search__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_reports_reports__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_confirm_confirm__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_indent_indent__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_center_center__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_dispatch_dispatch__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_promotion_promotion__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_adminedit_adminedit__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_deletestudent_deletestudent__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_approveindent_approveindent__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_idcardrequest_idcardrequest__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_idcardprint_idcardprint__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_editstudent_editstudent__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_studentslist_studentslist__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_chat_group_chat_group__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_chat_list_chat_list__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_home_tab_home_tab__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_notification_tab_notification_tab__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_profile_tab_profile_tab__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_indentation_indentation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_network_network__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__providers_chats_chats__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_file__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_transfer__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_file_path__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_camera__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_file_chooser_ngx__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_media__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_ionic_emoji_picker__ = __webpack_require__(892);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_geolocation_ngx__ = __webpack_require__(928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_google_maps__ = __webpack_require__(929);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// Pages























// Providers






// Camera






// Chat



var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_enquiry_enquiry__["a" /* EnquiryPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_reports_reports__["a" /* ReportsPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_confirm_confirm__["a" /* ConfirmPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_indent_indent__["a" /* IndentPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_center_center__["a" /* CenterPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_dispatch_dispatch__["a" /* DispatchPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_promotion_promotion__["a" /* PromotionPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_adminedit_adminedit__["a" /* AdmineditPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_deletestudent_deletestudent__["a" /* DeletestudentPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_approveindent_approveindent__["a" /* ApproveindentPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_idcardrequest_idcardrequest__["a" /* IdcardrequestPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_idcardprint_idcardprint__["a" /* IdcardprintPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_editstudent_editstudent__["a" /* EditstudentPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_studentslist_studentslist__["a" /* StudentslistPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_home_tab_home_tab__["a" /* HomeTab */],
            __WEBPACK_IMPORTED_MODULE_31__pages_notification_tab_notification_tab__["a" /* NotificationTab */],
            __WEBPACK_IMPORTED_MODULE_32__pages_profile_tab_profile_tab__["a" /* ProfileTab */],
            __WEBPACK_IMPORTED_MODULE_28__pages_chat_group_chat_group__["a" /* ChatGroupPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_chat_list_chat_list__["a" /* ChatListPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_7_ion2_calendar__["b" /* CalendarModule */],
            __WEBPACK_IMPORTED_MODULE_9_ngx_google_places_autocomplete__["GooglePlaceModule"],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/reports/reports.module#ReportsPageModule', name: 'ReportsPage', segment: 'reports', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_45_ionic_emoji_picker__["a" /* EmojiPickerModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_enquiry_enquiry__["a" /* EnquiryPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_reports_reports__["a" /* ReportsPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_confirm_confirm__["a" /* ConfirmPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_indent_indent__["a" /* IndentPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_center_center__["a" /* CenterPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_dispatch_dispatch__["a" /* DispatchPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_promotion_promotion__["a" /* PromotionPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_adminedit_adminedit__["a" /* AdmineditPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_deletestudent_deletestudent__["a" /* DeletestudentPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_approveindent_approveindent__["a" /* ApproveindentPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_idcardrequest_idcardrequest__["a" /* IdcardrequestPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_idcardprint_idcardprint__["a" /* IdcardprintPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_editstudent_editstudent__["a" /* EditstudentPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_studentslist_studentslist__["a" /* StudentslistPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_home_tab_home_tab__["a" /* HomeTab */],
            __WEBPACK_IMPORTED_MODULE_31__pages_notification_tab_notification_tab__["a" /* NotificationTab */],
            __WEBPACK_IMPORTED_MODULE_32__pages_profile_tab_profile_tab__["a" /* ProfileTab */],
            __WEBPACK_IMPORTED_MODULE_28__pages_chat_group_chat_group__["a" /* ChatGroupPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_chat_list_chat_list__["a" /* ChatListPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */],
            __WEBPACK_IMPORTED_MODULE_33__providers_students_students__["a" /* Students */],
            __WEBPACK_IMPORTED_MODULE_34__providers_auth_auth__["a" /* Auth */],
            __WEBPACK_IMPORTED_MODULE_35__providers_center_center__["a" /* Center */],
            __WEBPACK_IMPORTED_MODULE_37__providers_network_network__["a" /* Networks */],
            __WEBPACK_IMPORTED_MODULE_36__providers_indentation_indentation__["a" /* Indentation */],
            __WEBPACK_IMPORTED_MODULE_39__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_40__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_42__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_41__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_38__providers_chats_chats__["a" /* Chats */],
            __WEBPACK_IMPORTED_MODULE_46__ionic_native_geolocation_ngx__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_47__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_43__ionic_native_file_chooser_ngx__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_44__ionic_native_media__["a" /* Media */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_enquiry_enquiry__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_search_search__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_center_center__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_indent_indent__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_reports_reports__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_dispatch_dispatch__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_promotion_promotion__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_adminedit_adminedit__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_deletestudent_deletestudent__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_idcardrequest_idcardrequest__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_idcardprint_idcardprint__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_approveindent_approveindent__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_studentslist_studentslist__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_chat_list_chat_list__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_auth_auth__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Pages

















// Services

var MyApp = (function () {
    function MyApp(platform, storage, authService) {
        var _this = this;
        this.storage = storage;
        this.authService = authService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isCounsellor = false;
        this.isDispatcher = false;
        this.isTeacher = false;
        this.isParent = false;
        this.showMenu = false;
        this.userCenter = "";
        this.user = {};
        platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* StatusBar */].styleDefault();
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* Splashscreen */].hide();
        });
        this.userSubscription = __WEBPACK_IMPORTED_MODULE_21__providers_auth_auth__["a" /* Auth */].userChanged.subscribe(function (user) { return _this.getData(user); });
    }
    MyApp.prototype.getData = function (user) {
        if (user) {
            if (user.role === "counsellor") {
                this.isCounsellor = true;
                this.isDispatcher = false;
                this.isAdmin = false;
                this.isCenterAdmin = false;
                this.isTeacher = false;
                this.isParent = false;
            }
            else if (user.role === "dispatcher") {
                this.isDispatcher = true;
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
            }
            else if (user.role === "centerAdmin") {
                this.isCenterAdmin = true;
                this.isAdmin = false;
                this.isCounsellor = false;
                this.isDispatcher = false;
                this.isTeacher = false;
                this.isParent = false;
            }
            else if (user.role === "teacher") {
                this.isTeacher = true;
                this.isCenterAdmin = false;
                this.isAdmin = false;
                this.isCounsellor = false;
                this.isDispatcher = false;
                this.isParent = false;
            }
            else if (user.role === "parent") {
                this.isParent = true;
                this.isCenterAdmin = false;
                this.isAdmin = false;
                this.isCounsellor = false;
                this.isDispatcher = false;
                this.isTeacher = false;
            }
            else {
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
    };
    MyApp.prototype.go_to_home = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.go_to_enquiry = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_enquiry_enquiry__["a" /* EnquiryPage */]);
    };
    MyApp.prototype.go_to_search = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_search_search__["a" /* SearchPage */]);
    };
    MyApp.prototype.go_to_login = function () {
        this.authService.logout();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.go_to_signup = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */]);
    };
    MyApp.prototype.go_to_center = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_center_center__["a" /* CenterPage */]);
    };
    MyApp.prototype.go_to_indent = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_indent_indent__["a" /* IndentPage */]);
    };
    MyApp.prototype.go_to_reports = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_reports_reports__["a" /* ReportsPage */]);
    };
    MyApp.prototype.go_to_dispatch = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_dispatch_dispatch__["a" /* DispatchPage */]);
    };
    MyApp.prototype.go_to_promotion = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_promotion_promotion__["a" /* PromotionPage */]);
    };
    MyApp.prototype.go_to_adminedit = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_14__pages_adminedit_adminedit__["a" /* AdmineditPage */]);
    };
    MyApp.prototype.go_to_deletestudent = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_15__pages_deletestudent_deletestudent__["a" /* DeletestudentPage */]);
    };
    MyApp.prototype.go_to_idcardrequest = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_16__pages_idcardrequest_idcardrequest__["a" /* IdcardrequestPage */]);
    };
    MyApp.prototype.go_to_idcardprint = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_17__pages_idcardprint_idcardprint__["a" /* IdcardprintPage */]);
    };
    MyApp.prototype.go_to_approveindent = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_18__pages_approveindent_approveindent__["a" /* ApproveindentPage */]);
    };
    MyApp.prototype.go_to_studentslist = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_19__pages_studentslist_studentslist__["a" /* StudentslistPage */]);
    };
    MyApp.prototype.go_to_chatList = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_20__pages_chat_list_chat_list__["a" /* ChatListPage */]);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/app/app.html"*/'<ion-menu side="left" [content]="content">\n    <ion-content>\n        <div class="profile-header">\n            <div class="col_left">\n                <img class="profile-photo" *ngIf="user && user.photo" src={{user.photo}} />\n                <img class="profile-photo" *ngIf="user && !user.photo" src="assets/images/avatar.png" />\n            </div>\n            <div class="col_right">\n                <h3 style="color: #f06559; font-weight: bolder;">Welcome</h3>\n                <h4 class="m-0" style="color: slateblue; font-weight: bolder;">{{user.name}}</h4>\n                <p class="m-0" style="color: slateblue; font-weight: bolder;">{{user.email}}</p>\n                <br />\n                <h6 class="m-0" style="color: mediumslateblue;">{{user.center}} - {{user.role}}</h6>\n            </div>\n            <!-- <ion-fab top start fixed>\n                <button ion-fab mini>\n                    <ion-icon name="create"></ion-icon>\n                </button>\n            </ion-fab> -->\n        </div>\n        <ion-list>\n            <ion-item (click)="go_to_home()" menuClose>\n                Home\n            </ion-item>\n            <ion-item *ngIf="isAdmin" (click)="go_to_center()" menuClose>\n                Centers\n            </ion-item>\n            <ion-item *ngIf="isAdmin" (click)="go_to_signup()" menuClose>\n                Users\n            </ion-item>\n            <ion-item *ngIf="isCenterAdmin || isCounsellor" (click)="go_to_enquiry()" menuClose>\n                Enquiry\n            </ion-item>\n            <ion-item *ngIf="isCenterAdmin || isCounsellor" (click)="go_to_search()" menuClose>\n                Confirm\n            </ion-item>\n            <ion-item *ngIf="isCenterAdmin || isCounsellor" (click)="go_to_indent()" menuClose>\n                Indentations\n            </ion-item>\n            <ion-item *ngIf="isCenterAdmin || isCounsellor" (click)="go_to_promotion()" menuClose>\n                Promotions\n            </ion-item>\n            <ion-item *ngIf="isCenterAdmin || isCounsellor" (click)="go_to_idcardrequest()" menuClose>\n                Request ID Card\n            </ion-item>\n            <ion-item *ngIf="isAdmin" (click)="go_to_approveindent()" menuClose>\n                Approve Indentation\n            </ion-item>\n            <ion-item *ngIf="isAdmin" (click)="go_to_idcardprint()" menuClose>\n                Print ID Card\n            </ion-item>\n            <ion-item *ngIf="isDispatcher" (click)="go_to_dispatch()" menuClose>\n                Dispatch\n            </ion-item>\n            <ion-item *ngIf="isAdmin || isCenterAdmin || isCounsellor" (click)="go_to_reports()" menuClose>\n                Reports\n            </ion-item>\n            <ion-item *ngIf="isCenterAdmin || isCounsellor" (click)="go_to_studentslist()" menuClose>\n                Admitted Students\n            </ion-item>\n            <ion-item *ngIf="isAdmin" (click)="go_to_adminedit()" menuClose>\n                Edit Student (Admin)\n            </ion-item>\n            <ion-item *ngIf="isAdmin" (click)="go_to_deletestudent()" menuClose>\n                Restore Student (Admin)\n            </ion-item>\n            <ion-item (click)="go_to_chatList()" menuClose>\n                Chats\n            </ion-item>\n            <ion-item (click)="go_to_login()" menuClose\n                style="bottom: 0; position: sticky; background-color: red; color: white; opacity: 1;">\n                SignOut\n            </ion-item>\n        </ion-list>\n    </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" id="nav" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_21__providers_auth_auth__["a" /* Auth */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enquiry_enquiry__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confirm_confirm__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var SearchPage = (function () {
    function SearchPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, menu, loading, storage, app, CallNumber, actionSheetController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.menu = menu;
        this.loading = loading;
        this.storage = storage;
        this.app = app;
        this.CallNumber = CallNumber;
        this.actionSheetController = actionSheetController;
        this.isAdmin = false;
        this.isCenterAdmin = false;
        this.isCounsellor = false;
        this.storage.get("user").then(function (user) {
            if (user.role === "counsellor")
                _this.isCounsellor = true;
            else if (user.role === "admin")
                _this.isAdmin = true;
            else if (user.role === "centerAdmin")
                _this.isCenterAdmin = true;
            else
                _this.isCounsellor = true;
        });
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: "Please wait..."
        });
        this.studentService.getStudents().then(function (data) {
            data = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](data, function (o) {
                return o.status == "enquiry" && !o.is_Confirmed;
            });
            _this.storage.get("user").then(function (user) {
                data = __WEBPACK_IMPORTED_MODULE_6_lodash__["filter"](data, function (o) {
                    return o.center == user.center;
                });
                _this.students = __WEBPACK_IMPORTED_MODULE_6_lodash__["sortBy"](data, "enquiry_date").reverse();
                _this.studentsList = __WEBPACK_IMPORTED_MODULE_6_lodash__["sortBy"](data, "enquiry_date").reverse();
            });
        }, function (err) {
            console.log("not allowed");
        });
    };
    // Function to search for a student dynamically based on an input
    SearchPage.prototype.search = function () {
        var result = [];
        for (var i = 0; i < this.studentsList.length; i++) {
            if (this.studentsList[i].name
                .toUpperCase()
                .indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (this.studentsList[i].parent_name
                .toUpperCase()
                .indexOf(this.myInput.toUpperCase()) == 0) {
                result.push(this.studentsList[i]);
            }
            else if (__WEBPACK_IMPORTED_MODULE_6_lodash__["includes"](this.studentsList[i].phone_number, this.myInput)) {
                result.push(this.studentsList[i]);
            }
        }
        this.students = result;
        if (this.myInput === "")
            this.students = this.studentsList;
    };
    SearchPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__enquiry_enquiry__["a" /* EnquiryPage */]);
    };
    SearchPage.prototype.callNumber = function (num) {
        this.CallNumber.callNumber(num, false)
            .then(function () { return console.log("Launched dialer!"); })
            .catch(function () { return console.log("Error launching dialer"); });
    };
    SearchPage.prototype.update = function (student) {
        if (student.study_year == '2019-20') {
            if (student.class_group == "Play Group")
                student.class_group = 'Nursery';
            else if (student.class_group == "Nursery")
                student.class_group = 'LKG';
            else if (student.class_group == "LKG")
                student.class_group = 'UKG';
            else if (student.class_group == "UKG")
                student.class_group = 'UKG';
            else
                student.class_group = 'Play Group';
            student.study_year = '2020-21';
        }
        this.storage.set("confirmed_student", student);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__confirm_confirm__["a" /* ConfirmPage */]);
    };
    SearchPage.prototype.presentActionSheet = function (num, email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [
                                {
                                    text: "Call",
                                    icon: "call",
                                    handler: function () {
                                        _this.callNumber(num);
                                    }
                                },
                                {
                                    text: "Whatsapp",
                                    icon: "logo-whatsapp",
                                    handler: function () {
                                        window.open(("https://wa.me/91" + num), "_blank");
                                    }
                                },
                                {
                                    text: "SMS",
                                    icon: "text",
                                    handler: function () {
                                        window.open("sms://" + num);
                                    }
                                },
                                {
                                    text: "Email",
                                    icon: "mail",
                                    handler: function () {
                                        window.open("mailto://" + email);
                                    }
                                },
                                {
                                    text: "Cancel",
                                    icon: "close",
                                    role: "cancel",
                                    handler: function () {
                                        console.log("Cancel clicked");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SearchPage;
}());
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "search-page",template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/search/search.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title>\n    SEARCH\n  </ion-title>\n  <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="add-circle"></ion-icon></button>\n  </ion-buttons>\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <div class="search-row search-full">\n        <ion-searchbar\n            [(ngModel)]="myInput"\n            (animated)="true"\n            (placeholder)="Search"\n            (ionInput)="search()"\n        ></ion-searchbar>\n    </div>\n \n    <img src="assets/images/emoji-faces.jpg" class="emozi" *ngIf="students && !students.length" />\n    <h1 *ngIf="students && !students.length" class="no_record"> NO RECORDS FOUND </h1>\n\n    <ion-item-sliding *ngFor="let student of students" class="results_list_mobile">\n     \n        <button ion-item>\n          <div class="col_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student"/></div>\n          </div>\n          <div class="col_right">\n            <h1>{{student.name}}</h1>\n            <h3 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h3>\n            <h3 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h3>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="mail"></ion-icon> {{student.email_id}}\n            </a>\n            <br>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="call"></ion-icon> {{student.phone_number}} \n            </a>\n            <!-- <h2><ion-icon name="call"></ion-icon> {{student.alternate_contact}}</h2> -->\n            <h2><ion-icon name="locate"></ion-icon> {{student.locality}}</h2>\n            <h2><ion-icon name="clock"></ion-icon> {{student.dob | date: \'dd/MMM/yyyy\'}} </h2>\n            <h2>{{student.class_group}} ({{student.study_year}})</h2>\n          </div>\n        </button>\n     \n        <ion-item-options side="right">\n          <button ion-button color="info" (click)="update(student)">\n            <ion-icon name="redo"></ion-icon>\n            Confirm\n          </button>\n        </ion-item-options>\n\n        <ion-item-options side="left">\n          <button ion-button color="secondary" (click)="presentActionSheet(student.phone_number, student.email_id)">\n            <ion-icon name="call"></ion-icon>\n            Contact\n          </button>\n        </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/search/search.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnquiryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_network_network__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__search_search__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__signup_signup__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__center_center__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__indent_indent__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__reports_reports__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dispatch_dispatch__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__confirm_confirm__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_file__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_file_path__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_camera__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// Providers




// Pages








// Files Images



var EnquiryPage = (function () {
    function EnquiryPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, formBuilder, camera, file, filePath, actionSheetCtrl, toastCtrl, platform, app, menu, centerService, networkService, storage, loading, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.centerService = centerService;
        this.networkService = networkService;
        this.storage = storage;
        this.loading = loading;
        this.http = http;
        this.submitAttempt = false;
        this.counter = false;
        this.isAdmin = false;
        this.isCurrentYear = true;
        this.isDispatcher = false;
        this.isCenterAdmin = false;
        this.isCounsellor = false;
        this.isMatching = false;
        this.locationOptions = [];
        this.addStudent = function () {
            _this.submitAttempt = true;
            if (_this.studentForm.valid) {
                _this.studentForm.value.dob = __WEBPACK_IMPORTED_MODULE_5_moment__(_this.studentForm.value.dob, "YYYY-MM-DD").toDate();
                _this.studentService.createStudent(_this.studentForm.value).then(function (result) {
                    _this.presentToast('student data saved successfully');
                    _this.search();
                }, function (err) {
                    _this.presentToast('Failed! Please try again.');
                });
            }
        };
        this.search = function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__search_search__["a" /* SearchPage */]);
        };
        this.logOut = function () {
            _this.authService.logout();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__login_login__["a" /* LoginPage */]);
        };
        this.onNameChange = function () {
            _this.studentForm.value.name = _this.toTitleCase(_this.studentForm.value.name);
            _this.studentForm.value.name = _this.studentForm.value.name.replace(/\./g, ' ');
            _this.studentForm.controls['name'].setValue(_this.studentForm.value.name);
        };
        this.onEmailChange = function () {
            _this.studentForm.value.email_id = _this.studentForm.value.email_id.toLowerCase();
            _this.studentForm.value.email_id = _this.studentForm.value.email_id.replace(/\s/g, '');
            _this.studentForm.controls['email_id'].setValue(_this.studentForm.value.email_id);
            _this.checkMatching();
        };
        this.onPhoneChange = function () {
            _this.checkMatching();
        };
        this.onYearChange = function () {
            _this.isCurrentYear = (_this.studentForm.value.study_year == "2019-20") ? true : false;
            if (_this.studentForm.value.dob != '')
                _this.onDobChange();
        };
        this.onDobChange = function () {
            var dob = _this.studentForm.value.dob;
            var now = new Date();
            _this.studentForm.value.today_age = _this.getAge(dob, now);
            now.setDate(1);
            now.setMonth(5);
            var nowDate = new Date();
            if (nowDate.getMonth() < 12)
                now.setFullYear(now.getFullYear() - 1);
            _this.studentForm.value.month_age = _this.getAge(dob, now);
            _this.studentForm.value.month_date = now;
            _this.studentForm.value.today_age.years += 1900;
            _this.today_age_years = _this.studentForm.value.today_age.years;
            _this.today_age_months = _this.studentForm.value.today_age.months;
            _this.today_age_days = _this.studentForm.value.today_age.days;
            var tempYear = _this.studentForm.value.month_date.getYear();
            if (!_this.isCurrentYear)
                tempYear += 1;
            _this.month_date = _this.studentForm.value.month_date.getDate() + "/June/" + (tempYear + 1901);
            _this.studentForm.value.month_age.years += 1901;
            _this.month_age_years = _this.studentForm.value.month_age.years;
            _this.month_age_months = _this.studentForm.value.month_age.months;
            _this.month_age_days = _this.studentForm.value.month_age.days;
            if (!_this.isCurrentYear)
                _this.month_age_years += 1;
            if (!_this.isCurrentYear)
                _this.studentForm.value.month_age.years += 1;
            _this.class_group = _this.calculateClass(_this.studentForm.value.month_age);
            _this.studentForm.controls['class_group'].setValue(_this.class_group);
            _this.checkMatching();
        };
        this.getAge = function (birthday, tillday) {
            var today = new Date(tillday.getYear(), tillday.getMonth(), tillday.getDate());
            var yearNow = today.getFullYear();
            var monthNow = today.getMonth();
            var dateNow = today.getDate();
            var dob = new Date(birthday.substring(0, 4), birthday.substring(5, 7) - 1, birthday.substring(8, 10));
            var yearDob = dob.getFullYear();
            var monthDob = dob.getMonth();
            var dateDob = dob.getDate();
            var age = {};
            var yearAge = yearNow - yearDob;
            if (monthNow >= monthDob)
                var monthAge = monthNow - monthDob;
            else {
                yearAge--;
                var monthAge = 12 + monthNow - monthDob;
            }
            if (dateNow >= dateDob)
                var dateAge = dateNow - dateDob;
            else {
                monthAge--;
                var dateAge = 31 + dateNow - dateDob;
                if (monthAge < 0) {
                    monthAge = 11;
                    yearAge--;
                }
            }
            age = {
                years: yearAge,
                months: monthAge,
                days: dateAge
            };
            return age;
        };
        this.takePhoto = function () {
            var actionSheet = _this.actionSheetCtrl.create({
                title: 'Select Image Source',
                buttons: [
                    {
                        text: 'Load from Library',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            actionSheet.present();
        };
        if (this.networkService.noConnection()) {
            this.networkService.showNetworkAlert();
        }
        this.studentForm = formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            email_id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            phone_number: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            gender: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            dob: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            parent_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            alternate_contact: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
            locality: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            study_year: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            center: [''],
            counsellor: [''],
            today_age: [''],
            month_date: [''],
            month_age: [''],
            class_group: [''],
            photo: [''],
            student_id: ['']
        });
        this.storage.get('user').then(function (user) {
            if (user.role === "counsellor")
                _this.isCounsellor = true;
            else if (user.role === "admin") {
                _this.isAdmin = true;
                _this.openReportsPage();
            }
            else if (user.role === "dispatcher") {
                _this.isDispatcher = true;
                _this.openDispatcherPage();
            }
            else if (user.role === "centerAdmin")
                _this.isCenterAdmin = true;
            else
                _this.isCounsellor = true;
        });
        this.studentService.getAllStudents().then(function (data) {
            _this.studentsList = data;
        }, function (err) {
            console.log("not allowed");
        });
    }
    EnquiryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.studentForm.controls['study_year'].setValue("2019-20");
        this.onYearChange();
        this.storage.get('user').then(function (users) {
            _this.users = users;
            _this.centerService.searchCenter().then(function (centers) {
                _this.userCenter = __WEBPACK_IMPORTED_MODULE_3_lodash__["find"](centers, ['center_code', _this.users.center]);
                _this.studentService.getAllStudents().then(function (data) {
                    var student = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](data, ['center', _this.userCenter.center_code]);
                    var student_ids = _this.userCenter.center_code;
                    student_ids += student ? (student.length > 0 ? student.length : 0) : 0;
                    _this.studentForm.controls['student_id'].setValue(student_ids);
                }, function (err) {
                    console.log("not allowed");
                });
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    };
    EnquiryPage.prototype.resetStudent = function () {
        this.studentForm.controls['name'].setValue('');
        this.studentForm.controls['email_id'].setValue('');
        this.studentForm.controls['phone_number'].setValue('');
        this.studentForm.controls['parent_name'].setValue('');
        this.studentForm.controls['alternate_contact'].setValue('');
        this.studentForm.controls['locality'].setValue('');
        this.studentForm.controls['today_age'].setValue('');
        this.studentForm.controls['month_date'].setValue('');
        this.studentForm.controls['month_age'].setValue('');
        this.studentForm.controls['class_group'].setValue('');
        this.studentForm.controls['photo'].setValue('');
        this.studentForm.controls['dob'].setValue('');
        this.studentForm.controls['study_year'].setValue("2019-20");
        this.today_age_years = '';
        this.today_age_months = '';
        this.today_age_days = '';
        this.month_date = '';
        this.month_age_years = '';
        this.month_age_months = '';
        this.month_age_days = '';
        this.class_group = '';
    };
    EnquiryPage.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    EnquiryPage.prototype.calculateClass = function (birthday) {
        var age = (birthday.years * 100) + birthday.months;
        if (age >= 106 && age < 206)
            return "Play Group";
        else if (age >= 206 && age < 306)
            return "Nursery";
        else if (age >= 306 && age < 406)
            return "LKG";
        else if (age >= 406 && age < 506)
            return "UKG";
        return "Not eligible";
    };
    EnquiryPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    EnquiryPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    EnquiryPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    EnquiryPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    EnquiryPage.prototype.uploadImage = function () {
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var path = targetPath + filename;
        this.getFileContentAsBase64(path, function (base64Image) {
            this.studentForm.photo = base64Image;
        });
    };
    EnquiryPage.prototype.getFileContentAsBase64 = function (path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            alert('Cannot found requested file');
        }
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    };
    EnquiryPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast(err);
        });
    };
    EnquiryPage.prototype.openSignupPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__signup_signup__["a" /* SignupPage */]);
    };
    EnquiryPage.prototype.openCenterPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_14__center_center__["a" /* CenterPage */]);
    };
    EnquiryPage.prototype.openReportsPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_16__reports_reports__["a" /* ReportsPage */]);
    };
    EnquiryPage.prototype.openIndentPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_15__indent_indent__["a" /* IndentPage */]);
    };
    EnquiryPage.prototype.openDispatcherPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_17__dispatch_dispatch__["a" /* DispatchPage */]);
    };
    EnquiryPage.prototype.getPicture = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.fileInput.nativeElement.click();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.camera.getPicture({
                            quality: 1,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            targetWidth: 10,
                            targetHeight: 10
                        }).then(function (data) {
                            _this.studentForm.patchValue({ 'photo': 'data:image/jpg;base64,' + data });
                        }, function (err) {
                            alert('Unable to take photo');
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    EnquiryPage.prototype.processWebImage = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var imageData = readerEvent.target.result;
            _this.studentForm.patchValue({ 'photo': imageData });
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(this.studentForm.controls['photo'].value);
    };
    EnquiryPage.prototype.getProfileImageStyle = function () {
        return ('url(' + this.studentForm.controls['photo'].value + ')');
    };
    EnquiryPage.prototype.findDuplicates = function (data) {
        var result = [];
        data.forEach(function (element, index) {
            // Find if there is a duplicate or not
            if (data.indexOf(element, index + 1) > -1) {
                // Find if the element is already in the result array or not
                if (result.indexOf(element) === -1) {
                    result.push(element);
                }
            }
        });
        return result;
    };
    EnquiryPage.prototype.showConfirm = function (stu) {
        var _this = this;
        var msg = 'Name: ' + stu.name + '<br/> Email: ' + stu.email_id + "<br/> Phone: " + stu.phone_number + "<br/> Gender: " + stu.gender + "<br/> Parent: " + stu.parent_name + "<br/>Center: " + stu.center + "<br/> Confirm same student?";
        var confirm = this.alertCtrl.create({
            title: 'Similar Enquiry',
            message: msg,
            buttons: [
                {
                    text: 'Yes! Confirm',
                    handler: function () {
                        _this.storage.set('confirmed_student', stu);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_18__confirm_confirm__["a" /* ConfirmPage */]);
                    }
                },
                {
                    text: 'No! Enquire',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    EnquiryPage.prototype.checkMatching = function () {
        var list = [];
        this.isMatching = false;
        this.matchingStudent = null;
        if (this.studentForm.controls['dob'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (__WEBPACK_IMPORTED_MODULE_5_moment__(this.studentsList[i].dob).isSame(__WEBPACK_IMPORTED_MODULE_5_moment__(this.studentForm.controls['dob'].value), 'day') && __WEBPACK_IMPORTED_MODULE_5_moment__(this.studentsList[i].dob).isSame(__WEBPACK_IMPORTED_MODULE_5_moment__(this.studentForm.controls['dob'].value), 'month') && __WEBPACK_IMPORTED_MODULE_5_moment__(this.studentsList[i].dob).isSame(__WEBPACK_IMPORTED_MODULE_5_moment__(this.studentForm.controls['dob'].value), 'year')) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (this.studentForm.controls['email_id'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].email_id == this.studentForm.controls['email_id'].value) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (this.studentForm.controls['phone_number'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].phone_number == this.studentForm.controls['phone_number'].value) {
                    list.push(this.studentsList[i]);
                }
            }
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].alternate_contact == this.studentForm.controls['phone_number'].value) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (this.studentForm.controls['alternate_contact'].value != '') {
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].phone_number == this.studentForm.controls['alternate_contact'].value) {
                    list.push(this.studentsList[i]);
                }
            }
            for (var i = 0; i < this.studentsList.length; i++) {
                if (this.studentsList[i].alternate_contact == this.studentForm.controls['alternate_contact'].value) {
                    list.push(this.studentsList[i]);
                }
            }
        }
        if (list.length > 0) {
            var resu = this.findDuplicates(list);
            if (resu.length > 0 && !this.counter) {
                this.isMatching = true;
                this.counter = true;
                this.matchingStudent = resu[0];
                this.showConfirm(this.matchingStudent);
            }
        }
    };
    EnquiryPage.prototype.onLocalityChange = function ($event) {
        var _this = this;
        this.locationOptions = [];
        if ($event._value.length > 4) {
            var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $event._value +
                "&types=geocode&key=AIzaSyDxiToPCcr2LL1EC_vkzYtBiQO_9kbIfqs";
            this.http.get(url)
                .subscribe(function (res) {
                var data = res.json();
                _this.locationOptions = data.predictions;
            }, function (err) { });
        }
    };
    EnquiryPage.prototype.onLocSelect = function (description) {
        this.studentForm.controls['locality'].setValue(description);
    };
    return EnquiryPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
    __metadata("design:type", Object)
], EnquiryPage.prototype, "fileInput", void 0);
EnquiryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'enquiry-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/enquiry/enquiry.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <ion-buttons left>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      ENQUIRY\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="search()"><ion-icon name="search"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="enquiry-page">\n \n    <ion-list no-lines>\n\n      <form [formGroup]="studentForm">\n\n        <!-- Year of Joining of the student -->\n        <ion-list radio-group formControlName="study_year" (ionChange)="onYearChange()">\n          <ion-item style="width: 50%; float: left; background: #f4f4f4;font-weight: bolder;color: #e62626;">\n            <ion-label>May 2019 - April 2020</ion-label>\n            <ion-radio value="2019-20"></ion-radio>\n          </ion-item>\n          <ion-item style="width: 50%; float: left; background: #f4f4f4;font-weight: bolder;color: #e62626;">\n            <ion-label>May 2020 - April 2021</ion-label>\n            <ion-radio value="2020-21"></ion-radio>\n          </ion-item>\n        </ion-list>\n \n        <!-- Name of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Name*</ion-label>\n            <ion-input type="text" formControlName="name" (ionChange)="onNameChange()"></ion-input>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.name.valid  && (studentForm.controls.name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n\n        <!-- Gender of the student -->\n        <ion-list radio-group formControlName="gender">\n          <ion-list-header> <ion-icon name="transgender"></ion-icon> Gender* </ion-list-header>\n          <ion-item>\n            <ion-label>Male</ion-label>\n            <ion-radio value="Male"></ion-radio>\n          </ion-item>\n          <ion-item>\n            <ion-label>Female</ion-label>\n            <ion-radio value="Female"></ion-radio>\n          </ion-item>\n        </ion-list>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.gender.valid  && (studentForm.controls.gender.dirty || submitAttempt)">\n          Please select Gender\n        </p>\n\n        <!-- DOB of the student -->\n        <ion-item>\n          <ion-label floating><ion-icon name="clock"></ion-icon> DOB*</ion-label>\n          <ion-datetime displayFormat="DD/MMM/YYYY" (ionChange)="onDobChange()" pickerFormat="DD MMM YYYY" formControlName="dob"></ion-datetime>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.dob.valid  && (studentForm.controls.dob.dirty || submitAttempt)">\n          Please select valid date\n        </p>\n\n        <ion-item>\n            <h2>Age as of Today - \n            <span class="numbering">{{ today_age_years }} . {{ today_age_months }}</span></h2>\n        </ion-item>\n\n        <ion-item>\n            <h2>Age as of {{ month_date }} - <span class="numbering">{{ month_age_years }} . {{ month_age_months }}</span> </h2>\n        </ion-item>\n\n        <ion-item>\n            <h2>Class - \n            <span class="numbering">{{ class_group }}</span></h2>\n        </ion-item>\n\n        <!-- Name of the Parent -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Parent Name*</ion-label>\n            <ion-input type="text" formControlName="parent_name"></ion-input>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.parent_name.valid  && (studentForm.controls.parent_name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n \n        <ion-item>\n            <ion-label floating><ion-icon name="mail"></ion-icon> E-mail*</ion-label>\n            <ion-input type="text" (ionChange)="onEmailChange()" formControlName="email_id"></ion-input>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.email_id.valid  && (studentForm.controls.email_id.dirty || submitAttempt)">\n          Please enter a valid E-mail Id\n        </p>\n \n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Phone No*</ion-label>\n            <ion-input type="text" (ionChange)="onPhoneChange()"formControlName="phone_number"></ion-input>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.phone_number.valid  && (studentForm.controls.phone_number.dirty || submitAttempt)">\n          Please enter a valid Phone No.\n        </p>\n\n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Alternate Contact</ion-label>\n            <ion-input type="text" (ionChange)="onPhoneChange()" formControlName="alternate_contact"></ion-input>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.alternate_contact.valid  && (studentForm.controls.alternate_contact.dirty || submitAttempt)">\n          Please enter a valid alternate No.\n        </p>\n\n        <ion-item>\n            <ion-label floating><ion-icon name="locate"></ion-icon> Locality*</ion-label>\n            <ion-input type="text" formControlName="locality" (ionChange)="onLocalityChange($event)"></ion-input>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!studentForm.controls.locality.valid  && (studentForm.controls.locality.dirty || submitAttempt)">\n          Please enter a valid locality\n        </p>\n\n        <ion-list>\n          <ion-item *ngFor="let loc of locationOptions" (click)="onLocSelect(loc.description)">\n            <ion-label>{{loc.description}}</ion-label>\n          </ion-item>\n        </ion-list>\n\n        <ion-toolbar color="primary" class="upload_button">\n          <ion-buttons>\n            <button ion-button icon-left (click)="getPicture()">\n              <ion-icon name="camera"></ion-icon>Select Image\n            </button>\n            <input type="file" #fileInput name="files[]" style="visibility: hidden; height: 0px"  (change)="processWebImage($event)" />\n          </ion-buttons>\n        </ion-toolbar>\n\n      </form>\n \n    </ion-list>\n\n    <p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>\n</ion-content>\n\n<ion-footer>\n    <div class="gm_drawer_footer_wrapper">\n      <button (click)="resetStudent()" ion-button class="btn-danger">Reset</button>\n      <button (click)="addStudent()" ion-button class="btn-success">Submit</button>\n    </div>\n</ion-footer>\n'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/enquiry/enquiry.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_21__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_19__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_20__ionic_native_file_path__["a" /* FilePath */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_9__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_10__providers_network_network__["a" /* Networks */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */]])
], EnquiryPage);

;
//# sourceMappingURL=enquiry.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_network_network__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(navCtrl, authService, loadingCtrl, formBuilder, networkService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.networkService = networkService;
        this.logoState = "in";
        this.cloudState = "in";
        this.loginState = "in";
        this.formState = "in";
        this.errorMessage = "";
        this.submitAttempt = false;
        this.isForgotPassword = false;
        this.passwordType = 'password';
        this.passwordIcon = 'eye-off';
        if (this.networkService.noConnection()) {
            this.networkService.showNetworkAlert();
        }
        this.loginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
        this.forgotPasswordForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        this.loginForm.valueChanges.subscribe(function (data) {
            _this.loginForm.setValue({
                email: _this.onEmailChange(data.email),
                password: data.password
            }, { emitEvent: false });
        });
        this.forgotPasswordForm.valueChanges.subscribe(function (data) {
            _this.forgotPasswordForm.setValue({
                email: _this.onEmailChange(data.email)
            }, { emitEvent: false });
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.showLoader();
        //Check if already authenticated
        this.authService.checkAuthentication().then(function (res) {
            console.log("Already authorized");
            _this.loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
        }, function (err) {
            console.log("Not already authorized");
            _this.loading.dismiss();
        });
    };
    LoginPage.prototype.onEmailChange = function (email_id) {
        email_id = email_id.toLowerCase();
        email_id = email_id.replace(/\s/g, '');
        return email_id;
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoader();
        this.submitAttempt = true;
        var credentials = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };
        if (this.loginForm.valid) {
            this.authService.login(credentials).then(function (result) {
                _this.loading.dismiss();
                console.log(result);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }, function (err) {
                _this.errorMessage = "Authentication Failed!";
                _this.loading.dismiss();
                console.log(err);
            });
        }
        else {
            this.errorMessage = "Please fill all details correctly";
            this.loading.dismiss();
        }
    };
    LoginPage.prototype.submitForgotPassword = function () {
        var _this = this;
        this.showLoader();
        this.submitAttempt = true;
        var credentials = {
            email: this.forgotPasswordForm.value.email,
        };
        if (this.forgotPasswordForm.valid) {
            this.authService.forgotPassword(credentials).then(function (result) {
                _this.loading.dismiss();
                console.log(result);
                _this.isForgotPassword = !_this.isForgotPassword;
                _this.errorMessage = "Please check your mail for further information!";
            }, function (err) {
                _this.errorMessage = "Authentication Failed!";
                _this.loading.dismiss();
                console.log(err);
            });
        }
        else {
            this.errorMessage = "Please fill all details correctly";
            this.loading.dismiss();
        }
    };
    LoginPage.prototype.launchSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignupPage */]);
        this.errorMessage = "";
    };
    LoginPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    LoginPage.prototype.forgotPassword = function () {
        this.isForgotPassword = !this.isForgotPassword;
    };
    LoginPage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'login',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/login/login.html"*/'<ion-content class="login-page">\n    <div padding id="cloud-layer">\n\n      <ion-row>\n        <ion-col>\n          <img [@flyInBottomSlow]="logoState" src="assets/images/logo_littleW_0.png" />\n        </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="!isForgotPassword">\n          <ion-col>\n              <ion-list inset [@bounceInBottom]="formState">\n\n                <form [formGroup]="loginForm">\n   \n                    <ion-item>\n                      <ion-label><ion-icon name="person"></ion-icon></ion-label>\n                      <ion-input formControlName="email" placeholder="email" type="text"></ion-input>\n                    </ion-item>\n\n                    <p *ngIf="!loginForm.controls.email.valid  && (loginForm.controls.email.dirty || submitAttempt)" class="errorMessage">\n                      Enter valid email id\n                    </p>\n       \n                    <ion-item>\n                      <ion-label><ion-icon name="lock"></ion-icon></ion-label>\n                      <ion-input required formControlName="password" placeholder="password" [type]="passwordType"></ion-input>\n                      <ion-icon item-end [name]="passwordIcon" class="passwordIcon" (click)=\'hideShowPassword()\' style="z-index:9999999;"></ion-icon>\n                    </ion-item>\n\n                    <p *ngIf="!loginForm.controls.password.valid  && (loginForm.controls.password.dirty || submitAttempt)" class="errorMessage">\n                      Enter valid password\n                    </p>\n\n                  </form>\n              </ion-list>\n          </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="!isForgotPassword">\n          <ion-col>\n              <button ion-button full (click)="login()" [@fadeIn]="loginState" class="login-button">Login</button>\n          </ion-col>\n      </ion-row>\n\n      <ion-col *ngIf="!isForgotPassword">\n          <a class="forgot-password" (click)="forgotPassword()" [@fadeIn]="loginState"> FORGOT PASSWORD? </a>\n      </ion-col>\n\n      <ion-row *ngIf="isForgotPassword">\n          <ion-col>\n              <ion-list inset [@bounceInBottom]="formState">\n\n                <form [formGroup]="forgotPasswordForm">\n   \n                    <ion-item>\n                      <ion-label><ion-icon name="person"></ion-icon></ion-label>\n                      <ion-input formControlName="email" placeholder="email" type="text"></ion-input>\n                    </ion-item>\n\n                    <p *ngIf="!forgotPasswordForm.controls.email.valid  && (forgotPasswordForm.controls.email.dirty || submitAttempt)" class="errorMessage">\n                      Enter valid email id\n                    </p>\n\n                </form>\n              </ion-list>\n          </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="isForgotPassword">\n          <ion-col>\n              <button ion-button full (click)="submitForgotPassword()" [@fadeIn]="loginState" class="login-button">Submit</button>\n          </ion-col>\n      </ion-row>\n\n      <ion-col *ngIf="isForgotPassword">\n          <a class="forgot-password" (click)="forgotPassword()" [@fadeIn]="loginState"> Login? </a>\n      </ion-col>\n\n      <ion-row>\n        <ion-col>\n            <p class="errorMessage">{{errorMessage}}</p>\n        </ion-col>\n      </ion-row>\n\n    </div>\n \n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/login/login.html"*/,
        animations: [
            //For the logo
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('flyInBottomSlow', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                    transform: 'translate3d(0,0,0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0,2000px,0' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('2000ms ease-in-out')
                ])
            ]),
            //For the background detail
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('flyInBottomFast', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                    transform: 'translate3d(0,0,0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0,2000px,0)' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('1000ms ease-in-out')
                ])
            ]),
            //For the login form
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('bounceInBottom', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                    transform: 'translate3d(0,0,0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('2000ms 200ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["keyframes"])([
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translate3d(0,0,0)', offset: 1 })
                    ]))
                ])
            ]),
            //For login button
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('fadeIn', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                    opacity: 1
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('1000ms 2000ms ease-in')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__providers_network_network__["a" /* Networks */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, centerService, studentService, authService, loading, app, menu, storage, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.centerService = centerService;
        this.studentService = studentService;
        this.authService = authService;
        this.loading = loading;
        this.app = app;
        this.menu = menu;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.active = true;
        this.isPasswordMatching = true;
        this.isExisting = false;
        this.btnText = "Save";
        this.existingUser = false;
        this.isUserDeletable = false;
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.getCenters();
        this.getUsers();
    };
    // Function to make email small letters on change
    SignupPage.prototype.onEmailChange = function () {
        this.email = this.email.toLowerCase();
    };
    SignupPage.prototype.reset = function () {
        this.existingUser = false;
        this.role = "";
        this.email = "";
        this.password = "";
        this.confirm_password = "";
        this.name = "";
        this.center = "";
        this.active = true;
        this.isPasswordMatching = true;
        this.isExisting = false;
        this._id = "";
        this.myInput = "";
        this.mySelect = "";
        this.btnText = "Save";
        this.existingUser = false;
        this.isUserDeletable = false;
    };
    SignupPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Function to get list of all the centers
    SignupPage.prototype.getCenters = function () {
        var _this = this;
        this.centers = [];
        this.centerService.searchCenter().then(function (result) {
            result = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](result, function (o) {
                return (o.active == true);
            });
            _this.centers = result;
            _this.storage.get('user').then(function (user) {
                if (user.role != "admin") {
                    _this.centers = __WEBPACK_IMPORTED_MODULE_5_lodash__["find"](_this.centers, ['center_code', user.center]);
                    _this.center = _this.centers;
                }
            });
        }, function (err) {
            console.log(err);
        });
    };
    // Function to get list of all the Users
    SignupPage.prototype.getUsers = function () {
        var _this = this;
        this.users = [];
        this.authService.searchUser().then(function (result) {
            _this.users = result;
            for (var i = 0; i < _this.users.length; i++) {
                _this.users[i].password = "";
            }
        }, function (err) {
            console.log(err);
        });
    };
    SignupPage.prototype.save = function () {
        var _this = this;
        if (!this.isExisting && this.isPasswordMatching) {
            this.loader.present();
            var details = {
                email: this.email,
                password: this.password,
                role: this.role,
                name: this.name,
                center: this.center,
                active: this.active
            };
            this.authService.createAccount(details).then(function (result) {
                _this.loader.dismiss();
                _this.reset();
                _this.getUsers();
                _this.presentToast('User data saved successfully');
            }, function (err) {
                _this.loader.dismiss();
                _this.presentToast('Error! Please try again.');
            });
        }
    };
    SignupPage.prototype.update = function () {
        var _this = this;
        this.loader.present();
        var details = {
            email: this.email,
            password: this.password,
            role: this.role,
            name: this.name,
            center: this.center,
            active: this.active
        };
        this.authService.updateAccount(details).then(function (result) {
            _this.reset();
            _this.loader.dismiss();
            _this.getUsers();
            _this.mySelect = null;
            _this.myInput = '';
            _this.presentToast('User data saved successfully');
        }, function (err) {
            _this.loader.dismiss();
            _this.presentToast('Error! Please try again.');
        });
    };
    // Function to search for a User dynamically based on an input
    SignupPage.prototype.search = function () {
        var _this = this;
        var result = [];
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].name.toLowerCase().indexOf(this.myInput.toLowerCase()) >= 0) {
                result.push(this.users[i]);
            }
            else if (this.users[i].email.toLowerCase().indexOf(this.myInput.toLowerCase()) >= 0) {
                result.push(this.users[i]);
            }
        }
        if (result && result.length === 1) {
            this.existingUser = true;
            this.role = result[0].role;
            this.email = result[0].email;
            this.password = result[0].password;
            this.confirm_password = result[0].password;
            this.name = result[0].name;
            this.center = result[0].center;
            this.active = result[0].active;
            this._id = result[0]._id;
            this.btnText = "Update";
            this.isUserDeletable = false;
            this.studentService.getStudents().then(function (data) {
                data = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](data, function (o) {
                    return (o.counsellor == this.email);
                });
                if (!data)
                    _this.isUserDeletable = true;
            }, function (err) {
                console.log("not allowed");
            });
        }
        else {
            this.existingUser = false;
            this.role = "";
            this.email = "";
            this.password = "";
            this.confirm_password = "";
            this.name = "";
            this.center = "";
            this.active = true;
            this.isUserDeletable = false;
        }
    };
    // Function to search for a User dynamically based on select
    SignupPage.prototype.onSelectChange = function () {
        var _this = this;
        var result = [];
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].name == this.mySelect)
                result.push(this.users[i]);
        }
        if (result && result.length === 1) {
            this.existingUser = true;
            this.role = result[0].role;
            this.email = result[0].email;
            this.password = result[0].password;
            this.confirm_password = result[0].password;
            this.name = result[0].name;
            this.center = result[0].center;
            this.active = result[0].active;
            this._id = result[0]._id;
            this.btnText = "Update";
            this.isUserDeletable = false;
            this.studentService.getStudents().then(function (data) {
                var student = [];
                student = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](data, function (o) {
                    return (o.counsellor == result[0].email);
                });
                if (student.length <= 0)
                    _this.isUserDeletable = true;
            }, function (err) {
                console.log("not allowed");
            });
        }
        else {
            this.existingUser = false;
            this.role = "";
            this.email = "";
            this.password = "";
            this.confirm_password = "";
            this.name = "";
            this.center = "";
            this.active = true;
            this.isUserDeletable = false;
        }
    };
    // Function to check if user exists with same email ID
    SignupPage.prototype.checkEmail = function () {
        this.isExisting = false;
        var result = __WEBPACK_IMPORTED_MODULE_5_lodash__["find"](this.users, ['email', this.email]);
        this.isExisting = (result != null && result != undefined) ? true : false;
    };
    // Function to check if password and confirm password match
    SignupPage.prototype.checkPassword = function () {
        this.isPasswordMatching = false;
        if ((this.password == undefined || this.password == null)
            && (this.confirm_password == undefined || this.confirm_password == null)) {
            this.isPasswordMatching = false;
        }
        else {
            this.isPasswordMatching = (this.password == this.confirm_password) ? true : false;
        }
    };
    SignupPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
    };
    SignupPage.prototype.delete = function () {
        var _this = this;
        this.loader.present();
        var details = {
            email: this.email,
        };
        this.authService.deleteAccount(details).then(function (result) {
            _this.reset();
            _this.loader.dismiss();
            _this.getUsers();
            _this.mySelect = null;
            _this.myInput = '';
            _this.presentToast('User delete successfully');
        }, function (err) {
            _this.loader.dismiss();
            _this.presentToast('Error! Please try again.');
        });
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'signup',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/signup/signup.html"*/' <ion-header>\n  <ion-navbar color="secondary">\n    <ion-buttons left>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <!-- <ion-buttons start>\n        <button ion-button icon-only (click)="openHomePage()"><ion-icon name="close"></ion-icon></button>\n    </ion-buttons> -->\n    <ion-title>Users</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <div class="search-row">\n        <ion-searchbar\n            [(ngModel)]="myInput"\n            (animated)="true"\n            (placeholder)="Search"\n            (ionInput)="search()">\n        </ion-searchbar>\n        <ion-select interface="popover" [(ngModel)]="mySelect" (ionChange)="onSelectChange()" class="search-ic">\n          <ion-option *ngFor="let user of users" [value]="user.name">{{user.name}}</ion-option>\n        </ion-select>\n    </div>\n \n    <ion-row class="account-form">\n        <ion-col>\n            <ion-list inset>\n\n                <ion-item *ngIf="!existingUser">\n                  <ion-label>Center</ion-label>\n                  <ion-select interface="popover" [(ngModel)]="center">\n                    <ion-option *ngFor="let cen of centers" [value]="cen.center_code"> {{cen.center_name}} </ion-option>\n                  </ion-select>\n                </ion-item>\n\n                <ion-item *ngIf="existingUser">\n                  <ion-label>Center</ion-label>\n                  <ion-input [(ngModel)]="center" [readonly]=true placeholder="Center" type="text"></ion-input>\n                </ion-item>\n \n                <ion-item *ngIf="!existingUser">\n                    <ion-label><ion-icon name="mail"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="email" (ionChange)="onEmailChange()" (ionChange)="checkEmail()" required placeholder="Email" type="email"></ion-input>\n                </ion-item>\n\n                <ion-item *ngIf="existingUser">\n                    <ion-label><ion-icon name="mail"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="email" [readonly]=true placeholder="Email" type="email"></ion-input>\n                </ion-item>\n\n                <p class="error-message" *ngIf="isExisting">Email already exists</p>\n\n                <ion-item>\n                    <ion-label><ion-icon name="lock"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="password" (ionChange)="checkPassword()" placeholder="Password" type="password"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label><ion-icon name="lock"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="confirm_password" placeholder="Confirm Password" (ionChange)="checkPassword()" type="password"></ion-input>\n                </ion-item>\n\n                <p class="error-message" *ngIf="!isPasswordMatching">Password do not match</p>\n\n                <ion-item>\n                    <ion-label><ion-icon name="person-add"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="name" placeholder="Name"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label>Active</ion-label>\n                    <ion-toggle [(ngModel)]="active" checked="true" class="toggle-large"></ion-toggle>\n                </ion-item>\n \n                <ion-list radio-group [(ngModel)]="role" style="margin-bottom: 120px;">\n                  <ion-item>\n                    <ion-label>Center</ion-label>\n                    <ion-radio value="counsellor" checked></ion-radio>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label>Dispatcher</ion-label>\n                    <ion-radio value="dispatcher"></ion-radio>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label>Admin</ion-label>\n                    <ion-radio value="admin"></ion-radio>\n                  </ion-item>\n                </ion-list>\n \n            </ion-list>\n        \n        </ion-col>\n    </ion-row>\n\n</ion-content>\n\n<ion-footer>\n  <div class="gm_drawer_footer_wrapper"> \n \n    <button ion-button (click)="delete()" *ngIf="isUserDeletable" class="delete-button" style="position: fixed;">Delete User</button>\n\n    <button ion-button (click)="save()" *ngIf="btnText == \'Save\'" class="continue-button">{{ btnText }}</button>\n    <button ion-button (click)="update()" *ngIf="btnText != \'Save\'" class="continue-button">{{ btnText }}</button>\n\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_3__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* ToastController */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_students_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_center_center__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_search__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_path__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Providers



// Pages

// Files Images



var ConfirmPage = (function () {
    function ConfirmPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loading, formBuilder, camera, file, filePath, actionSheetCtrl, toastCtrl, platform, app, menu, centerService, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loading = loading;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.centerService = centerService;
        this.storage = storage;
        this.submitAttempt = false;
        this.confirmStudent = function () {
            _this.submitAttempt = true;
            if (_this.confirmForm.valid) {
                _this.loader.present();
                _this.student.study_year = _this.confirmForm.value.study_year;
                _this.student.class_group = _this.confirmForm.value.class_group;
                _this.student.status = "confirmed";
                _this.student.is_Confirmed = true;
                _this.student.photo = _this.confirmForm.value.photo;
                _this.student.class_type = _this.confirmForm.value.class_type;
                _this.student.uniform_size = _this.confirmForm.value.uniform_size;
                _this.student.shoe_size = _this.confirmForm.value.shoe_size;
                _this.student.is_Delivered = false;
                _this.student.is_Indented = false;
                _this.student.confirmation_date = null;
                _this.student.indentation_date = null;
                _this.student.delivery_date = null;
                _this.student.is_Active = true;
                _this.student.admin_edit = false;
                _this.studentService.updateStudent(_this.student).then(function (result) {
                    _this.loader.dismiss();
                    _this.presentToast('student data saved successfully');
                    _this.goBack();
                }, function (err) {
                    _this.loader.dismiss();
                    _this.presentToast('Error! Please try again.');
                });
            }
        };
        this.takePhoto = function () {
            var actionSheet = _this.actionSheetCtrl.create({
                title: 'Select Image Source',
                buttons: [
                    {
                        text: 'Load from Library',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: function () {
                            _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            actionSheet.present();
        };
        this.confirmForm = formBuilder.group({
            study_year: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            class_group: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            student_id: [''],
            class_type: ['Annual', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            uniform_size: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            shoe_size: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            photo: [''],
            needUniform: true,
            needShoe: true
        });
    }
    ConfirmPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loading.create({
            content: 'Please wait...',
        });
        this.storage.get('confirmed_student').then(function (student) {
            _this.student = student;
            _this.confirmForm.controls['study_year'].setValue(student.study_year);
            _this.confirmForm.controls['class_group'].setValue(student.class_group);
            _this.confirmForm.controls['student_id'].setValue(student.student_id);
            _this.confirmForm.controls['photo'].setValue(student.photo);
            if (student.study_year == '2020-21')
                _this.confirmForm.controls['class_type'].setValue('Early start');
        });
    };
    ConfirmPage.prototype.onUniformChange = function () {
        if (this.confirmForm.value.needUniform)
            this.confirmForm.controls['uniform_size'].setValue('');
        else
            this.confirmForm.controls['uniform_size'].setValue('NA');
    };
    ConfirmPage.prototype.onShoeChange = function () {
        if (this.confirmForm.value.needShoe)
            this.confirmForm.controls['shoe_size'].setValue('');
        else
            this.confirmForm.controls['shoe_size'].setValue('NA');
    };
    // Photos
    ConfirmPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    ConfirmPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    ConfirmPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    ConfirmPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    ConfirmPage.prototype.uploadImage = function () {
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var path = targetPath + filename;
        this.getFileContentAsBase64(path, function (base64Image) {
            this.confirmForm.photo = base64Image;
        });
    };
    ConfirmPage.prototype.getFileContentAsBase64 = function (path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            alert('Cannot found requested file');
        }
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    };
    ConfirmPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    ConfirmPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__search_search__["a" /* SearchPage */]);
    };
    ConfirmPage.prototype.getPicture = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.fileInput.nativeElement.click();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.camera.getPicture({
                            quality: 1,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            targetWidth: 10,
                            targetHeight: 10
                        }).then(function (data) {
                            _this.confirmForm.patchValue({ 'photo': 'data:image/jpg;base64,' + data });
                        }, function (err) {
                            alert('Unable to take photo');
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    ConfirmPage.prototype.processWebImage = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var imageData = readerEvent.target.result;
            _this.confirmForm.patchValue({ 'photo': imageData });
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(this.confirmForm.controls['photo'].value);
    };
    ConfirmPage.prototype.getProfileImageStyle = function () {
        return ('url(' + this.confirmForm.controls['photo'].value + ')');
    };
    ConfirmPage.prototype.onYearChange = function () {
        if (this.confirmForm.controls['study_year'].value == '2020-21') {
            if (this.confirmForm.controls['class_group'].value == "Play Group")
                this.confirmForm.controls['class_group'].setValue('Nursery');
            else if (this.confirmForm.controls['class_group'].value == "Nursery")
                this.confirmForm.controls['class_group'].setValue('LKG');
            else if (this.confirmForm.controls['class_group'].value == "LKG")
                this.confirmForm.controls['class_group'].setValue('UKG');
            else if (this.confirmForm.controls['class_group'].value == "UKG")
                this.confirmForm.controls['class_group'].setValue('UKG');
            else
                this.confirmForm.controls['class_group'].setValue('Play Group');
        }
        else {
            if (this.confirmForm.controls['class_group'].value == "Play Group")
                this.confirmForm.controls['class_group'].setValue('Play Group');
            else if (this.confirmForm.controls['class_group'].value == "Nursery")
                this.confirmForm.controls['class_group'].setValue('Play Group');
            else if (this.confirmForm.controls['class_group'].value == "LKG")
                this.confirmForm.controls['class_group'].setValue('Nursery');
            else if (this.confirmForm.controls['class_group'].value == "UKG")
                this.confirmForm.controls['class_group'].setValue('LKG');
            else
                this.confirmForm.controls['class_group'].setValue('UKG');
        }
    };
    return ConfirmPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
    __metadata("design:type", Object)
], ConfirmPage.prototype, "fileInput", void 0);
ConfirmPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'confirm-page',template:/*ion-inline-start:"/home/akash/Code/akash/spark/client/src/pages/confirm/confirm.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons left>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-buttons start>\n    <button ion-button icon-only (click)="goBack()"><ion-icon name="close"></ion-icon></button>\n  </ion-buttons>\n  <ion-title>\n    SPARK\n  </ion-title>\n </ion-navbar>\n</ion-header>\n\n<ion-content padding class="home-page">\n \n    <div class="booking_card" style="height:200px;" *ngIf="student != null">\n          <div class="col_left">\n            <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student"/></div>\n            <div *ngIf="!student.photo"><img src="assets/images/NoImageAvailable.png" class="bg_student"/></div>\n          </div>\n          <div class="col_right">\n            <h6>{{student.name}}</h6>\n            <h6 *ngIf="student.gender === \'Male\'"> S/O {{student.parent_name}}</h6>\n            <h6 *ngIf="student.gender !== \'Male\'"> D/O {{student.parent_name}}</h6>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="mail"></ion-icon> {{student.email_id}}\n            </a>\n            <br>\n            <a (click)="presentActionSheet(student.phone_number, student.email_id)">\n              <ion-icon name="call"></ion-icon> {{student.phone_number}} \n            </a>\n            <!-- <h2><ion-icon name="call"></ion-icon> {{student.alternate_contact}}</h2> -->\n            <h6><ion-icon name="locate"></ion-icon> {{student.locality}}</h6>\n            <h6><ion-icon name="clock"></ion-icon> {{student.dob | date: \'dd/MMM/yyyy\'}} </h6>\n          </div>\n    </div>\n\n    <ion-list no-lines>\n\n      <form [formGroup]="confirmForm">\n \n      <!-- Study Year of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="bookmarks"></ion-icon> Study Year*</ion-label>\n            <ion-select formControlName="study_year" interface="popover" (ionChange)="onYearChange()">\n              <ion-option value="2020-21">May 2020 - April 2021</ion-option>\n              <ion-option value="2021-22">May 2021 - April 2022</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!confirmForm.controls.study_year.valid  && (confirmForm.controls.study_year.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- Class of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="office"></ion-icon> Class*</ion-label>\n            <ion-select formControlName="class_group" interface="popover">\n              <ion-option value="Play Group">Play Group</ion-option>\n              <ion-option value="Nursery">Nursery</ion-option>\n              <ion-option value="LKG">LKG</ion-option>\n              <ion-option value="UKG">UKG</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!confirmForm.controls.class_group.valid  && (confirmForm.controls.class_group.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <!-- class_type of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="office"></ion-icon> Type*</ion-label>\n            <ion-select formControlName="class_type" interface="popover">\n              <ion-option value="Annual">Annual</ion-option>\n              <ion-option value="Mid-term">Mid-term</ion-option>\n              <ion-option value="Early start">Early start</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!confirmForm.controls.class_type.valid  && (confirmForm.controls.class_type.dirty || submitAttempt)">\n          Please select Class Group\n        </p>\n\n        <ion-item>\n          <ion-label>Uniform</ion-label>\n          <ion-toggle formControlName="needUniform" (ionChange)="onUniformChange()" checked="true" class="toggle-large"></ion-toggle>\n        </ion-item>\n\n        <!-- uniform_size of the student -->\n        <ion-item *ngIf="confirmForm.value.needUniform">\n            <ion-label floating><ion-icon name="clothes"></ion-icon> Uniform Size*</ion-label>\n            <ion-select formControlName="uniform_size" interface="popover">\n              <ion-option value="18">18</ion-option>\n              <ion-option value="20">20</ion-option>\n              <ion-option value="22">22</ion-option>\n              <ion-option value="24">24</ion-option>\n              <ion-option value="26">26</ion-option>\n              <ion-option value="28">28</ion-option>\n              <ion-option value="30">30</ion-option>\n              <ion-option value="32">32</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!confirmForm.controls.uniform_size.valid  && (confirmForm.controls.uniform_size.dirty || submitAttempt)">\n          Please select Uniform Size\n        </p>\n\n        <ion-item>\n          <ion-label>Shoe</ion-label>\n          <ion-toggle formControlName="needShoe" checked="true" (ionChange)="onShoeChange()" class="toggle-large"></ion-toggle>\n        </ion-item>\n\n        <!-- shoe_size of the student -->\n        <ion-item *ngIf="confirmForm.value.needShoe">\n            <ion-label floating><ion-icon name="shoe"></ion-icon> Shoe Size*</ion-label>\n            <ion-select formControlName="shoe_size" interface="popover">\n              <ion-option value="6">6</ion-option>\n              <ion-option value="7">7</ion-option>\n              <ion-option value="8">8</ion-option>\n              <ion-option value="9">9</ion-option>\n              <ion-option value="10">10</ion-option>\n              <ion-option value="11">11</ion-option>\n              <ion-option value="12">12</ion-option>\n              <ion-option value="13">13</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <p class="errorMessage" *ngIf="!confirmForm.controls.shoe_size.valid  && (confirmForm.controls.shoe_size.dirty || submitAttempt)">\n          Please select Shoe Size\n        </p>\n\n        <ion-toolbar color="primary" class="upload_button">\n          <ion-buttons>\n            <button ion-button icon-left (click)="getPicture()">\n              <ion-icon name="camera"></ion-icon>\n              <p *ngIf="confirmForm.controls.photo.value == \'\'">Select Image</p>\n              <p *ngIf="confirmForm.controls.photo.value != \'\'">Change Image</p>\n            </button>\n            <input type="file" #fileInput name="files[]" style="visibility: hidden; height: 0px"  (change)="processWebImage($event)" />\n          </ion-buttons>\n        </ion-toolbar>\n\n      </form>\n \n    </ion-list>\n\n    <p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>\n</ion-content>\n\n<ion-footer>\n    <div class="gm_drawer_footer_wrapper">\n      <button (click)="goBack()" ion-button class="btn-danger">Cancel</button>\n      <button (click)="confirmStudent()" ion-button class="btn-success">Submit</button>\n    </div>\n</ion-footer>\n'/*ion-inline-end:"/home/akash/Code/akash/spark/client/src/pages/confirm/confirm.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_path__["a" /* FilePath */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_6__providers_center_center__["a" /* Center */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], ConfirmPage);

;
//# sourceMappingURL=confirm.js.map

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 415,
	"./af.js": 415,
	"./ar": 416,
	"./ar-dz": 417,
	"./ar-dz.js": 417,
	"./ar-kw": 418,
	"./ar-kw.js": 418,
	"./ar-ly": 419,
	"./ar-ly.js": 419,
	"./ar-ma": 420,
	"./ar-ma.js": 420,
	"./ar-sa": 421,
	"./ar-sa.js": 421,
	"./ar-tn": 422,
	"./ar-tn.js": 422,
	"./ar.js": 416,
	"./az": 423,
	"./az.js": 423,
	"./be": 424,
	"./be.js": 424,
	"./bg": 425,
	"./bg.js": 425,
	"./bm": 426,
	"./bm.js": 426,
	"./bn": 427,
	"./bn.js": 427,
	"./bo": 428,
	"./bo.js": 428,
	"./br": 429,
	"./br.js": 429,
	"./bs": 430,
	"./bs.js": 430,
	"./ca": 431,
	"./ca.js": 431,
	"./cs": 432,
	"./cs.js": 432,
	"./cv": 433,
	"./cv.js": 433,
	"./cy": 434,
	"./cy.js": 434,
	"./da": 435,
	"./da.js": 435,
	"./de": 436,
	"./de-at": 437,
	"./de-at.js": 437,
	"./de-ch": 438,
	"./de-ch.js": 438,
	"./de.js": 436,
	"./dv": 439,
	"./dv.js": 439,
	"./el": 440,
	"./el.js": 440,
	"./en-SG": 441,
	"./en-SG.js": 441,
	"./en-au": 442,
	"./en-au.js": 442,
	"./en-ca": 443,
	"./en-ca.js": 443,
	"./en-gb": 444,
	"./en-gb.js": 444,
	"./en-ie": 445,
	"./en-ie.js": 445,
	"./en-il": 446,
	"./en-il.js": 446,
	"./en-nz": 447,
	"./en-nz.js": 447,
	"./eo": 448,
	"./eo.js": 448,
	"./es": 449,
	"./es-do": 450,
	"./es-do.js": 450,
	"./es-us": 451,
	"./es-us.js": 451,
	"./es.js": 449,
	"./et": 452,
	"./et.js": 452,
	"./eu": 453,
	"./eu.js": 453,
	"./fa": 454,
	"./fa.js": 454,
	"./fi": 455,
	"./fi.js": 455,
	"./fo": 456,
	"./fo.js": 456,
	"./fr": 457,
	"./fr-ca": 458,
	"./fr-ca.js": 458,
	"./fr-ch": 459,
	"./fr-ch.js": 459,
	"./fr.js": 457,
	"./fy": 460,
	"./fy.js": 460,
	"./ga": 461,
	"./ga.js": 461,
	"./gd": 462,
	"./gd.js": 462,
	"./gl": 463,
	"./gl.js": 463,
	"./gom-latn": 464,
	"./gom-latn.js": 464,
	"./gu": 465,
	"./gu.js": 465,
	"./he": 466,
	"./he.js": 466,
	"./hi": 467,
	"./hi.js": 467,
	"./hr": 468,
	"./hr.js": 468,
	"./hu": 469,
	"./hu.js": 469,
	"./hy-am": 470,
	"./hy-am.js": 470,
	"./id": 471,
	"./id.js": 471,
	"./is": 472,
	"./is.js": 472,
	"./it": 473,
	"./it-ch": 474,
	"./it-ch.js": 474,
	"./it.js": 473,
	"./ja": 475,
	"./ja.js": 475,
	"./jv": 476,
	"./jv.js": 476,
	"./ka": 477,
	"./ka.js": 477,
	"./kk": 478,
	"./kk.js": 478,
	"./km": 479,
	"./km.js": 479,
	"./kn": 480,
	"./kn.js": 480,
	"./ko": 481,
	"./ko.js": 481,
	"./ku": 482,
	"./ku.js": 482,
	"./ky": 483,
	"./ky.js": 483,
	"./lb": 484,
	"./lb.js": 484,
	"./lo": 485,
	"./lo.js": 485,
	"./lt": 486,
	"./lt.js": 486,
	"./lv": 487,
	"./lv.js": 487,
	"./me": 488,
	"./me.js": 488,
	"./mi": 489,
	"./mi.js": 489,
	"./mk": 490,
	"./mk.js": 490,
	"./ml": 491,
	"./ml.js": 491,
	"./mn": 492,
	"./mn.js": 492,
	"./mr": 493,
	"./mr.js": 493,
	"./ms": 494,
	"./ms-my": 495,
	"./ms-my.js": 495,
	"./ms.js": 494,
	"./mt": 496,
	"./mt.js": 496,
	"./my": 497,
	"./my.js": 497,
	"./nb": 498,
	"./nb.js": 498,
	"./ne": 499,
	"./ne.js": 499,
	"./nl": 500,
	"./nl-be": 501,
	"./nl-be.js": 501,
	"./nl.js": 500,
	"./nn": 502,
	"./nn.js": 502,
	"./pa-in": 503,
	"./pa-in.js": 503,
	"./pl": 504,
	"./pl.js": 504,
	"./pt": 505,
	"./pt-br": 506,
	"./pt-br.js": 506,
	"./pt.js": 505,
	"./ro": 507,
	"./ro.js": 507,
	"./ru": 508,
	"./ru.js": 508,
	"./sd": 509,
	"./sd.js": 509,
	"./se": 510,
	"./se.js": 510,
	"./si": 511,
	"./si.js": 511,
	"./sk": 512,
	"./sk.js": 512,
	"./sl": 513,
	"./sl.js": 513,
	"./sq": 514,
	"./sq.js": 514,
	"./sr": 515,
	"./sr-cyrl": 516,
	"./sr-cyrl.js": 516,
	"./sr.js": 515,
	"./ss": 517,
	"./ss.js": 517,
	"./sv": 518,
	"./sv.js": 518,
	"./sw": 519,
	"./sw.js": 519,
	"./ta": 520,
	"./ta.js": 520,
	"./te": 521,
	"./te.js": 521,
	"./tet": 522,
	"./tet.js": 522,
	"./tg": 523,
	"./tg.js": 523,
	"./th": 524,
	"./th.js": 524,
	"./tl-ph": 525,
	"./tl-ph.js": 525,
	"./tlh": 526,
	"./tlh.js": 526,
	"./tr": 527,
	"./tr.js": 527,
	"./tzl": 528,
	"./tzl.js": 528,
	"./tzm": 529,
	"./tzm-latn": 530,
	"./tzm-latn.js": 530,
	"./tzm.js": 529,
	"./ug-cn": 531,
	"./ug-cn.js": 531,
	"./uk": 532,
	"./uk.js": 532,
	"./ur": 533,
	"./ur.js": 533,
	"./uz": 534,
	"./uz-latn": 535,
	"./uz-latn.js": 535,
	"./uz.js": 534,
	"./vi": 536,
	"./vi.js": 536,
	"./x-pseudo": 537,
	"./x-pseudo.js": 537,
	"./yo": 538,
	"./yo.js": 538,
	"./zh-cn": 539,
	"./zh-cn.js": 539,
	"./zh-hk": 540,
	"./zh-hk.js": 540,
	"./zh-tw": 541,
	"./zh-tw.js": 541
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 879;

/***/ })

},[567]);
//# sourceMappingURL=main.js.map