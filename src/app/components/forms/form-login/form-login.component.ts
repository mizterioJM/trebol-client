import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILogin } from '@myapp-interfaces/login.interface';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  loginForm: FormGroup;

  @Output() outPutLoginData = new EventEmitter<ILogin>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.loginForm = this.formBuilder.group({
      nDocument: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(6),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  enviarLoginData(event: Event, formValid: boolean) {
    event.preventDefault();
    if (formValid) {
      const loginData: ILogin = this.loginForm.value;
      this.outPutLoginData.emit(loginData);
      this.loginForm.reset();
    }
  }
}
