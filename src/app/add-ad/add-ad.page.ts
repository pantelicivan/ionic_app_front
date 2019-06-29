import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.page.html',
  styleUrls: ['./add-ad.page.scss'],
})

@Injectable()
export class AddAdPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alert: AlertController
  ) { }

  title: string = ""
  description: string = ""
  price: number
  quantity: number
  imageURL: string

  ngOnInit() {
  }

  create() {
    const { title, description, price, quantity } = this

    this.http.post("http://mobilno.develop/api/v1/register", {
      title: title,
      description: description,
      price: price,
      quantity: quantity
    }).subscribe(response => {
      // this.showAlert("Success!", response['message'])
    }, error => {
      // this.showAlert("Error!", Object.values(error['error'])[0][0])
    });
  }

  // ADD PHOTO
  fileChanged(event) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','176918ea032185f57c91')

    console.log(files)
    this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
        console.log(event)
        this.imageURL = event['file']
      })
  }

}
