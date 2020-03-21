import { Component, OnInit } from '@angular/core';
import { UserService } from '@myapp-services/user.service';
import {
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { IUser } from '@myapp-interfaces/user.interface';
import { UIService } from '@myapp-services/ui.service';
import * as moment from 'moment';
import { EditTrabPage } from '../edit-trab/edit-trab.page';

@Component({
  selector: 'app-dias-trab',
  templateUrl: './dias-trab.page.html',
  styleUrls: ['./dias-trab.page.scss'],
})
export class DiasTrabPage implements OnInit {
  chofer$: Observable<IUser[]>;
  apoyo$: Observable<IUser[]>;

  constructor(
    private readonly _userService: UserService,
    private readonly loadingCtrl: LoadingController,
    private readonly _uiService: UIService,
    private readonly alertCtrl: AlertController,
    private readonly modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.cargarDatos();
  }

  async cargarDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    forkJoin(
      this._userService.getUsersChofer(),
      this._userService.getUsersApoyo(),
    )
      .pipe(
        map((data) => {
          (this.chofer$ = of(data[0])), (this.apoyo$ = of(data[1]));
        }),
        catchError(async (err) => {
          await loading.dismiss();
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe();
  }

  async editarTrabajador(id: string, item: any) {
    const modal = await this.modalCtrl.create({
      component: EditTrabPage,
      componentProps: {
        id,
      },
    });

    await modal.present();

    item.close();
  }

  async eliminarTrabajador(id: string, item: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando...',
    });

    const alert = await this.alertCtrl.create({
      header: '¿Desea Eliminar?',
      animated: true,
      mode: 'ios',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            return;
          },
        },
        {
          text: 'SI',
          handler: async () => {
            await loading.present();

            this._userService
              .borrarTrabajador(id)
              .pipe(
                catchError(async (err) => {
                  await loading.dismiss();
                  return this._uiService.showAlert('Error', err);
                }),
                finalize(async () => {
                  await loading.dismiss();
                }),
              )
              .subscribe((res) => {
                if (!res) {
                  this._uiService.showAlert(
                    'Eliminacion Satisfactoria',
                    'Se ha eliminado al Trabajador Correctamente',
                  );
                  this.cargarDatos();
                }
              });
          },
        },
      ],
    });

    await alert.present();

    item.close();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.cargarDatos();
      event.target.complete();
    }, 1000);
  }
}
