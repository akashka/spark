import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Students } from '../../providers/students/students';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ConfirmPage } from '../confirm/confirm';
import * as _ from 'lodash'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import {CalendarController} from "ion2-calendar/dist";

import {Transfer, TransferObject} from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
  providers: [Transfer, TransferObject, File, EmailComposer]
})

export class ReportsPage {

  public students: any;
  public reports: any;
  public startDate: Date;
  public endDate: Date;
  public searchType: String;
  public searchByDates: String;
  public fileTransfer: TransferObject = this.transfer.create();

  constructor(
  		public navParams: NavParams,
  		public navCtrl: NavController, 
	    public studentService: Students, 
	    public modalCtrl: ModalController, 
	    public alertCtrl: AlertController, 
	    public authService: Auth, 
	    public loadingCtrl: LoadingController,
	    public storage: Storage,
	    public calendarCtrl: CalendarController,
	    private transfer: Transfer, 
	    private file: File,
	    private emailComposer: EmailComposer
	) { }

  ionViewDidLoad() {
    this.studentService.getStudents().then((data) => {
      this.storage.get('user').then((user) => {
	    if(user.role != "admin"){
	        data = _.filter(data, function(o) { 
	          return (o.center == user.center); 
	        });
        }
        this.students = (_.sortBy(data, 'enquiry_date')).reverse();
      });
    }, (err) => {
        console.log("not allowed");
    });
  }

  search(startDate, endDate) {
  	this.startDate = startDate;
  	this.endDate = endDate;
  	if(this.searchType === 'enquiry') {
	  	this.reports = _.filter(this.students, function(o) { 
	      return (moment(o.enquiryDate) >= startDate && moment(o.enquiryDate) <= endDate); 
	    });
    } else if(this.searchType === 'confirmed') {
    	this.reports = _.filter(this.students, function(o) { 
	      return (o.is_Confirmed && moment(o.confirmation_date) >= startDate && moment(o.confirmation_date) <= endDate); 
	    });
    } else if(this.searchType === 'indented') {
    	this.reports = _.filter(this.students, function(o) { 
	      return (o.is_Indented && moment(o.indentation_date) >= startDate && moment(o.indentation_date) <= endDate); 
	    });
    } else {
    	this.reports = _.filter(this.students, function(o) { 
	      return ((moment(o.enquiryDate) >= startDate && moment(o.enquiryDate) <= endDate) || (o.is_Confirmed && moment(o.confirmation_date) >= startDate && moment(o.confirmation_date) <= endDate) || (o.is_Indented && moment(o.indentation_date) >= startDate && moment(o.indentation_date) <= endDate)); 
	    });
    }
    console.log(this.reports);
  }

  searchToday() {
  	this.searchByDates = "today";
  	var startDate = moment().subtract(1, 'day');
  	var endDate = moment();
  	this.search(startDate, endDate);
  }

  searchWeek() {
  	this.searchByDates = "week";
  	var startDate = moment().subtract(7, 'day');
  	var endDate = moment();
  	this.search(startDate, endDate);
  }

  searchMonth() {
  	this.searchByDates = "month";
  	var startDate = moment().subtract(7, 'day');
  	var endDate = moment();
  	this.search(startDate, endDate);
  }

  searchDates(res) {
  	this.searchByDates = "dates";
  	var startDate = moment(res.from);
  	var endDate = moment(res.to);
  	this.search(startDate, endDate);
  }

  setEnquiry() {
  		this.searchType = "enquiry";
  		this.searchOnChange();
  }

  setConfirmed() {
  		this.searchType = "confirmed";
  		this.searchOnChange();
  }

  setIndented() {
  		this.searchType = "indented";
  		this.searchOnChange();
  }

  setAll() {
  		this.searchType = "";
  		this.searchOnChange();
  }

  searchOnChange() {
  	if(this.searchByDates === "dates") {
  		var res = {
  			from: this.startDate,
  			to: this.endDate
  		};
  		this.searchDates(res);
	} else if (this.searchByDates === "month") this.searchMonth();
	else if (this.searchByDates === "week") this.searchWeek();
	else this.searchToday();
  }

  	//Function to covert object to csv format
  	convertToCSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';
		for (var i = 0; i < array.length; i++) {
		    var line = '';
		    for (var index in array[i]) {
		        if (line != '') line += ','
		        line += array[i][index];
		    }
		    str += line + '\r\n';
		}
		return str;
	}

	downloadReport() {
		var url = this.convertToCSV(this.reports);
	    this.fileTransfer.download(url, this.file.dataDirectory + 'reports.csv').then((entry) => {
		    console.log('download complete: ' + entry.toURL());
		}, (error) => {
		    console.log(error);
		});
	}

	convertJsonToHtml(objArray) {
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
	                } else {
	                    str += '<td>' + this.convertJsonToHtml(objValue) + '</td>';
	                }
	            } else {
	                str += '<td>' + objValue + '</td>';
	            }

	        }
	        str += '</tr>';
	    }
	    str += '</tbody>'
	    str += '</table>';
	    return str;
	}

	mailReport() {
				this.storage.get('user').then((user) => {
					let email = {
					  to: user.email,
					  attachments: [],
					  subject: 'Reports',
					  body: this.convertJsonToHtml(this.reports),
					  isHtml: true
					};
					this.emailComposer.open(email);
				});
	}

	dateRange() {
	    this.calendarCtrl.openCalendar({
	      isRadio: false,
	      from: new Date(2017, 1 - 1, 1),
	      to: new Date(),
	      weekdaysTitle: "Su_Mo_Tu_We_Th_Fr_Sa".split("_")
	    })
	      .then( (res:any) => { 
	      	this.searchDates(res);
  		  })
	      .catch( () => {} )
	}

	close() {
		this.navCtrl.setRoot(HomePage);
	}

}
