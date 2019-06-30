import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  httpOptions;
  ads = [];

  constructor(
    private http: HttpClient
  ) { }
  
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    this.http.get('http://mobilno.develop/api/v1/ad', this.httpOptions)
        .subscribe( response => {
          console.log(response);
          this.ads = response['ads'];
        }, error => {
          console.log(error);
        });
  }

}
