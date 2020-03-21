import { Component, OnInit } from '@angular/core';
import { AuthService } from '@myapp-services/auth.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Menu } from '@myapp-interfaces/menu.interface';
import { Observable } from 'rxjs';
import { InternalDataService } from '@myapp-services/internal-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  menuOpts: Observable<Menu[]>;

  constructor(
    private readonly _authService: AuthService,
    private readonly alertCtrl: AlertController,
    private readonly _internalService: InternalDataService,
  ) {}

  ngOnInit() {
    this.menuOpts = this._internalService.getMenuOpts();
  }

  async salir() {
    const alert = await this.alertCtrl.create({
      header: '¿Desea Salir?',
      animated: true,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this._authService.logout();
          },
        },
      ],
    });

    await alert.present();
  }
}
