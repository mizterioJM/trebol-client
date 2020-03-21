import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  LoadingController,
  IonSlides,
  IonItemSliding,
} from '@ionic/angular';
import { AuthService } from '@myapp-services/auth.service';
import { RutaService } from '@myapp-services/ruta.service';
import { Observable, of } from 'rxjs';
import { IRuta } from '@myapp-interfaces/ruta.interface';
import { map, catchError, finalize } from 'rxjs/operators';
import { UIService } from '@myapp-services/ui.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  rutasForm: FormGroup;

  rutas$: Observable<IRuta[]>;

  options = {
    initialSlide: 0,
    pagination: false,
    allowTouchMove: false,
  };

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly loadingCtrl: LoadingController,
    private readonly _authService: AuthService,
    private readonly _rutaService: RutaService,
    private readonly _uiService: UIService,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.rutaFormBuild();
    this.obtenerDatos();
  }

  rutaFormBuild() {
    this.rutasForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      description: ['', [Validators.maxLength(100)]],
    });
  }

  async registrarRuta(event: Event) {
    event.preventDefault();
    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
    });

    await loading.present();

    const rutaData: IRuta = this.rutasForm.value;

    this._rutaService
      .registrarRuta(rutaData)
      .pipe(
        map((data) => {
          if (data) {
            this._uiService.showAlert(
              'Operacion exitosa',
              'Se ha creado correctamente la ruta',
            );
            this.rutasForm.reset();
            this.slides.slidePrev();
            this.obtenerDatos();
          }
        }),
        catchError(async (err) => {
          this._uiService.showAlert('Error', err);
          await loading.dismiss();
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe();
  }

  async obtenerDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    this._rutaService
      .getRutas()
      .pipe(
        map(async (data) => {
          this.rutas$ = of(data);
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

  async eliminarRuta(rutaId: string, item: IonItemSliding) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando...',
    });

    const alert = await this.alertCtrl.create({
      header: '¿Desea Eliminar la Ruta?',
      mode: 'ios',
      animated: true,
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
            item.close();
            await loading.present();
            this._rutaService
              .deleteRuta(rutaId)
              .pipe(
                map((data) => {
                  if (!data) {
                    this._uiService.showAlert(
                      'Operacion exitosa',
                      'se ha eliminado correctamente la ruta',
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

  listarSlide() {
    this.slides.slidePrev();
  }

  registrarSlide() {
    this.slides.slideNext();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.obtenerDatos();

      event.target.complete();
    }, 500);
  }
}
