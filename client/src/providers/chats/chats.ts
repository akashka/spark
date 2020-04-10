import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Chats {

  // url = "https://spark-olw.herokuapp.com/";
  url = "http://localhost:8080/";

  private httpSubscription;

  constructor(
    public http: Http,
    public authService: Auth,
    public storage: Storage,
  ) {

  }

  // Function to get list of al the Chats List
  getChatList() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/chats/list', { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  // Function to get list of al the Chats messages
  getChatMessages(chatId, userId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.httpSubscription = this.http.get(this.url + 'api/chats/messages/' + chatId + '/' + userId, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.messages);
        }, (err) => {
          reject(err);
        });
    });
  }

  stopGetChatMessages() {
    this.httpSubscription.unsubscribe();
  }

  updateChatMessages(chatId, message) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.put(this.url + 'api/chats/messages/' + chatId, message, { headers: headers })
        .map(res => res.json())
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateChats(chatId, chat) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.put(this.url + 'api/chats/' + chatId, chat, { headers: headers })
        .map(res => res.json())
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  uploadToS3(file, file_name, contentEncoding, contentType) {
    return new Promise((resolve, reject) => {
      var body = {
        file: file,
        file_name: file_name,
        contentEncoding: contentEncoding,
        contentType: contentType
      };
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.post(this.url + 'api/uploadToS3', body, { headers: headers })
        .map(res => res.json())
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  };
}
