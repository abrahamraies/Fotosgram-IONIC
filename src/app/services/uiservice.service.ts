import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

  constructor(private alertController: AlertController,
              private toastController: ToastController  ) { }

  async alerta(message: string){
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}
