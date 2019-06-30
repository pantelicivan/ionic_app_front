import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertManager } from '../helpers/alert';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertManager: AlertManager
  ) { }

  httpOptions;
  order_items;

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }
  
  ionViewWillEnter() {
    this.http.get('http://mobilno.develop/api/v1/temp_order_items', this.httpOptions)
        .subscribe( response => {
          console.log(response);
          this.order_items = response['order_items'];
        }, error => {
          console.log(error);
    });
  }

  destroy(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    
    this.http.post('http://mobilno.develop/api/v1/temp_order_items/delete',  {
      temp_order_item_id: value,
    }, this.httpOptions)
        .subscribe( response => {
          console.log(response);
          this.alertManager.showAlert("Success!", response['message'], 'my-cart')
          this.ionViewWillEnter();
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
