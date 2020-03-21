import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './forms/form-login/form-login.component';
import { FormServiceComponent } from './forms/form-service/form-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@myapp-interceptor/auth-interceptor.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [
    FormLoginComponent,
    FormServiceComponent,
    LoadingComponent,
    MenuComponent,
  ],
  exports: [
    FormLoginComponent,
    FormServiceComponent,
    LoadingComponent,
    MenuComponent,
  ],
})
export class ComponentsModule {}
