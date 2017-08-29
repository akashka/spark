webpackJsonp([2],{

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Students; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(134);
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
    }
    Students.prototype.getStudents = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.get('http://localhost:8080/api/students', { headers: headers })
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
        this.storage.get('user').then(function (user) {
            student.center = user.center;
            student.counsellor = user.email;
            return new Promise(function (resolve, reject) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', _this.authService.token);
                _this.http.post('http://localhost:8080/api/students', JSON.stringify(student), { headers: headers })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });
        });
        return null;
    };
    Students.prototype.updateStudent = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', _this.authService.token);
            _this.http.put('http://localhost:8080/api/students/' + id, { headers: headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return Students;
}());
Students = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], Students);

//# sourceMappingURL=students.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(80);
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
    function SignupPage(navCtrl, authService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
    }
    SignupPage.prototype.register = function () {
        var _this = this;
        this.showLoader();
        var details = {
            email: this.email,
            password: this.password,
            role: this.role
        };
        this.authService.createAccount(details).then(function (result) {
            _this.loading.dismiss();
            console.log(result);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    SignupPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'signup',template:/*ion-inline-start:"/home/nabeel/Code/spark/client/src/pages/signup/signup.html"*/'<ion-header>\n \n  <ion-navbar color="secondary">\n    <ion-title>Create Account</ion-title>\n  </ion-navbar>\n \n</ion-header>\n \n \n<ion-content padding>\n \n    <ion-row class="account-form">\n        <ion-col>\n            <ion-list inset>\n \n                <ion-item>\n                    <ion-label><ion-icon name="mail"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="email" placeholder="Email" type="email"></ion-input>\n                </ion-item>\n \n                <ion-item>\n                    <ion-label><ion-icon name="lock"></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="password" placeholder="Password" type="password"></ion-input>\n                </ion-item>\n \n                <ion-item>\n                    <ion-label>Role</ion-label>\n                    <ion-select [(ngModel)]="role">\n                        <ion-option value="reader">Reader</ion-option>\n                        <ion-option value="creator">Creator</ion-option>\n                        <ion-option value="editor">Editor</ion-option>\n                    </ion-select>\n                </ion-item>\n \n            </ion-list>\n \n            <button ion-button (click)="register()" class="continue-button">Register</button>\n \n        </ion-col>\n    </ion-row>\n \n</ion-content>'/*ion-inline-end:"/home/nabeel/Code/spark/client/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 148;

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/center/center.module": [
		717,
		1
	],
	"../pages/reports/reports.module": [
		718,
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
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 191;

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_students_students__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchPage = (function () {
    function SearchPage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.studentService.getStudents().then(function (data) {
            _this.students = data;
        }, function (err) {
            console.log("not allowed");
        });
    };
    SearchPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    SearchPage.prototype.add = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    SearchPage.prototype.update = function (student) {
    };
    return SearchPage;
}());
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'search-page',template:/*ion-inline-start:"/home/nabeel/Code/spark/client/src/pages/search/search.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons start>\n    <button ion-button icon-only (click)="logout()"><ion-icon name="power"></ion-icon></button>\n  </ion-buttons>\n  <ion-title>\n    SPARK\n  </ion-title>\n  <ion-buttons end>\n    <button ion-button icon-only (click)="add()"><ion-icon name="add-circle"></ion-icon></button>\n  </ion-buttons>\n </ion-navbar>\n</ion-header>\n \n<ion-content>\n \n  <ion-item-sliding *ngFor="let student of students" class="results_list_mobile">\n   \n      <button ion-item *ngIf="student.status===\'confirmed\'" class="confirmedStudent">\n        <div class="col_left">\n          <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student"/></div>\n          <div *ngIf="!student.photo"><img src="../assets/images/NoImageAvailable.png" class="bg_student"/></div>\n        </div>\n        <div class="col_right">\n          <h1>{{student.name}}</h1>\n          <h3 *ngIf="student.gender === \'male\'"> S/O {{student.parent_name}}</h3>\n          <h3 *ngIf="student.gender !== \'male\'"> D/O {{student.parent_name}}</h3>\n          <h2><ion-icon name="mail"></ion-icon>  {{student.email_id}}</h2>\n          <h2><ion-icon name="call"></ion-icon>  {{student.phone_number}}</h2>\n          <h2><ion-icon name="locate"></ion-icon>  {{student.locality}}</h2>\n          <h2><ion-icon name="clock"></ion-icon>  {{student.dob | date:\'dd-MMM-yyyy\'}} ({{student.month_age}})</h2>\n          <h2>{{student.class_group}}</h2>\n        </div>\n      </button>\n\n      <button ion-item *ngIf="student.status!=\'confirmed\'">\n        <div class="col_left">\n          <div *ngIf="student.photo"><img src={{student.photo}} class="bg_student"/></div>\n          <div *ngIf="!student.photo"><img src="../assets/images/NoImageAvailable.png" class="bg_student"/></div>\n        </div>\n        <div class="col_right">\n          <h1>{{student.name}}</h1>\n          <h3 *ngIf="student.gender === \'male\'"> S/O {{student.parent_name}}</h3>\n          <h3 *ngIf="student.gender !== \'male\'"> D/O {{student.parent_name}}</h3>\n          <h2>{{student.email_id}}</h2>\n          <h2>{{student.phone_number}} / {{student.alternate_contact}}</h2>\n          <h2>{{student.locality}}</h2>\n          <h2>{{student.dob}} ({{student.month_age}})</h2>\n          <h2>{{student.class_group}}</h2>\n        </div>\n      </button>\n   \n      <ion-item-options side="right">\n        <button ion-button color="danger" (click)="update(student)">\n          <ion-icon name="redo"></ion-icon>\n          Confirmed\n        </button>\n      </ion-item-options>\n  </ion-item-sliding>\n\n</ion-content>'/*ion-inline-end:"/home/nabeel/Code/spark/client/src/pages/search/search.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CenterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CenterPage = (function () {
    function CenterPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CenterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CenterPage');
    };
    return CenterPage;
}());
CenterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-center',template:/*ion-inline-start:"/home/nabeel/Code/spark/client/src/pages/center/center.html"*/'<!--\n  Generated template for the CenterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>CenterPage</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/nabeel/Code/spark/client/src/pages/center/center.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], CenterPage);

//# sourceMappingURL=center.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ReportsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ReportsPage = (function () {
    function ReportsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ReportsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReportsPage');
    };
    return ReportsPage;
}());
ReportsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reports',template:/*ion-inline-start:"/home/nabeel/Code/spark/client/src/pages/reports/reports.html"*/'<!--\n  Generated template for the ReportsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ReportsPage</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/nabeel/Code/spark/client/src/pages/reports/reports.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], ReportsPage);

