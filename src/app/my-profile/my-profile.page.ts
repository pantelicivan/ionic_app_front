import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertManager } from '../helpers/alert';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  name  = " "
  email = " "
  mobile_phone = " "
  httpOptions;

  constructor(
    private http: HttpClient,
    private alertManager: AlertManager
  ) { }

  ngOnInit() {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    this.http.get("http://mobilno.develop/api/v1/profile", this.httpOptions).subscribe( response => {
      this.name = response['user'].name
      this.email = response['user'].email
      this.mobile_phone = response['user'].mobile_phone
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.http.post("http://mobilno.develop/api/v1/logout",null, this.httpOptions).subscribe( response => {
      console.log(response);
      this.alertManager.showAlert("Success!", response['message'], 'home')
    }, error => {
      console.log(error);
    })
  }
}
