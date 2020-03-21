import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { finalize, map, catchError } from 'rxjs/operators';
import { RutaService } from '@myapp-services/ruta.service';
import { JaulaService } from '@myapp-services/jaula.service';
import { VehiculoService } from '@myapp-services/vehiculo.service';
import { UserService } from '@myapp-services/user.service';
import { ServicioService } from '@myapp-services/servicio.service';
import { IServicio } from '@myapp-interfaces/servicio.interface';
import { UIService } from '@myapp-services/ui.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() servicio: any;

  editServicioForm: FormGroup;

  rutas$: Observable<any>;
  jaulas$: Observable<any>;
  vehiculos$: Observable<any>;
  usersChofer$: Observable<any>;
  usersApoyo$: Observable<any>;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly formBuilder: FormBuilder,
    private readonly loadingCtrl: LoadingController,
    private readonly _rutaService: RutaService,
    private readonly _jaulaService: JaulaService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _userService: UserService,
    private readonly _servicioService: ServicioService,
    private readonly _uiService: UIService,
  ) {}

  ngOnInit() {
    this.editFormBuild();
    this.cargarDatos();
  }

  async editarServicio(event: Event) {
    event.preventDefault();

    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
    });

    await loading.present();

    const servicioId = this.servicio.id;
    const servicio: IServicio = this.editServicioForm.value;

    this._servicioService
      .editarServicio(servicioId, servicio)
      .pipe(
        catchError((err) => {
          return this._uiService.showAlert('ERROR INTERNO', err);
        }),
        finalize(async () => {
          loading.dismiss();
        }),
      )
      .subscribe(() => {
        this._uiService.showAlert(
          'Operacion Satisfactoria',
          'Se han realizado los cambios correctamente.',
        );
        this.modalCtrl.dismiss();
      });
  }

  editFormBuild() {
    this.editServicioForm = this.formBuilder.group({
      ruta: [this.servicio.ruta.id, [Validators.required]],
      jaula: [this.servicio.jaula.id, [Validators.required]],
      vehicle: [this.servicio.vehicle.id, [Validators.required]],
      chofer: [this.servicio.chofer.id, [Validators.required]],
      apoyoA: [this.servicio.apoyoA.id, [Validators.required]],
      apoyoB: [null],
    });
  }

  async cargarDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'cargando',
    });
    await loading.present();
    forkJoin(
      this._rutaService.getRutas(),
      this._jaulaService.getJaulas(),
      this._vehiculoService.getVehicles(),
      this._userService.getUsersChofer(),
      this._userService.getUsersApoyo(),
    )
      .pipe(
        map((res) => {
          this.rutas$ = of(res[0]);
          this.jaulas$ = of(res[1]);
          this.vehiculos$ = of(res[2]);
          this.usersChofer$ = of(res[3]);
          this.usersApoyo$ = of(res[4]);
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe();
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
