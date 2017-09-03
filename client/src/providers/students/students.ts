import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Students {

  //url = "https://spark-olw.herokuapp.com/";
  url = "http://localhost:8080/";
 
  constructor(public http: Http, public authService: Auth, public storage: Storage) {
 
  }
 
  getStudents(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
 
      this.http.get(this.url+'api/students', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }
 
  createStudent(student){
    this.storage.get('user').then((user) => {
      student.center = user.center;
      student.counsellor = user.email;
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
   
        this.http.post(this.url+'api/students', JSON.stringify(student), {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });

    });
    return null; 
  }
 
  updateStudent(student){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.put(this.url+'api/students/' + student._id, student, {headers: headers})
          .subscribe((res) => {
            resolve(res);
          }, (err) => {
              reject(err);
          });    
 
    });
 
  }
 
}