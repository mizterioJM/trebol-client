import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '@myapp-interfaces/user.interface';
import { UserService } from '@myapp-services/user.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { UIService } from '@myapp-services/ui.service';

@Component({
  selector: 'app-edit-trab',
  templateUrl: './edit-trab.page.html',
  styleUrls: ['./edit-trab.page.scss'],
})
export class EditTrabPage implements OnInit {
  @Input() id: string;

  userData: IUser;

  editTrabForm: FormGroup;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly formBuilder: FormBuilder,
    private readonly loadingCtrl: LoadingController,
    private readonly _userService: UserService,
    private readonly _uiService: UIService,
  ) {}

  ngOnInit() {
    this.editFormBuild();
    this.obtenerDatos();
  }

  editFormBuild() {
    this.editTrabForm = this.formBuilder.group({
      nDocument: ['', [Validators.required]],
      chofer: ['', [Validators.required]],
      details: this.formBuilder.group({
        name: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        fechaNac: ['', [Validators.required]],
      }),
    });
  }

  async enviarDatosModificados(event: Event) {
    event.preventDefault();

    const loading = await this.loadingCtrl.create({
      message: 'Enviando...',
    });

    await loading.present();

    if (this.editTrabForm.valid) {
      const userData: IUser = this.editTrabForm.value;

      this._userService
        .editarTrabajador(this.id, userData)
        .pipe(
          catchError(async (err) => {
            await loading.dismiss();
            return this._uiService.showAlert('ERROR INTERNO', err);
          }),
          finalize(async () => {
            await loading.dismiss();
          }),
        )
        .subscribe(async (res) => {
          if (res) {
            this._uiService.showAlert(
              'Operacion Satisfactoria',
              'Se realizaron las modificaciones correctamente',
            );
          }
          await this.modalCtrl.dismiss();
        });
    }
  }

  async cerrarModal() {
    await this.modalCtrl.dismiss();
  }

  async obtenerDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    this._userService
      .getUser(this.id)
      .pipe(
        map((data: IUser) => {
          this.userData = data;
          this.editTrabForm.get('nDocument').setValue(data.nDocument);
          this.editTrabForm.get('chofer').setValue(data.chofer);
          this.editTrabForm
            .get('details')
            .get('name')
            .setValue(data.details.name);
          this.editTrabForm
            .get('details')
            .get('lastname')
            .setValue(data.details.lastname);
          this.editTrabForm
            .get('details')
            .get('fechaNac')
            .setValue(data.details.fechaNac);
          console.log(typeof data.details.fechaNac);
        }),
        catchError(async (err) => {
          await loading.dismiss();
          return this._uiService.showAlert('ERROR', err);
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe();
  }
}
