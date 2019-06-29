import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertManager } from '../helpers/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
@Injectable()
export class LoginPage implements OnInit {
  constructor(
    private http: HttpClient,
    private alertManager: AlertManager
    ) { }

  email: string = ""
  password: string = ""

  ngOnInit() {
  }

  async login() {
    const {email, password} = this
    const url = "http://mobilno.develop/api/v1/login"

    this.http.post(url, {
      email: email,
      password: password,
    }).subscribe(response => {
      localStorage.setItem('token', response['0'].access_token);
      this.alertManager.showAlert("Success!", response['message'], 'tabs')
    }, error => {
      if(error.status == 422) {
        this.alertManager.showAlert("Error!", Object.values(error['error'])[0][0], "")
      } else {
        this.alertManager.showAlert("Error!", error['error'].message, "")
      }
    });
  }
}
