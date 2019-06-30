import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertManager } from '../helpers/alert';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertManager: AlertManager,
  ) { }
  
  httpOptions;
  orders;

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  ionViewWillEnter() {
    this.http.get('http://mobilno.develop/api/v1/order', this.httpOptions)
        .subscribe( response => {
          this.orders = response['orders'];
        }, error => {
          this.alertManager.showAlert("Error!", error['error'].message, "")
    });
  }

}
