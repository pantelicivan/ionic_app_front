import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.page.html',
  styleUrls: ['./main-screen.page.scss'],
})
export class MainScreenPage implements OnInit {

  @ViewChild('tabs') tabs: IonTabs

  constructor() { }

  ngOnInit() {
    this.tabs.select('splash-screen')
  }

}
