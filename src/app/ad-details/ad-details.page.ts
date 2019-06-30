import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertManager } from '../helpers/alert';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.page.html',
  styleUrls: ['./ad-details.page.scss'],
})
export class AdDetailsPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertManager: AlertManager
  ) { }

  ad;
  httpOptions;
  quantity;

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  ionViewWillEnter() {
    this.http.get('http://mobilno.develop/api/v1/ad/' + localStorage.getItem('ad'), this.httpOptions)
        .subscribe( response => {
          console.log(response);
          this.ad = response['ad'];
        }, error => {
          console.log(error);
    });
  }

  order()
  {
    this.http.post('http://mobilno.develop/api/v1/temp_order_items',  {
      ad_id: this.ad[0].id,
      title: this.ad[0].title,
      quantity: this.quantity,
      price: this.ad[0].price
    }, this.httpOptions)
        .subscribe( response => {
          console.log(response);
          this.alertManager.showAlert("Success!", response['message'], 'tabs/splash-screen')
        }, error => {
          console.log(error);
          if(error.status == 422) {
            this.alertManager.showAlert("Error!", Object.values(error['error'])[0][0], "")
          } else {
            this.alertManager.showAlert("Error!", error['error'].message, "")
          }
    });
  }
}