//# sourceMappingURL=reports.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(399);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_search_search__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_students_students__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_transfer__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file_path__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__ = __webpack_require__(391);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Pages




// Providers


// Camera




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* SearchPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/center/center.module#CenterPageModule', name: 'CenterPage', segment: 'center', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/reports/reports.module#ReportsPageModule', name: 'ReportsPage', segment: 'reports', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* SearchPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */],
            __WEBPACK_IMPORTED_MODULE_11__providers_students_students__["a" /* Students */],
            __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__["a" /* Auth */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_file_path__["a" /* FilePath */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = (function () {
    function MyApp(platform) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* StatusBar */].styleDefault();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Auth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(131);
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




var Auth = (function () {
    function Auth(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    Auth.prototype.checkAuthentication = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Load token if exists
            _this.storage.get('token').then(function (value) {
                _this.token = value;
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Authorization', _this.token);
                _this.http.get('http://localhost:8080/api/auth/protected', { headers: headers })
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
            _this.http.post('http://localhost:8080/api/auth/register', JSON.stringify(details), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                _this.token = data.token;
                _this.storage.set('token', data.token);
                _this.storage.set('user', data.user);
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
            _this.http.post('http://localhost:8080/api/auth/login', JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                _this.token = data.token;
                _this.storage.set('token', data.token);
                _this.storage.set('user', data.user);
                resolve(data);
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    Auth.prototype.logout = function () {
        this.storage.set('token', '');
    };
    return Auth;
}());
Auth = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], Auth);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(136);
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
    function LoginPage(navCtrl, authService, loadingCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.logoState = "in";
        this.cloudState = "in";
        this.loginState = "in";
        this.formState = "in";
        this.errorMessage = "";
        this.submitAttempt = false;
        this.loginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.showLoader();
        //Check if already authenticated
        this.authService.checkAuthentication().then(function (res) {
            console.log("Already authorized");
            _this.loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        }, function (err) {
            console.log("Not already authorized");
            _this.loading.dismiss();
        });
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
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }, function (err) {
                _this.errorMessage = "Authentication Failed!";
                _this.loading.dismiss();
                console.log(err);
            });
        }
        else {
            this.errorMessage = "";
            this.loading.dismiss();
        }
    };
    LoginPage.prototype.launchSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'login',template:/*ion-inline-start:"/home/nabeel/Code/spark/client/src/pages/login/login.html"*/'<ion-content class="login-page">\n    <div padding id="cloud-layer">\n\n      <ion-row>\n        <ion-col>\n          <img [@flyInBottomSlow]="logoState" src="assets/images/logo_littleW_0.png" />\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n          <ion-col>\n              <ion-list inset [@bounceInBottom]="formState">\n\n                <form [formGroup]="loginForm">\n   \n                    <ion-item>\n                      <ion-label><ion-icon name="person"></ion-icon></ion-label>\n                      <ion-input formControlName="email" placeholder="email" type="text"></ion-input>\n                    </ion-item>\n\n                    <p *ngIf="!loginForm.controls.email.valid  && (loginForm.controls.email.dirty || submitAttempt)" class="errorMessage">\n                      Enter valid email id\n                    </p>\n       \n                    <ion-item>\n                      <ion-label><ion-icon name="lock"></ion-icon></ion-label>\n                      <ion-input required formControlName="password" placeholder="password" type="password"></ion-input>\n                    </ion-item>\n\n                    <p *ngIf="!loginForm.controls.password.valid  && (loginForm.controls.password.dirty || submitAttempt)" class="errorMessage">\n                      Enter valid password\n                    </p>\n\n                  </form>\n              </ion-list>\n          </ion-col>\n      </ion-row>\n\n      <ion-row>\n          <ion-col>\n              <button ion-button full (click)="login()" [@fadeIn]="loginState" class="login-button">Login</button>\n          </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col>\n            <p class="errorMessage">{{errorMessage}}</p>\n        </ion-col>\n      </ion-row>\n\n    </div>\n \n</ion-content>'/*ion-inline-end:"/home/nabeel/Code/spark/client/src/pages/login/login.html"*/,
        animations: [
            //For the logo
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* trigger */])('flyInBottomSlow', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({
                    transform: 'translate3d(0,0,0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* transition */])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({ transform: 'translate3d(0,2000px,0' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])('2000ms ease-in-out')
                ])
            ]),
            //For the background detail
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* trigger */])('flyInBottomFast', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({
                    transform: 'translate3d(0,0,0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* transition */])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({ transform: 'translate3d(0,2000px,0)' }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])('1000ms ease-in-out')
                ])
            ]),
            //For the login form
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* trigger */])('bounceInBottom', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({
                    transform: 'translate3d(0,0,0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* transition */])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])('2000ms 200ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({ transform: 'translate3d(0,0,0)', offset: 1 })
                    ]))
                ])
            ]),
            //For login button
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* trigger */])('fadeIn', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* state */])('in', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({
                    opacity: 1
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* transition */])('void => *', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* style */])({ opacity: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])('1000ms 2000ms ease-in')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_students_students__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__center_center__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reports_reports__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_path__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(391);
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




