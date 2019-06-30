import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AlertManager } from '../helpers/alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
@Injectable()
export class RegisterPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertManager: AlertManager
    ) { }

  name: string = ""
  email: string = ""
  password: string = ""
  mobile_phone: string = ""
  img_url: string = ""
  ngOnInit() {
  }

  register() {
    const {name, email, password, mobile_phone} = this
    
    this.http.post("http://mobilno.develop/api/v1/register", {
      name: name,
      email: email,
      password: password,
      mobile_phone: mobile_phone,
      img_url: this.img_url
    }).subscribe(response => {
      this.alertManager.showAlert("Success!", response['message'], "login")
    }, error => {
      this.alertManager.showAlert("Error!", Object.values(error['error'])[0][0], "")
    });
  }

  fileChanged(event) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','c0c609f912b458fbadec')

    this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
        this.img_url = event['file']
        this.alertManager.showAlert("Success!", "File uploaded succesfully", "");
      })
  }
}
