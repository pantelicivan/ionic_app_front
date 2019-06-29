import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
@Injectable()
export class RegisterPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alert: AlertController,
    private router: Router
    ) { }

  name: string = ""
  email: string = ""
  password: string = ""
  mobile_phone: string = ""
  ngOnInit() {
  }

  register() {
    const {name, email, password, mobile_phone} = this
    
    this.http.post("http://mobilno.develop/api/v1/register", {
      name: name,
      email: email,
      password: password,
      mobile_phone: mobile_phone
    }).subscribe(response => {
      this.showAlert("Success!", response['message'])
    }, error => {
      this.showAlert("Error!", Object.values(error['error'])[0][0])
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
            this.router.navigate(['/login']);
          }
        }
      }]
    });

    await alert.present()
  }
}
