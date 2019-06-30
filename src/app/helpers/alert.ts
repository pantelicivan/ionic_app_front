import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'
import { Injectable } from '@angular/core';

@Injectable()
export class AlertManager {

    constructor(
        private alert: AlertController,
        private router: Router
      ) { }

    public async showAlert(header: string, message: string, redirect: string) {
        const alert =  await this.alert.create({
          header,
          message,
          buttons: [{
            text: "Ok",
            handler: () => {
              alert.dismiss();
              if(redirect != "") {
                this.router.navigate(['/' + redirect]);
              }
            }
          }]
        });
    
        await alert.present()
      }
}