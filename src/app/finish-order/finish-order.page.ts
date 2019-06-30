import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertManager } from '../helpers/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.page.html',
  styleUrls: ['./finish-order.page.scss'],
})
export class FinishOrderPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertManager: AlertManager,
    private router: Router
  ) { }

  httpOptions;
  total_amount;
  address;
  note;

  ngOnInit() {
    this.total_amount = localStorage.getItem('total_amount');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  order() {
    this.http.post('http://mobilno.develop/api/v1/order',  {
      address: this.address,
      note: this.note
    }, this.httpOptions)
        .subscribe( response => {
          console.log(response);
          this.alertManager.showAlert("Success!", response['message'], 'tabs/my-profile')
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
