import { Component, OnInit } from '@angular/core';

import {
  ModalController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import {
  CalendarModalOptions,
  CalendarModal,
  CalendarResult,
} from 'ion2-calendar';

import * as moment from 'moment';
import { AuthService } from '@myapp-services/auth.service';
import { ServicioService } from '@myapp-services/servicio.service';
import { TypeBase64 } from '@myapp-enums/base64.enum';
import { Observable, of } from 'rxjs';
import { ModalPage } from '../editServ/modal.page';
import { catchError, map, finalize } from 'rxjs/operators';
import { UIService } from '@myapp-services/ui.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  collapseCard = true;

  base64 = TypeBase64.base64;

  fecha = moment().format('YYYY-MM-DD');

  servicios$: Observable<any>;

  photo: any;

  rutas$: Observable<any>;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly _authService: AuthService,
    private readonly _servicioServicio: ServicioService,
    private readonly alertCtrl: AlertController,
    private readonly _uiService: UIService,
    private readonly loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {}

  async openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Seleccione el dia a buscar',
      color: 'danger',
      doneLabel: 'OK',
      closeIcon: true,
      defaultDate: new Date(),
      canBackwardsSelected: true,
      weekStart: 0,
      weekdays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options },
    });

    await myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;
    if (date) {
      this.fecha = moment(date.string).format('YYYY-MM-DD');
    } else {
      return;
    }
    this.getDatos();
  }

  async salir() {
    const alert = await this.alertCtrl.create({
      header: '¿DESEA SALIR?',
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

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.getDatos();
  }

  async getDatos() {
    if (this.fecha) {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando...',
      });

      await loading.present();

      this._servicioServicio
        .getServicioFecha(this.fecha)
        .pipe(
          map((data) => {
            this.servicios$ = of(data);
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
  }

  async editarServicio(servicio: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        servicio,
      },
    });
    await modal.present();
  }
}
