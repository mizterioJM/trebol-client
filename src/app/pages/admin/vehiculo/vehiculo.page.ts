import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonSegment,
  IonSlides,
  LoadingController,
  AlertController,
  IonItemSliding,
} from '@ionic/angular';
import { VehiculoService } from '@myapp-services/vehiculo.service';
import { AuthService } from '@myapp-services/auth.service';
import { Observable, of } from 'rxjs';
import { IVehicle } from '@myapp-interfaces/vehicle.interface';
import { map, catchError, finalize } from 'rxjs/operators';
import { UIService } from '@myapp-services/ui.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  vehiculoForm: FormGroup;

  options = {
    initialSlide: 0,
    pagination: false,
    allowTouchMove: false,
  };

  vehiclos$: Observable<IVehicle[]>;

  constructor(
    private readonly _vehicleService: VehiculoService,
    private readonly _authService: AuthService,
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private readonly _uiService: UIService,
    private readonly formBuilder: FormBuilder,
  ) {}

  async ngOnInit() {
    this.vehiculoformBuild();
    this.obtenerDatos();
  }

  async obtenerDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    this._vehicleService
      .getVehicles()
      .pipe(
        map((data) => {
          this.vehiclos$ = of(data);
        }),
        catchError(async (err) => {
          await loading.dismiss();
          this._uiService.showAlert('ERROR', err);
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe();
  }

  async listar() {
    await this.slides.slidePrev();
  }

  async registrar() {
    await this.slides.slideNext();
  }

  vehiculoformBuild() {
    this.vehiculoForm = this.formBuilder.group({
      placa: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      description: ['', [Validators.maxLength(60)]],
    });
  }

  async crearVehiculo() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
    });

    await loading.present();

    if (!this.vehiculoForm.value) {
      return this._uiService.showAlert('Error Envio', 'Placa requerida');
    }

    const vehicleData: IVehicle = this.vehiculoForm.value;

    this._vehicleService
      .createVehiculo(vehicleData)
      .pipe(
        map((data) => {
          console.log(data);
        }),
        catchError(async (err) => {
          await loading.dismiss();
          this._uiService.showAlert('ERROR', err);
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe();
  }

  async deleteVehicle(vehicleId: string, item: IonItemSliding) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando...',
    });

    const alert = await this.alertCtrl.create({
      header: '¿Desea Eliminar el Vehiculo?',
      mode: 'ios',
      animated: true,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            item.close();
            return;
          },
        },
        {
          text: 'SI',
          handler: async () => {
            item.close();
            await loading.present();
            this._vehicleService
              .deleteVehicle(vehicleId)
              .pipe(
                map((data) => {
                  if (!data) {
                    this._uiService.showAlert(
                      'Operacion exitosa',
                      'Se ha eliminado correctamente el vehiculo',
                    );
                    this.obtenerDatos();
                  }
                }),
                catchError(async (err) => {
                  await loading.dismiss();
                  this._uiService.showAlert('ERROR', err);
                }),
                finalize(async () => {
                  await loading.dismiss();
                }),
              )
              .subscribe();
          },
        },
      ],
    });
    await alert.present();
  }

  async salir() {
    const alert = await this.alertCtrl.create({
      header: '¿Desea Salir?',
      mode: 'ios',
      animated: true,
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

  doRefresh(event) {
    setTimeout(() => {
      this.obtenerDatos();
      event.target.complete();
    }, 1000);
  }
}
