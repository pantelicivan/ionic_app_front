import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
@Injectable()
export class LoginPage implements OnInit {
  constructor(
    private http: HttpClient,
    private alert: AlertController,
    private router: Router
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
      this.showAlert("Success!", response['message'])
    }, error => {
      this.showAlert("Error!", error['error'].message)
    });
  }

  async showAlert(header: string, message: string) {
    const alert =  await this.alert.create({
      header,
      message,
      buttons: [{
        text: "Ok",
        handler: () => {
          alert.dismiss();
          if(header == "Success!") {
            //Idemo dalje na main screen
            this.router.navigate(['/login']);
          }
        }
      }]
    });

    await alert.present()
  }
}
