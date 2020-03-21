import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(
    private readonly alertCtrl: AlertController,
    private readonly toastCtrl: ToastController,
  ) {}

  async showAlert(typeError: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: typeError,
      message,
      mode: 'ios',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: string, cssClass: string) {
    const toast = await this.toastCtrl.create({
      animated: true,
      duration: 2000,
      message,
      mode: 'ios',
      translucent: true,
      cssClass,
    });
    toast.present();
  }
}
