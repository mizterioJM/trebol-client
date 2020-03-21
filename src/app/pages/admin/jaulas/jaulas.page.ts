import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  IonSlides,
  AlertController,
  LoadingController,
  IonItemSliding,
} from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { IJaula } from '@myapp-interfaces/jaula.interface';
import { JaulaService } from '@myapp-services/jaula.service';
import { map, catchError, finalize } from 'rxjs/operators';
import { AuthService } from '@myapp-services/auth.service';
import { UIService } from '@myapp-services/ui.service';

@Component({
  selector: 'app-jaulas',
  templateUrl: './jaulas.page.html',
  styleUrls: ['./jaulas.page.scss'],
})
export class JaulasPage implements OnInit {
  jaulaForm: FormGroup;

  jaulas$: Observable<IJaula[]>;

  options = {
    initialSlide: 0,
    pagination: false,
    allowTouchMove: false,
  };

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  constructor(
    private readonly _jaulaService: JaulaService,
    private readonly _authService: AuthService,
    private readonly _uiService: UIService,
    private readonly alertCtrl: AlertController,
    private readonly loadingCtrl: LoadingController,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.jaulaFormBuild();
    this.obtenerDatos();
  }

  async registrarJaula(event: Event) {
    event.preventDefault();

    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
    });

    const jaulaData: IJaula = this.jaulaForm.value;

    await loading.present();

    this._jaulaService
      .registrarJaula(jaulaData)
      .pipe(
        map((data) => {
          if (data) {
            this._uiService.showAlert(
              'Operacion Satisfactoria',
              'Se ha registrado correctamente la Jaula',
            );
            this.jaulaForm.reset();
            this.slides.slidePrev();
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
  }

  async obtenerDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    this._jaulaService
      .getJaulas()
      .pipe(
        map((data) => {
          this.jaulas$ = of(data);
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

  jaulaFormBuild() {
    this.jaulaForm = this.formBuilder.group({
      code: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
      description: ['', [Validators.maxLength(60)]],
    });
  }

  async eliminarJaula(jaulaId: string, item: IonItemSliding) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando...',
    });

    const alert = await this.alertCtrl.create({
      header: '¿Desea Eliminar la Jaula?',
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
            this._jaulaService
              .eliminarJaula(jaulaId)
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
          },
        },
      ],
    });

    await alert.present();
  }

  async listarSlide() {
    this.slides.slidePrev();
  }

  async registrarSlide() {
    this.slides.slideNext();
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

  doRefresh(event: any) {
    setTimeout(() => {
      this.obtenerDatos();
      event.target.complete();
    }, 500);
  }
}