var HomePage = (function () {
    function HomePage(navCtrl, studentService, modalCtrl, alertCtrl, authService, loadingCtrl, formBuilder, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, app, menu) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.studentService = studentService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.app = app;
        this.menu = menu;
        this.submitAttempt = false;
        this.addStudent = function () {
            _this.showLoader;
            _this.submitAttempt = true;
            if (_this.studentForm.valid) {
                _this.studentService.createStudent(_this.studentForm).then(function (result) {
                    _this.hideLoader();
                    _this.presentToast('student data saved successfully');
                }, function (err) {
                    _this.hideLoader;
                    _this.presentToast('student data saving failed');
                });
            }
        };
        this.showLoader = function () {
            _this.loading = _this.loadingCtrl.create({
                content: 'Saving...'
            });
            _this.loading.present();
        };
        this.hideLoader = function () {
            _this.loading.dismiss();
        };
        this.search = function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
        };
        this.onDobChange = function (dob) {
            var now = new Date();
            _this.studentForm.value.today_age = _this.getAge(dob, now);
            now.setDate(1);
            now.setMonth(5);
            _this.studentForm.value.month_age = _this.getAge(dob, now);
            _this.studentForm.value.month_date = now;
        };
        this.getAge = function (birthday, tillday) {
            var today = new Date(tillday.substring(6, 10), tillday.substring(0, 2) - 1, tillday.substring(3, 5));
            var yearNow = today.getFullYear();
            var monthNow = today.getMonth();
            var dateNow = today.getDate();
            var dob = new Date(birthday.substring(6, 10), birthday.substring(0, 2) - 1, birthday.substring(3, 5));
            var yearDob = dob.getFullYear();
            var monthDob = dob.getMonth();
            var dateDob = dob.getDate();
            var age = {};
            var ageString = "";
            var yearString = "";
            var monthString = "";
            var dayString = "";
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
        menu.enable(true);
        this.studentForm = formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            email_id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            phone_number: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            gender: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            dob: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            parent_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            alternate_contact: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
            locality: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            center: [''],
            counsellor: [''],
            today_age: [],
            month_date: [],
            month_age: [],
            class_group: [],
            photo: []
        });
    }
    HomePage.prototype.ionViewDidLoad = function () { };
    HomePage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.calculateClass = function (birthday) {
        var age = (birthday.years * 100) + birthday.months;
        if (age >= 106 && age < 206)
            return "Play Group";
        else if (age >= 206 && age < 306)
            return "Nursery";
        else if (age >= 306 && age < 406)
            return "LKG";
        else if (age >= 406 && age < 506)
            return "UKG";
    };
    HomePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    HomePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    HomePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    HomePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    HomePage.prototype.uploadImage = function () {
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var path = targetPath + filename;
        this.getFileContentAsBase64(path, function (base64Image) {
            this.studentForm.photo = base64Image;
        });
    };
    HomePage.prototype.getFileContentAsBase64 = function (path, callback) {
        //    window.resolveLocalFileSystemURL(path, gotFile, fail);
        //            
        //    function fail(e) {
        //          alert('Cannot found requested file');
        //    }
        //    function gotFile(fileEntry) {
        //           fileEntry.file(function(file) {
        //              var reader = new FileReader();
        //              reader.onloadend = function(e) {
        //                   var content = this.result;
        //                   callback(content);
        //              };
        //   // The most important point, use the readAsDatURL Method from the file plugin
        //              reader.readAsDataURL(file);
        //           });
        //    }
    };
    HomePage.prototype.takePicture = function (sourceType) {
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
    HomePage.prototype.openSignupPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__signup_signup__["a" /* SignupPage */]);
    };
    HomePage.prototype.openCenterPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__center_center__["a" /* CenterPage */]);
    };
    HomePage.prototype.openReportsPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__reports_reports__["a" /* ReportsPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'home-page',template:/*ion-inline-start:"/home/nabeel/Code/spark/client/src/pages/home/home.html"*/'<ion-header>\n <ion-navbar color="secondary">\n  <ion-buttons start>\n    <button ion-button icon-only (click)="logout()"><ion-icon name="power"></ion-icon></button>\n  </ion-buttons>\n  <ion-title>\n    SPARK\n  </ion-title>\n  <ion-buttons end>\n    <button ion-button icon-only (click)="search()"><ion-icon name="search"></ion-icon></button>\n  </ion-buttons>\n </ion-navbar>\n</ion-header>\n\n<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <button ion-item (click)="openCenterPage()">\n        Center\n      </button>\n      <button ion-item (click)="openSignupPage()">\n        Users\n      </button>\n      <button ion-item (click)="openReportsPage()">\n        Reports\n      </button>\n      <button ion-item (click)="closeMenu()">\n        Close Menu\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>\n\n<ion-content padding class="home-page">\n \n    <ion-list no-lines>\n\n      <form [formGroup]="studentForm">\n \n        <!-- Name of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Name*</ion-label>\n            <ion-input type="text" formControlName="name"></ion-input>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.name.valid  && (studentForm.controls.name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n\n        <!-- Gender of the student -->\n        <ion-item>\n            <ion-label floating><ion-icon name="transgender"></ion-icon> Gender*</ion-label>\n            <ion-select formControlName="gender">\n              <ion-option value="Boy" selected="true">Boy</ion-option>\n              <ion-option value="Girl">Girl</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.gender.valid  && (studentForm.controls.gender.dirty || submitAttempt)">\n          Please select Gender\n        </p>\n\n        <!-- DOB of the student -->\n        <ion-item>\n          <ion-label floating><ion-icon name="clock"></ion-icon> DOB*</ion-label>\n          <ion-datetime displayFormat="DD/MMM/YYYY" pickerFormat="DD MMM YYYY" formControlName="dob"></ion-datetime>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.dob.valid  && (studentForm.controls.dob.dirty || submitAttempt)">\n          Please select valid date\n        </p>\n\n        <!-- Name of the Parent -->\n        <ion-item>\n            <ion-label floating><ion-icon name="people"></ion-icon> Parent Name*</ion-label>\n            <ion-input type="text" formControlName="parent_name"></ion-input>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.parent_name.valid  && (studentForm.controls.parent_name.dirty || submitAttempt)">\n          Please enter a valid name\n        </p>\n \n        <ion-item>\n            <ion-label floating><ion-icon name="mail"></ion-icon> E-mail*</ion-label>\n            <ion-input type="text" formControlName="email_id"></ion-input>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.email_id.valid  && (studentForm.controls.email_id.dirty || submitAttempt)">\n          Please enter a valid E-mail Id\n        </p>\n \n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Phone No*</ion-label>\n            <ion-input type="text" formControlName="phone_number"></ion-input>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.phone_number.valid  && (studentForm.controls.phone_number.dirty || submitAttempt)">\n          Please enter a valid Phone No.\n        </p>\n\n        <ion-item>\n            <ion-label floating><ion-icon name="call"></ion-icon> Alternate Contact</ion-label>\n            <ion-input type="text" formControlName="alternate_contact"></ion-input>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.alternate_contact.valid  && (studentForm.controls.alternate_contact.dirty || submitAttempt)">\n          Please enter a valid alternate No.\n        </p>\n\n        <ion-item>\n            <ion-label floating><ion-icon name="locate"></ion-icon> Locality*</ion-label>\n            <ion-input type="text" formControlName="locality"></ion-input>\n        </ion-item>\n\n        <p *ngIf="!studentForm.controls.locality.valid  && (studentForm.controls.locality.dirty || submitAttempt)">\n          Please enter a valid locality\n        </p>\n\n        <ion-item>\n            <h2>Age as of Today - </h2>\n        </ion-item>\n\n        <ion-item>\n            <h2>Age as of  - </h2>\n        </ion-item>\n\n        <ion-item>\n            <h2>Class - </h2>\n        </ion-item>\n\n        <ion-toolbar color="primary" class="upload_button">\n          <ion-buttons>\n            <button ion-button icon-left (click)="takePhoto()">\n              <ion-icon name="camera"></ion-icon>Select Image\n            </button>\n          </ion-buttons>\n        </ion-toolbar>\n\n      </form>\n \n    </ion-list>\n\n    <p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>\n \n    <div class="gm_drawer_footer_wrapper">\n      <button (click)="resetStudent()" ion-button class="btn-danger">Reset</button>\n      <button (click)="addStudent()" ion-button class="btn-success">Submit</button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/home/nabeel/Code/spark/client/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_students_students__["a" /* Students */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__["a" /* Transfer */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_path__["a" /* FilePath */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
], HomePage);

;
//# sourceMappingURL=home.js.map

/***/ })

},[394]);
//# sourceMappingURL=main.js.map