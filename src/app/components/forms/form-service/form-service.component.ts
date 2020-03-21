import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import {
  Plugins,
  CameraOptions,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';

import { Observable, forkJoin, of } from 'rxjs';

import { TypeBase64 } from '@myapp-enums/base64.enum';
import { ServicioService } from '@myapp-services/servicio.service';
import { IServicio } from '@myapp-interfaces/servicio.interface';
import { UIService } from '@myapp-services/ui.service';
import { RutaService } from '@myapp-services/ruta.service';
import { JaulaService } from '@myapp-services/jaula.service';
import { VehiculoService } from '@myapp-services/vehiculo.service';
import { UserService } from '@myapp-services/user.service';
import { map, finalize, catchError } from 'rxjs/operators';

const { Camera } = Plugins;

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss'],
})
export class FormServiceComponent implements OnInit {
  photo: any;

  serviceForm: FormGroup;

  userId: any;

  rutas$: Observable<any>;
  jaulas$: Observable<any>;
  vehiculos$: Observable<any>;
  users$: Observable<any>;
  user$: Observable<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _ac: ActivatedRoute,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly loadingCtrl: LoadingController,
    private readonly _servicioService: ServicioService,
    private readonly _uiService: UIService,
    private readonly _rutaService: RutaService,
    private readonly _jaulaService: JaulaService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _userService: UserService,
  ) {}

  ngOnInit() {
    this.formBuild();
    this.mostrarDatos();
    this.photo = 'assets/img/camera.png';
    if (this.user$) {
      this.userId = this._ac.snapshot.params.userId;
      this.serviceForm.get('chofer').setValue(this.userId);
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    if (this.serviceForm.valid) {
      const registro: IServicio = this.serviceForm.value;
      console.log(registro);
      await loading.present();
      this._servicioService.crearRegServicio(registro).subscribe(
        async () => {
          await loading.dismiss();
          this.formClean();
          this._uiService.showAlert(
            'Registro Satisfactorio',
            'Se ha enviado correctamente la información y seran verificados por administracion, cualquier equivocado con lagun dato comunicarse con soporte para su modificacion.',
          );
          this._uiService.presentToast(
            'Registro Sactisfactorio',
            'toast-success',
          );
        },
        async (err) => {
          await loading.dismiss();
          this._uiService.presentToast('Fello el registro', 'toast-error');
        },
      );
    }
  }

  async mostrarDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    forkJoin(
      this._rutaService.getRutas(),
      this._jaulaService.getJaulas(),
      this._vehiculoService.getVehicles(),
      this._userService.getUser(this._ac.snapshot.params.userId),
      this._userService.getUsersApoyo(),
    )
      .pipe(
        map((res) => {
          this.rutas$ = of(res[0]);
          this.jaulas$ = of(res[1]);
          this.vehiculos$ = of(res[2]);
          this.user$ = of(res[3]);
          this.users$ = of(res[4]);
        }),
        catchError(async (err) => {
          console.log(err);
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe();
  }

  formBuild() {
    this.serviceForm = this.formBuilder.group({
      ruta: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      jaula: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      vehicle: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      chofer: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      apoyoA: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      apoyoB: [null, [Validators.minLength(1), Validators.maxLength(1)]],
      img_detail: this.formBuilder.group({
        base64: ['', [Validators.required]],
      }),
    });
  }

  async preTakePhoto() {
    console.log('HOLA');
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'SELECIONE ORIGEN IMAGEN',
      mode: 'ios',
      animated: true,
      buttons: [
        {
          text: 'Galeria',
          icon: 'albums',
          handler: () => {
            this.getBasePhoto(CameraSource.Photos);
          },
        },
        {
          text: 'Camara',
          icon: 'camera',
          handler: () => {
            this.getBasePhoto(CameraSource.Camera);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async getBasePhoto(source: CameraSource) {
    const options: CameraOptions = {
      source,
      resultType: CameraResultType.Base64,
      quality: 100,
      saveToGallery: false,
      width: 1000,
    };

    const image = await Camera.getPhoto(options);
    this.serviceForm
      .get('img_detail')
      .get('base64')
      .setValue(image.base64String);
    this.photo = TypeBase64.base64 + image.base64String;
  }

  formClean() {
    this.serviceForm.reset();
    this.photo = 'assets/img/camera.png';
  }
}
