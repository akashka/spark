import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Classroom {

  // url = "https://dummy-spark.herokuapp.com/";
  // url = "https://spark-olw.herokuapp.com/";
  url = "http://localhost:8080/";
 
  constructor(public http: Http, public authService: Auth, public storage: Storage) {
 
  }
 
  // Function to get list of al the classrooms
  searchClassroom(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url+'api/classroom', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  createClassroom(classroom){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.url+'api/classroom', JSON.stringify(classroom), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  updateClassroom(classroom){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
        this.http.put(this.url+'api/classroom/' + classroom._id, classroom, {headers: headers})
          .map(res => res.json())
          .subscribe((res) => {
            resolve(res);
          }, (err) => {
            reject(err);
          });    
    });
  }
 
}