import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';
import { ComponentsModule } from '@myapp-components/components.module';
import { ModalPage } from '../editServ/modal.page';
import { ModalPageModule } from '../editServ/modal.module';

@NgModule({
  entryComponents: [ModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule,
    ComponentsModule,
    NgxIonicImageViewerModule,
    ModalPageModule,
  ],
  declarations: [ServiciosPage],
})
export class ServiciosPageModule {}
