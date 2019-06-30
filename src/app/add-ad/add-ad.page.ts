import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AlertManager } from '../helpers/alert';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.page.html',
  styleUrls: ['./add-ad.page.scss'],
})

@Injectable()
export class AddAdPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertManager: AlertManager
  ) { }

  httpOptions
  title: string = ""
  description: string = ""
  price: number
  quantity: number
  img_url: string

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  create() {
    const { title, description, price, quantity } = this

    this.http.post("http://mobilno.develop/api/v1/ad", {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      img_url: this.img_url
    }, this.httpOptions).subscribe(response => {
      this.alertManager.showAlert("Success!", response['message'], 'tabs/splash-screen')
    }, error => {
      console.log(error);
      if(error.status == 401) {
        this.alertManager.showAlert("Error!", error.statusText, "login")
      } else {
        this.alertManager.showAlert("Error!", Object.values(error['error'])[0][0], "")
      }
    });
  }

  // ADD PHOTO
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
