import { Component } from '@angular/core';
import { 
      IonicPage, 
      NavController, 
      NavParams, 
      LoadingController,
      App,
      MenuController
  } from 'ionic-angular';
import { Center } from '../../providers/center/center';
import * as _ from 'lodash'

//Pages
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ReportsPage } from '../reports/reports';
import { SearchPage } from '../search/search';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-center',
  templateUrl: 'center.html',
})
export class CenterPage {

  // Variables to be saved in DB for Centers
  center_name: string;
  center_code: string;
  center_phoneno: string;
  center_email: string;
  center_address: string;
  active: Boolean = true;
  loading;
  centers: any;
  btnText: string = "Save";
  myInput: string;
  center_id: string;
  mySelect: string;

  constructor(
  			public navCtrl: NavController, 
  			public navParams: NavParams, 
  			public centerService: Center, 
  			public loadingCtrl: LoadingController,
        public app: App,
        public menu: MenuController
	) {
      menu.enable(true);
  }

  ionViewDidLoad() {
  	this.getCenters()
  }

  // Function to save new center
  save(){
    let center = {
      center_name: this.center_name,
		  center_code: this.center_code,
		  center_phoneno: this.center_phoneno,
		  center_email: this.center_email,
		  center_address: this.center_address,
		  active: this.active
    };
    this.centerService.createCenter(center).then((result) => {
      console.log(result);
    }, (err) => {
    });
  }

  // Function to update existing center
  update(){
    let center = {
          center_name: this.center_name,
    		  center_code: this.center_code,
    		  center_phoneno: this.center_phoneno,
    		  center_email: this.center_email,
    		  center_address: this.center_address,
    		  active: this.active,
          _id: this.center_id
    };
    this.centerService.updateCenter(center).then((result) => {
      console.log(result);
    }, (err) => {
    });
  }

  // Function to get list of all the centers
  getCenters() {
  	this.centers = [];
  	this.centerService.searchCenter().then((result) => {
  		this.centers = result;
  	}, (err) => {
    	console.log(err);
    });
  }

  // Function to search for a center dynamically based on an input
  search() {
  	var result = [];
  	
    for(var i = 0; i < this.centers.length; i++) {
      if (_.includes(this.centers[i].center_name, this.myInput)) { result.push(this.centers[i]); } 
      else if (_.includes(this.centers[i].center_code, this.myInput)) { result.push(this.centers[i]); } 
      else if (_.includes(this.centers[i].center_phoneno, this.myInput)) { result.push(this.centers[i]); } 
      else if (_.includes(this.centers[i].center_email, this.myInput)) { result.push(this.centers[i]); } 
    }

  	if(result && result.length === 1) {
  	  this.center_name = result[0].center_name;
  	  this.center_code = result[0].center_code;
  	  this.center_phoneno = result[0].center_phoneno;
  	  this.center_email = result[0].center_email;
  	  this.center_address = result[0].center_address;
  	  this.active = result[0].active;
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
      this.center_id = "";
    }
  }

  onSelectChange() {
    var result = [];
    for(var i = 0; i < this.centers.length; i++) {
      if (_.includes(this.centers[i].center_name, this.mySelect)) { result.push(this.centers[i]); } 
    }

    if(result && result.length === 1) {
      this.center_name = result[0].center_name;
      this.center_code = result[0].center_code;
      this.center_phoneno = result[0].center_phoneno;
      this.center_email = result[0].center_email;
      this.center_address = result[0].center_address;
      this.active = result[0].active;
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
      this.center_id = "";
    }
  }

  // Function to generate unique center code
  generateCode() {
    var fields = this.center_name.split(' ');
    var str = "";
    if(fields.length > 1) {
      var temp1 = fields[0];
      var temp2 = fields[1];
      if(temp1.length > 0) str += temp1[0];
      
      if(temp1.length > 1) {
        str += temp1[1];
        if(temp2.length > 0) {
          str += temp2[0];
        } else if(temp.length > 2) str += temp[2];
      } else if(temp2.length > 2) {
        str += temp2[0];
        str += temp2[1];
      }
    }
    else{
      var temp = fields[0];
      if(temp.length > 0) str += temp[0];
      if(temp.length > 1) str += temp[1];
      if(temp.length > 2) str += temp[2];
    }
    this.center_code = str.toUpperCase();
  }

  // Function to open Pages
  openSignupPage() {
    this.navCtrl.setRoot(SignupPage);
  }

  openCenterPage() {
    this.navCtrl.setRoot(CenterPage);
  }

  openReportsPage() {
    this.navCtrl.setRoot(ReportsPage);
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
