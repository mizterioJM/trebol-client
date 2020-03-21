import { Component, OnInit } from '@angular/core';
import { AuthService } from '@myapp-services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { RutaService } from '@myapp-services/ruta.service';
import { JaulaService } from '@myapp-services/jaula.service';

@Component({
  selector: 'app-working',
  templateUrl: './working.page.html',
  styleUrls: ['./working.page.scss'],
})
export class WorkingPage implements OnInit {
  userId: any;

  constructor(
    private readonly _authService: AuthService,
    private readonly _ac: ActivatedRoute,
    private readonly alertCtrl: AlertController,
  ) {}

  ngOnInit() {}

  async salir() {
    const alert = await this.alertCtrl.create({
      header: '¿Desea Salir?',
      animated: true,
      mode: 'ios',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          },
        },
        {
          text: 'SI',
          handler: () => {
            this._authService.logout();
          },
        },
      ],
    });

    await alert.present();
  }
}
