import { Component, OnInit } from '@angular/core';
import { CalendarModalOptions, CalendarModal } from 'ion2-calendar';
import { ModalController, LoadingController } from '@ionic/angular';
import { UserService } from '@myapp-services/user.service';
import { Observable, forkJoin, of } from 'rxjs';
import { IUserxDias } from '@myapp-interfaces/user-dias.interface';
import { map, finalize, catchError } from 'rxjs/operators';
import { UIService } from '@myapp-services/ui.service';

@Component({
  selector: 'app-list-trab',
  templateUrl: './list-trab.page.html',
  styleUrls: ['./list-trab.page.scss'],
})
export class ListTrabPage implements OnInit {
  fecha: { from: string; to: string };
  chofer$: Observable<IUserxDias[]>;
  apoyo$: Observable<IUserxDias[]>;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly loadingCtrl: LoadingController,
    private readonly _userService: UserService,
    private readonly _uiService: UIService,
  ) {}

  ngOnInit() {}

  async openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Seleccione los dias a buscar',
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

    if (!event.data) {
      return;
    }

    this.fecha = {
      from: event.data.from.string,
      to: event.data.to.string,
    };
    if (this.fecha) {
      this.obtenerDatos();
    }
  }

  async obtenerDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    forkJoin(
      this._userService.getChoferxDiasTrabajo(this.fecha.from, this.fecha.to),
      this._userService.getApoyoxDiasTrabajo(this.fecha.from, this.fecha.to),
    )
      .pipe(
        map((res) => {
          (this.chofer$ = of(res[0])), (this.apoyo$ = of(res[1]));
        }),
        catchError((err) => {
          loading.dismiss();
          return this._uiService.showAlert('ERROR', err);
        }),
        finalize(async () => {
          loading.dismiss();
        }),
      )
      .subscribe();
  }
}
