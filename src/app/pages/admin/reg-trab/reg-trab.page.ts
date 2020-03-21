import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@myapp-services/user.service';
import { LoadingController } from '@ionic/angular';
import { UIService } from '@myapp-services/ui.service';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-reg-trab',
  templateUrl: './reg-trab.page.html',
  styleUrls: ['./reg-trab.page.scss'],
})
export class RegTrabPage implements OnInit {
  customMonthValues = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  regTrabForm: FormGroup;

  customPickerOptions: any;

  fechaNacimiento: Date;
  password: any;
  choferState = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _userSevice: UserService,
    private readonly loadingCtrl: LoadingController,
    private readonly _uiService: UIService,
  ) {}

  ngOnInit() {
    this.regTrabFormBuild();
    this.timerPicker();
  }

  regTrabFormBuild() {
    this.regTrabForm = this.formBuilder.group({
      nDocument: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      chofer: [false, [Validators.required]],
      fecha_nac: ['', [Validators.required]],
    });
  }

  async registrarTrabajador(event: Event) {
    event.preventDefault();

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
    });

    this.regTrabForm.get('chofer').setValue(this.choferState);

    const userData = this.regTrabForm.value;

    this._userSevice
      .regUser(userData)
      .pipe(
        catchError(async (err: any) => {
          await loading.dismiss();
          return this._uiService.showAlert('ERROR REGISTRO', err);
        }),
        finalize(async () => {
          await loading.dismiss();
        }),
      )
      .subscribe(() => {
        this._uiService.showAlert(
          'Registro Exitoso',
          'Se ha completado el registro Correctamente',
        );
        this.regTrabForm.reset();
        this.fechaNacimiento = null;
      });
  }

  timerPicker() {
    this.customPickerOptions = {
      buttons: [
        {
          text: 'OKey',
          handler: (event) => {
            console.log(event);
            const anio = event.year.text.substr(-2, 2);
            if (event.month.value >= 10) {
              this.password = event.day.text + event.month.value + anio;
            }
            if (event.month.value < 10) {
              this.password = event.day.text + '0' + event.month.value + anio;
            }

            this.regTrabForm.get('password').setValue(this.password);
            this.fechaNacimiento = new Date(
              event.year.text + '-' + event.month.value + '-' + event.day.text,
            );
            this.regTrabForm.get('fecha_nac').setValue(this.fechaNacimiento);
            console.log(this.fechaNacimiento);
            console.log(this.password);
          },
        },
        {
          text: 'CANCEL',
          handler: () => {
            return true;
          },
        },
      ],
    };
  }
  statusChofer(event) {
    this.choferState = event.detail.checked;
    console.log(this.choferState);
  }
}
