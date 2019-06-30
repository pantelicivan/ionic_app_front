import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  httpOptions;
  ads = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  ionViewWillEnter() {
    this.http.get('http://mobilno.develop/api/v1/ad', this.httpOptions)
        .subscribe( response => {
          console.log(response);
          this.ads = response['ads'];
        }, error => {
          console.log(error);
    });
  }

  details(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    
    localStorage.setItem('ad', value);
    this.router.navigate(['/ad-details']);
  }

}
