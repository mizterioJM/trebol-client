import { Component, OnInit } from '@angular/core';
import { AuthService } from '@myapp-services/auth.service';
import { ILogin } from '@myapp-interfaces/login.interface';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { Role } from '@myapp-enums/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData: ILogin;

  constructor(
    private readonly _authService: AuthService,
    private readonly router: Router,
    private readonly alertCtrl: AlertController,
    private readonly loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {}

  async recibirLoginData(event) {
    if (event) {
      this.loginData = event;
    }

    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      animated: true,
      message: 'Cargando...',
    });

    await loading.present();

    this._authService.login(this.loginData).subscribe(
      async (res) => {
        if (res) {
          const dataUser = this._authService.getUser();
          dataUser.roles.map(async (role: any) => {
            if (role === Role.ROLE_ADM) {
              this.router.navigateByUrl('/admin');
              await loading.dismiss();
              return;
            }
            if (role === Role.ROLE_USER) {
              const userId = dataUser.id;
              this.router.navigateByUrl(`/working/${userId}`);
              await loading.dismiss();
              return;
            } else {
              await loading.dismiss();
              const alert = await this.alertCtrl.create({
                header: 'Rol no reconocido',
                message: 'Comunicarlo a Administracion',
                buttons: ['OK'],
              });
              await alert.present();
            }
          });
        }
      },
      async (error) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'ERROR LOGIN',
          message: error,
          buttons: ['OK'],
        });
        await alert.present();
      },
    );
  }
}
